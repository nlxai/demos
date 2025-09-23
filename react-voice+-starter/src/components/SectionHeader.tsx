interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({ 
  title, 
  subtitle, 
  centered = true,
  className = ''
}: SectionHeaderProps) {
  const alignmentClass = centered ? 'text-center' : '';
  const subtitleMaxWidth = centered ? 'max-w-2xl mx-auto' : '';
  
  return (
    <header className={`mb-12 ${alignmentClass} ${className}`}>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className={`text-xl text-gray-600 ${subtitleMaxWidth}`}>
          {subtitle}
        </p>
      )}
    </header>
  );
}
