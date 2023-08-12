import React, { useState, useEffect } from 'react';
import './App.css';

const PictureGallery = () => {
  const initialImages = [
    {
      src: 'https://images.inc.com/uploaded_files/image/1920x1080/getty_655998316_2000149920009280219_363765.jpg',
      alt: 'Picture 1',
    },
    {
      src: 'https://assets.website-files.com/634ef78fb6faa83c8375fe5e/63783ef59d37fd25848828fe_10-books-every-leader-should-read.webp',
      alt: 'Picture 2',
    },
    {
      src: 'https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2019/09/23165047/Importance-of-Books.jpg',
      alt: 'Picture 3',
    },
  ];

  const [images, setImages] = useState([...initialImages]);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreImages = () => {
    setIsLoading(true);
    setTimeout(() => {
      setImages(prevImages => [...prevImages, ...initialImages]);
      setIsLoading(false);
    }, 1000); // Adjust the delay as needed
  };

  const handleScroll = () => {
    if (!isLoading) {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollThreshold = 200; // Adjust the threshold as needed

      if (scrollHeight - (scrollTop + windowHeight) < scrollThreshold) {
        loadMoreImages();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  return (
    <div className="picture-gallery">
      <h1>Picture Gallery</h1>
      <div className="picture-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className="picture"
          />
        ))}
      </div>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default PictureGallery;
