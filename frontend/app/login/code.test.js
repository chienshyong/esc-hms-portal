import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { roleHook, handleLogin } from './code';

describe('roleHook', () => {
  test('returns initial role as "tenant"', () => {
    const { result } = renderHook(() => roleHook());
    expect(result.current.role).toBe('tenant');
  });

  test('updates role when handleRole is called', () => {
    const { result } = renderHook(() => roleHook());
    const { handleRole } = result.current;
    act(() => {
      handleRole(null, 'landlord');
    });
    expect(result.current.role).toBe('landlord');
  });
});

describe('handleLogin', () => {
  test('performs tenant login successfully', async () => {
    const selectedOption = 'tenant';
    const username = 'testUser';
    const password = 'testPassword';
    const api = {
      post: jest.fn().mockResolvedValue({ data: { message: 'Login successful' } })
    };
    const navigate = jest.fn();

    await handleLogin(selectedOption, username, password, api, navigate);

    expect(api.post).toHaveBeenCalledWith('/auth/tenant-login', { username, password });
    expect(navigate).toHaveBeenCalledWith('/main');
  });

  test('performs landlord login successfully', async () => {
    const selectedOption = 'landlord';
    const username = 'testUser';
    const password = 'testPassword';
    const api = {
      post: jest.fn().mockResolvedValue({ data: { message: 'Login successful' } })
    };
    const navigate = jest.fn();

    await handleLogin(selectedOption, username, password, api, navigate);

    expect(api.post).toHaveBeenCalledWith('/auth/landlord-login', { username, password });
    expect(navigate).toHaveBeenCalledWith('/main');
  });

  test('throws an error when login fails', async () => {
    const selectedOption = 'tenant';
    const username = 'testUser';
    const password = 'testPassword';
    const errorResponse = { response: { data: { error: 'Login failed' } } };
    const api = {
      post: jest.fn().mockRejectedValue(errorResponse)
    };
    const navigate = jest.fn();

    await expect(handleLogin(selectedOption, username, password, api, navigate)).rejects.toEqual(errorResponse);
  });
});
