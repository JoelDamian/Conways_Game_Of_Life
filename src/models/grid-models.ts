export type Grid = boolean[][];

export interface CellProps {
  alive: boolean;
  onClick: () => void;
}

export interface ControlsProps {
  running: boolean;
  onToggleRun: () => void;
  onReset: () => void;
  onStep: () => void;
  onCustomStep: (count: number) => void; 
}

export type GameBoardrops = {
  grid: boolean[][];
  onToggle: (i: number, j: number) => void;
  numcols: number;
  cellSize?: number;
};
