import { useState, useCallback } from 'react';
import { useTouchpointCustomCommand } from '../contexts/TouchpointContext';
import { useTemporaryMessage } from '../hooks/useTemporaryMessage';
import { 
  COMPONENT_CONTAINER, 
  BUTTON_PRIMARY, 
  BUTTON_SUCCESS,
  BUTTON_SECONDARY,
  BUTTON_FLEX,
  ALERT_SUCCESS, 
  ALERT_INFO,
  HEADING_COMPONENT, 
  TEXT_DESCRIPTION, 
  TEXT_VOICE_COMMANDS,
  INPUT_FIELD,
  LABEL_FIELD,
  FLEX_ROW_SPACE,
  SPACE_Y_4
} from '../styles/componentStyles';

const FILL_NAME_ACTION = 'fillName';
const FILL_EMAIL_ACTION = 'fillEmail';
const CLEAR_FORM_ACTION = 'clearForm';
const SUBMIT_FORM_ACTION = 'submitForm';

const INITIAL_NAME = '';
const INITIAL_EMAIL = '';
const ERROR_MESSAGE_VALIDATION = 'Cannot submit: Please fill both name and email fields';
const SUCCESS_MESSAGE_NAME_VOICE = 'Name filled via voice command:';
const SUCCESS_MESSAGE_EMAIL_VOICE = 'Email filled via voice command:';
const SUCCESS_MESSAGE_CLEAR_VOICE = 'Form cleared via voice command!';
const SUCCESS_MESSAGE_SUBMIT_VOICE = 'Form submitted via voice command!';
const SUCCESS_MESSAGE_SUBMIT_MANUAL = 'Form submitted manually!';
const SUCCESS_MESSAGE_CLEAR_MANUAL = 'Form cleared manually!';

const FILL_NAME_SCHEMA = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 1,
      description: 'The name to fill in the name field'
    }
  },
  required: ['name'],
  additionalProperties: false
} as const;

const FILL_EMAIL_SCHEMA = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      description: 'The email address to fill in the email field'
    }
  },
  required: ['email'],
  additionalProperties: false
} as const;

const CLEAR_FORM_SCHEMA = {
  type: 'object',
  properties: {},
  additionalProperties: false
} as const;

const SUBMIT_FORM_SCHEMA = {
  type: 'object',
  properties: {},
  additionalProperties: false
} as const;

const validateFormFields = (name: string, email: string): boolean => {
  return Boolean(name && email);
};

export default function FormInputTest() {
  const [name, setName] = useState(INITIAL_NAME);
  const [email, setEmail] = useState(INITIAL_EMAIL);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { message, showMessage } = useTemporaryMessage();

  const handleFillNameCommand = useCallback((payload: any) => {
    console.log('Fill name command received:', payload);
    
    const nameValue = payload?.name || '';
    setName(nameValue);
    showMessage(`${SUCCESS_MESSAGE_NAME_VOICE} ${nameValue}`);
  }, [showMessage]);

  const handleFillEmailCommand = useCallback((payload: any) => {
    console.log('Fill email command received:', payload);
    
    const emailValue = payload?.email || '';
    setEmail(emailValue);
    showMessage(`${SUCCESS_MESSAGE_EMAIL_VOICE} ${emailValue}`);
  }, [showMessage]);

  const handleClearFormCommand = useCallback((payload: any) => {
    console.log('Clear form command received:', payload);
    
    setName(INITIAL_NAME);
    setEmail(INITIAL_EMAIL);
    setIsSubmitted(false);
    showMessage(SUCCESS_MESSAGE_CLEAR_VOICE);
  }, [showMessage]);

  const handleSubmitFormCommand = useCallback((payload: any) => {
    console.log('Submit form command received:', payload);
    
    const isValid = validateFormFields(name, email);
    if (!isValid) {
      showMessage(ERROR_MESSAGE_VALIDATION);
      return;
    }
    
    setIsSubmitted(true);
    showMessage(SUCCESS_MESSAGE_SUBMIT_VOICE);
  }, [name, email, showMessage]);

  const handleManualSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = validateFormFields(name, email);
    if (!isValid) {
      showMessage(ERROR_MESSAGE_VALIDATION);
      return;
    }
    
    setIsSubmitted(true);
    showMessage(SUCCESS_MESSAGE_SUBMIT_MANUAL);
  }, [name, email, showMessage]);

  const handleManualClear = useCallback(() => {
    setName(INITIAL_NAME);
    setEmail(INITIAL_EMAIL);
    setIsSubmitted(false);
    showMessage(SUCCESS_MESSAGE_CLEAR_MANUAL);
  }, [showMessage]);

  useTouchpointCustomCommand({
    action: FILL_NAME_ACTION,
    description: 'Fill the name field with a specified name',
    schema: FILL_NAME_SCHEMA,
    handler: handleFillNameCommand
  });

  useTouchpointCustomCommand({
    action: FILL_EMAIL_ACTION,
    description: 'Fill the email field with a specified email address',
    schema: FILL_EMAIL_SCHEMA,
    handler: handleFillEmailCommand
  });

  useTouchpointCustomCommand({
    action: CLEAR_FORM_ACTION,
    description: 'Clear all form fields',
    schema: CLEAR_FORM_SCHEMA,
    handler: handleClearFormCommand
  });

  useTouchpointCustomCommand({
    action: SUBMIT_FORM_ACTION,
    description: 'Submit the form if all required fields are filled',
    schema: SUBMIT_FORM_SCHEMA,
    handler: handleSubmitFormCommand
  });

  return (
    <div className={COMPONENT_CONTAINER}>
      <h3 className={HEADING_COMPONENT}>
        Form Input Test
      </h3>
      <p className={TEXT_DESCRIPTION}>
        <strong>Expected behavior:</strong> Use voice commands to fill form fields, clear the form, or submit it.
      </p>
      
      {isSubmitted ? (
        <div className={`${ALERT_SUCCESS} p-6 text-center`}>
          <h4 className="font-semibold mb-2">Form Submitted Successfully!</h4>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <button
            onClick={handleManualClear}
            className={`mt-4 ${BUTTON_PRIMARY}`}
          >
            Start Over
          </button>
        </div>
      ) : (
        <form onSubmit={handleManualSubmit} className={SPACE_Y_4}>
          <div>
            <label htmlFor="name" className={LABEL_FIELD}>
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className={INPUT_FIELD}
            />
          </div>
          
          <div>
            <label htmlFor="email" className={LABEL_FIELD}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={INPUT_FIELD}
            />
          </div>
          
          <div className={FLEX_ROW_SPACE}>
            <button
              type="submit"
              className={`${BUTTON_SUCCESS} ${BUTTON_FLEX}`}
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleManualClear}
              className={`${BUTTON_SECONDARY} ${BUTTON_FLEX}`}
            >
              Clear
            </button>
          </div>
        </form>
      )}
      
      {message && (
        <div className={`mt-4 ${ALERT_INFO}`}>
          {message}
        </div>
      )}
      
      <div className={`mt-4 ${TEXT_VOICE_COMMANDS}`}>
        <strong>Voice Commands:</strong> "fill name with John Doe", "fill email with john@example.com", "clear form", "submit form"
      </div>
    </div>
  );
}
