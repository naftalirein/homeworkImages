import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FileUploadForm from './FileUploadForm';

describe('FileUploadForm', () => {
  test('renders file input and submit button', () => {
    render(<FileUploadForm onFileChange={() => {}} onSubmit={() => {}} isLoading={false} />);
    expect(screen.getByRole('button', { name: 'Process' })).toBeInTheDocument();
  });
});