import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Palette } from 'lucide-react';

import { capitalize } from '@/utils/text/textUtils';

import { COLORS } from '../constants/colors';
import { useTheme } from '../hooks/useTheme';
import type { Color } from '../types';

export function ColorToggle() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          <Palette className='h-[1.2rem] w-[1.2rem] rotate-90 scale-100 transition-all' />
          <span className='sr-only'>Toggle color</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <Colors />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const Colors = () => {
  return COLORS.map((color) => <Color key={color} color={color} />);
};

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
