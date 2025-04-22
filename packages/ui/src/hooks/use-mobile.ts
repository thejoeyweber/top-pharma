"use client"; // This hook uses browser APIs (window, matchMedia)

import * as React from "react";

const MOBILE_BREAKPOINT = 768; // Standard breakpoint for medium devices (tablets)

/**
 * @description Custom React hook to determine if the current viewport width
 * corresponds to a mobile device size (less than 768px by default).
 *
 * It listens for window resize events to update the state dynamically.
 *
 * @returns {boolean} `true` if the viewport width is less than the mobile breakpoint,
 * `false` otherwise. Returns `undefined` during server-side rendering or initial client mount
 * before the effect runs.
 *
 * @example
 * const isMobile = useIsMobile();
 * if (isMobile) {
 *   // Render mobile-specific layout
 * } else {
 *   // Render desktop layout
 * }
 */
export function useIsMobile(): boolean {
  // State to store the mobile status. Initialized to undefined for SSR safety.
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    // Ensure this runs only on the client side where `window` is available.
    if (typeof window === "undefined") {
      return;
    }

    // Media query list object to check against the breakpoint.
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // Handler function to update the state based on the media query match.
    const onChange = () => {
      setIsMobile(mql.matches);
    };

    // Add listener for changes in the media query match status.
    mql.addEventListener("change", onChange);

    // Set the initial state based on the current window width.
    setIsMobile(mql.matches);

    // Cleanup function to remove the event listener when the component unmounts.
    return () => mql.removeEventListener("change", onChange);
  }, []); // Empty dependency array ensures this effect runs only once on mount.

  // Return the boolean state, ensuring it defaults to false if still undefined.
  return isMobile ?? false;
} 