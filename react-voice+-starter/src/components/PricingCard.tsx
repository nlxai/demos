interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  buttonText: string;
}

interface PricingCardProps {
  plan: PricingPlan;
  index: number;
  onSelect: (planName: string) => void;
}

export default function PricingCard({ plan, index, onSelect }: PricingCardProps) {
  const cardClasses = `relative bg-white rounded-xl shadow-lg p-8 ${
    plan.highlighted ? 'ring-2 ring-primary-500 scale-105' : ''
  }`;
  
  const buttonClasses = `btn w-full py-3 px-6 ${
    plan.highlighted ? 'btn-primary' : 'btn-secondary'
  }`;

  return (
    <article 
      className={cardClasses}
      role="region"
      aria-labelledby={`plan-${index}-heading`}
    >
      {plan.highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="badge-primary">Most Popular</span>
        </div>
      )}
      
      <header className="text-center mb-8">
        <h3 id={`plan-${index}-heading`} className="text-2xl font-bold text-gray-900 mb-2">
          {plan.name}
        </h3>
        <div className="mb-4">
          <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
          <span className="text-gray-600 ml-2">{plan.period}</span>
        </div>
        <p className="text-gray-600">{plan.description}</p>
      </header>

      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Features included:</h4>
        <ul role="list" className="space-y-3">
          {plan.features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-start">
              <svg 
                className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path 
                  fillRule="evenodd" 
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                  clipRule="evenodd" 
                />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => onSelect(plan.name)}
        className={buttonClasses}
        aria-describedby={`plan-${index}-description`}
      >
        {plan.buttonText}
      </button>
      <p id={`plan-${index}-description`} className="sr-only">
        Select the {plan.name} plan at {plan.price} {plan.period}
      </p>
    </article>
  );
}
