import React, { useState } from 'react';
import axios from 'axios';
import FileUploadForm from './components/FileUploadForm/FileUploadForm';
import ImageGallery from './components/ImageGallery/ImageGallery';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const filePath = `uploadedFiles/${selectedFile.name}`;

    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:3010/process?filePath=${filePath}`);
      const imagePaths = response.data.split(',');
      setImages(imagePaths);
    } catch (error) {
      console.error('Error:', error);
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>File Upload and Processing</h1>
      <FileUploadForm onFileChange={handleFileChange} onSubmit={handleSubmit} isLoading={isLoading} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ImageGallery images={images} />
      )}
    </div>
  );
}

export default App;