import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Options from '../../frontend_old/app/tenant/options'; // Only import the Options component, not the individual arrays

test('each image has the correct alt text and points to the correct destination', () => {
  render(<Options />);
  
  // Check if each image has the correct alt text
  const imageElements = screen.getAllByRole('img');
  imageElements.forEach((image, index) => {
    expect(image).toHaveAttribute('alt', `Image ${index + 1}`);
  });

  // Check if each link points to the correct destination
  const linkElements = screen.getAllByRole('link');
  expect(linkElements.length).toBe(8);

  // Import the 'options' array directly from the options.js file
  const options = [
    "lighting",
    "aircon",
    "electricity",
    "cleanliness",
    "security",
    "horticulture",
    "elevator",
    "others",
  ];

  linkElements.forEach((link, index) => {
    expect(link).toHaveAttribute('href', `/tenant/${options[index]}`);
  });
});
