import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import About from './About';

const renderAbout = () =>
  render(
    <MemoryRouter>
      <AuthProvider>
        <ThemeProvider>
          <About />
        </ThemeProvider>
      </AuthProvider>
    </MemoryRouter>
  );

describe('About', () => {
  it('should render the main heading', () => {
    renderAbout();
    expect(screen.getByText('About OctoCAT Supply')).toBeInTheDocument();
  });

  it('should render the mission section heading', () => {
    renderAbout();
    expect(screen.getByText('Our Meow-ssion')).toBeInTheDocument();
  });

  it('should render the purpose section heading', () => {
    renderAbout();
    expect(screen.getByText('Our Purr-pose')).toBeInTheDocument();
  });

  it('should render the key features heading', () => {
    renderAbout();
    expect(screen.getByText('Key Features of Our Products')).toBeInTheDocument();
  });

  it('should list AI-powered behavior analysis as a feature', () => {
    renderAbout();
    expect(
      screen.getByText(/AI-powered behavior analysis and personalization/i)
    ).toBeInTheDocument();
  });
});
