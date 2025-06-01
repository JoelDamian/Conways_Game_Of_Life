import { useState} from 'react';
import './App.css';

const NUM_ROWS = 30;
const NUM_COLS = 30;

type Grid = boolean[][];

const createEmptyGrid = (): Grid =>
  Array.from({ length: NUM_ROWS }, () => Array(NUM_COLS).fill(false));

function App() {
   const [grid, setGrid] = useState<Grid>(createEmptyGrid);

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
      <button onClick={resetGrid}>
        Reset
      </button>
    </div>
  );
}

export default App;
