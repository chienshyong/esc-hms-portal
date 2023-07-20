const { render, screen, fireEvent } = require('@testing-library/react');
const Options = require('./options');


describe('Options', () => {
  test('renders images and links correctly', () => {
    render(Options);

    // Check if the correct number of images is rendered
    const imageElements = screen.getAllByRole('img');
    expect(imageElements.length).toBe(8); // Assuming there are 8 images based on the provided data

    // Check if the images have correct alt text
    imageElements.forEach((image, index) => {
      expect(image).toHaveAttribute('alt', `Image ${index + 1}`);
    });

    // Check if the correct number of links is rendered
    const linkElements = screen.getAllByRole('link');
    expect(linkElements.length).toBe(8); // Assuming there are 8 links based on the provided data

    // Check if each link points to the correct destination
    linkElements.forEach((link, index) => {
      expect(link).toHaveAttribute('href', `/Tenant/${options[index]}`);
    });

    // Test hover effect on each image (optional, if desired)
    // Example of how to simulate mouse hover using fireEvent
    imageElements.forEach((image, index) => {
      fireEvent.mouseEnter(image);
      expect(screen.getByRole('img')).toHaveAttribute('src', hoveredimageUrls[index]);
      fireEvent.mouseLeave(image);
      expect(screen.getByRole('img')).toHaveAttribute('src', imageUrls[index]);
    });
  });
});
