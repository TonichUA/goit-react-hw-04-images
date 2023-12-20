import React, { useState, useEffect } from 'react';
import { Bars } from 'react-loader-spinner';
import { StyledApp } from './AppStyleds';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button';
import { queryImg } from './QueryImg';
import Modal from '../components/Modal/Modal';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalHits, setTotalHits] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!query && currentPage === 1) {
      return;
    }

    const fetchImages = async () => {
      try {
        setIsLoading(true);

        const response = await queryImg(query, currentPage);

        const { hits, totalHits } = response;

        if (hits && totalHits !== undefined) {
          setImages(prevImages => [...prevImages, ...hits]);
          setTotalHits(totalHits);
        } else {
          console.error('Недійсні дані від Pixabay API:', response);
        }
      } catch (error) {
        console.error('Помилка під час отримання зображень:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, currentPage]);

  const handleSearch = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setCurrentPage(1);
  };

  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const openModal = image => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <StyledApp className="App">
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery images={images} openModal={openModal} />

      {isLoading && (
        <Bars
          type="Oval"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      )}
      {images.length > 0 && !isLoading && totalHits > images.length && (
        <Button onLoadMore={loadMore} show={true} />
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        selectedImage={selectedImage}
      />
    </StyledApp>
  );
};

export default App;
