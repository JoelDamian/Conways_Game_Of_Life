import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { GameBoard } from './GameBoard';

describe('GameBoard', () => {
  const grid = [
    [false, true],
    [true, false],
  ];

  it('renders all cells based on grid size', () => {
    render(<GameBoard grid={grid} onToggle={() => {}} numcols={2} />);
    const cells = screen.getAllByRole('button');
    expect(cells).toHaveLength(4);
  });

  it('calls onToggle with correct coordinates when a cell is clicked', () => {
    const onToggle = vi.fn();
    render(<GameBoard grid={grid} onToggle={onToggle} numcols={2} />);

    const cells = screen.getAllByRole('button');
    fireEvent.click(cells[2]);
    expect(onToggle).toHaveBeenCalledWith(1, 0);
  });

  it('applies correct grid column styling based on numcols and cellSize', () => {
    const { container } = render(
      <GameBoard grid={grid} onToggle={() => {}} numcols={2} cellSize={30} />
    );

    const gridDiv = container.firstChild as HTMLDivElement;
    expect(gridDiv).toHaveStyle('grid-template-columns: repeat(2, 30px)');
  });
});
