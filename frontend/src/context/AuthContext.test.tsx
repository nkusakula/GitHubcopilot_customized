import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../context/AuthContext';

describe('AuthContext', () => {
  it('should have initial state of not logged in', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.isAdmin).toBe(false);
  });

  it('should login with valid credentials', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    await act(async () => {
      await result.current.login('user@example.com', 'password');
    });
    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.isAdmin).toBe(false);
  });

  it('should grant admin when email ends with @github.com', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    await act(async () => {
      await result.current.login('user@github.com', 'password');
    });
    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.isAdmin).toBe(true);
  });

  it('should logout and clear auth state', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    await act(async () => {
      await result.current.login('user@example.com', 'password');
    });
    act(() => {
      result.current.logout();
    });
    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.isAdmin).toBe(false);
  });

  it('should throw when useAuth is used outside AuthProvider', () => {
    expect(() => renderHook(() => useAuth())).toThrow(
      'useAuth must be used within an AuthProvider'
    );
  });
});

describe('AuthContext - login edge cases', () => {
  beforeEach(() => {
    // each test starts with a fresh hook
  });

  it('should not login when email is empty', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    await act(async () => {
      await result.current.login('', 'password');
    });
    expect(result.current.isLoggedIn).toBe(false);
  });

  it('should not login when password is empty', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    await act(async () => {
      await result.current.login('user@example.com', '');
    });
    expect(result.current.isLoggedIn).toBe(false);
  });
});
