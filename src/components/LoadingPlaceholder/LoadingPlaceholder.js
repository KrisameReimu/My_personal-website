/**
 * LoadingPlaceholder Component
 * 提供优雅的内容加载状态
 * 
 * 使用方式：
 * <LoadingPlaceholder type="article" count={3} />
 */

import React from 'react';
import './LoadingPlaceholder.scss';

const LoadingPlaceholder = ({ type = 'default', count = 1, message }) => {
  const renderPlaceholder = () => {
    switch (type) {
      case 'article':
        return <ArticlePlaceholder />;
      case 'photo':
        return <PhotoPlaceholder />;
      case 'video':
        return <VideoPlaceholder />;
      case 'card':
        return <CardPlaceholder />;
      default:
        return <DefaultPlaceholder />;
    }
  };

  return (
    <div className="loading-placeholder-container">
      {message && <p className="loading-message">{message}</p>}
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="placeholder-item">
          {renderPlaceholder()}
        </div>
      ))}
    </div>
  );
};

const ArticlePlaceholder = () => (
  <div className="article-placeholder">
    <div className="placeholder-image shimmer" />
    <div className="placeholder-content">
      <div className="placeholder-title shimmer" />
      <div className="placeholder-text shimmer" />
      <div className="placeholder-text shimmer short" />
      <div className="placeholder-meta">
        <div className="placeholder-tag shimmer" />
        <div className="placeholder-tag shimmer" />
      </div>
    </div>
  </div>
);

const PhotoPlaceholder = () => (
  <div className="photo-placeholder">
    <div className="placeholder-photo shimmer" />
  </div>
);

const VideoPlaceholder = () => (
  <div className="video-placeholder">
    <div className="placeholder-video shimmer" />
    <div className="placeholder-video-title shimmer" />
  </div>
);

const CardPlaceholder = () => (
  <div className="card-placeholder">
    <div className="placeholder-card-image shimmer" />
    <div className="placeholder-card-title shimmer" />
    <div className="placeholder-card-text shimmer" />
  </div>
);

const DefaultPlaceholder = () => (
  <div className="default-placeholder">
    <div className="spinner"></div>
    <p>Loading content...</p>
  </div>
);

/**
 * Simple spinner for inline loading
 */
export const LoadingSpinner = ({ size = 'medium', color = '#764ba2' }) => (
  <div className={`loading-spinner loading-spinner-${size}`}>
    <div 
      className="spinner" 
      style={{ borderTopColor: color }}
    />
  </div>
);

/**
 * Full page loading overlay
 */
export const LoadingOverlay = ({ message = 'Loading...', show = true }) => {
  if (!show) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-overlay-content">
        <LoadingSpinner size="large" />
        <p className="loading-overlay-message">{message}</p>
      </div>
    </div>
  );
};

export default LoadingPlaceholder;
