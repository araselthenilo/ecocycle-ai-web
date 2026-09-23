import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal Component
 * Provides silky smooth, GPU-accelerated "gentle landing" fade-in animations on scroll.
 * 
 * @param {React.ReactNode} children - Elements to animate
 * @param {number} delay - Transition delay in milliseconds (useful for stagger)
 * @param {'up'|'down'|'left'|'right'|'scale'|'fade'} direction - Direction of movement
 * @param {number} distance - Movement distance in pixels (default 30)
 * @param {number} duration - Animation duration in milliseconds (default 750)
 * @param {string} easing - CSS easing function (default gentle landing cubic-bezier)
 * @param {number} threshold - Intersection observer threshold (0 to 1)
 * @param {string} rootMargin - Intersection observer root margin
 * @param {boolean} once - If true, animation triggers only once
 * @param {string} className - Additional CSS classes
 * @param {React.CSSProperties} style - Additional inline styles
 * @param {React.ElementType} as - HTML tag or component to render
 */
export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  distance = 30,
  duration = 750,
  easing = 'cubic-bezier(0.16, 1, 0.3, 1)',
  threshold = 0.15,
  rootMargin = '0px 0px -40px 0px',
  once = true,
  className = '',
  style = {},
  as: Component = 'div',
  ...props
}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    // Accessibility: Respect reduced motion preference
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    // Fallback if IntersectionObserver is not supported
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const node = elementRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(node);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
      observer.disconnect();
    };
  }, [once, threshold, rootMargin]);

  // Compute transform based on direction
  const getInitialTransform = () => {
    switch (direction) {
      case 'pop':
        return `translate3d(0, ${distance || 36}px, 0) scale(0.85)`;
      case 'up':
        return `translate3d(0, ${distance}px, 0) scale(0.97)`;
      case 'down':
        return `translate3d(0, -${distance}px, 0) scale(0.97)`;
      case 'left':
        return `translate3d(${distance}px, 0, 0) scale(0.97)`;
      case 'right':
        return `translate3d(-${distance}px, 0, 0) scale(0.97)`;
      case 'scale':
        return 'scale(0.92)';
      case 'fade':
      default:
        return 'none';
    }
  };

  const activeEasing = easing || (direction === 'pop' ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' : 'cubic-bezier(0.16, 1, 0.3, 1)');

  const dynamicStyles = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : getInitialTransform(),
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: activeEasing,
    transitionDelay: `${delay}ms`,
    willChange: isVisible ? 'auto' : 'opacity, transform',
    ...style,
  };

  return (
    <Component
      ref={elementRef}
      className={`scroll-reveal-item ${isVisible ? 'scroll-reveal-visible' : ''} ${className}`.trim()}
      style={dynamicStyles}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * ScrollRevealStagger Component
 * Automatically staggers child elements with sequential delays.
 */
export function ScrollRevealStagger({
  children,
  staggerDelay = 150,
  baseDelay = 0,
  direction = 'up',
  distance = 30,
  duration = 750,
  className = '',
  as: Component = 'div',
  ...props
}) {
  return (
    <Component className={className} {...props}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        return (
          <ScrollReveal
            delay={baseDelay + index * staggerDelay}
            direction={direction}
            distance={distance}
            duration={duration}
          >
            {child}
          </ScrollReveal>
        );
      })}
    </Component>
  );
}

export default ScrollReveal;
