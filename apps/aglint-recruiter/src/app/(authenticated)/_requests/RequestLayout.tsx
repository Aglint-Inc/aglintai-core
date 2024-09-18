import React, { type PropsWithChildren } from 'react';

import { RequestsProvider } from '@/context/RequestsContext';

function RequestLayout({ children }: PropsWithChildren) {
  return <RequestsProvider>{children}</RequestsProvider>;
}

export default RequestLayout;
