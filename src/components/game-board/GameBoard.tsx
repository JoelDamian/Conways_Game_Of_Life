import { type GameBoardrops } from '../../models/grid-models';
import { Cell } from '../cell/Cell';


export const GameBoard: React.FC<GameBoardrops> = ({ grid, onToggle, numcols, cellSize = 20 }) => {

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${numcols}, ${cellSize}px)` }}>
      {grid.flatMap((row, i) =>
        row.map((cell, j) => (
          <Cell
            key={`${i}-${j}`}
            alive={cell}
            onClick={() => onToggle(i, j)}
          />
        ))
      )}
    </div>
  );
};
