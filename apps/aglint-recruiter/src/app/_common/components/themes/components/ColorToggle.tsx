import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Palette } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { capitalize } from '@/utils/text/textUtils';

import { COLORS } from '../constants/colors';
import { useTheme } from '../hooks/useTheme';
import type { Color } from '../types';

export function ColorToggle() {
  const { setColor } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cycle through colors on Option+K (macOS) or Alt+K (Windows/Linux)
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      const isOptionOrAlt = isMac ? event.metaKey || event.altKey : event.altKey;
      if (isOptionOrAlt && event.key.toLowerCase() === 'k') {
        event.preventDefault(); // Prevent default behavior
        const nextIndex = (currentIndex + 1) % COLORS.length;
        setCurrentIndex(nextIndex);
        setColor(COLORS[nextIndex]);
      }
    },
    [currentIndex, setColor]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Palette className="h-[1.2rem] w-[1.2rem] rotate-90 scale-100 transition-all" />
          <span className="sr-only">Toggle color</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Colors />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const Colors = () => COLORS.map((color) => <Color key={color} color={color} />);

const Color = ({ color }: { color: (typeof COLORS)[number] }) => {
  const { setColor } = useTheme();
  const label = getLabel(color);
  return (
    <DropdownMenuItem onClick={() => setColor(color)}>{label}</DropdownMenuItem>
  );
};

const getLabel = <T extends Color>(color: T) => {
  const baseColor = color.split('-')[1];
  return capitalize(baseColor) as BaseColor<T>;
};

type BaseColor<T extends Color> = T extends `${string}-${infer R}`
  ? Capitalize<R>
  : never;