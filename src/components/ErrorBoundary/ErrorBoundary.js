/**
 * ErrorBoundary Component
 * 捕获React组件错误，提供优雅的降级体验
 *
 * 使用方式：
 * <ErrorBoundary fallback={<CustomFallback />}>
 *   <YourComponent />
 * </ErrorBoundary>
 */

import React from "react";
import "./ErrorBoundary.scss";
import LanguageContext from "../../contexts/LanguageContext";

class ErrorBoundary extends React.Component {
  static contextType = LanguageContext;
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // 可以将错误日志发送到监控服务
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // TODO: 集成错误监控服务（如Sentry）
    // Sentry.captureException(error);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    const language = this.context?.language || "en";
    const copy = {
      title: {
        zh: "出错了",
        en: "Oops! Something went wrong"
      },
      message: {
        zh: "抱歉，内容加载失败，请稍后再试。",
        en: "We're sorry for the inconvenience. The content couldn't be loaded."
      },
      details: {
        zh: "错误详情（仅开发环境）",
        en: "Error Details (Development Only)"
      },
      retry: {
        zh: "重试",
        en: "Try Again"
      },
      home: {
        zh: "返回首页",
        en: "Go Home"
      }
    };
    if (this.state.hasError) {
      // 如果提供了自定义fallback，使用它
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // 默认错误UI
      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <div className="error-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h2>{copy.title[language]}</h2>
            <p className="error-message">
              {this.props.errorMessage || copy.message[language]}
            </p>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="error-details">
                <summary>{copy.details[language]}</summary>
                <pre>{this.state.error.toString()}</pre>
                <pre>{this.state.errorInfo?.componentStack}</pre>
              </details>
            )}

            <div className="error-actions">
              <button className="btn-retry" onClick={this.handleReset}>
                {copy.retry[language]}
              </button>
              <button
                className="btn-home"
                onClick={() => (window.location.href = "/")}
              >
                {copy.home[language]}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * ContentErrorBoundary
 * 专门用于内容加载失败的错误边界
 */
export class ContentErrorBoundary extends React.Component {
  static contextType = LanguageContext;
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    console.error("Content loading error:", error, errorInfo);
  }

  render() {
    const language = this.context?.language || "en";
    const copy = {
      message: {
        zh: "内容暂时不可用",
        en: "Content temporarily unavailable"
      },
      hint: {
        zh: "请检查网络连接或稍后再试。",
        en: "Please check your internet connection or try again later."
      }
    };
    if (this.state.hasError) {
      return (
        <div className="content-error">
          <p className="content-error-icon">
            <i className="fas fa-inbox"></i>
          </p>
          <p className="content-error-message">
            {this.props.message || copy.message[language]}
          </p>
          <p className="content-error-hint">{copy.hint[language]}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
