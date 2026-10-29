import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import Footer from './Footer';

const renderFooter = () =>
  render(
    <MemoryRouter>
      <AuthProvider>
        <ThemeProvider>
          <Footer />
        </ThemeProvider>
      </AuthProvider>
    </MemoryRouter>
  );

describe('Footer', () => {
  it('should render the About section heading', () => {
    renderFooter();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('should render the Account section heading', () => {
    renderFooter();
    expect(screen.getByText('Account')).toBeInTheDocument();
  });

  it('should render the Social Media section heading', () => {
    renderFooter();
    expect(screen.getByText('Social Media')).toBeInTheDocument();
  });

  it('should render copyright notice', () => {
    renderFooter();
    expect(
      screen.getByText(/Copyright © 2025 OctoCAT Supply/i)
    ).toBeInTheDocument();
  });
});
