'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// Colors
const HIGHLIGHT_BLUE = 'rgba(59, 120, 198, 0.25)';
const INK_DARK = '#1A1A1A';
const MARGIN_BLUE = '#3B78C6';

// Handwritten SVG paths from /public/fonts/svg/
const ARROW1_PATH = "M996.782,249.922c-52.669,5.836-105.287,12.24-158.054,16.993-9.65.869-28.438-4.882-28.473-7.752-.196-16.346,6.776-29.506,26.599-31.531,46.451-4.747,92.765-10.844,139.222-15.516,32.749-3.293,65.618-5.612,98.483-7.471,21.794-1.233,29.04,9.961,19.125,29.074-7.906,15.24-17.025,30.432-28.369,43.188-26.776,30.109-54.677,59.283-83.371,87.57-6.203,6.115-17.658,6.902-26.693,10.143,2.312-9.956,1.87-21.991,7.497-29.443,12.514-16.573,28.066-30.852,45.731-49.628-8.66,0-12.84-1.052-16.219.15-201.126,71.572-393.187,160.312-559.897,296.805-127.538,104.421-229.004,228.714-291.439,382.741-2.382,5.876-4.622,12.806-9.156,16.541-4.831,3.978-12.312,4.739-18.636,6.904-1.505-5.717-4.785-11.667-4.074-17.093.92-7.024,4.938-13.668,7.77-20.413,81.275-193.542,216.884-341.771,386.284-461.366,145.426-102.669,306.232-175,472.385-236.463,7.495-2.772,14.995-5.528,22.493-8.292-.403-1.713-.805-3.427-1.208-5.14Z";

const ARROW2_PATH = "M908.688,623.371c-12.448-6.948-24.634-14.423-37.392-20.743-36.243-17.953-75.398-26.932-114.459-36.082-51.992-12.178-104.421-20.648-158.101-18.836-73.358,2.477-143.434,19.52-211.128,47.215-74.384,30.432-143.606,70.138-208.61,117.185-22.749,16.465-41.425,36.866-53.556,62.722-1.146,2.443-5.018,3.609-7.624,5.368.064-3.511-.124-7.054.321-10.515.168-1.305,1.784-2.436,2.769-3.622,6.69-8.054,6.603-8.465-2.749-12.609-6.107-2.706-6.887-7.111-1.601-11.871,44.496-40.075,89.012-80.03,142.377-108.62,62.816-33.654,125.785-67.158,193.681-89.441,74.632-24.494,151.782-31.888,230.026-27.502,54.934,3.079,108.995,11.9,160.652,31.354,24.226,9.123,47.318,21.258,70.916,32.045,2.103.961,4.059,2.332,6.24,3.007,1.854.574,3.935.419,5.915.587.18-2.149,1.027-4.505.433-6.413-3.893-12.506-7.654-25.082-12.281-37.325-15.076-39.889-4.7-76.226,14.748-111.485,2.708-4.91,5.909-4.827,10.119-2.228,10.445,6.448,15.97,15.623,18.86,27.712,9.504,39.753,19.141,79.793,41.759,114.558,14.823,22.784,32.289,43.845,48.452,65.766,4.716,6.396,9.286,12.931,13.438,19.7,4.16,6.784,9.349,11.512,17.661,11.989,1.786.102,3.747.2,5.277.984,2.285,1.17,4.259,2.946,6.366,4.464-2.168,1.487-4.176,3.879-6.533,4.297-8.236,1.459-13.512,5.929-15.997,13.76-1.847,5.819-5.106,7.154-10.504,4.115-2.149-1.21-4.779-2.268-7.175-2.237-36.742.474-73.482,1.159-110.222,1.755-46.781.758-92.594,9.087-138.247,18.205-12.811,2.559-23.871,2.345-33.08-7.993-3.03-3.402-4.121-6.967.207-9.783,26.193-17.044,49.662-38.631,80.356-48.199,18.159-5.661,36.278-11.452,54.404-17.222,1.195-.38,2.291-1.072,3.433-1.619.284-.813.568-1.627.853-2.44ZM860.222,658.162c.075,1.063.15,2.126.224,3.189,5.334,2.325,10.641,4.713,16.01,6.954,3.926,1.639,6.765.454,7.111-3.947.445-5.669,3.872-6.726,8.484-6.107,10.143,1.362,20.256,2.943,30.401,4.284,3.549.469,7.157.498,10.738.728.267-.722.534-1.444.801-2.166-4.052-3.314-7.976-6.799-12.185-9.901-6.213-4.579-12.838-7.038-20.843-4.458-7.517,2.423-15.314,3.966-22.94,6.07-5.972,1.647-11.871,3.56-17.803,5.354ZM989.354,667.891c-9.627-11.817-33.629-19.862-48.093-16.397,7.668,12.364,35.074,22.011,48.093,16.397ZM942.141,459.634l-3.648-.153c-.31,3.553-1.374,7.237-.785,10.635,1.691,9.76,3.577,19.542,6.353,29.033,1.335,4.565,4.593,8.685,7.533,12.59.809,1.074,3.823,1.241,5.41.67.824-.296,1.424-3.328.967-4.754-5.146-16.048-10.518-32.025-15.829-48.02ZM987.905,592.954c-3.941-11.924-6.375-24.511-15.609-34.105-1.014,3.667-.799,6.886.127,9.887.891,2.888,3.906,5.735,3.568,8.279-1.212,9.117,5.056,12.463,11.915,15.939ZM1026.472,666.941c.341-.877.682-1.754,1.024-2.631-6.363-2.774-12.727-5.548-20.286-8.843,5.35,12.735,11.078,15.771,19.262,11.474ZM833.057,673.547c4.105,3.847,7.905,7.644,13.11,1.049-4.062-3.496-7.83-7.581-13.11-1.049Z";

const STAR1_PATH = "M348.68,1111.129l6.812-18.625c-.483-1.359.242-2.551,1.797-4.926,13.556-38.41,67.586-435.789,72.328-470.793L51.922,505.547l432.772-73.094c6.392-26.271,78.883-323.492,82.258-337.574l.595-2.43,3.688-.277,1.719,2.18-.366,1.559c-.509,11.836,67.211,206.656,113.375,336.188h439.383l-343.44,203.721,198.594,382.575-367.391-274.848c-21.086,28.871-229.219,314.023-250.695,346.605-.608,1.625-1.163,2.616-1.819,3.276l-.875.845-11.04,16.856ZM77.25,507.066l358.68,105.625-.313,2.43c-2.211,16.328-50.008,369.855-68.78,457.875l4.188-6.406-.867,2.392c53.38-75.552,237.983-328.302,240.044-331.142l1.711-2.324,352.023,263.355-189.584-365.203,330.18-195.863h-422.587l-.688-1.901c-10.656-29.892-95.336-267.887-111.648-327.762-14.805,60.879-79.102,324.539-79.812,327.484l-.453,1.82-1.845.315-410.249,69.305Z";

const STAR2_PATH = "M706.161,814.083c-5.008,21.307-10.894,42.16-14.71,63.386-10.834,60.263-20.918,120.662-31.06,181.048-1.937,11.532-7.171,20.389-17.485,25.885-13.275,7.073-25.564,3.124-31.677-10.671-38.237-86.291-76.3-172.658-114.441-258.991-2.317-5.245-4.714-10.458-7.22-15.615-8.136-16.739-21.673-26.024-40.097-26.429-43.024-.944-86.064-1.138-129.097-1.693-51.028-.658-102.056-1.349-153.083-2.083-14.206-.204-23.782-7.8-26.962-21.107-2.911-12.181,1.985-21.781,14.89-28.818,107.696-58.73,215.382-117.478,323.18-176.018,5.024-2.728,6.633-5.287,5.666-11.018-10.08-59.769-20.964-119.431-29.45-179.431-8.176-57.81-13.831-115.979-20.503-174.001-1.24-10.783-2.005-21.621-3.074-32.425-1.351-13.65,3.147-22.326,14.302-27.343,11.197-5.035,22.911-3.153,31.267,6.514,27.33,31.621,54.929,63.044,81.225,95.517,53.037,65.498,101.258,134.486,145.156,206.459,3.662,6.003,6.934,6.305,13.031,4.397,103.631-32.421,207.329-64.626,311.035-96.805,19.87-6.165,37.543,7.088,34.915,27.164-.852,6.507-5.673,13.389-10.484,18.339-43.814,45.082-89.068,88.805-131.805,134.877-36.641,39.5-70.538,81.554-105.632,122.492-1.018,1.187-1.85,2.533-3.502,4.821,8.701,6.127,17.143,12.142,25.657,18.055,72.264,50.181,144.575,100.294,216.787,150.549,17.267,12.016,17.947,33.618.8,43.334-6.161,3.491-14.808,5.007-21.881,4.077-66.025-8.684-131.95-18.122-197.911-27.291-40.704-5.658-81.421-11.233-122.134-16.824-1.516-.208-3.063-.197-5.703-.353ZM620.805,969.051c.947-4.028,1.33-5.513,1.644-7.013,11.139-53.049,22.298-106.094,33.328-159.166.562-2.704.38-5.709-.097-8.462-3.729-21.524,11.556-38.155,33.287-35.228,52.096,7.017,104.132,14.471,156.196,21.727,29.216,4.072,58.439,8.101,87.658,12.149-2.222-3.546-5.08-5.848-8.087-7.937-53.658-37.267-107.33-74.513-161.007-111.753-19.494-13.524-22.266-28.441-6.831-46.667,46.996-55.492,94.374-110.662,141.93-165.674,12.81-14.818,26.78-28.631,41.131-43.875-2.402.282-3.333.249-4.174.51-68.723,21.294-137.449,42.583-206.121,64.043-2.473.773-4.808,2.923-6.539,4.991-15.134,18.079-34.712,16.769-46.662-3.481-46.754-79.23-99.106-154.582-156.274-226.6-9.186-11.573-18.725-22.865-29.665-36.192,0,3.997-.125,5.184.018,6.337,5.224,42.117,9.42,84.396,15.961,126.308,10.13,64.902,21.863,129.554,32.918,194.312,1.949,11.416-2.717,22.007-12.595,27.796-8.146,4.773-16.438,9.301-24.726,13.825-76.06,41.511-152.136,82.993-228.191,124.513-1.993,1.088-3.804,2.51-5.7,3.776,15.459,1.921,30.379,1.97,45.299,1.912,43.352-.168,86.717-1.143,130.051-.359,43.176.781,75.931,18.552,92.44,61.109,7.484,19.292,16.804,37.87,25.301,56.768,19.455,43.272,38.916,86.541,59.508,132.33Z";

// 68 curated annotations for margin notes and scattered notes
const marginAnnotations = [
  "core idea",
  "turning point",
  "everything shifts here",
  "mood change",
  "beginning of the fall",
  "no return after this",
  "omg",
  "huh??",
  "wait",
  "WHAT",
  "lol",
  "no",
  "yes",
  "yikes",
  "oof",
  "wow",
  "bruh",
  "sigh",
  "damn",
  "remember this",
  "come back to this",
  "look this up",
  "write this down",
  "use this later",
  "think about this more",
  "this matters",
  "ask why",
  "connect to earlier chapter",
  "check if this comes back",
  "this hurts",
  "why is this me",
  "uncomfortable",
  "painfully true",
  "heartbreaking",
  "beautiful",
  "cruel",
  "devastating",
  "too real",
  "I feel seen",
  "important distinction",
  "key idea",
  "thesis??",
  "this is the point",
  "circular reasoning",
  "contradiction?",
  "good metaphor",
  "bad metaphor",
  "slippery",
  "classic move",
  "foreshadowing",
  "unreliable narrator?",
  "symbolism alert",
  "classic tragic flaw",
  "echo of earlier scene",
  "biblical reference",
  "mythic energy",
  "very modern",
  "dated",
  "feels autobiographical",
  "bit much",
  "show-offy",
  "calm down",
  "trying too hard",
  "okay mate",
  "we get it",
  "subtlety died here",
  "this again",
];

// Get random annotation
const getRandomAnnotation = () => {
  return marginAnnotations[Math.floor(Math.random() * marginAnnotations.length)];
};

// Generate random angle between -10 and 10 degrees
const getRandomAngle = () => Math.floor(Math.random() * 21) - 10;

// Generate random offset for scattered positioning
const getRandomOffset = () => ({
  x: Math.floor(Math.random() * 60) - 30,
  y: Math.floor(Math.random() * 40) - 20,
});

interface AnnotationProps {
  type: 'circle' | 'underline' | 'arrow' | 'bracket' | 'star' | 'note';
  note?: string;
  color?: string;
  className?: string;
  delay?: number;
}

export function Annotation({
  type,
  note,
  color = INK_DARK,
  className = '',
  delay = 0,
}: AnnotationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            let p = 0;
            const interval = setInterval(() => {
              p += 0.03;
              setProgress(Math.min(1, p));
              if (p >= 1) clearInterval(interval);
            }, 16);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const renderAnnotation = () => {
    switch (type) {
      case 'circle':
        return (
          <svg
            className="absolute -inset-2 md:-inset-3 w-[calc(100%+16px)] h-[calc(100%+16px)] md:w-[calc(100%+24px)] md:h-[calc(100%+24px)]"
            viewBox="0 0 100 50"
            preserveAspectRatio="none"
          >
            <ellipse
              cx="50"
              cy="25"
              rx="48"
              ry="22"
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="200"
              strokeDashoffset={200 - progress * 200}
              style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
              transform="rotate(-2 50 25)"
            />
          </svg>
        );

      case 'underline':
        return (
          <svg
            className="absolute -bottom-1 left-0 w-full h-3"
            viewBox="0 0 100 12"
            preserveAspectRatio="none"
          >
            <path
              d="M0,8 Q25,4 50,8 T100,6"
              fill="none"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="120"
              strokeDashoffset={120 - progress * 120}
              style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
            />
          </svg>
        );

      case 'arrow':
        // Handwritten arrow from SVG file
        return (
          <svg
            className="absolute -right-12 md:-right-16 top-1/2 -translate-y-1/2 w-10 md:w-14 h-10 md:h-14"
            viewBox="0 0 1200 1200"
            style={{
              clipPath: `inset(0 ${100 - progress * 100}% 0 0)`,
              transition: 'clip-path 0.05s ease-out',
              transform: 'rotate(-30deg)',
            }}
          >
            <path
              d={ARROW1_PATH}
              fill={color}
            />
          </svg>
        );

      case 'bracket':
        return (
          <svg
            className="absolute -left-6 md:-left-8 top-0 w-4 md:w-6 h-full"
            viewBox="0 0 20 100"
            preserveAspectRatio="none"
          >
            <path
              d="M18,2 Q2,2 2,50 Q2,98 18,98"
              fill="none"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="200"
              strokeDashoffset={200 - progress * 200}
              style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
            />
          </svg>
        );

      case 'star':
        // Handwritten star from SVG file - randomly pick variant
        const randomStarPath = Math.random() > 0.5 ? STAR1_PATH : STAR2_PATH;
        return (
          <svg
            className="absolute -right-8 md:-right-10 -top-1 w-6 md:w-8 h-6 md:h-8"
            viewBox="0 0 1200 1200"
            style={{
              clipPath: `inset(0 ${100 - progress * 100}% 0 0)`,
              transition: 'clip-path 0.05s ease-out',
            }}
          >
            <path
              d={randomStarPath}
              fill={color}
            />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <span
      ref={ref}
      className={`relative inline-block ${className}`}
      style={{ isolation: 'isolate' }}
    >
      <span className="relative z-10">{note || ''}</span>
      {isVisible && renderAnnotation()}
    </span>
  );
}

// Wrapper component to annotate existing text
interface AnnotatedTextProps {
  children: React.ReactNode;
  annotation: 'circle' | 'underline' | 'arrow' | 'bracket' | 'star' | 'highlight';
  delay?: number;
  color?: string;
}

export function AnnotatedText({
  children,
  annotation,
  delay = 0,
  color
}: AnnotatedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [phase, setPhase] = useState<'draw-in' | 'draw-out'>('draw-in');
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  // Default color: yellow for highlight, dark ink for everything else
  const effectiveColor = color ?? (annotation === 'highlight' ? HIGHLIGHT_BLUE : INK_DARK);

  const startAnimation = useCallback((startPhase: 'draw-in' | 'draw-out' = 'draw-in') => {
    if (animationRef.current) clearInterval(animationRef.current);
    setProgress(0);
    setPhase(startPhase);
    setIsAnimating(true);
    let p = 0;
    animationRef.current = setInterval(() => {
      p += 0.04;
      setProgress(Math.min(1, p));
      if (p >= 1) {
        if (animationRef.current) clearInterval(animationRef.current);
        setIsAnimating(false);
      }
    }, 16);
  }, []);

  // Hover triggers draw-out then draw-in sequence
  const handleHover = useCallback(() => {
    if (isVisible && !isAnimating) {
      // Start draw-out phase
      if (animationRef.current) clearInterval(animationRef.current);
      setProgress(0);
      setPhase('draw-out');
      setIsAnimating(true);
      let p = 0;
      animationRef.current = setInterval(() => {
        p += 0.06; // Faster draw-out
        setProgress(Math.min(1, p));
        if (p >= 1) {
          if (animationRef.current) clearInterval(animationRef.current);
          // After draw-out completes, start draw-in
          setTimeout(() => {
            startAnimation('draw-in');
          }, 50);
        }
      }, 16);
    }
  }, [isVisible, isAnimating, startAnimation]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            startAnimation();
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (animationRef.current) clearInterval(animationRef.current);
    };
  }, [delay, startAnimation]);

  const renderSVG = () => {
    if (!isVisible) return null;

    // Calculate stroke offset based on phase
    // draw-in: starts at full offset (invisible) and goes to 0 (fully visible)
    // draw-out: starts at 0 and goes to negative (continues off the other side)
    const getOffset = (dashLength: number) => {
      if (phase === 'draw-in') {
        return dashLength - progress * dashLength; // 200 -> 0
      } else {
        return -progress * dashLength; // 0 -> -200 (continues out)
      }
    };

    switch (annotation) {
      case 'circle':
        return (
          <svg
            className="absolute -inset-1 md:-inset-2 pointer-events-none"
            style={{ width: 'calc(100% + 8px)', height: 'calc(100% + 8px)', left: '-4px', top: '-4px' }}
            viewBox="0 0 100 50"
            preserveAspectRatio="none"
          >
            <ellipse
              cx="50"
              cy="25"
              rx="47"
              ry="20"
              fill="none"
              stroke={effectiveColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="200"
              strokeDashoffset={getOffset(200)}
              transform="rotate(-1 50 25)"
            />
          </svg>
        );

      case 'underline':
        return (
          <svg
            className="absolute left-0 -bottom-1 w-full h-2 pointer-events-none"
            viewBox="0 0 100 8"
            preserveAspectRatio="none"
          >
            <path
              d="M0,5 Q30,2 50,5 T100,4"
              fill="none"
              stroke={effectiveColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="120"
              strokeDashoffset={getOffset(120)}
            />
          </svg>
        );

      case 'arrow':
        // Handwritten arrow from SVG file with clip-path animation
        const arrowClip = phase === 'draw-out'
          ? `inset(0 0 0 ${progress * 100}%)`
          : `inset(0 ${100 - progress * 100}% 0 0)`;
        return (
          <svg
            className="absolute -right-10 top-1/2 -translate-y-1/2 w-10 h-10 pointer-events-none"
            viewBox="0 0 1200 1200"
            style={{
              clipPath: arrowClip,
              transform: 'translateY(-50%) rotate(-30deg)',
            }}
          >
            <path
              d={ARROW1_PATH}
              fill={effectiveColor}
            />
          </svg>
        );

      case 'star':
        // Handwritten star from SVG file with clip-path animation - randomly pick variant
        const starClip = phase === 'draw-out'
          ? `inset(0 0 0 ${progress * 100}%)`
          : `inset(0 ${100 - progress * 100}% 0 0)`;
        const randomStarPath2 = Math.random() > 0.5 ? STAR1_PATH : STAR2_PATH;
        return (
          <svg
            className="absolute -right-8 -top-1 w-7 h-7 pointer-events-none"
            viewBox="0 0 1200 1200"
            style={{
              clipPath: starClip,
            }}
          >
            <path
              d={randomStarPath2}
              fill={effectiveColor}
            />
          </svg>
        );

      case 'highlight':
        // Highlight wipes out then wipes in
        const clipProgress = phase === 'draw-out'
          ? `inset(0 0 0 ${progress * 100}%)` // wipe out to right
          : `inset(0 ${100 - progress * 100}% 0 0)`; // wipe in from left
        return (
          <span
            className="absolute inset-0 -mx-1 pointer-events-none"
            style={{
              background: HIGHLIGHT_BLUE,
              opacity: 0.4,
              clipPath: clipProgress,
              transform: 'skewX(-3deg)',
              zIndex: -1,
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <span
      ref={ref}
      className="relative inline-block cursor-pointer"
      onMouseEnter={handleHover}
    >
      {children}
      {renderSVG()}
    </span>
  );
}

// Handwritten text animation - reveals letter by letter like pen writing
function HandwrittenTextAnimation({
  text,
  isVisible,
  letterDelay = 40,
}: {
  text: string;
  isVisible: boolean;
  letterDelay?: number;
}) {
  const letters = text.split('');

  return (
    <>
      {letters.map((letter, index) => (
        <span
          key={index}
          style={{
            display: 'inline-block',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0) rotate(0deg)' : 'translateY(8px) rotate(-5deg)',
            transition: `opacity 0.15s ease, transform 0.2s ease`,
            transitionDelay: isVisible ? `${index * letterDelay}ms` : '0ms',
            whiteSpace: letter === ' ' ? 'pre' : 'normal',
          }}
        >
          {letter}
        </span>
      ))}
    </>
  );
}

// Margin note that appears to the side - now with random angles and scattered positioning
interface MarginNoteProps {
  children?: string;
  side?: 'left' | 'right' | 'top' | 'inline';
  rotation?: number | 'random';
  delay?: number;
  offsetX?: number;
  offsetY?: number;
  className?: string;
  color?: 'dark' | 'light';
  random?: boolean;
}

export function MarginNote({
  children,
  side = 'right',
  rotation = 'random',
  delay = 0,
  offsetX,
  offsetY,
  className = '',
  color = 'dark',
  random = false,
}: MarginNoteProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [randomValues] = useState(() => ({
    angle: rotation === 'random' ? getRandomAngle() : rotation,
    offset: getRandomOffset(),
    text: random ? getRandomAnnotation() : (children || ''),
  }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const getPositionStyles = () => {
    const baseOffset = {
      x: offsetX ?? randomValues.offset.x,
      y: offsetY ?? randomValues.offset.y,
    };

    switch (side) {
      case 'left':
        return {
          right: '100%',
          marginRight: `${1 + Math.abs(baseOffset.x) / 30}rem`,
          top: `${baseOffset.y}px`,
        };
      case 'right':
        return {
          left: '100%',
          marginLeft: `${1 + Math.abs(baseOffset.x) / 30}rem`,
          top: `${baseOffset.y}px`,
        };
      case 'top':
        return {
          left: `${50 + baseOffset.x}%`,
          bottom: '100%',
          marginBottom: '0.5rem',
          transform: `translateX(-50%) rotate(${randomValues.angle}deg)`,
        };
      case 'inline':
        return {
          position: 'relative' as const,
          display: 'inline-block',
          marginLeft: '0.5rem',
          marginRight: '0.5rem',
        };
      default:
        return {
          left: '100%',
          marginLeft: '1.5rem',
          top: `${baseOffset.y}px`,
        };
    }
  };

  const posStyles = getPositionStyles();
  const textColor = color === 'light' ? '#FAFAF8' : '#3B78C6';

  return (
    <span
      ref={ref}
      className={`${side === 'inline' ? 'relative' : 'absolute'} hidden lg:inline-block whitespace-nowrap pointer-events-none z-20 ${className}`}
      style={{
        fontFamily: 'Handwriting, cursive',
        fontWeight: 'normal',
        fontSize: '1.8rem',
        lineHeight: 1.2,
        color: textColor,
        ...posStyles,
        ...(side !== 'top' && { transform: `rotate(${randomValues.angle}deg)` }),
      }}
    >
      <HandwrittenTextAnimation text={randomValues.text} isVisible={isVisible} letterDelay={45} />
    </span>
  );
}

// Scattered annotation that can appear anywhere on the page
interface ScatteredNoteProps {
  children?: string;
  x: string;
  y: string;
  rotation?: number | 'random';
  delay?: number;
  className?: string;
  color?: 'dark' | 'light';
  random?: boolean;
}

export function ScatteredNote({
  children,
  x,
  y,
  rotation = 'random',
  delay = 0,
  className = '',
  color = 'dark',
  random = false,
}: ScatteredNoteProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [randomText] = useState(() => random ? getRandomAnnotation() : (children || ''));
  const [angle] = useState(() => rotation === 'random' ? getRandomAngle() : rotation);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const textColor = color === 'light' ? '#FAFAF8' : '#3B78C6';

  return (
    <span
      ref={ref}
      className={`absolute hidden lg:block whitespace-nowrap pointer-events-none z-20 ${className}`}
      style={{
        fontFamily: 'Handwriting, cursive',
        fontWeight: 'normal',
        fontSize: '1.8rem',
        lineHeight: 1.2,
        color: textColor,
        left: x,
        top: y,
        transform: `rotate(${angle}deg)`,
      }}
    >
      <HandwrittenTextAnimation text={randomText} isVisible={isVisible} letterDelay={40} />
    </span>
  );
}

// Handwritten star decoration - using actual handwritten SVG from fonts/svg
interface HandwrittenStarProps {
  x: string;
  y: string;
  delay?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  variant?: 1 | 2;
}

export function HandwrittenStar({ x, y, delay = 0, size = 'md', color = MARGIN_BLUE, variant = 1 }: HandwrittenStarProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [angle] = useState(() => getRandomAngle());
  const sizes = { sm: 24, md: 36, lg: 48 };
  const starPath = variant === 1 ? STAR1_PATH : STAR2_PATH;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            let p = 0;
            const interval = setInterval(() => {
              p += 0.04;
              setProgress(Math.min(1, p));
              if (p >= 1) clearInterval(interval);
            }, 16);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <span
      ref={ref}
      className="absolute hidden lg:block pointer-events-none z-20"
      style={{
        left: x,
        top: y,
        transform: `rotate(${angle}deg)`,
      }}
    >
      <svg
        width={sizes[size]}
        height={sizes[size]}
        viewBox="0 0 1200 1200"
        style={{
          clipPath: `inset(0 ${100 - progress * 100}% 0 0)`,
          transition: 'clip-path 0.05s ease-out',
        }}
      >
        <path
          d={starPath}
          fill={color}
        />
      </svg>
    </span>
  );
}

// Handwritten arrow decoration - using actual handwritten SVG from fonts/svg
interface HandwrittenArrowProps {
  x: string;
  y: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  color?: string;
  variant?: 1 | 2;
  size?: 'sm' | 'md' | 'lg';
}

export function HandwrittenArrow({ x, y, direction = 'right', delay = 0, color = MARGIN_BLUE, variant = 1, size = 'md' }: HandwrittenArrowProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [angle] = useState(() => getRandomAngle() * 0.5);

  const sizes = { sm: 32, md: 48, lg: 64 };
  const arrowPath = variant === 1 ? ARROW1_PATH : ARROW2_PATH;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            let p = 0;
            const interval = setInterval(() => {
              p += 0.04;
              setProgress(Math.min(1, p));
              if (p >= 1) clearInterval(interval);
            }, 16);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  // Rotation based on direction (the original SVGs point upper-right for arrow1)
  const directionRotations = {
    right: -30,
    left: 150,
    up: -60,
    down: 120,
  };

  return (
    <span
      ref={ref}
      className="absolute hidden lg:block pointer-events-none z-20"
      style={{
        left: x,
        top: y,
        transform: `rotate(${angle + directionRotations[direction]}deg)`,
      }}
    >
      <svg
        width={sizes[size]}
        height={sizes[size]}
        viewBox="0 0 1200 1200"
        style={{
          clipPath: `inset(0 ${100 - progress * 100}% 0 0)`,
          transition: 'clip-path 0.05s ease-out',
        }}
      >
        <path
          d={arrowPath}
          fill={color}
        />
      </svg>
    </span>
  );
}

// Handwritten exclamation - actual hand-drawn SVG
interface HandwrittenExclamationProps {
  x: string;
  y: string;
  count?: 1 | 2 | 3;
  delay?: number;
  color?: string;
}

export function HandwrittenExclamation({ x, y, count = 1, delay = 0, color = MARGIN_BLUE }: HandwrittenExclamationProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [angle] = useState(() => getRandomAngle());

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  // Hand-drawn exclamation mark path
  const singleExclamation = (offset: number) => (
    <g key={offset} transform={`translate(${offset}, 0)`}>
      <path
        d="M10,3 C9.5,6 10.5,10 10,14 C9.5,18 10.5,22 10,26"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="10" cy="32" r="2" fill={color} />
    </g>
  );

  const width = count * 16 + 4;

  return (
    <span
      ref={ref}
      className="absolute hidden lg:block pointer-events-none z-20"
      style={{
        left: x,
        top: y,
        transform: `rotate(${angle}deg)`,
        opacity: isVisible ? 0.9 : 0,
        transition: 'opacity 0.5s ease',
      }}
    >
      <svg width={width} height={38} viewBox={`0 0 ${width} 38`}>
        {Array.from({ length: count }, (_, i) => singleExclamation(i * 14))}
      </svg>
    </span>
  );
}

// Handwritten question mark - actual hand-drawn SVG
interface HandwrittenQuestionProps {
  x: string;
  y: string;
  count?: 1 | 2 | 3;
  delay?: number;
  color?: string;
}

export function HandwrittenQuestion({ x, y, count = 1, delay = 0, color = MARGIN_BLUE }: HandwrittenQuestionProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [angle] = useState(() => getRandomAngle());

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  // Hand-drawn question mark path
  const singleQuestion = (offset: number) => (
    <g key={offset} transform={`translate(${offset}, 0)`}>
      <path
        d="M6,8 C5,4 8,2 12,2 C16,2 19,5 18,9 C17,13 14,14 13,18 C12.5,21 12,23 12,25"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="32" r="2" fill={color} />
    </g>
  );

  const width = count * 20 + 4;

  return (
    <span
      ref={ref}
      className="absolute hidden lg:block pointer-events-none z-20"
      style={{
        left: x,
        top: y,
        transform: `rotate(${angle}deg)`,
        opacity: isVisible ? 0.9 : 0,
        transition: 'opacity 0.5s ease',
      }}
    >
      <svg width={width} height={38} viewBox={`0 0 ${width} 38`}>
        {Array.from({ length: count }, (_, i) => singleQuestion(i * 18))}
      </svg>
    </span>
  );
}
