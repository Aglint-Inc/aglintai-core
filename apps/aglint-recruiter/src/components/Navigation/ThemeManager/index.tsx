import { Button } from '@components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useThemeConfig } from 'src/app/(public)/theme/_common/hook/use-themeConfig';

export const colors = [
  { name: 'Zinc', value: 'bg-zinc-950' },
  { name: 'Slate', value: 'bg-slate-500' },
  { name: 'Stone', value: 'bg-stone-500' },
  { name: 'Gray', value: 'bg-gray-500' },
  { name: 'Neutral', value: 'bg-neutral-500' },
  { name: 'Red', value: 'bg-red-500' },
  { name: 'Rose', value: 'bg-rose-500' },
  { name: 'Orange', value: 'bg-orange-500' },
  { name: 'Green', value: 'bg-green-500' },
  { name: 'Blue', value: 'bg-blue-500' },
  { name: 'Yellow', value: 'bg-yellow-500' },
  { name: 'Violet', value: 'bg-violet-500' },
];

const radiusOptions = [0, 0.3, 0.5, 0.75, 1.0];

export default function ThemeManager() {
  const { setTheme } = useTheme();
  const [themeConfig, setThemeConfig] = useThemeConfig();
  const { baseColor, baseRadius, baseMode } = themeConfig;
  function setSelectedColor(color: typeof baseColor) {
    setThemeConfig((old) => ({ ...old, baseColor: color }));
  }
  function setSelectedRadius(radius: number) {
    setThemeConfig((old) => ({ ...old, baseRadius: radius }));
  }
  function setMode(mode: typeof baseMode) {
    setTheme(mode);
    setThemeConfig((old) => ({ ...old, baseMode: mode }));
  }

  return (
    <div className='flex w-full flex-col gap-8 rounded-sm bg-background p-4'>
      <div>
        <h3 className='text-md mb-2 font-semibold'>Color</h3>
        <div className='grid grid-cols-3 gap-2'>
          {colors.map((color) => (
            <Button
              key={color.name}
              variant='outline'
              className={`flex items-center justify-start space-x-2 ${
                baseColor === color.name ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() =>
                setSelectedColor(color.name.toLowerCase() as typeof baseColor)
              }
            >
              <div className={`h-4 w-4 rounded-full ${color.value}`} />
              <span>{color.name}</span>
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className='text-md mb-2 font-semibold'>Radius</h3>
        <div className='flex space-x-2'>
          {radiusOptions.map((radius) => (
            <Button
              key={radius}
              variant='outline'
              className={baseRadius === radius ? 'ring-2 ring-primary' : ''}
              onClick={() => setSelectedRadius(radius)}
            >
              {radius}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className='text-md mb-2 font-semibold'>Mode</h3>
        <div className='flex space-x-2'>
          <Button
            variant='outline'
            className={`flex items-center space-x-2 ${
              baseMode === 'light' ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setMode('light')}
          >
            <Sun className='h-4 w-4' />
            <span>Light</span>
          </Button>
          <Button
            variant='outline'
            className={`flex items-center space-x-2 ${
              baseMode === 'dark' ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setMode('dark')}
          >
            <Moon className='h-4 w-4' />
            <span>Dark</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
