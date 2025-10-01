interface DemoCardProps {
  title: string
  description: string
  features: string[]
  demoUrl: string
  githubUrl?: string
  isExternal?: boolean
}

export default function DemoCard({
  title,
  description,
  features,
  demoUrl,
  githubUrl,
  isExternal = false
}: DemoCardProps) {
  const handleDemoClick = () => {
    if (isExternal) {
      window.open(demoUrl, '_blank')
    } else {
      window.location.href = demoUrl
    }
  }

  return (
    <div className="bg-nlx-white rounded-nlx shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 md:p-8 flex flex-col border border-gray-100 h-full">
      <h3 className="text-2xl md:text-h4 text-nlx-black mb-3 md:mb-4">{title}</h3>
      <p className="text-sm md:text-base text-nlx-charcoal mb-4 md:mb-6">{description}</p>
      
      <div className="mb-6 md:mb-8 flex-grow">
        <h4 className="text-sm font-medium text-nlx-black mb-2 md:mb-3">Key Features:</h4>
        <ul className="space-y-1.5 md:space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="text-nlx-primary mr-2 flex-shrink-0">•</span>
              <span className="text-xs md:text-sm text-nlx-charcoal">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="flex flex-col md:flex-row gap-2 md:gap-3">
        <button
          onClick={handleDemoClick}
          className="flex-1 inline-flex items-center justify-center min-h-[44px] md:min-h-[50px] px-4 md:px-5 bg-nlx-primary text-nlx-white rounded-full text-sm md:text-button font-primary transition-all duration-200 hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={demoUrl === '#'}
        >
          View Demo
        </button>
        
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-h-[44px] md:min-h-[50px] px-4 md:px-5 bg-transparent border border-nlx-charcoal text-nlx-charcoal rounded-full text-sm md:text-button font-primary transition-all duration-200 hover:bg-nlx-charcoal hover:text-nlx-white"
          >
            GitHub
          </a>
        )}

      </div>
    </div>
  )
}

