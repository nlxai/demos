import { useTouchpoint } from '../contexts/TouchpointContext';
import { ConfigSource } from '../types/touchpointConfig';

export default function ConfigurationStatus() {
  const { isInitialized, configSource, currentConfig } = useTouchpoint();

  const isUsingDefaults = configSource === ConfigSource.DEFAULT;
  const maskedApiKey = currentConfig.apiKey ? 
    `${currentConfig.apiKey.slice(0, 4)}${'*'.repeat(Math.max(0, currentConfig.apiKey.length - 8))}${currentConfig.apiKey.slice(-4)}` : 
    '';
  
  const maskedAppUrl = currentConfig.appUrl ? 
    currentConfig.appUrl.replace(/\/c\/[^/]+/, '/c/***') : 
    '';

  const statusColor = isInitialized ? 'text-green-600' : 'text-red-600';
  const statusText = isInitialized ? 'Connected' : 'Disconnected';
  const statusIcon = isInitialized ? '●' : '●';

  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Configuration</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Configuration Source:</span>
          <span className={`text-sm font-semibold ${isUsingDefaults ? 'text-blue-600' : 'text-green-600'}`}>
            {isUsingDefaults ? 'Default' : 'Custom'}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Connection Status:</span>
          <span className={`text-sm font-semibold flex items-center gap-1 ${statusColor}`}>
            <span className={statusColor}>{statusIcon}</span>
            {statusText}
          </span>
        </div>
        
        <div className="border-t border-gray-200 pt-3">
          <div className="space-y-2">
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">API Key:</span>
              <p className="text-sm text-gray-700 font-mono">{maskedApiKey}</p>
            </div>
            
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">App URL:</span>
              <p className="text-sm text-gray-700 font-mono break-all">{maskedAppUrl}</p>
            </div>
            
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Language:</span>
              <p className="text-sm text-gray-700">{currentConfig.languageCode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



