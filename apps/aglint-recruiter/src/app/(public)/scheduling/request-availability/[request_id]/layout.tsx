import React, { type PropsWithChildren } from 'react';

import { RequestAvailabilityProvider } from './_common/contexts/RequestAvailabilityContext';

function AvailabilityLayout({ children }: PropsWithChildren) {
  return <RequestAvailabilityProvider>{children}</RequestAvailabilityProvider>;
}

export default AvailabilityLayout;
