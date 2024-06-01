import React, { createContext, useContext, useEffect, useState } from 'react';

const ResizeWindowContext = createContext<{
  windowSize: ReturnType<typeof getWindowSize>;
}>({ windowSize: null });

function ScreenSizeProvider({ children }) {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
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
    return { innerWidth, innerHeight };
  }
}

export const useResizeWindow = () => useContext(ResizeWindowContext);
export default ScreenSizeProvider;
