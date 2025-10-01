import SectionHeader from '../components/SectionHeader';
import ButtonClickTest from '../components/ButtonClickTest';
import CounterTest from '../components/CounterTest';
import FormInputTest from '../components/FormInputTest';
import ColorChangeTest from '../components/ColorChangeTest';
import DiceRollerTest from '../components/DiceRollerTest';

const PAGE_TITLE = 'Voice Commands Test Lab';
const PAGE_SUBTITLE = 'Test and experiment with custom voice commands using useTouchpointCustomCommand. Each widget below demonstrates different voice interaction patterns.';

export default function Commands() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <SectionHeader 
        title={PAGE_TITLE}
        subtitle={PAGE_SUBTITLE}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <ButtonClickTest />
          <CounterTest />
        </div>
        
        <div className="space-y-6">
          <FormInputTest />
          <ColorChangeTest />
          <DiceRollerTest />
        </div>
      </div>

      <div className="mt-4 sm:mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-3">
          How to Use This Test Lab
        </h3>
        <div className="text-sm text-yellow-700 space-y-2">
          <p>
            <strong>1. Voice Commands:</strong> Use the microphone button in the Voice+ widget to start voice input, then speak the commands listed under each test component.
          </p>
          <p>
            <strong>2. Manual Testing:</strong> Each component also has manual buttons/inputs so you can compare voice vs manual interaction.
          </p>
          <p>
            <strong>3. Debugging:</strong> Open your browser's developer console to see detailed logs of voice command processing.
          </p>
          <p>
            <strong>4. Command Registration:</strong> Each component uses <code>useTouchpointCustomCommand</code> to register its voice handlers with the NLX Touchpoint system.
          </p>
        </div>
      </div>
    </div>
  );
}
