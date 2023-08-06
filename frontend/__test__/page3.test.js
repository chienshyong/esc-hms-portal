import React from 'react';
import { render } from '@testing-library/react';
import Page from '../../frontend_old/app/tenant/trackcases/page';

describe('Page', () => {
  it('renders the page component correctly', () => {
    // check whether the page could be render
    render(<Page />);
    
  });
});