import React, { useEffect } from 'react';
import { ModalWrapper } from './ModalStyleds';

const Modal = ({ isOpen, onRequestClose, selectedImage }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onRequestClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onRequestClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <div
        onClick={onRequestClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.5)',
        }}
      ></div>
      <ModalWrapper>
        {selectedImage && (
          <img src={selectedImage.src} alt={selectedImage.alt} />
        )}
      </ModalWrapper>
    </div>
  );
};

export default Modal;
