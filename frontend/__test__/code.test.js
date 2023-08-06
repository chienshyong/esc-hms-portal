import { handleTenantForm } from '../../frontend_old/app/tenant/[form]/code';
import { render, screen } from '@testing-library/react';

global.fetch = jest.fn();

describe('handleTenantForm', () => {
  beforeEach(() => {
    global.fetch.mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({}),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('submits the form with correct data', async () => {
    const leaseID = 'lease_id';
    const title = 'Test Title';
    const description = 'Test Description';

    const result = await handleTenantForm(leaseID, title, description);

    // Check if fetch was called with the correct URL and request options
    expect(global.fetch).toHaveBeenCalledWith(`${process.env.api}/tenant/create-svc-request`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        leaseID: leaseID,
        title: title,
        description: description,
      }),
    });

    // Check if the form submission was successful
    expect(result).toBe(true);
  });

  test('handles form submission failure', async () => {
    // Simulate a failed API response
    const errorResponse = {
      status: 500,
      statusText: 'Internal Server Error',
    };
    global.fetch.mockResolvedValueOnce(errorResponse);

    const leaseID = 'lease_id';
    const title = 'Test Title';
    const description = 'Test Description';

    // Check if handleTenantForm throws an error when the API call fails
    await expect(handleTenantForm(leaseID, title, description)).rejects.toThrow(
      'Internal Server Error'
    );
  });
});
