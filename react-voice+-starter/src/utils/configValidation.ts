import { TouchpointConfig } from '../types/touchpointConfig';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validates API key exists and is a string
 */
export const validateApiKey = (apiKey: string): ValidationResult => {
  const errors: string[] = [];
  
  if (typeof apiKey !== 'string') {
    errors.push('API key must be a string');
  } else if (!apiKey || apiKey.trim().length === 0) {
    errors.push('API key is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validates app URL contains "nlx" and is a string
 */
export const validateAppUrl = (url: string): ValidationResult => {
  const errors: string[] = [];
  
  if (typeof url !== 'string') {
    errors.push('App URL must be a string');
  } else if (!url || url.trim().length === 0) {
    errors.push('App URL is required');
  } else if (!url.toLowerCase().includes('nlx')) {
    errors.push('Domain must contain "nlx"');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validates complete touchpoint configuration
 */
export const validateConfiguration = (config: TouchpointConfig): ValidationResult => {
  const allErrors: string[] = [];
  
  const apiKeyValidation = validateApiKey(config.apiKey);
  const appUrlValidation = validateAppUrl(config.appUrl);
  
  allErrors.push(...apiKeyValidation.errors);
  allErrors.push(...appUrlValidation.errors);
  
  return {
    isValid: allErrors.length === 0,
    errors: allErrors
  };
};



