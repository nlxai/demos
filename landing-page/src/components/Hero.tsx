export default function Hero() {
  return (
    <section 
      className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[650px] flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #D97F3E 0%, #B85A3F 50%, #7A3A3E 100%)'
      }}
    >
      {/* Full-width background image */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url("/images/homepage-hero-img1.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.15
        }}
      />
      
      {/* Gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40" />
      
      {/* Content container */}
      <div className="relative w-full max-w-container mx-auto px-5 lg:px-10 py-12 md:py-16 lg:py-20 text-center z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-6 md:mb-8">
          Explore NLX Demo Sandbox
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-12 max-w-4xl mx-auto px-4 md:px-0">
          Interactive demos showcasing the power of NLX's conversational AI platform. 
          Try voice commands, build conversations, and learn what's possible with NLX.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 px-4 md:px-0">
          <a
            href="https://nlx.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full md:w-auto min-w-0 md:min-w-[160px] min-h-[50px] md:min-h-[56px] px-6 md:px-8 bg-nlx-primary text-white rounded-full text-base md:text-button font-medium transition-all duration-200 hover:bg-blue-600 hover:shadow-lg"
          >
            Get Started Free
          </a>
          <a
            href="https://docs.nlx.ai/platform/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full md:w-auto min-w-0 md:min-w-[160px] min-h-[50px] md:min-h-[56px] px-6 md:px-8 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-full text-base md:text-button font-medium transition-all duration-200 hover:bg-white hover:text-nlx-primary hover:shadow-lg"
          >
            View Documentation
          </a>
        </div>
      </div>
    </section>
  )
}

