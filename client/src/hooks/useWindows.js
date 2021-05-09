import { useState, useEffect } from 'react';

export const useMediaQuery = () => {
  const [windowWidth, handleWindowWidth] = useState(window.innerWidth);
  const handleResize = () => handleWindowWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return [windowWidth];
};
