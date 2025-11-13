/**
 * useContent Hook
 * 统一的内容获取Hook，支持本地数据和CMS切换
 *
 * 使用示例：
 * const { data, loading, error } = useContent('article', { category: 'essay', featured: true });
 */

import {useState, useEffect} from "react";
import {getContent} from "../services/contentAPI";

export const useContent = (contentType, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await getContent(contentType, options);

        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [contentType, JSON.stringify(options)]);

  return {data, loading, error};
};

/**
 * useArticles Hook
 * 专门用于获取文章列表
 */
export const useArticles = (options = {}) => {
  return useContent("article", options);
};

/**
 * usePhotos Hook
 * 专门用于获取照片列表
 */
export const usePhotos = (options = {}) => {
  return useContent("photo", options);
};

/**
 * useVideos Hook
 * 专门用于获取视频列表
 */
export const useVideos = (options = {}) => {
  return useContent("video", options);
};

/**
 * useGameProjects Hook
 * 专门用于获取游戏项目
 */
export const useGameProjects = () => {
  return useContent("game");
};

export default useContent;
