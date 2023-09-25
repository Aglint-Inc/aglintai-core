import React, { useEffect, useState } from 'react';

import ResizeWindowContext from './context';

function ScreenSizeProvider({ children }) {
  const [windowSize, setwindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setwindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <ResizeWindowContext.Provider value={{ windowSize: windowSize }}>
      {children}
    </ResizeWindowContext.Provider>
  );
}

function getWindowSize() {
  if (typeof window !== 'undefined') {
    const { innerWidth, innerHeight } = window;
    const winowProps = window;
    return { innerWidth, innerHeight, winowProps };
  }
}
export default ScreenSizeProvider;
