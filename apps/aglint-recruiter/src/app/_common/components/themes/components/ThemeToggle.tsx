import { Command } from 'lucide-react';

import { ColorToggle } from './ColorToggle';
import { ModeToggle } from './ModeToggle';

export const ThemeToggle = () => {
  return (
    <div className='flex gap-2 items-center'>
      <div className='flex gap-4 items-center text-sm text-muted-foreground mr-4'>
        <div className='flex gap-2 items-center'><div className='w-4 h-4 rounded-sm bg-primary border border-border'></div><Command size={14}/>+ K to toggle colors</div>
        <div className='flex gap-2 items-center'><div className='w-4 h-4 rounded-sm bg-background border border-border'></div><Command size={14}/>+  L to toggle theme</div>
      </div>
      <ModeToggle />
      <ColorToggle />
    </div>
  );
};
