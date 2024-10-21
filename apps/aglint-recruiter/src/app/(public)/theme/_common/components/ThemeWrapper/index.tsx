'use client';

import { cn } from '@lib/utils';
import { useEffect } from 'react';

import { useThemeConfig } from '../../hook/use-themeConfig';

interface ThemeWrapperProps extends React.ComponentProps<'div'> {
  defaultTheme?: string;
}

export function ThemeWrapper({
  defaultTheme,
  children,
  className,
}: ThemeWrapperProps) {
  const [theme] = useThemeConfig();
  return (
    <div
      className={cn(
        theme.baseMode,
        `theme-${defaultTheme || theme.baseColor}`,
        'w-full',
        className,
      )}
      style={
        {
          '--radius': `${defaultTheme ? 0.5 : theme.baseRadius}rem`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
