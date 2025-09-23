interface StepItemProps {
  stepNumber: number;
  title: string;
  description: string;
}

export default function StepItem({ stepNumber, title, description }: StepItemProps) {
  return (
    <li className="flex items-start">
      <span 
        className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4" 
        aria-hidden="true"
      >
        {stepNumber}
      </span>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600">
          {description}
        </p>
      </div>
    </li>
  );
}
