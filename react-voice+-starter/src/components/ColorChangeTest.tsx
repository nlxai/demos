import { useState, useCallback } from 'react';
import { useTouchpointCustomCommand } from '../contexts/TouchpointContext';
import { useTemporaryMessage } from '../hooks/useTemporaryMessage';
import { 
  COMPONENT_CONTAINER, 
  BUTTON_SECONDARY,
  ALERT_INFO, 
  HEADING_COMPONENT, 
  TEXT_DESCRIPTION, 
  TEXT_VOICE_COMMANDS,
  GRID_COLS_3,
  COLOR_TRANSITION,
  COLOR_DEMO_AREA,
  COLOR_BUTTON_HOVER
} from '../styles/componentStyles';

const CHANGE_COLOR_ACTION = 'changeColor';
const RESET_COLOR_ACTION = 'resetColor';

const DEFAULT_BACKGROUND_COLOR = 'bg-gray-100';
const DEFAULT_TEXT_COLOR = 'text-gray-800';
const DEFAULT_COLOR_NAME = 'Default (Gray)';

const SUCCESS_MESSAGE_COLOR_VOICE = 'Color changed via voice command!';
const SUCCESS_MESSAGE_RESET_VOICE = 'Color reset via voice command!';
const SUCCESS_MESSAGE_COLOR_MANUAL = 'Color changed manually!';
const SUCCESS_MESSAGE_RESET_MANUAL = 'Color reset manually!';
const ERROR_MESSAGE_UNKNOWN_COLOR = 'Unknown color';
const AVAILABLE_COLORS_TEXT = 'Available colors:';

const COLOR_OPTIONS = [
  { name: 'red', bgClass: 'bg-red-200', textClass: 'text-red-800' },
  { name: 'blue', bgClass: 'bg-blue-200', textClass: 'text-blue-800' },
  { name: 'green', bgClass: 'bg-green-200', textClass: 'text-green-800' },
  { name: 'yellow', bgClass: 'bg-yellow-200', textClass: 'text-yellow-800' },
  { name: 'purple', bgClass: 'bg-purple-200', textClass: 'text-purple-800' },
  { name: 'pink', bgClass: 'bg-pink-200', textClass: 'text-pink-800' },
];

const CHANGE_COLOR_SCHEMA = {
  type: 'object',
  properties: {
    color: {
      type: 'string',
      minLength: 1,
      description: 'The color to change to (red, blue, green, yellow, purple, pink)',
    },
  },
  required: ['color'],
  additionalProperties: false,
} as const;

const RESET_COLOR_SCHEMA = {
  type: 'object',
  properties: {},
  additionalProperties: false,
} as const;

const findColorByName = (colorName: string) => {
  const normalizedColor = colorName.toLowerCase().trim();
  return COLOR_OPTIONS.find(option => option.name === normalizedColor);
};

export default function ColorChangeTest() {
  const [currentColor, setCurrentColor] = useState<string>('');
  const [backgroundClass, setBackgroundClass] = useState(DEFAULT_BACKGROUND_COLOR);
  const [textClass, setTextClass] = useState(DEFAULT_TEXT_COLOR);
  const { message, showMessage } = useTemporaryMessage();

  const handleChangeColorCommand = useCallback((payload: any) => {
    console.log('Change color command received:', payload);
    
    const targetColor = payload?.color || '';
    const colorOption = findColorByName(targetColor);
    
    if (!colorOption) {
      const availableColorsText = COLOR_OPTIONS.map(c => c.name).join(', ');
      showMessage(`${ERROR_MESSAGE_UNKNOWN_COLOR} "${targetColor}". ${AVAILABLE_COLORS_TEXT} ${availableColorsText}`);
      return;
    }
    
    setCurrentColor(colorOption.name);
    setBackgroundClass(colorOption.bgClass);
    setTextClass(colorOption.textClass);
    showMessage(`${SUCCESS_MESSAGE_COLOR_VOICE} (${colorOption.name})`);
  }, [showMessage]);

  const handleResetColorCommand = useCallback((payload: any) => {
    console.log('Reset color command received:', payload);
    
    setCurrentColor('');
    setBackgroundClass(DEFAULT_BACKGROUND_COLOR);
    setTextClass(DEFAULT_TEXT_COLOR);
    showMessage(SUCCESS_MESSAGE_RESET_VOICE);
  }, [showMessage]);

  const handleManualColorChange = useCallback((colorOption: typeof COLOR_OPTIONS[0]) => {
    setCurrentColor(colorOption.name);
    setBackgroundClass(colorOption.bgClass);
    setTextClass(colorOption.textClass);
    showMessage(`${SUCCESS_MESSAGE_COLOR_MANUAL} (${colorOption.name})`);
  }, [showMessage]);

  const handleManualReset = useCallback(() => {
    setCurrentColor('');
    setBackgroundClass(DEFAULT_BACKGROUND_COLOR);
    setTextClass(DEFAULT_TEXT_COLOR);
    showMessage(SUCCESS_MESSAGE_RESET_MANUAL);
  }, [showMessage]);

  useTouchpointCustomCommand({
    action: CHANGE_COLOR_ACTION,
    description: 'Change the background color to a specified color',
    schema: CHANGE_COLOR_SCHEMA,
    handler: handleChangeColorCommand
  });

  useTouchpointCustomCommand({
    action: RESET_COLOR_ACTION,
    description: 'Reset the background color to the default gray',
    schema: RESET_COLOR_SCHEMA,
    handler: handleResetColorCommand
  });

  return (
    <div className={COMPONENT_CONTAINER}>
      <h3 className={HEADING_COMPONENT}>
        Color Change Test
      </h3>
      <p className={TEXT_DESCRIPTION}>
        <strong>Expected behavior:</strong> Use voice commands to change the background color of the demo area.
      </p>
      
      <div className={`${backgroundClass} ${textClass} ${COLOR_DEMO_AREA} ${COLOR_TRANSITION}`}>
        <div className="text-2xl font-bold mb-2">
          Color Demo Area
        </div>
        <div className="text-sm">
          Current Color: {currentColor || DEFAULT_COLOR_NAME}
        </div>
      </div>
      
      <div className={`${GRID_COLS_3} gap-2 mb-4`}>
        {COLOR_OPTIONS.map((colorOption) => (
          <button
            key={colorOption.name}
            onClick={() => handleManualColorChange(colorOption)}
            className={`${colorOption.bgClass} ${colorOption.textClass} px-3 py-2 rounded font-medium text-sm ${COLOR_BUTTON_HOVER}`}
          >
            {colorOption.name}
          </button>
        ))}
      </div>
      
      <button
        onClick={handleManualReset}
        className={`w-full ${BUTTON_SECONDARY} mb-4`}
      >
        Reset to Default
      </button>
      
      {message && (
        <div className={`${ALERT_INFO} mb-4`}>
          {message}
        </div>
      )}
      
      <div className={TEXT_VOICE_COMMANDS}>
        <strong>Voice Commands:</strong> "change color to red", "change color to blue", "reset color"
      </div>
    </div>
  );
}
