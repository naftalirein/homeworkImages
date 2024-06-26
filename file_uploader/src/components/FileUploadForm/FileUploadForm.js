import React from 'react';

function FileUploadForm({ onFileChange, onSubmit, isLoading }) {
  return (
    <form onSubmit={onSubmit}>
      <input type="file" onChange={onFileChange} />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Process'}
      </button>
    </form>
  );
}

export default FileUploadForm;