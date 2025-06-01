import { describe, it, expect } from 'vitest';
import { createEmptyGrid, getLiveNeighbors } from './grid-service';
import { NUM_ROWS, NUM_COLS } from '../config/grid-config';

describe('createEmptyGrid', () => {
  it('returns a grid of false values with correct dimensions', () => {
    const grid = createEmptyGrid();

    expect(grid.length).toBe(NUM_ROWS);
    expect(grid.every(row => row.length === NUM_COLS)).toBe(true);
    expect(grid.flat().every(cell => cell === false)).toBe(true);
  });
});

describe('getLiveNeighbors', () => {
  it('returns 0 for empty grid', () => {
    const grid = createEmptyGrid();
    const count = getLiveNeighbors(grid, 5, 5);
    expect(count).toBe(0);
  });

  it('counts only valid adjacent live cells', () => {
    const grid = createEmptyGrid();
    grid[4][4] = true;
    grid[5][4] = true;
    grid[6][6] = true; 
    grid[5][5] = true;

    const count = getLiveNeighbors(grid, 5, 5);
    expect(count).toBe(3);
  });

  it('does not count out-of-bound neighbors', () => {
    const grid = createEmptyGrid();
    grid[0][1] = true;
    grid[1][0] = true;

    const count = getLiveNeighbors(grid, 0, 0);
    expect(count).toBe(2);
  });
});
