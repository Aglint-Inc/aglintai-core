import { Footer } from '@/src/components/CandiatePortal/Layout/Footer';
import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex flex-col w-full min-h-screen'>
      <div className='flex-grow flex justify-center items-center'>
        {children}
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
