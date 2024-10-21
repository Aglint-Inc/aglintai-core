import { Command } from 'lucide-react';

import { ColorToggle } from './ColorToggle';
import { ModeToggle } from './ModeToggle';

export const ThemeToggle = () => {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  return (
    <div className='sr-only flex gap-2'>
      <div className='mr-4 flex items-center gap-4 text-sm text-muted-foreground'>
        <div className='flex items-center gap-2'>
          <div className='h-4 w-4 rounded-sm border border-border bg-primary'></div>
          {isMac ? <Command size={14} /> : 'Alt '}+ K to toggle colors
        </div>
        <div className='flex items-center gap-2'>
          <div className='h-4 w-4 rounded-sm border border-border bg-background'></div>
          {isMac ? <Command size={14} /> : 'Ctrl '}+ L to toggle theme
        </div>
      </div>
      <ModeToggle />
      <ColorToggle />
    </div>
  );
};
