import React, { Component } from "react";
import "./Photography.scss";
import { photographySection } from "../../portfolio";
import { Fade } from "react-reveal";

class Photography extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: null,
      lightboxOpen: false,
      lightboxIndex: 0
    };
  }

  openLightbox = (photos, index) => {
    this.setState({
      lightboxOpen: true,
      lightboxIndex: index,
      currentPhotos: photos
    });
  };

  closeLightbox = () => {
    this.setState({ lightboxOpen: false });
  };

  nextPhoto = () => {
    const { lightboxIndex, currentPhotos } = this.state;
    this.setState({
      lightboxIndex: (lightboxIndex + 1) % currentPhotos.length
    });
  };

  prevPhoto = () => {
    const { lightboxIndex, currentPhotos } = this.state;
    this.setState({
      lightboxIndex:
        (lightboxIndex - 1 + currentPhotos.length) % currentPhotos.length
    });
  };

  render() {
    if (!photographySection.display) {
      return null;
    }

    const { selectedCategory, lightboxOpen, lightboxIndex, currentPhotos } =
      this.state;

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
                {photographySection.categories.map((category, i) => {
                  return (
                    <Fade key={i} bottom duration={2000} distance="40px">
                      <div
                        className="category-card"
                        onClick={() =>
                          this.setState({ selectedCategory: category })
                        }
                      >
                        <div className="category-image-container">
                          <img
                            src={category.coverImage}
                            alt={category.name}
                            className="category-cover"
                          />
                          <div className="category-overlay">
                            <h3 className="category-name">{category.name}</h3>
                            <p className="category-description">
                              {category.description}
                            </p>
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
                  onClick={() => this.setState({ selectedCategory: null })}
                >
                  <i className="fas fa-arrow-left"></i> Back to Categories
                </button>
                <h2 className="gallery-title">{selectedCategory.name}</h2>
                <p className="gallery-description">
                  {selectedCategory.description}
                </p>
                <div className="photos-grid">
                  {selectedCategory.photos.map((photo, index) => (
                    <div
                      key={index}
                      className="photo-item"
                      onClick={() =>
                        this.openLightbox(selectedCategory.photos, index)
                      }
                    >
                      <img src={photo} alt={`${selectedCategory.name} ${index + 1}`} />
                    </div>
                  ))}
                  {selectedCategory.photos.length === 0 && (
                    <div className="empty-gallery">
                      <i className="fas fa-images"></i>
                      <p>Photos coming soon...</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Lightbox */}
            {lightboxOpen && currentPhotos && (
              <div className="lightbox" onClick={this.closeLightbox}>
                <button className="lightbox-close">
                  <i className="fas fa-times"></i>
                </button>
                <button
                  className="lightbox-prev"
                  onClick={e => {
                    e.stopPropagation();
                    this.prevPhoto();
                  }}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <img
                  src={currentPhotos[lightboxIndex]}
                  alt={`${selectedCategory} ${lightboxIndex + 1}`}
                  onClick={e => e.stopPropagation()}
                />
                <button
                  className="lightbox-next"
                  onClick={e => {
                    e.stopPropagation();
                    this.nextPhoto();
                  }}
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
  }
}

export default Photography;
