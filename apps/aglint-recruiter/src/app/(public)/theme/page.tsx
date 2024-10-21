'use client';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card';
import { Label } from '@components/ui/label';
import { Moon, Sun } from 'lucide-react';
import { unstable_noStore } from 'next/cache';
import { useTheme } from 'next-themes';
import React from 'react';

import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import SampleShowcase from './_common/components/sample';
import ThemeManager from './_common/components/themeManager';
import { ThemeWrapper } from './_common/components/ThemeWrapper';

function Page() {
  unstable_noStore();
  const { theme, themes, setTheme } = useTheme();

  return (
    <div className='flex-col'>
      <div className='w-full p-2'>
        <h1 className='text-3xl font-bold'>Manage Theme</h1>
        {/* <Card>
          <CardHeader>Select Theme:</CardHeader>
          <CardContent>{capitalizeFirstLetter(theme || '')}</CardContent>
          <CardFooter className='gap-3'>
            {themes.map((theme) => (
              <Button
                key={theme}
                onClick={() => setTheme(theme)}
                className='gap-2'
              >
                {iconMapper(theme)}
                <Label>{textCapFilter(theme)}</Label>
              </Button>
            ))}
          </CardFooter>
        </Card> */}
        <ThemeManager />
      </div>
      <ThemeWrapper>
        <SampleShowcase />
      </ThemeWrapper>
    </div>
  );
}

export default Page;

function textCapFilter(str: string) {
  return (str[0]?.toLocaleUpperCase() + str.slice(1)).replaceAll('-', ' ');
}

function iconMapper(theme: string) {
  switch (theme) {
    case 'light':
      return <Sun className='h-[1rem] w-[1rem]' />;
    case 'dark':
      return <Moon className='h-[1rem] w-[1rem]' />;
    default:
      return <></>;
  }
}
