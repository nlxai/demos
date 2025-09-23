// Touchpoint configuration types and constants

export interface TouchpointConfig {
  apiKey: string;
  appUrl: string;
  languageCode: string;
}

export enum ConfigSource {
  DEFAULT = 'default',
  CUSTOM = 'custom'
}

// Default configuration constants
export const DEFAULT_NLX_APP_URL = '';
export const DEFAULT_NLX_APP_API_KEY = '';
export const DEFAULT_LANGUAGE_CODE = 'en-US';

export const DEFAULT_TOUCHPOINT_CONFIG: TouchpointConfig = {
  apiKey: DEFAULT_NLX_APP_API_KEY,
  appUrl: DEFAULT_NLX_APP_URL,
  languageCode: DEFAULT_LANGUAGE_CODE,
};



