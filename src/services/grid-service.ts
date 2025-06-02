import { type Grid } from "../models/grid-models";
import { NUM_COLS, NUM_ROWS } from "../config/grid-config";
export const createEmptyGrid = (): Grid =>
  Array.from({ length: NUM_ROWS }, () => Array(NUM_COLS).fill(false));

export const getLiveNeighbors = (
  grid: Grid,
  x: number,
  y: number,
): number => {
  const dirs = [-1, 0, 1];
  let count = 0;

  for (const dx of dirs) {
    for (const dy of dirs) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < NUM_ROWS && ny >= 0 && ny < NUM_COLS && grid[nx][ny]) {
        count++;
      }
    }
  }

  return count;
};
