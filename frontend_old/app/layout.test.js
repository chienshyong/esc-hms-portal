import 'cross-fetch/polyfill';
import { render, screen } from '@testing-library/react';
import RootLayout from './layout';

// Mock the 'next/font/google' module and the 'Inter' function
jest.mock('next/font/google', () => ({
  Inter: jest.fn().mockReturnValue({ className: 'mocked-inter-class' }),
}));

describe('RootLayout', () => {
  it('renders the root layout component correctly', () => {
    // Mock the fetch function with an absolute URL
    global.fetch = jest.fn().mockResolvedValue({});

    render(<RootLayout />);
    

  });
});