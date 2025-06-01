import { useState, useEffect, useCallback } from 'react';
import { NUM_COLS, REFRESH_TIME } from './config/grid-config';
import { createEmptyGrid, getLiveNeighbors } from './services/grid-service';
import { type Grid } from './models/grid-models';
import { Cell } from './components/cell/Cell';
import { Controls } from './components/controls/Controls';
import './App.css';

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
    const interval = setInterval(nextGen, REFRESH_TIME);
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
            <Cell
              key={`${i}-${j}`}
              alive={cell}
              onClick={() => handleToggleCell(i, j)}
            />
          ))
        )}
      </div>
     <Controls
        running={running}
        onToggleRun={() => setRunning(!running)}
        onReset={resetGrid}
      />
    </div>
  );
}

export default App;
