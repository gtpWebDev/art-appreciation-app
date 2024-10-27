import { useEffect, useRef, useState } from "react";

/**
 * A custom hook to control whether a component is considered to be in view
 * or not.
 * Maintains isInView.
 * Sets up a mutable object which is preserved across renders using the useRef
 * hook.
 * Threshold - percentage of the element's visibility required - zero default
 *             means any of it in the viewport.
 * rootMargin - an offset boundary around the viewport - so positive px or %
 *             means it is triggered outside the viewport - 100px would be 100px
 *             outside the viewport (viewport padded by 100px)
 * chapter - currently used purely for dev to identify in console
 *
 */

const useInView = (threshold = 0, rootMargin = "100px", chapter) => {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // console.log(`${chapter} in view: ${entry.isIntersecting}`);
        setIsInView(entry.isIntersecting);
      },
      {
        rootMargin,
        threshold: threshold > 1 ? 1 : threshold,
      }
    );

    const currentElement = elementRef.current;

    if (currentElement) {
      observer.observe(currentElement); // Start observing the element
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement); // Cleanup on unmount
      }
    };
  }, [threshold, rootMargin]);

  return [elementRef, isInView]; // Return the ref and visibility state
};

export default useInView;
