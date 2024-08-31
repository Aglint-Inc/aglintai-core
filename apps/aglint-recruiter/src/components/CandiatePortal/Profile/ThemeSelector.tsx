'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@components/shadcn/ui/card";
import { Label } from "@components/shadcn/ui/label";
import { RadioGroup, RadioGroupItem } from "@components/shadcn/ui/radio-group";
import { Palette } from 'lucide-react';

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
      className="grid grid-cols-3 gap-4"
    >
      {pageThemes.map((pageTheme) => (
        <Label
          key={pageTheme.value}
          htmlFor={pageTheme.value}
          className="cursor-pointer"
        >
          <RadioGroupItem
            value={pageTheme.value}
            id={pageTheme.value}
            className="sr-only"
          />
          <Card className={`${theme === pageTheme.value ? 'border-primary' : ''}`}>
            <CardContent className="flex flex-col items-center justify-between p-4">
              <pageTheme.icon className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">{pageTheme.name}</span>
            </CardContent>
          </Card>
        </Label>
      ))}
    </RadioGroup>
  );
}
