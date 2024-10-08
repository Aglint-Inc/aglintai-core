import { type PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex min-h-screen w-full items-center justify-center'>
      {children}
    </div>
  );
};

export default Layout;
