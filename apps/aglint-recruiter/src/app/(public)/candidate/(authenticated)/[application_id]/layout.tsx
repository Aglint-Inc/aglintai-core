import { type PropsWithChildren } from 'react';

import { Footer } from '@/components/CandiatePortal/Layout/Footer';
import Navigation from '@/components/CandiatePortal/Layout/Navigation';

import { CandidatePortalProvider } from './_common/context';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <CandidatePortalProvider>
      <div>
        <Navigation />
        <div
          className='w-full container max-w-screen-xl mx-auto mt-5'
          style={{ minHeight: 'calc(100vh - 260px)' }}
        >
          {children}
        </div>
        <Footer />
      </div>
    </CandidatePortalProvider>
  );
};

export default Layout;
