import { type PropsWithChildren } from 'react';

import { Footer } from '@/src/components/CandiatePortal/Layout/Footer';
import Navigation from '@/src/components/CandiatePortal/Layout/Navigation';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Navigation/>
      <div className='w-full container max-w-screen-xl mx-auto mt-5' style={{ minHeight: '80vh' }}>{children}</div>
      <Footer/>
    </div>
  );
};

export default Layout;
