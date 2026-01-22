'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// Declare global type for TypeScript
declare global {
  interface Window {
    __loaderPlayed: boolean;
    __loaderDecided: boolean;
  }
}

// Note: The loader flag is initialized by an inline script in layout.tsx
// that runs BEFORE React hydrates. This ensures HeroSection can read the
// flag synchronously during its first render.

export function InitialLoader() {
  // Track whether we've already played the loader in THIS component instance
  const hasPlayedRef = useRef(false);

  // Read the initial decision - this determines if we show on FIRST render
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === 'undefined') return false;
    const shouldShow = window.__loaderPlayed === true && window.location.pathname === '/';
    console.log('[InitialLoader] Initial state:', {
      loaderPlayed: window.__loaderPlayed,
      pathname: window.location.pathname,
      shouldShow
    });
    return shouldShow;
  });

  const [isFading, setIsFading] = useState(false);
  const [videoFadedIn, setVideoFadedIn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    console.log('[InitialLoader] useEffect running:', { pathname, isLoading, hasPlayed: hasPlayedRef.current });

    // If not on homepage, hide loader
    if (pathname !== '/') {
      console.log('[InitialLoader] Not on homepage, hiding loader');
      setIsLoading(false);
      return;
    }

    // If we're on homepage but already played the loader once, don't show again
    // This handles SPA navigation back to homepage
    if (hasPlayedRef.current && !isLoading) {
      console.log('[InitialLoader] Already played and not loading, skipping');
      return;
    }

    // Check the current flag value (might have been changed by NavigationTracker)
    if (typeof window !== 'undefined' && window.__loaderPlayed !== true) {
      console.log('[InitialLoader] window.__loaderPlayed is false, hiding loader');
      setIsLoading(false);
      return;
    }

    // If we get here and isLoading is already true, play the video
    if (!isLoading) {
      console.log('[InitialLoader] isLoading is false, skipping video setup');
      return;
    }

    console.log('[InitialLoader] Starting video playback');
    // Mark that we've played (do this before video setup to prevent re-entry)
    hasPlayedRef.current = true;

    const video = videoRef.current;
    if (!video) return;

    // Set start time to crop beginning (skip first 1.01 seconds)
    video.currentTime = 1.01;

    // Speed up playback (1.3x faster)
    video.playbackRate = 1.3;

    // Play the video
    video.play().catch((err) => {
      console.log('Video autoplay failed:', err);
    });

    // Fade in video after a brief delay
    const fadeInTimer = setTimeout(() => {
      setVideoFadedIn(true);
    }, 100);

    // Start zoom/fade animation (video runs from 1.01s to ~2.7s = 1.69s, at 1.3x speed = ~1.3s)
    const animationTimer = setTimeout(() => {
      setIsFading(true);
    }, 1300);

    // Remove loader after animation completes
    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(animationTimer);
      clearTimeout(removeTimer);
    };
  }, [pathname, isLoading]);

  if (!isLoading) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-[#FAFAF8] transition-all duration-700 ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <video
        ref={videoRef}
        className={`w-[100vw] md:w-[60vw] lg:w-[45vw] h-auto transition-all duration-700 ${
          isFading ? 'scale-110 -translate-y-32 opacity-0' : videoFadedIn ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-0 opacity-0'
        }`}
        muted
        playsInline
        preload="auto"
      >
        <source src="/content/load_animation/LFP.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
