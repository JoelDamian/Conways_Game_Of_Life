import { type ControlsProps } from '../../models/grid-models';
import { Button } from '../../custom-components/button/Button';
import './Controls.css';

export const Controls: React.FC<ControlsProps> = ({
  running,
  onToggleRun,
  onReset,
  onStep,
  onCustomStep,
}) => {
  return (
    <div className='controls-contaier'>
      <Button onClick={onReset}>Reset</Button>
      <Button onClick={onToggleRun}>{running ? 'Pause' : 'Play'}</Button>
      <Button onClick={onStep}>Next</Button>
      <Button onClick={onCustomStep}>Next x10</Button>
    </div>
  );
};
