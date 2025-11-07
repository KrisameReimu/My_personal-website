/**
 * ErrorBoundary Component
 * 捕获React组件错误，提供优雅的降级体验
 * 
 * 使用方式：
 * <ErrorBoundary fallback={<CustomFallback />}>
 *   <YourComponent />
 * </ErrorBoundary>
 */

import React from 'react';
import './ErrorBoundary.scss';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // 可以将错误日志发送到监控服务
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
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
    if (this.state.hasError) {
      // 如果提供了自定义fallback，使用它
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // 默认错误UI
      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <div className="error-icon">⚠️</div>
            <h2>Oops! Something went wrong</h2>
            <p className="error-message">
              {this.props.errorMessage || 
                "We're sorry for the inconvenience. The content couldn't be loaded."}
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-details">
                <summary>Error Details (Development Only)</summary>
                <pre>{this.state.error.toString()}</pre>
                <pre>{this.state.errorInfo?.componentStack}</pre>
              </details>
            )}

            <div className="error-actions">
              <button 
                className="btn-retry" 
                onClick={this.handleReset}
              >
                Try Again
              </button>
              <button 
                className="btn-home" 
                onClick={() => window.location.href = '/'}
              >
                Go Home
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
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Content loading error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="content-error">
          <p className="content-error-icon">📭</p>
          <p className="content-error-message">
            {this.props.message || "Content temporarily unavailable"}
          </p>
          <p className="content-error-hint">
            Please check your internet connection or try again later.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
