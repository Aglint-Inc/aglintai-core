'use client';

import { Button } from '@components/shadcn/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentMode = theme === 'dark' ? 'dark' : 'light';
  const nextMode = currentMode === 'dark' ? 'light' : 'dark';

  const handleModeChange = () => {
    setTheme(nextMode);
  };

  return (
    <Button variant='outline' onClick={handleModeChange}>
      {currentMode === 'dark' ? (
        <Sun className='h-4 w-4' />
      ) : (
        <Moon className='h-4 w-4' />
      )}
      {/* <span className='ml-2'>
        {currentMode === 'dark' ? 'Light' : 'Dark'} Mode
      </span> */}
    </Button>
  );
}
