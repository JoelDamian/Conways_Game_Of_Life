import { useState, useEffect, useCallback } from 'react';
import { NUM_COLS, REFRESH_TIME } from './config/grid-config';
import { createEmptyGrid, getLiveNeighbors } from './services/grid-service';
import { type Grid } from './models/grid-models';
import { Controls } from './components/controls/Controls';
import { GameBoard } from './components/game-board/GameBoard';
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

   const step = () => {
    nextGen();
  };

  const stepCustom = (count: number) => {
    for (let i = 0; i < count; i++) nextGen();
  };

  return (
    <div className='app-container'>
      <h1>Conway's Game of Life</h1>
      <GameBoard grid={grid} onToggle={handleToggleCell} numcols={NUM_COLS} />
      <Controls
        running={running}
        onToggleRun={() => setRunning(!running)}
        onReset={resetGrid} 
        onStep={step} 
        onCustomStep={stepCustom}/>
    </div>
  );
}

export default App;
