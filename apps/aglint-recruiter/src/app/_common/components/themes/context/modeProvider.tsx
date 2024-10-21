import { ThemeProvider } from '@components/theme-provider';
import type { PropsWithChildren } from 'react';

import { MODES } from '../constants/modes';

export const ModeProvider = (props: PropsWithChildren) => {
  return (
    <ThemeProvider
      attribute='class'
      themes={MODES as any}
      defaultTheme={MODES[0]}
      enableSystem={false}
      disableTransitionOnChange
    >
      {props.children}
    </ThemeProvider>
  );
};
