import { type PropsWithChildren } from 'react';
import { Footer } from 'src/app/(public)/candidate/(authenticated)/[application]/_common/components/Footer';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <div className='flex flex-grow items-center justify-center'>
        {children}
      </div>
      <div className='mt-auto'>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
