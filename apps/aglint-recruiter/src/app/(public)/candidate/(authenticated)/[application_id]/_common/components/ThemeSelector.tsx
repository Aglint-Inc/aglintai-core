'use client';

import { Card, CardContent } from '@components/ui/card';
import { Label } from '@components/ui/label';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { Palette } from 'lucide-react';
import { useEffect, useState } from 'react';

const pageThemes = [
  { name: 'Default', value: 'default', icon: Palette },
  { name: 'Mint', value: 'mint', icon: Palette },
  { name: 'Red', value: 'red', icon: Palette },
  { name: 'Purple', value: 'purple', icon: Palette },
  { name: 'Pink', value: 'pink', icon: Palette },
];

export function ThemeSelector() {
  const [theme, setTheme] = useState('default');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('pageTheme') || 'default';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  if (!mounted) return null;

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('pageTheme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <RadioGroup
      defaultValue={theme}
      onValueChange={handleThemeChange}
      className='grid grid-cols-3 gap-4'
    >
      {pageThemes.map((pageTheme) => (
        <Label
          key={pageTheme.value}
          htmlFor={pageTheme.value}
          className='cursor-pointer'
        >
          <RadioGroupItem
            value={pageTheme.value}
            id={pageTheme.value}
            className='sr-only'
          />
          <Card
            className={`transition-colors duration-200 ${theme === pageTheme.value ? `bg-${pageTheme.value}-100 border-${pageTheme.value}-500` : 'border-gray-200 bg-white'}`}
          >
            <CardContent className='flex flex-col items-center justify-between p-4'>
              <Palette
                className={`mb-2 h-6 w-6 ${theme === pageTheme.value ? `text-${pageTheme.value}-500` : 'text-gray-500'}`}
              />
              <span
                className={`text-sm font-medium ${theme === pageTheme.value ? `text-${pageTheme.value}-700` : 'text-gray-700'}`}
              >
                {pageTheme.name}
              </span>
            </CardContent>
          </Card>
        </Label>
      ))}
    </RadioGroup>
  );
}
