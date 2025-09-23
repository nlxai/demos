interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
  }
  
  export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
      <article className="card p-6">
        <div className="text-primary-600 mb-4" aria-hidden="true">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
          {title}
        </h3>
        <p className="text-gray-600 text-center">
          {description}
        </p>
      </article>
    );
  }