import { useTheme } from 'next-themes';

import { type Mode } from '../types';

export const useMode = () => {
  const { theme, setTheme } = useTheme();
  return {
    mode: theme as Mode,
    setMode: setTheme as React.Dispatch<React.SetStateAction<Mode>>,
  };
};
