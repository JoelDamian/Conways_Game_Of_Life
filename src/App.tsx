import './App.css';

const NUM_ROWS = 30;
const NUM_COLS = 30;

const grid: boolean[][] = Array.from({ length: NUM_ROWS }, () =>
  Array(NUM_COLS).fill(false)
);

function App() {
  return (
    <div className='app-container'>
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
    </div>
  );
}

export default App;
