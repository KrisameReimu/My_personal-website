import React, {createContext, useCallback, useContext, useEffect} from "react";
import {useLocalStorage} from "../hooks/useLocalStorage";
import AuthContext from "./AuthContext";
import {communityAPI} from "../services/communityAPI";

const CommunityContext = createContext({
  favorites: [],
  commentsByResource: {},
  toggleFavorite: () => false,
  isFavorite: () => false,
  loadComments: async () => {},
  getComments: () => [],
  submitComment: async () => ({ok: false})
});

const SPAM_PATTERNS = [
  /https?:\/\//i,
  /www\./i,
  /(telegram|whatsapp|vx|wechat|line)\s*[:：]?\s*[a-z0-9_@-]+/i,
  /(escort|porn|sex|adult|约炮|外围|裸聊|成人)/i,
  /(casino|bet|博彩|赌球|彩票|棋牌|百家乐)/i,
  /(loan|借贷|刷单|兼职日结|快速赚钱)/i
];

const looksLikeSpam = text => {
  const normalized = (text || "").trim();
  if (!normalized) return true;
  if (normalized.length > 800) return true;
  return SPAM_PATTERNS.some(pattern => pattern.test(normalized));
};

export const CommunityProvider = ({children}) => {
  const {user} = useContext(AuthContext);
  const apiEnabled = communityAPI.isEnabled();
  const [favorites, setFavorites] = useLocalStorage("community_favorites", []);
  const [commentsByResource, setCommentsByResource] = useLocalStorage(
    "community_comments",
    {}
  );
  const [loadedComments, setLoadedComments] = useLocalStorage(
    "community_loaded_comments",
    {}
  );
  const [lastCommentAtByUser, setLastCommentAtByUser] = useLocalStorage(
    "community_comment_rate_limit",
    {}
  );

  const isFavorite = key => favorites.some(item => item.key === key);

  const syncFavoritesFromServer = useCallback(async () => {
    if (!apiEnabled || !user?.id) return;
    try {
      const data = await communityAPI.getFavorites(user.id);
      if (!data?.ok) return;
      const mapped = (data.favorites || []).map(item => ({
        key: item.item_key,
        type: item.item_type,
        title: item.item_title,
        url: item.item_url,
        coverImage: item.item_cover_image,
        savedAt: item.created_at
      }));
      setFavorites(mapped);
    } catch {
      // Keep local cache when remote is temporarily unavailable.
    }
  }, [apiEnabled, user, setFavorites]);

  useEffect(() => {
    if (!apiEnabled) return;
    if (!user?.id) {
      setFavorites([]);
      return;
    }
    syncFavoritesFromServer();
  }, [apiEnabled, user, setFavorites, syncFavoritesFromServer]);

  const toggleFavorite = async item => {
    if (!item || !item.key) return false;
    const existed = favorites.some(f => f.key === item.key);
    if (apiEnabled && user?.id) {
      try {
        const response = await communityAPI.toggleFavorite({
          userId: user.id,
          displayName: user.displayName,
          provider: user.provider,
          sessionToken: user.sessionToken,
          client_ts: new Date().toISOString(),
          source_page: window.location.pathname,
          item: {
            ...item,
            type: item.type || "content"
          }
        });
        if (response?.ok) {
          await syncFavoritesFromServer();
          return Boolean(response.saved);
        }
      } catch {
        // Fall back to local-only toggle if network/API fails.
      }
    }
    if (existed) {
      setFavorites(favorites.filter(f => f.key !== item.key));
      return false;
    }
    setFavorites([{...item, savedAt: new Date().toISOString()}, ...favorites]);
    return true;
  };

  const loadComments = async (resourceKey, force = false) => {
    if (!resourceKey || !apiEnabled || (!force && loadedComments[resourceKey]))
      return;
    try {
      const data = await communityAPI.getComments(resourceKey);
      if (!data?.ok) return;
      setCommentsByResource({
        ...commentsByResource,
        [resourceKey]: (data.comments || []).map(item => ({
          id: item.id,
          status: item.status,
          content: item.content,
          displayName: item.display_name,
          createdAt: item.created_at
        }))
      });
      setLoadedComments({
        ...loadedComments,
        [resourceKey]: true
      });
    } catch {
      // Keep existing local comments on any remote error.
    }
  };

  const getComments = resourceKey =>
    (commentsByResource[resourceKey] || []).filter(
      item => item.status === "ok"
    );

  const submitComment = async ({
    resourceKey,
    userId,
    displayName,
    content,
    provider
  }) => {
    const text = (content || "").trim();
    if (!resourceKey || !userId || !displayName || !text) {
      return {ok: false, reason: "missing_fields"};
    }

    const now = Date.now();
    const lastTs = Number(lastCommentAtByUser[userId] || 0);
    if (now - lastTs < 10000) {
      return {ok: false, reason: "too_fast"};
    }

    if (apiEnabled) {
      try {
        const remote = await communityAPI.postComment({
          resourceKey,
          userId,
          displayName,
          content: text,
          provider: provider || "guest",
          sessionToken: user?.sessionToken,
          client_ts: new Date().toISOString(),
          source_page: window.location.pathname
        });
        setLastCommentAtByUser({
          ...lastCommentAtByUser,
          [userId]: now
        });
        if (!remote?.ok) {
          if (remote?.error === "blocked_by_filter") {
            return {ok: false, reason: "blocked_by_filter"};
          }
          return {ok: false, reason: "network_error"};
        }
        await loadComments(resourceKey, true);
        return {ok: true};
      } catch {
        return {ok: false, reason: "network_error"};
      }
    }

    if (looksLikeSpam(text)) {
      setLastCommentAtByUser({
        ...lastCommentAtByUser,
        [userId]: now
      });
      const blockedItem = {
        id: `${now}-${Math.random().toString(16).slice(2, 8)}`,
        status: "blocked",
        content: text,
        displayName,
        createdAt: new Date().toISOString()
      };
      setCommentsByResource({
        ...commentsByResource,
        [resourceKey]: [blockedItem, ...(commentsByResource[resourceKey] || [])]
      });
      return {ok: false, reason: "blocked_by_filter"};
    }

    const nextItem = {
      id: `${now}-${Math.random().toString(16).slice(2, 8)}`,
      status: "ok",
      content: text,
      displayName,
      createdAt: new Date().toISOString()
    };

    setCommentsByResource({
      ...commentsByResource,
      [resourceKey]: [nextItem, ...(commentsByResource[resourceKey] || [])]
    });
    setLastCommentAtByUser({
      ...lastCommentAtByUser,
      [userId]: now
    });
    return {ok: true};
  };

  const value = {
    favorites,
    commentsByResource,
    toggleFavorite,
    isFavorite,
    loadComments,
    getComments,
    submitComment
  };

  return (
    <CommunityContext.Provider value={value}>
      {children}
    </CommunityContext.Provider>
  );
};

export default CommunityContext;
