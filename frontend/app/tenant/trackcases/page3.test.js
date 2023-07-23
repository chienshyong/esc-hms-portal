import React from 'react';
import { render } from '@testing-library/react';
import Page from './page';

describe('Page', () => {
  it('renders the page component correctly', () => {
    // check whether the page could be render
    render(<Page />);
    
  });
});