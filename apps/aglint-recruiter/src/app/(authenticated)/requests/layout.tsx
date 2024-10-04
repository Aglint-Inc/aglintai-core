'use client';

import { RequestsProvider } from '@requests/contexts';
import React, { type PropsWithChildren } from 'react';

function Layout({ children }: PropsWithChildren) {
  return <RequestsProvider>{children}</RequestsProvider>;
}

export default Layout;
