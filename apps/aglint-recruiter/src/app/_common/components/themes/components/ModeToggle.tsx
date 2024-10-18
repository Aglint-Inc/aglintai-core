import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Moon, Sun } from 'lucide-react';
import { useEffect } from 'react';

import { capitalize } from '@/utils/text/textUtils';

import { MODES } from '../constants/modes';
import { useTheme } from '../hooks/useTheme';

export function ModeToggle() {
  const { mode, setMode } = useTheme();

  // Toggle mode with Cmd+L / Ctrl+L
  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault(); // Prevents the default browser behavior (e.g., focusing address bar)
        setMode(mode === 'light' ? 'dark' : 'light');
      }
    };

    window.addEventListener('keydown', handleShortcut);
    return () => {
      window.removeEventListener('keydown', handleShortcut);
    };
  }, [mode, setMode]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle mode</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Modes />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const Modes = () => {
  return MODES.map((mode) => <Mode key={mode} mode={mode} />);
};

const Mode = ({ mode }: { mode: (typeof MODES)[number] }) => {
  const { setMode } = useTheme();
  return (
    <DropdownMenuItem onClick={() => setMode(mode)}>
      {capitalize(mode)}
    </DropdownMenuItem>
  );
};