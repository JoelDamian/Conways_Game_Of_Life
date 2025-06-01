import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../../custom-components/button/Button';

describe('Button', () => {
  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick} data-testid="buttonTest">Click Me</Button>);

    fireEvent.click(screen.getByTestId('buttonTest'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
