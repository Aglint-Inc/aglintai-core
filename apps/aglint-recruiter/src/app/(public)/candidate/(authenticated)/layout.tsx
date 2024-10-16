'use client';
import { type PropsWithChildren } from 'react';
import { Footer } from 'src/app/(public)/candidate/(authenticated)/_common/components/Footer';
import Navigation from 'src/app/(public)/candidate/(authenticated)/_common/components/Navigation';

import { CandidatePortalProvider } from './_common/context';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <CandidatePortalProvider>
      <div className='flex min-h-screen w-[1280px] flex-col'>
        <Navigation />
        <div className='flex-1'>{children}</div>
        <Footer />
      </div>
    </CandidatePortalProvider>
  );
};

export default Layout;
