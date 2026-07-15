import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import Navigation from './Navigation';

const renderNavigation = () =>
  render(
    <MemoryRouter>
      <AuthProvider>
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>
      </AuthProvider>
    </MemoryRouter>
  );

describe('Navigation', () => {
  it('should render the brand name', () => {
    renderNavigation();
    expect(screen.getByText('OctoCAT Supply')).toBeInTheDocument();
  });

  it('should render Home navigation link', () => {
    renderNavigation();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });

  it('should render Products navigation link', () => {
    renderNavigation();
    expect(screen.getByRole('link', { name: 'Products' })).toBeInTheDocument();
  });

  it('should render About us navigation link', () => {
    renderNavigation();
    expect(screen.getByRole('link', { name: 'About us' })).toBeInTheDocument();
  });

  it('should show Login link when user is not logged in', () => {
    renderNavigation();
    expect(screen.getByRole('link', { name: 'Login' })).toBeInTheDocument();
  });

  it('should not show Admin menu when user is not logged in', () => {
    renderNavigation();
    expect(screen.queryByText('Admin')).not.toBeInTheDocument();
  });

  it('should render the dark/light mode toggle button', () => {
    renderNavigation();
    expect(
      screen.getByRole('button', { name: 'Toggle dark/light mode' })
    ).toBeInTheDocument();
  });
});

// Helper component that logs in as admin before rendering Navigation
function AdminNavigation() {
  const { login } = useAuth();
  return (
    <button
      onClick={() => login('admin@github.com', 'password')}
      data-testid="login-trigger"
    >
      Trigger Login
    </button>
  );
}

describe('Navigation - logged-in state', () => {
  it('should show Logout button and Welcome message after login', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <ThemeProvider>
            <AdminNavigation />
            <Navigation />
          </ThemeProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    await act(async () => {
      fireEvent.click(screen.getByTestId('login-trigger'));
    });

    expect(screen.getByText(/Welcome!/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument();
  });

  it('should show Admin menu button when logged in as admin', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <ThemeProvider>
            <AdminNavigation />
            <Navigation />
          </ThemeProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    await act(async () => {
      fireEvent.click(screen.getByTestId('login-trigger'));
    });

    expect(screen.getByRole('button', { name: /Admin/i })).toBeInTheDocument();
  });
});
