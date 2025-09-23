import { TouchpointConfig, DEFAULT_TOUCHPOINT_CONFIG } from '../types/touchpointConfig';

// Local storage key for touchpoint configuration
const LOCAL_STORAGE_KEY = 'voice_plus_touchpoint_config';

/**
 * Saves custom touchpoint configuration to local storage
 */
export const saveCustomConfig = (config: TouchpointConfig): void => {
  try {
    const configJson = JSON.stringify(config);
    localStorage.setItem(LOCAL_STORAGE_KEY, configJson);
  } catch (error) {
    console.error('Failed to save custom touchpoint configuration:', error);
    throw new Error('Unable to save configuration to local storage');
  }
};

/**
 * Retrieves custom touchpoint configuration from local storage
 * Returns null if no custom configuration exists or if there's an error
 */
export const getCustomConfig = (): TouchpointConfig | null => {
  try {
    const configJson = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!configJson) {
      return null;
    }
    
    const parsedConfig = JSON.parse(configJson);
    
    // Validate that the parsed config has required properties
    if (!parsedConfig.apiKey || !parsedConfig.appUrl || !parsedConfig.languageCode) {
      console.warn('Invalid custom configuration found, clearing...');
      clearCustomConfig();
      return null;
    }
    
    return parsedConfig as TouchpointConfig;
  } catch (error) {
    console.error('Failed to retrieve custom touchpoint configuration:', error);
    clearCustomConfig(); // Clear corrupted data
    return null;
  }
};

/**
 * Clears custom touchpoint configuration from local storage
 */
export const clearCustomConfig = (): void => {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear custom touchpoint configuration:', error);
  }
};

/**
 * Gets the current touchpoint configuration
 * Returns custom config if available, otherwise returns default config
 */
export const getCurrentConfig = (): TouchpointConfig => {
  const customConfig = getCustomConfig();
  return customConfig || DEFAULT_TOUCHPOINT_CONFIG;
};

/**
 * Checks if custom configuration is currently being used
 */
export const isUsingCustomConfig = (): boolean => {
  return getCustomConfig() !== null;
};



