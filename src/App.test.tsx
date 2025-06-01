import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders title and components', () => {
    render(<App />);

    expect(screen.getByText(/Conway's Game of Life/i)).toBeInTheDocument();
    expect(screen.getByTestId('reset')).toBeInTheDocument();
    expect(screen.getByTestId('play')).toBeInTheDocument();
    expect(screen.getByTestId('next')).toBeInTheDocument();
    expect(screen.getByTestId('nextCustom')).toBeInTheDocument();
  });

  it('toggles a cell and resets the grid', () => {
    render(<App />);
    const cells = screen.getAllByRole('button');

    fireEvent.click(cells[0]);
    expect(cells[0]).toHaveStyle('background-color: rgb(0, 0, 0)');

    fireEvent.click(screen.getByTestId('reset'));
    expect(cells[0]).toHaveStyle('background-color: rgb(255, 255, 255)');
  });

  it('steps through a generation without crashing', () => {
    render(<App />);
    fireEvent.click(screen.getByTestId('next'));
  });

  it('steps multiple generations using custom input', () => {
    render(<App />);
    const input = screen.getByTestId('inputNext');
    fireEvent.change(input, { target: { value: '3' } });
    fireEvent.click(screen.getByTestId('nextCustom'));
  });
});
