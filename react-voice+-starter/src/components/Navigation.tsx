import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const NAV_PANEL_ID = 'primary-navigation-panel'
const MENU_BUTTON_TEXT = 'Menu'
const DESKTOP_BREAKPOINT_PX = 1044
const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/contact', label: 'Contact' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/commands', label: 'Commands' },
  { path: '/tic-tac-toe', label: 'Tic-Tac-Toe' },
  { path: '/configure', label: 'Configure' },
]
const NAV_LINK_BASE_CLASSES = 'block px-4 py-3 rounded-md text-sm font-medium transition-colors'
const NAV_LINK_ACTIVE_CLASSES = 'bg-primary-100 text-primary-700'
const NAV_LINK_INACTIVE_CLASSES = 'text-gray-600 hover:text-primary-600 hover:bg-gray-50 focus:text-primary-700 focus:bg-gray-100'
const DESKTOP_NAV_CLASSES = 'flex space-x-4 xl:space-x-6'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen((previousState) => !previousState)
  }

  const closeMenu = () => {
    if (!isMenuOpen) {
      return
    }

    setIsMenuOpen(false)
  }

  const resolveNavLinkClassName = ({ isActive }: { isActive: boolean }) => {
    const currentStateClassName = isActive ? NAV_LINK_ACTIVE_CLASSES : NAV_LINK_INACTIVE_CLASSES
    const combinedClassName = `${NAV_LINK_BASE_CLASSES} ${currentStateClassName}`

    return combinedClassName
  }

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const updateViewportState = () => {
      if (typeof window === 'undefined') {
        return
      }

      const isDesktopViewport = window.innerWidth >= DESKTOP_BREAKPOINT_PX
      setIsDesktop(isDesktopViewport)
    }

    updateViewportState()
    window.addEventListener('resize', updateViewportState)

    return () => window.removeEventListener('resize', updateViewportState)
  }, [])

  useEffect(() => {
    if (!isDesktop) {
      return
    }

    setIsMenuOpen(false)
  }, [isDesktop])

  return (
    <nav role="navigation" aria-label="Main navigation" className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink
              to="/"
              className="text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
              aria-label="Voice+ Introduction - Home"
              onClick={closeMenu}
            >
              Voice+ Intro
            </NavLink>
          </div>

          {!isDesktop && (
            <div>
              <button
                type="button"
                onClick={toggleMenu}
                className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-controls={NAV_PANEL_ID}
                aria-expanded={isMenuOpen}
              >
                {MENU_BUTTON_TEXT}
              </button>
            </div>
          )}

          {isDesktop && (
            <div className={DESKTOP_NAV_CLASSES}>
              {NAV_ITEMS.map((item) => (
                <NavLink key={item.path} to={item.path} className={resolveNavLinkClassName}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </div>

      {!isDesktop && (
        <div
          id={NAV_PANEL_ID}
          className={`${isMenuOpen ? 'block' : 'hidden'} border-t border-gray-200 bg-white`}
          aria-hidden={!isMenuOpen}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 space-y-1">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.path} to={item.path} className={resolveNavLinkClassName} onClick={closeMenu}>
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}