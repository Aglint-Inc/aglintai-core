'use client';

import React from 'react';

import type { Color } from '../types';

const useColorContext = () => {
  const [color, set] = React.useState<Color>();
  const setColor = (color: Color) => {
    localStorage.setItem('color', color);
    set(color);
  };

  React.useEffect(() => {
    if (localStorage) {
      setColor((localStorage.getItem('color') ?? 'theme-slate') as Color);
    }
  }, []);

  return { color, setColor };
};

export const ColorContext = React.createContext<
  ReturnType<typeof useColorContext> | undefined
>(undefined);

export const ColorProvider = (props: React.PropsWithChildren) => {
  const value = useColorContext();
  return (
    <div className={value.color}>
      <ColorContext.Provider value={value}>
        {props.children}
      </ColorContext.Provider>
    </div>
  );
};
