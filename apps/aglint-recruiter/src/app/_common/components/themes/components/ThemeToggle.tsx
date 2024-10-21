import { ColorToggle } from './ColorToggle';
import { ModeToggle } from './ModeToggle';

export const ThemeToggle = () => {
  return (
    <div className='sr-only flex gap-2'>
      <ModeToggle />
      <ColorToggle />
    </div>
  );
};
