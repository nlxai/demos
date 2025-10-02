import { useState, useEffect } from "react";

/**
 * Custom hook for handling media queries
 * @param query - The media query string (e.g., "(max-width: 768px)")
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add event listener
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}

/**
 * Predefined media query hooks for breakpoints used in the project
 * Matching NLX payload project breakpoints exactly
 */
export const useIsMobile = () => useMediaQuery("(max-width: 767px)");
export const useIsTablet = () =>
  useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
export const useIsSmallScreen = () => useMediaQuery("(max-width: 480px)");
export const useIsMediumScreen = () =>
  useMediaQuery("(min-width: 481px) and (max-width: 768px)");
export const useIsLargeScreen = () => useMediaQuery("(min-width: 768px)");
