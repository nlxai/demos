import { NavLink } from 'react-router-dom'

export default function Navigation() {
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/contact', label: 'Contact' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/commands', label: 'Commands' },
    { path: '/configure', label: 'Configure' },
  ]

  return (
    <nav role="navigation" aria-label="Main navigation" className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink 
              to="/" 
              className="text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
              aria-label="Voice+ Introduction - Home"
            >
              Voice+ Intro
            </NavLink>
          </div>
          
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }: { isActive: boolean }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}