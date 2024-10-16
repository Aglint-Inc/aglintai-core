'use client';
import { type PropsWithChildren } from 'react';

import { ColorProvider } from './colorProvider';
import { ModeProvider } from './modeProvider';

export const ThemeProvider = (props: PropsWithChildren) => {
  return (
    <ModeProvider>
      <ColorProvider>{props.children}</ColorProvider>
    </ModeProvider>
  );
};
