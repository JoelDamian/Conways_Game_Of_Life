import { useState, useEffect, useCallback } from 'react';
import './App.css';

const NUM_ROWS = 30;
const NUM_COLS = 30;

type Grid = boolean[][];

const createEmptyGrid = (): Grid =>
  Array.from({ length: NUM_ROWS }, () => Array(NUM_COLS).fill(false));

const getLiveNeighbors = (grid: Grid, x: number, y: number): number => {
  const dirs = [-1, 0, 1];
  let count = 0;

  for (const dx of dirs) {
    for (const dy of dirs) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < NUM_ROWS && ny >= 0 && ny < NUM_COLS) {
        if (grid[nx][ny]) count++;
      }
    }
  }
  return count;
};

function App() {
  const [grid, setGrid] = useState<Grid>(createEmptyGrid);
  const [running, setRunning] = useState<boolean>(false);

  const nextGen = useCallback(() => {
    setGrid((prevGrid) =>
      prevGrid.map((row, i) =>
        row.map((cell, j) => {
          const liveNeighbors = getLiveNeighbors(prevGrid, i, j);
          if (cell && (liveNeighbors === 2 || liveNeighbors === 3)) return true;
          if (!cell && liveNeighbors === 3) return true;
          return false;
        })
      )
    );
  }, []);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(nextGen, 500);
    return () => clearInterval(interval);
  }, [running, nextGen]);

  const handleToggleCell = (i: number, j: number) => {
    const newGrid = grid.map((row, rowIndex) =>
      row.map((cell, colIndex) =>
        rowIndex === i && colIndex === j ? !cell : cell
      )
    );
    setGrid(newGrid);
  };

  const resetGrid = () => {
    setGrid(createEmptyGrid());
  };

  return (
    <div className='app-container'>
      <h1>Conway's Game of Life</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${NUM_COLS}, 20px)`,
        }}
      >
        {grid.flatMap((row: boolean[], i: number) =>
          row.map((cell: boolean, j: number) => (
            <div
              key={`${i}-${j}`}
              onClick={() => handleToggleCell(i, j)}
              style={{
                width: 20,
                height: 20,
                backgroundColor: cell ? 'black' : 'white',
                border: '1px solid #ccc',
              }}
            />
          ))
        )}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
          marginTop: '16px'
        }}
      >
        <button onClick={resetGrid}>Reset</button>
        <button onClick={() => setRunning(!running)}>
          {running ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
}

export default App;
