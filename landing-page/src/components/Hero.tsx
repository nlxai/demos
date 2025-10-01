export default function Hero() {
  return (
    <section className="bg-nlx-offwhite-1 py-16 md:py-24 lg:py-32">
      <div className="max-w-container mx-auto px-5 lg:px-10 text-center">
        <h2 className="text-h1 text-nlx-black mb-4 md:mb-6">
          Explore NLX
        </h2>
        <p className="text-lg md:text-xl text-nlx-charcoal mb-8 md:mb-10 max-w-3xl mx-auto px-4 md:px-0">
          Interactive demos showcasing the power of NLX's conversational AI platform. 
          Try voice commands, build conversations, and learn what's possible with NLX.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4 px-4 md:px-0">
          <a
            href="https://nlx.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full md:w-auto min-w-0 md:min-w-[112px] min-h-[50px] px-5 bg-nlx-primary text-nlx-white rounded-full text-button font-primary transition-all duration-200 hover:opacity-80"
          >
            Get Started Free
          </a>
          <a
            href="https://docs.nlx.ai/platform/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full md:w-auto min-w-0 md:min-w-[112px] min-h-[50px] px-5 bg-transparent border border-nlx-primary text-nlx-primary rounded-full text-button font-primary transition-all duration-200 hover:bg-nlx-primary hover:text-nlx-white"
          >
            View Documentation
          </a>
        </div>
      </div>
    </section>
  )
}

