import { Command } from 'lucide-react';

import { ColorToggle } from './ColorToggle';
import { ModeToggle } from './ModeToggle';

export const ThemeToggle = () => {
  return (
    <div className='flex gap-2 items-center'>
      <div className='flex gap-4 items-center text-sm text-muted-foreground'>
        <div className='flex gap-2 items-center'><Command size={16}/>+ K to toggle colors</div>
        <div className='flex gap-2 items-center'><Command size={16}/>+  L to toggle theme</div>
      </div>
      <ModeToggle />
      <ColorToggle />
    </div>
  );
};
