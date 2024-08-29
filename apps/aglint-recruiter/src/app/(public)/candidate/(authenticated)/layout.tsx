import { Footer } from '@/src/components/CandiatePortal/Layout/Footer';
import Navbar from '@/src/components/CandiatePortal/Layout/Navbar';
import { PageHeader } from '@/src/components/CandiatePortal/Layout/PageHeader';
import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Navbar />
      <div className='w-full'>
        <PageHeader />
      </div>
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
