import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import Login from './Login';

const renderLogin = (initialEntries = ['/login']) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <AuthProvider>
        <ThemeProvider>
          <Login />
        </ThemeProvider>
      </AuthProvider>
    </MemoryRouter>
  );

describe('Login', () => {
  it('should render the Login heading', () => {
    renderLogin();
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  });

  it('should render the email input', () => {
    renderLogin();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
  });

  it('should render the password input', () => {
    renderLogin();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('should render the submit button', () => {
    renderLogin();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('should update email field when typed into', () => {
    renderLogin();
    const emailInput = screen.getByLabelText('Email Address');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('should update password field when typed into', () => {
    renderLogin();
    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'secret123' } });
    expect(passwordInput).toHaveValue('secret123');
  });

  it('should not show error message when there is no error', () => {
    renderLogin();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('should display error message from URL search params as plain text', () => {
    renderLogin(['/login?error=Invalid+credentials']);
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });

  it('should render error as plain text and not execute HTML from URL params', () => {
    renderLogin(['/login?error=%3Cscript%3Ealert(1)%3C%2Fscript%3E']);
    // The error message should appear as escaped text, not as a script element
    expect(screen.queryByText('', { selector: 'script' })).not.toBeInTheDocument();
    expect(screen.getByText('<script>alert(1)</script>')).toBeInTheDocument();
  });
});
