/// <reference types="vite/client" />
import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { create, type TouchpointConfiguration, BidirectionalCustomCommand, type TouchpointInstance } from '@nlxai/touchpoint-ui';
import { TouchpointConfig, ConfigSource, DEFAULT_TOUCHPOINT_CONFIG } from '../types/touchpointConfig';
import { getCurrentConfig, saveCustomConfig, clearCustomConfig, isUsingCustomConfig } from '../services/touchpointConfigService';

interface TouchpointContextType {
  isInitialized: boolean;
  isListening: boolean;
  conversationId: string;
  touchpointInstance: TouchpointInstance | null;
  currentConfig: TouchpointConfig;
  configSource: ConfigSource;
  updateConfiguration: (config: TouchpointConfig) => Promise<void>;
  resetToDefaults: () => Promise<void>;
}


const TouchpointContext = createContext<TouchpointContextType | undefined>(undefined);
const TouchpointCustomCommandsCtx = createContext<
  Map<string, BidirectionalCustomCommand>
>(new Map());

interface TouchpointProps {
  children: React.ReactNode;
}

// Navigation constants
const REACT_NAVIGATE_FORWARD = 1
const REACT_NAVIGATE_BACKWARD = -1

// Navigation action enum with both type and implementation details
const NavigationAction = {
  PAGE_NEXT: 'page_next',
  PAGE_PREVIOUS: 'page_previous', 
  PAGE_CUSTOM: 'page_custom',
  PAGE_UNKNOWN: 'page_unknown'
} as const

type NavigationActionType = typeof NavigationAction[keyof typeof NavigationAction]

export const TouchpointProvider: React.FC<TouchpointProps> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isListening] = useState(false);
  const [conversationId] = useState(() => crypto.randomUUID());
  const [touchpointInstance, setTouchpointInstance] = useState<TouchpointInstance | null>(null);
  const [currentConfig, setCurrentConfig] = useState<TouchpointConfig>(() => getCurrentConfig());
  const [configSource, setConfigSource] = useState<ConfigSource>(() => 
    isUsingCustomConfig() ? ConfigSource.CUSTOM : ConfigSource.DEFAULT
  );
  const navigate = useNavigate();

  const configVersionRef = useRef(0)

  // Initialize Touchpoint
  useEffect(() => {
    let cleanup: (() => void) | undefined

    const initializeTouchpoint = async () => {
      try {
        // Clean up existing instance if it exists
        if (touchpointInstance) {
          try {
            touchpointInstance?.teardown?.()
          } catch {}
          setTouchpointInstance(null)
          setIsInitialized(false)
        }

        const headers = { 'nlx-api-key': currentConfig.apiKey }
        const touchpointConfig: TouchpointConfiguration = {
          config: {
            applicationUrl: currentConfig.appUrl,
            headers,
            languageCode: currentConfig.languageCode,
          },
          input: 'voiceMini',
          bidirectional: {
            navigation: handleNavigationCommand,
          },
        }
        
        const touchpoint = await create(touchpointConfig)

        setTouchpointInstance(touchpoint)
        setIsInitialized(true)

        cleanup = () => {
          try {
            touchpoint?.teardown?.()
            setTouchpointInstance(null)
          } catch {}
        }
      } catch (e) {
        console.error('Failed to initialize Voice Plus:', e)
        setIsInitialized(false)
      }
    }

    initializeTouchpoint()

    return () => cleanup?.()
  }, [conversationId, currentConfig])

  
  const handleNavigationCommand = (action: NavigationActionType, destinationText: string | undefined, destinationUrls: Record<string, string>) => {
    switch (action) {
      case NavigationAction.PAGE_NEXT:
        navigate(REACT_NAVIGATE_FORWARD)
        return
      case NavigationAction.PAGE_PREVIOUS:
        navigate(REACT_NAVIGATE_BACKWARD)
        return
      case NavigationAction.PAGE_CUSTOM: {
        // If we don't have any text, then we can't process
        if (destinationText === null || destinationText === undefined) {
          break;
        }
        // If the destination is a path, we can go directly there
        if (destinationText.startsWith("/")) {
          navigate(destinationText);
          break;
        }
        // Otherwise, let's pull the actual URL based on the text from NLX
        const url = destinationUrls[destinationText];
        if (url) {
          navigate(url);
          break;
        }
        // finally, parse the URL from the text and navigate if full URL
        try {
          //Parse the URL from the destination
          new URL(destinationText);
          navigate(destinationText);
        } catch (error) {
          console.log(
            `Custom page navigation action received, but no URL found for destination".`,
            destinationText,
          );
        }
        break;
      }
    case NavigationAction.PAGE_UNKNOWN: {
      console.log(
        "Unknown page navigation action received, no automatic handling available.",
      );
      break;
    }
  }
}

  // Update configuration function
  const updateConfiguration = async (newConfig: TouchpointConfig): Promise<void> => {
    try {
      saveCustomConfig(newConfig);
      setCurrentConfig(newConfig);
      setConfigSource(ConfigSource.CUSTOM);
      configVersionRef.current += 1;
    } catch (error) {
      console.error('Failed to update configuration:', error);
      throw error;
    }
  };

  // Reset to defaults function
  const resetToDefaults = async (): Promise<void> => {
    try {
      clearCustomConfig();
      setCurrentConfig(DEFAULT_TOUCHPOINT_CONFIG);
      setConfigSource(ConfigSource.DEFAULT);
      configVersionRef.current += 1;
    } catch (error) {
      console.error('Failed to reset configuration:', error);
      throw error;
    }
  };

  return (
    <TouchpointContext.Provider value={{
      isInitialized,
      isListening,
      conversationId,
      touchpointInstance,
      currentConfig,
      configSource,
      updateConfiguration,
      resetToDefaults
    }}>
      {children}
    </TouchpointContext.Provider>
  );
};


export const useTouchpointCustomCommand = (
  command: BidirectionalCustomCommand & { handler?: (payload: any) => void },
): void => {
  const commands = useContext(TouchpointCustomCommandsCtx);
  const { touchpointInstance } = useTouchpoint();
  
  useEffect(() => {
    // Register the command with NLX
    commands.set(command.action, command);
    
    if (touchpointInstance != null) {
      // This is debounced so safe to call multiple times during a single render
      touchpointInstance.setCustomBidirectionalCommands([...commands.values()]);
    }
    
    return () => {
      commands.delete(command.action);
    };
  }, [command, commands, touchpointInstance]);
};

export const useTouchpoint = () => {
  const context = useContext(TouchpointContext);
  if (!context) {
    throw new Error('useTouchpoint must be used within a TouchpointProvider');
  }
  return context;
};
