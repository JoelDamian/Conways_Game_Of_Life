import { type ControlsProps } from '../../models/grid-models';
import './Controls.css';

export const Controls: React.FC<ControlsProps> = ({
  running,
  onToggleRun,
  onReset,
}) => {
  return (
    <div className='controls-contaier'>
      <button onClick={onReset}>Reset</button>
      <button onClick={onToggleRun}>{running ? 'Pause' : 'Play'}</button>
    </div>
  );
};
