/**
 * useImageLoader Hook
 * 渐进式图片加载，优化性能和用户体验
 *
 * 功能：
 * - 懒加载
 * - 渐进式加载（低质量预览 -> 高质量原图）
 * - 加载状态管理
 * - 错误处理
 */

import {useState, useEffect, useRef, useCallback} from "react";

/**
 * useImageLoader
 * @param {string} src - 图片URL
 * @param {Object} options - 配置选项
 * @param {string} options.placeholder - 占位图URL
 * @param {boolean} options.lazy - 是否懒加载
 * @param {Function} options.onLoad - 加载完成回调
 * @param {Function} options.onError - 加载失败回调
 * @returns {Object} { imageSrc, loading, error, imageRef }
 */
export const useImageLoader = (src, options = {}) => {
  const {placeholder = "", lazy = true, onLoad, onError} = options;

  const [imageSrc, setImageSrc] = useState(placeholder);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const imageRef = useRef(null);
  const observerRef = useRef(null);

  const loadImage = useCallback(() => {
    const img = new Image();

    img.onload = () => {
      setImageSrc(src);
      setLoading(false);
      setError(null);
      if (onLoad) onLoad();
    };

    img.onerror = () => {
      setLoading(false);
      setError("Failed to load image");
      if (onError) onError();
    };

    img.src = src;
  }, [src, onLoad, onError]);

  useEffect(() => {
    // 如果不需要懒加载，直接加载
    if (!lazy) {
      loadImage();
      return;
    }

    // 设置Intersection Observer进行懒加载
    if (!imageRef.current) return;

    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadImage();
            // 加载后取消观察
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "50px", // 提前50px开始加载
        threshold: 0.01
      }
    );

    const currentImage = imageRef.current;
    if (currentImage) {
      observerRef.current.observe(currentImage);
    }

    return () => {
      if (observerRef.current && currentImage) {
        observerRef.current.unobserve(currentImage);
      }
    };
  }, [src, lazy, loadImage]);

  return {
    imageSrc,
    loading,
    error,
    imageRef
  };
};

/**
 * useImageGallery Hook
 * 管理图片画廊状态（lightbox、翻页等）
 */
export const useImageGallery = (images = []) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = index => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToIndex = index => {
    if (index >= 0 && index < images.length) {
      setCurrentIndex(index);
    }
  };

  // 键盘导航
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = e => {
      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowRight":
          goToNext();
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, closeLightbox, goToNext, goToPrevious]);

  return {
    currentIndex,
    currentImage: images[currentIndex],
    isLightboxOpen,
    openLightbox,
    closeLightbox,
    goToNext,
    goToPrevious,
    goToIndex,
    hasNext: currentIndex < images.length - 1,
    hasPrevious: currentIndex > 0
  };
};

/**
 * useProgressiveImage Hook
 * 渐进式图片加载（先显示低质量，再切换到高质量）
 */
export const useProgressiveImage = (lowQualitySrc, highQualitySrc) => {
  const [src, setSrc] = useState(lowQualitySrc);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 先显示低质量图片
    setSrc(lowQualitySrc);
    setLoading(true);

    // 在后台加载高质量图片
    const img = new Image();
    img.src = highQualitySrc;

    img.onload = () => {
      setSrc(highQualitySrc);
      setLoading(false);
    };

    img.onerror = () => {
      // 加载失败保持低质量图片
      setLoading(false);
    };
  }, [lowQualitySrc, highQualitySrc]);

  return {src, loading};
};

export default useImageLoader;
