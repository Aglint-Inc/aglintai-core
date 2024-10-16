import { ColorToggle } from './ColorToggle';
import { ModeToggle } from './ModeToggle';

export const ThemeToggle = () => {
  return (
    <div className='flex gap-2'>
      <ModeToggle />
      <ColorToggle />
    </div>
  );
};
