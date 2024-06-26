import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageGallery from './ImageGallery';

describe('ImageGallery', () => {
  test('renders "No images found" when images array is empty', () => {
    render(<ImageGallery images={[]} />);
    expect(screen.getByText('No images found.')).toBeInTheDocument();
  });
});