//imports the render and screen functions from the 
//@testing-library/react library. These functions are used
// to render React components in a virtual DOM and interact with 
//the rendered components during testing

import { render, screen } from '@testing-library/react';

//imports the TenantForm component from the page.js file but actually should create a tenant form for test
import TenantForm from './TenantForm'; 



describe('TenantForm', () => {
  test('renders form title correctly', () => {

    //creates a mock params object that is passed
    // as a prop to the TenantForm component. 
    //The form property of params is set to 'Example Form'.
    const params = { form: 'Example Form' };

    //render
    render(<TenantForm params={params} />);


    const titleElement = screen.getByText('Example Form');

    //checks whether the titleElement
    // (the element with the text 'Example Form') 
    //is present in the virtual DOM. If it is, the test will pass. 
    //If it's not found, the test will fail, indicating that the form
    // title was not rendered correctly.
    expect(titleElement).toBeInTheDocument();
  });
});
