import { PropsWithChildren } from 'react';

import { Footer } from '@/src/components/CandiatePortal/Layout/Footer';
import Navigation from '@/src/components/CandiatePortal/Layout/Navigation';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Navigation />
      <div className='w-full container mx-auto mt-20'>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
