import React from 'react';

function ImageGallery({ images }) {
  return (
    <div>
      <h2>Images:</h2>
      {images.length === 0 ? (
        <p>No images found.</p>
      ) : (
        <div>
          {images.map((imagePath, index) => (
            <img
              key={index}
              src={`http://localhost:3010/${imagePath}`}
              alt=""
              style={{ maxWidth: '300px', marginBottom: '10px' }}
            />
          ))}
          <img
            key="4"
            src="images/1/cat1.jpeg"
            alt=""
            style={{ maxWidth: '300px', marginBottom: '10px' }}
          />
        </div>
      )}
    </div>
  );
}

export default ImageGallery;