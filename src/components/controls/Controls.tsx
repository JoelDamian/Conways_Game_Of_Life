import { useState } from 'react';
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
    const [stepCount, setStepCount] = useState<string>("0");

    const handleClickCustom = () => {
      const parsedInput = parseInt(stepCount) || 0;
      onCustomStep(parsedInput);
    }

    const handleReset = () => {
      setStepCount("0");
      onReset();
    }

  return (
    <div className='controls-contaier'>
      <Button onClick={handleReset} data-testid="reset">Reset</Button>
      <Button onClick={onToggleRun} data-testid="play">{running ? 'Pause' : 'Play'}</Button>
      <Button onClick={onStep} data-testid="next">Next</Button>
       <input
        type='string'
        value={stepCount}
        onChange={(e) => setStepCount(e.target.value)}
        style={{ width: 60, marginLeft: 8 }}
        data-testid="inputNext"
      />
      <Button onClick={handleClickCustom} data-testid="nextCustom">Next Custom</Button>
    </div>
  );
};
