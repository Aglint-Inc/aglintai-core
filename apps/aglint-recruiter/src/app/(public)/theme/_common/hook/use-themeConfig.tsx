import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

type ThemeConfig = {
  baseMode: 'light' | 'dark' | 'system';
  baseColor:
    | 'zinc'
    | 'slate'
    | 'stone'
    | 'gray'
    | 'neutral'
    | 'red'
    | 'rose'
    | 'orange'
    | 'green'
    | 'blue'
    | 'yellow'
    | 'violet';
  baseRadius: number;
};

const configAtom = atomWithStorage<ThemeConfig>('config', {
  baseMode: 'light',
  baseColor: 'zinc',
  baseRadius: 0.5,
});

export function useThemeConfig() {
  return useAtom(configAtom);
}
