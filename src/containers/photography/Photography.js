import React, { useState, useEffect, useCallback } from "react";
import "./Photography.scss";
import { Fade } from "react-reveal";
import { photographyConfig, categories, photosByCategory } from "../../data/photography";
import { useImageLoader } from "../../hooks/useImageLoader";

// Backwards compatibility: maintain photographySection export shape for legacy imports
const photographySection = {
  display: true,
  title: "📷 Photography",
  subtitle: "CAPTURING MOMENTS, TELLING STORIES THROUGH LIGHT AND SHADOW",
  categories: categories.map(cat => ({
    name: cat.name.en,
    description: cat.description.en,
    coverImage: cat.coverImage,
    photos: photosByCategory[cat.id].map(photo => photo.url)
  }))
};

const Photography = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [currentPhotos, setCurrentPhotos] = useState([]);
  const { loadedImages, loadImage } = useImageLoader();

  // Note: move keyboard listener AFTER dependent callbacks are defined to avoid TDZ ReferenceErrors

  // Preload images when category is selected
  useEffect(() => {
    if (selectedCategory) {
      const photos = photosByCategory[selectedCategory.id];
      photos.forEach(photo => {
        loadImage(photo.thumbnail);
        loadImage(photo.url); // Preload full-size for lightbox
      });
    }
  }, [selectedCategory, loadImage]);

  const openLightbox = useCallback((photos, index) => {
    setLightboxOpen(true);
    setLightboxIndex(index);
    setCurrentPhotos(photos);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const nextPhoto = useCallback(() => {
    setLightboxIndex(prev => (prev + 1) % currentPhotos.length);
  }, [currentPhotos]);

  const prevPhoto = useCallback(() => {
    setLightboxIndex(prev => (prev - 1 + currentPhotos.length) % currentPhotos.length);
  }, [currentPhotos]);

  // Keyboard navigation (defined after callbacks to prevent 'Cannot access before initialization')
  const handleKeydown = useCallback((e) => {
    if (!lightboxOpen) return;
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      nextPhoto();
    } else if (e.key === 'ArrowLeft') {
      prevPhoto();
    }
  }, [lightboxOpen, closeLightbox, nextPhoto, prevPhoto]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [handleKeydown]);

  if (!photographySection.display) return null;

  const selectedCategoryData = selectedCategory ? categories.find(c => c.id === selectedCategory.id) : null;
  const selectedPhotos = selectedCategory ? photosByCategory[selectedCategory.id] : [];

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="photography">
        <div className="photography-container">
          <div>
            <h1 className="photography-heading">{photographySection.title}</h1>
            <p className="subTitle photography-subtitle">
              {photographySection.subtitle}
            </p>
          </div>

          {!selectedCategory ? (
            <div className="photo-categories-grid">
              {categories.map((category, i) => {
                return (
                  <Fade key={category.id} bottom duration={2000} distance="40px">
                    <div
                      className="category-card"
                      onClick={() => setSelectedCategory(category)}
                    >
                      <div className="category-image-container">
                        <img
                          src={category.coverImage}
                          alt={category.name.en}
                          className="category-cover"
                          loading="lazy"
                        />
                        <div className="category-overlay">
                          <span className="category-icon">{category.icon}</span>
                          <h3 className="category-name">{category.name.zh}</h3>
                          <h4 className="category-name-en">{category.name.en}</h4>
                          <p className="category-description">
                            {category.description.zh}
                          </p>
                          <span className="photo-count">
                            <i className="fas fa-images"></i> {category.photoCount} Photos
                          </span>
                        </div>
                      </div>
                    </div>
                  </Fade>
                );
              })}
            </div>
          ) : (
            <div className="photo-gallery">
              <button
                className="back-button"
                onClick={() => setSelectedCategory(null)}
              >
                <i className="fas fa-arrow-left"></i> Back to Categories
              </button>
              <h2 className="gallery-title">{selectedCategoryData?.name.zh}</h2>
              <h3 className="gallery-title-en">{selectedCategoryData?.name.en}</h3>
              <p className="gallery-description">
                {selectedCategoryData?.description.zh}
              </p>
              <div className="photos-grid">
                {selectedPhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="photo-item"
                    onClick={() => openLightbox(selectedPhotos, index)}
                  >
                    <img 
                      src={loadedImages[photo.thumbnail] || photo.thumbnail} 
                      alt={photo.title.en}
                      loading="lazy"
                    />
                    <div className="photo-overlay">
                      <h4 className="photo-title">{photo.title.zh}</h4>
                      <p className="photo-meta">
                        <i className="far fa-calendar"></i> {photo.captureDate}
                      </p>
                    </div>
                  </div>
                ))}
                {selectedPhotos.length === 0 && (
                  <div className="empty-gallery">
                    <i className="fas fa-images"></i>
                    <p>Photos coming soon...</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Enhanced Lightbox with EXIF data */}
          {lightboxOpen && currentPhotos.length > 0 && (
            <div className="lightbox" onClick={closeLightbox}>
              <button className="lightbox-close" aria-label="Close lightbox">
                <i className="fas fa-times"></i>
              </button>
              <button
                className="lightbox-prev"
                onClick={e => {
                  e.stopPropagation();
                  prevPhoto();
                }}
                aria-label="Previous photo"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              
              <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                <img
                  src={currentPhotos[lightboxIndex].url}
                  alt={currentPhotos[lightboxIndex].title.en}
                />
                <div className="lightbox-info">
                  <h3>{currentPhotos[lightboxIndex].title.zh}</h3>
                  <h4>{currentPhotos[lightboxIndex].title.en}</h4>
                  <p className="photo-description">{currentPhotos[lightboxIndex].description.zh}</p>
                  {currentPhotos[lightboxIndex].exifData && (
                    <div className="exif-data">
                      <span><i className="fas fa-camera"></i> {currentPhotos[lightboxIndex].exifData.camera}</span>
                      <span><i className="fas fa-cog"></i> {currentPhotos[lightboxIndex].exifData.settings}</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                className="lightbox-next"
                onClick={e => {
                  e.stopPropagation();
                  nextPhoto();
                }}
                aria-label="Next photo"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
              <div className="lightbox-counter">
                {lightboxIndex + 1} / {currentPhotos.length}
              </div>
            </div>
          )}
        </div>
      </div>
    </Fade>
  );
};

export default Photography;
export { photographySection };
