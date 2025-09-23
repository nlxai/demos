import { useState, useCallback } from 'react';
import { useTouchpointCustomCommand } from '../contexts/TouchpointContext';
import { useTemporaryMessage } from '../hooks/useTemporaryMessage';
import { 
  COMPONENT_CONTAINER, 
  BUTTON_DANGER, 
  BUTTON_SECONDARY,
  BUTTON_SUCCESS,
  ALERT_INFO, 
  HEADING_COMPONENT, 
  TEXT_DESCRIPTION, 
  TEXT_VOICE_COMMANDS,
  GRID_COLS_3,
  COUNTER_DISPLAY,
  COUNTER_LABEL
} from '../styles/componentStyles';

const INCREMENT_ACTION = 'incrementCounter';
const DECREMENT_ACTION = 'decrementCounter';
const RESET_ACTION = 'resetCounter';
const INITIAL_COUNT = 0;
const INCREMENT_STEP = 1;
const DECREMENT_STEP = 1;
const SUCCESS_MESSAGE_INCREMENT_VOICE = 'Incremented via voice command!';
const SUCCESS_MESSAGE_DECREMENT_VOICE = 'Decremented via voice command!';
const SUCCESS_MESSAGE_RESET_VOICE = 'Counter reset via voice command!';
const SUCCESS_MESSAGE_INCREMENT_MANUAL = 'Incremented manually!';
const SUCCESS_MESSAGE_DECREMENT_MANUAL = 'Decremented manually!';
const SUCCESS_MESSAGE_RESET_MANUAL = 'Counter reset manually!';

const COUNTER_SCHEMA = {
  type: 'number',
  description: 'The amount to increment or decrement by',
  required: true
} as const;

const RESET_SCHEMA = {} as const;

export default function CounterTest() {
  const [count, setCount] = useState(INITIAL_COUNT);
  const { message, showMessage } = useTemporaryMessage();

  const handleIncrementCommand = useCallback((payload: any) => {
    console.log('Increment command received:', payload);
    
    const incrementAmount = payload || INCREMENT_STEP;
    setCount(prev => prev + incrementAmount);
    showMessage(`${SUCCESS_MESSAGE_INCREMENT_VOICE} (by ${incrementAmount})`);
  }, [showMessage]);

  const handleDecrementCommand = useCallback((payload: any) => {
    console.log('Decrement command received:', payload);
    
    const decrementAmount = payload || DECREMENT_STEP;
    setCount(prev => prev - decrementAmount);
    showMessage(`${SUCCESS_MESSAGE_DECREMENT_VOICE} (by ${decrementAmount})`);
  }, [showMessage]);

  const handleResetCommand = useCallback(() => {
    console.log('Reset command received');
    
    setCount(INITIAL_COUNT);
    showMessage(SUCCESS_MESSAGE_RESET_VOICE);
  }, [showMessage]);

  const handleManualIncrement = useCallback(() => {
    setCount(prev => prev + INCREMENT_STEP);
    showMessage(SUCCESS_MESSAGE_INCREMENT_MANUAL);
  }, [showMessage]);

  const handleManualDecrement = useCallback(() => {
    setCount(prev => prev - DECREMENT_STEP);
    showMessage(SUCCESS_MESSAGE_DECREMENT_MANUAL);
  }, [showMessage]);

  const handleManualReset = useCallback(() => {
    setCount(INITIAL_COUNT);
    showMessage(SUCCESS_MESSAGE_RESET_MANUAL);
  }, [showMessage]);

  useTouchpointCustomCommand({
    action: INCREMENT_ACTION,
    description: 'Increment the counter by a specified amount or by 1 if no amount is specified',
    schema: COUNTER_SCHEMA,
    handler: handleIncrementCommand
  });

  useTouchpointCustomCommand({
    action: DECREMENT_ACTION,
    description: 'Decrement the counter by a specified amount or by 1 if no amount is specified',
    schema: COUNTER_SCHEMA,
    handler: handleDecrementCommand
  });

  useTouchpointCustomCommand({
    action: RESET_ACTION,
    description: 'Reset the counter to zero',
    schema: RESET_SCHEMA,
    handler: handleResetCommand
  });

  return (
    <div className={COMPONENT_CONTAINER}>
      <h3 className={HEADING_COMPONENT}>
        Counter Test
      </h3>
      <p className={TEXT_DESCRIPTION}>
        <strong>Expected behavior:</strong> Control the counter using voice commands to increment, decrement, or reset.
      </p>
      
      <div className="text-center mb-6">
        <div className={COUNTER_DISPLAY}>
          {count}
        </div>
        <div className={COUNTER_LABEL}>Current Count</div>
      </div>
      
      <div className={`${GRID_COLS_3} mb-4`}>
        <button
          onClick={handleManualDecrement}
          className={BUTTON_DANGER}
        >
          - Decrement
        </button>
        <button
          onClick={handleManualReset}
          className={BUTTON_SECONDARY}
        >
          Reset
        </button>
        <button
          onClick={handleManualIncrement}
          className={BUTTON_SUCCESS}
        >
          + Increment
        </button>
      </div>
      
      {message && (
        <div className={`${ALERT_INFO} mb-4`}>
          {message}
        </div>
      )}
      
      <div className={TEXT_VOICE_COMMANDS}>
        <strong>Voice Commands:</strong> "increment counter", "decrement counter", "reset counter", "increment by 5", "decrement by 3"
      </div>
    </div>
  );
}
