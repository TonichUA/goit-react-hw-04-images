import React from 'react';
import { StyledImageGalleryItem, Image } from './ImageGalleryItemStyleds';

const ImageGalleryItem = ({ id, src, alt, openModal }) => {
  const handleClick = () => {
    openModal({ id, src, alt });
  };

  return (
    <StyledImageGalleryItem className="gallery-item" onClick={handleClick}>
      <Image src={src} alt={alt} />
    </StyledImageGalleryItem>
  );
};

export { ImageGalleryItem };
