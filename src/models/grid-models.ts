export type Grid = boolean[][];

export interface CellProps {
  alive: boolean;
  onClick: () => void;
}

export interface ControlsProps {
  running: boolean;
  onToggleRun: () => void;
  onReset: () => void;
}