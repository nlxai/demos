export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-nlx-charcoal text-nlx-white py-8 md:py-12 mt-auto">
      <div className="max-w-container mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-10">
          <div className="text-center md:text-left">
            <h3 className="text-lg md:text-h6 mb-3 md:mb-4">Resources</h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <a href="https://docs.nlx.ai/platform/" target="_blank" rel="noopener noreferrer" className="text-sm text-nlx-offwhite-2 hover:text-nlx-white transition-colors inline-block py-1">
                  Documentation
                </a>
              </li>
              <li>
                <a href="https://docs.nlx.ai/platform/touchpoint" target="_blank" rel="noopener noreferrer" className="text-sm text-nlx-offwhite-2 hover:text-nlx-white transition-colors inline-block py-1">
                  Touchpoint Reference
                </a>
              </li>
            </ul>
          </div>
          
          <div className="text-center md:text-left">
            <h3 className="text-lg md:text-h6 mb-3 md:mb-4">Community</h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <a href="https://learning.nlx.ai/" target="_blank" rel="noopener noreferrer" className="text-sm text-nlx-offwhite-2 hover:text-nlx-white transition-colors inline-block py-1">
                  Learning Hub
                </a>
              </li>
            </ul>
          </div>
          
          <div className="text-center md:text-left">
            <h3 className="text-lg md:text-h6 mb-3 md:mb-4">Company</h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <a href="https://nlx.ai/" target="_blank" rel="noopener noreferrer" className="text-sm text-nlx-offwhite-2 hover:text-nlx-white transition-colors inline-block py-1">
                  About NLX
                </a>
              </li>
              <li>
                <a href="https://platform.nlx.ai/" target="_blank" rel="noopener noreferrer" className="text-sm text-nlx-offwhite-2 hover:text-nlx-white transition-colors inline-block py-1">
                  Platform
                </a>
              </li>
              <li>
                <a href="https://github.com/nlxai" target="_blank" rel="noopener noreferrer" className="text-sm text-nlx-offwhite-2 hover:text-nlx-white transition-colors inline-block py-1">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-nlx-offwhite-2/20 pt-6 md:pt-8 text-center">
          <p className="text-xs md:text-sm text-nlx-offwhite-2 px-4 md:px-0">© {currentYear} NLX. All rights reserved. | Built with ❤️ for the NLX developer community</p>
        </div>
      </div>
    </footer>
  )
}

