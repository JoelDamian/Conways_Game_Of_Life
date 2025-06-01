import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Cell } from './Cell';

describe('Cell', () => {
  it('renders with black background when alive is true', () => {
    render(<Cell alive={true} onClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveStyle('background-color: rgb(0, 0, 0)');
  });

  it('renders with white background when alive is false', () => {
    render(<Cell alive={false} onClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveStyle('background-color: rgb(255, 255, 255)');
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Cell alive={true} onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
