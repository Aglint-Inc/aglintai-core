import { PublicPageLayout } from '@components/layouts/public-layout';
import React, { type PropsWithChildren } from 'react';

import Footer from '@/components/Common/Footer';

import { RequestAvailabilityProvider } from './_common/contexts/RequestAvailabilityContext';

function AvailabilityLayout({ children }: PropsWithChildren) {
  return (
    <RequestAvailabilityProvider>
      <PublicPageLayout footer={<Footer brand={true} />}>
        {children}
      </PublicPageLayout>
    </RequestAvailabilityProvider>
  );
}

export default AvailabilityLayout;
