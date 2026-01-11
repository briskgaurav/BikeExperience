import { useEffect, useState } from "react";

/**
 * Custom hook to calculate dimensions that maintain a specific aspect ratio
 * while fitting within the window dimensions
 * @param {number} aspectRatio - The target aspect ratio (width / height)
 * @returns {{width: number, height: number}} - The calculated dimensions
 */
export function useAspectRatioDimensions(aspectRatio) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const calculateDimensions = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const windowAspect = windowWidth / windowHeight;

      let width, height;

      if (windowAspect > aspectRatio) {
        // Window is wider than target aspect ratio - fit to height
        height = windowHeight;
        width = height * aspectRatio;
      } else {
        // Window is taller than target aspect ratio - fit to width
        width = windowWidth;
        height = width / aspectRatio;
      }

      setDimensions({ width, height });
    };

    calculateDimensions();
    window.addEventListener("resize", calculateDimensions);
    return () => window.removeEventListener("resize", calculateDimensions);
  }, [aspectRatio]);

  return dimensions;
}

