import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Controls } from './Controls';

describe('Controls', () => {
  const setup = () => {
    const onReset = vi.fn();
    const onToggleRun = vi.fn();
    const onStep = vi.fn();
    const onCustomStep = vi.fn();

    render(
      <Controls
        running={false}
        onReset={onReset}
        onToggleRun={onToggleRun}
        onStep={onStep}
        onCustomStep={onCustomStep}
      />
    );

    return { onReset, onToggleRun, onStep, onCustomStep };
  };

  it('calls onReset and resets input value', () => {
    const { onReset } = setup();

    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '7' } });
    expect(input.value).toBe('7');

    fireEvent.click(screen.getByText('Reset'));
    expect(onReset).toHaveBeenCalled();
    expect(input.value).toBe('0');
  });

  it('calls onToggleRun and onStep', () => {
    const { onToggleRun, onStep } = setup();

    fireEvent.click(screen.getByText('Play'));
    expect(onToggleRun).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Next'));
    expect(onStep).toHaveBeenCalled();
  });

  it('parses input and calls onCustomStep with numeric value', () => {
    const { onCustomStep } = setup();

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '5' } });

    fireEvent.click(screen.getByText('Next Custom'));
    expect(onCustomStep).toHaveBeenCalledWith(5);
  });

  it('sends 0 to onCustomStep for invalid input', () => {
    const { onCustomStep } = setup();

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'abc' } });

    fireEvent.click(screen.getByText('Next Custom'));
    expect(onCustomStep).toHaveBeenCalledWith(0);
  });
});
