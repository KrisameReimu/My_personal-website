import React, {useContext, useEffect, useRef, useState} from "react";
import AuthContext from "../../contexts/AuthContext";
import LanguageContext from "../../contexts/LanguageContext";
import "./AuthControls.scss";

export default function AuthControls() {
  const {language} = useContext(LanguageContext);
  const {user, login, loginWithGoogle, logout} = useContext(AuthContext);
  const googleButtonRef = useRef(null);
  const [hint, setHint] = useState("");

  const copy = {
    login: {zh: "登录", en: "Login"},
    logout: {zh: "退出", en: "Logout"},
    loginGoogle: {zh: "Google 登录", en: "Google Sign-In"},
    namePrompt: {zh: "输入昵称（用于留言显示）", en: "Your display name"},
    emailPrompt: {
      zh: "输入邮箱（用于权限识别）",
      en: "Your email (for role mapping)"
    },
    emailInvalid: {zh: "邮箱格式不正确", en: "Invalid email format"},
    canceled: {zh: "已取消登录", en: "Login canceled"},
    googleFailed: {
      zh: "Google 登录失败，请重试。",
      en: "Google sign-in failed. Please retry."
    }
  };

  const googleFailedText = copy.googleFailed[language];

  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";

  useEffect(() => {
    if (user) return;
    if (!googleClientId) return;
    if (!window.google?.accounts?.id || !googleButtonRef.current) return;

    window.google.accounts.id.initialize({
      client_id: googleClientId,
      callback: async response => {
        const ok = await loginWithGoogle({idToken: response.credential});
        if (!ok) setHint(googleFailedText);
      }
    });

    googleButtonRef.current.innerHTML = "";
    window.google.accounts.id.renderButton(googleButtonRef.current, {
      theme: "outline",
      size: "medium",
      text: "signin_with",
      shape: "pill"
    });
  }, [user, googleClientId, loginWithGoogle, googleFailedText]);

  const handleLogin = async provider => {
    const displayName = window.prompt(copy.namePrompt[language], "");
    if (!displayName) {
      window.alert(copy.canceled[language]);
      return;
    }
    const email = window.prompt(copy.emailPrompt[language], "");
    if (!email) {
      window.alert(copy.canceled[language]);
      return;
    }
    const normalizedEmail = String(email).trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      window.alert(copy.emailInvalid[language]);
      return;
    }
    await login({provider, displayName, email: normalizedEmail});
  };

  const displayInitial =
    user?.displayName?.trim()?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="auth-controls">
      {user ? (
        <div className="auth-user">
          <div
            className="auth-user-pill"
            title={user.email || user.displayName}
          >
            {user.picture ? (
              <img
                className="auth-user-avatar"
                src={user.picture}
                alt={user.displayName}
              />
            ) : (
              <span className="auth-user-avatar auth-user-avatar-fallback">
                {displayInitial}
              </span>
            )}
            <div className="auth-user-meta">
              <span className="auth-user-name">{user.displayName}</span>
              {user.email && (
                <span className="auth-user-email">{user.email}</span>
              )}
            </div>
          </div>
          <button onClick={logout} type="button">
            {copy.logout[language]}
          </button>
        </div>
      ) : (
        <details className="auth-login">
          <summary>{copy.login[language]}</summary>
          <div className="auth-login-menu">
            {googleClientId ? (
              <>
                <div className="google-signin-wrap" ref={googleButtonRef}></div>
                <button type="button" onClick={() => handleLogin("google")}>
                  {copy.loginGoogle[language]} (Fallback)
                </button>
              </>
            ) : (
              <button type="button" onClick={() => handleLogin("google")}>
                {copy.loginGoogle[language]}
              </button>
            )}
            {hint && <p className="auth-hint">{hint}</p>}
          </div>
        </details>
      )}
    </div>
  );
}
