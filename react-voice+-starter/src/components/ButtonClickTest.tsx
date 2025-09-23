import { useState, useCallback } from 'react';
import { useTouchpointCustomCommand } from '../contexts/TouchpointContext';
import { useTemporaryMessage } from '../hooks/useTemporaryMessage';
import { 
  COMPONENT_CONTAINER, 
  BUTTON_PRIMARY, 
  BUTTON_FULL_WIDTH,
  ALERT_SUCCESS, 
  HEADING_COMPONENT, 
  TEXT_DESCRIPTION, 
  TEXT_VOICE_COMMANDS,
  SPACE_Y_4
} from '../styles/componentStyles';

const BUTTON_CLICK_ACTION = 'buttonClick';
const INITIAL_CLICK_COUNT = 0;
const SUCCESS_MESSAGE_VOICE = 'Button clicked via voice command!';
const SUCCESS_MESSAGE_MANUAL = 'Button clicked manually!';

const BUTTON_CLICK_SCHEMA = {};

export default function ButtonClickTest() {
  const [clickCount, setClickCount] = useState(INITIAL_CLICK_COUNT);
  const { message, showMessage } = useTemporaryMessage();

  const handleButtonClickCommand = useCallback(() => {
    console.log('Button click command received');
    
    setClickCount(prev => {
      const newCount = prev + 1;
      showMessage(`${SUCCESS_MESSAGE_VOICE} (Count: ${newCount})`);
      return newCount;
    });
  }, [showMessage]);

  const handleManualClick = useCallback(() => {
    setClickCount(prev => {
      const newCount = prev + 1;
      showMessage(`${SUCCESS_MESSAGE_MANUAL} (Count: ${newCount})`);
      return newCount;
    });
  }, [showMessage]);

  useTouchpointCustomCommand({
    action: BUTTON_CLICK_ACTION,
    description: 'Click the button',
    schema: BUTTON_CLICK_SCHEMA,
    handler: handleButtonClickCommand
  });

  return (
    <div className={COMPONENT_CONTAINER}>
      <h3 className={HEADING_COMPONENT}>
        Button Click Test
      </h3>
      <p className={TEXT_DESCRIPTION}>
        <strong>Expected behavior:</strong> Say "click the button" or "button click" to trigger the button via voice command.
      </p>
      
      <div className={SPACE_Y_4}>
        <button
          id="test-button"
          onClick={handleManualClick}
          className={`${BUTTON_PRIMARY} ${BUTTON_FULL_WIDTH}`}
        >
          Test Button (Clicks: {clickCount})
        </button>
        
        {message && (
          <div className={ALERT_SUCCESS}>
            {message}
          </div>
        )}
      </div>
      
      <div className={`mt-4 ${TEXT_VOICE_COMMANDS}`}>
        <strong>Voice Commands:</strong> "click the button", "button click", "press button"
      </div>
    </div>
  );
}
