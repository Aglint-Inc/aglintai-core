import { useColor } from './useColor';
import { useMode } from './useMode';

export const useTheme = () => {
  const modeValues = useMode();
  const colorValues = useColor();
  return { ...modeValues, ...colorValues };
};
