'use client';
import { type PropsWithChildren } from 'react';

import { Footer } from '@/candidate/authenticated/components/Footer';
import Navigation from '@/candidate/authenticated/components/Navigation';

import { CandidatePortalProvider } from './_common/context';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <CandidatePortalProvider>
      <div>
        <Navigation />
        <div
          className='container mx-auto mt-5 w-full max-w-screen-xl'
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
