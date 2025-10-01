import SectionHeader from '../components/SectionHeader';
import FeatureCard from '../components/FeatureCard';
import StepItem from '../components/StepItem';
import MicrophoneIcon from '../components/icons/MicrophoneIcon';
import LightningIcon from '../components/icons/LightningIcon';
import ShieldIcon from '../components/icons/ShieldIcon';

const FEATURES = [
  {
    icon: <MicrophoneIcon className="w-12 h-12 mx-auto" />,
    title: "Natural Speech",
    description: "Speak naturally and be understood. Our advanced speech recognition adapts to your voice and speaking style."
  },
  {
    icon: <LightningIcon className="w-12 h-12 mx-auto" />,
    title: "Real-time Response", 
    description: "Get instant, intelligent responses powered by cutting-edge AI technology with minimal latency."
  },
  {
    icon: <ShieldIcon className="w-12 h-12 mx-auto" />,
    title: "Secure & Private",
    description: "Your conversations are protected with enterprise-grade security and privacy controls."
  }
];

const HOW_IT_WORKS_STEPS = [
  {
    title: "Click the Voice Button",
    description: "Look for the voice interface button in the bottom-right corner of your screen and click to activate."
  },
  {
    title: "Start Speaking", 
    description: "Begin your conversation naturally. Ask questions, make requests, or simply have a dialogue."
  },
  {
    title: "Receive Intelligent Responses",
    description: "Get immediate, contextual responses that understand your intent and provide helpful information."
  }
];

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <SectionHeader 
        title="Welcome to Voice+"
        subtitle="Experience the future of conversational AI with bidirectional voice interactions. Speak naturally and get intelligent responses in real-time."
      />

      <section role="region" aria-labelledby="features-heading" className="mb-16">
        <h2 id="features-heading" className="text-3xl font-semibold text-gray-900 text-center mb-8">
          Key Features
        </h2>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>

      <section role="region" aria-labelledby="how-it-works-heading" className="mb-16">
        <h2 id="how-it-works-heading" className="text-3xl font-semibold text-gray-900 text-center mb-8">
          How It Works
        </h2>
        
        <div className="card p-6 sm:p-8">
          <ol className="space-y-4 sm:space-y-6">
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <StepItem
                key={index}
                stepNumber={index + 1}
                title={step.title}
                description={step.description}
              />
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}