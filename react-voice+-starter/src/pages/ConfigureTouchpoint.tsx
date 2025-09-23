import SectionHeader from '../components/SectionHeader';
import ConfigurationStatus from '../components/ConfigurationStatus';
import TouchpointConfigForm from '../components/TouchpointConfigForm';

export default function ConfigureTouchpoint() {
  return (
    <div className="max-w-4xl mx-auto">
      <SectionHeader 
        title="Configure Touchpoint"
        subtitle="Customize your Voice+ experience by providing your own NLX API credentials. Use the default configuration or add your own API key and app URL for a personalized setup."
      />

      <div className="space-y-8">
        {/* Current Configuration Status */}
        <ConfigurationStatus />

        {/* Configuration Form */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Update Configuration
          </h2>
          <TouchpointConfigForm />
        </div>
      </div>
    </div>
  );
}
