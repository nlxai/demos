import { useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-nlx-white border-b border-gray-200" style={{ height: 'var(--nav-height)' }}>
      <div className="max-w-container mx-auto px-5 lg:px-10 h-full flex items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3 sm:gap-6">
            <h1 className="text-lg sm:text-h6 text-nlx-black">NLX Demo Sandbox</h1>
            <span className="hidden sm:block text-tags text-nlx-charcoal font-mono">sandbox.nlx.ai</span>
          </div>
          
          {/* Desktop Navigation - shows at 768px+ */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="https://docs.nlx.ai/platform/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-nav text-nlx-black hover:text-nlx-primary transition-colors duration-200"
            >
              Documentation
            </a>
            <a 
              href="https://nlx.ai/platform" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-nav text-nlx-black hover:text-nlx-primary transition-colors duration-200"
            >
              Platform
            </a>
            <a 
              href="https://github.com/nlxai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-nav text-nlx-black hover:text-nlx-primary transition-colors duration-200"
            >
              GitHub
            </a>
          </nav>

          {/* Mobile Menu Button - shows below 768px */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-nlx-black hover:text-nlx-primary transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation - shows below 768px */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-nlx-white border-t border-gray-200">
          <nav className="flex flex-col px-5 py-4 space-y-3">
            <a 
              href="https://docs.nlx.ai/platform/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-base text-nlx-black hover:text-nlx-primary transition-colors duration-200 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Documentation
            </a>
            <a 
              href="https://nlx.ai/platform" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-base text-nlx-black hover:text-nlx-primary transition-colors duration-200 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Platform
            </a>
            <a 
              href="https://github.com/nlxai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-base text-nlx-black hover:text-nlx-primary transition-colors duration-200 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              GitHub
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}