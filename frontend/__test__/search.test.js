import { render, screen, fireEvent } from '@testing-library/react';
import SearchField from '../../frontend_old/app/landlord/trackcases/search';
import React from 'react';


describe('SearchField', () => {
  it('should handle search logic when text is entered', () => {
    render(<SearchField />);
    
    // Mock the console.log function
    console.log = jest.fn();
    
    // Find the search input field
    const searchInput = screen.getByPlaceholderText('Search...');
    
    // Enter a search query in the input field
    fireEvent.change(searchInput, { target: { value: 'example' } });
    
    // Assert that the search logic is handled correctly
    expect(console.log).toHaveBeenCalledWith('example');
  });
});