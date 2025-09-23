import { useState, useEffect } from 'react';
import { useTouchpoint } from '../contexts/TouchpointContext';
import { TouchpointConfig, DEFAULT_TOUCHPOINT_CONFIG } from '../types/touchpointConfig';
import { validateConfiguration, ValidationResult } from '../utils/configValidation';
import { useTemporaryMessage } from '../hooks/useTemporaryMessage';
import FormField from './FormField';

const INITIAL_FORM_STATE: TouchpointConfig = {
  apiKey: '',
  appUrl: '',
  languageCode: DEFAULT_TOUCHPOINT_CONFIG.languageCode,
};

export default function TouchpointConfigForm() {
  const { currentConfig, updateConfiguration, resetToDefaults } = useTouchpoint();
  const { message, showMessage } = useTemporaryMessage();
  
  const [formData, setFormData] = useState<TouchpointConfig>(INITIAL_FORM_STATE);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Initialize form with current config
  useEffect(() => {
    setFormData(currentConfig);
  }, [currentConfig]);

  const updateFormField = (field: keyof TouchpointConfig) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const validateForm = (): ValidationResult => {
    const trimmedConfig: TouchpointConfig = {
      apiKey: formData.apiKey.trim(),
      appUrl: formData.appUrl.trim(),
      languageCode: formData.languageCode.trim(),
    };
    
    return validateConfiguration(trimmedConfig);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateForm();
    
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setValidationErrors([]);

    try {
      const trimmedConfig: TouchpointConfig = {
        apiKey: formData.apiKey.trim(),
        appUrl: formData.appUrl.trim(),
        languageCode: formData.languageCode.trim(),
      };

      await updateConfiguration(trimmedConfig);
      showMessage('Configuration updated successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update configuration';
      showMessage(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = async () => {
    setIsResetting(true);
    setValidationErrors([]);

    try {
      await resetToDefaults();
      showMessage('Configuration reset to defaults successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to reset configuration';
      showMessage(`Error: ${errorMessage}`);
    } finally {
      setIsResetting(false);
    }
  };

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(currentConfig);

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          id="apiKey"
          name="apiKey"
          label="API Key"
          type="text"
          value={formData.apiKey}
          onChange={updateFormField('apiKey')}
        />

        <FormField
          id="appUrl"
          name="appUrl"
          label="App URL"
          type="text"
          value={formData.appUrl}
          onChange={updateFormField('appUrl')}
        />

        <FormField
          id="languageCode"
          name="languageCode"
          label="Language Code"
          type="text"
          value={formData.languageCode}
          onChange={updateFormField('languageCode')}
        />

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-red-400">⚠</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Please correct the following errors:
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <ul className="list-disc list-inside space-y-1">
                    {validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success/Error Messages */}
        {message && (
          <div className={`p-4 rounded-md ${
            message.startsWith('Error:') 
              ? 'bg-red-50 border border-red-200 text-red-700' 
              : 'bg-green-50 border border-green-200 text-green-700'
          }`}>
            {message}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={isSubmitting || !hasChanges}
            className="btn btn-primary flex-1 py-3 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Updating...' : 'Update Configuration'}
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            disabled={isResetting}
            className="btn btn-secondary flex-1 py-3 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isResetting ? 'Resetting...' : 'Reset to Defaults'}
          </button>
        </div>
      </form>
    </div>
  );
}



