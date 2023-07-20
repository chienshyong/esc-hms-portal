import * as React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { roleHook, handleLogin } from '@/app/login/code';
import { login } from '@/utils/login';

// Mock the 'fetch' function
global.fetch = jest.fn();

// Mock the 'login' function from '@/utils/login'
jest.mock('@/utils/login', () => ({
  login: jest.fn(),
}));

describe('roleHook', () => {
  it('should initialize with the default role as "tenant"', () => {
    const { result } = renderHook(() => roleHook());
    expect(result.current.role).toBe('tenant');
  });

  it('should change the role when handleRole is called', () => {
    const { result } = renderHook(() => roleHook());
    const newRole = 'landlord';

    act(() => {
      result.current.handleRole({}, newRole);
    });

    expect(result.current.role).toBe(newRole);
  });
});

describe('handleLogin', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should login as tenant', async () => {
    const selectedOption = 'tenant';
    const username = 'testuser';
    const password = 'testpassword';
    const api = 'API URL';

    // Mock the fetch function for tenant login
    global.fetch.mockResolvedValueOnce({
      status: 200,
      json: () => Promise.resolve({ token: 'fakeToken' }),
    });

    await expect(handleLogin(selectedOption, username, password, api)).resolves.toBe(true);

    // Ensure fetch was called with the correct URL and requestOptions
    expect(fetch).toHaveBeenCalledWith(`${api}/auth/tenant-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    // Ensure 'login' function from '@/utils/login' was called with the expected token
    expect(login).toHaveBeenCalledWith({ token: 'fakeToken' });
  });

  it('should login as landlord', async () => {
    const selectedOption = 'landlord';
    const username = 'testuser';
    const password = 'testpassword';
    const api = 'API URL';

    // Mock the fetch function for landlord login
    global.fetch.mockResolvedValueOnce({
      status: 200,
      json: () => Promise.resolve({ token: 'fakeToken' }),
    });

    await expect(handleLogin(selectedOption, username, password, api)).resolves.toBe(true);

    // Ensure fetch was called with the correct URL and requestOptions
    expect(fetch).toHaveBeenCalledWith(`${api}/auth/landlord-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    // Ensure 'login' function from '@/utils/login' was called with the expected token
    expect(login).toHaveBeenCalledWith({ token: 'fakeToken' });
  });

  it('should throw an error if login fails', async () => {
    const selectedOption = 'tenant';
    const username = 'testuser';
    const password = 'testpassword';
    const api = 'API URL';

    // Mock the fetch function to return an error response
    global.fetch.mockResolvedValueOnce({
      status: 401,
      statusText: 'Unauthorized',
    });

    await expect(handleLogin(selectedOption, username, password, api)).rejects.toThrowError();

    // Ensure fetch was called with the correct URL and requestOptions
    expect(fetch).toHaveBeenCalledWith(`${api}/auth/tenant-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    // Ensure 'login' function from '@/utils/login' was not called since login failed
    expect(login).not.toHaveBeenCalled();
  });
});