'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function NavigationTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Mark that the SPA is active (user is navigating within the site)
    // This helps distinguish SPA navigation from full page loads
    sessionStorage.setItem('__lfp_spa_active', 'true');
    sessionStorage.setItem('__lfp_nav_timestamp', Date.now().toString());

    // Also reset the loader decision flag when navigating away from home
    // So that if user navigates home via SPA, we know not to show loader
    if (typeof window !== 'undefined' && pathname !== '/') {
      // User navigated away from home - if they come back via SPA, don't show loader
      // We set this marker to help the loader know this is SPA navigation
      window.__loaderDecided = true;
      window.__loaderPlayed = false;
    }
  }, [pathname]);

  return null;
}
