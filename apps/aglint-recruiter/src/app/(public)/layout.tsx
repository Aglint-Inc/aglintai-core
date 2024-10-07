import { type PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex h-screen w-full items-center justify-center overflow-auto'>
      {children}
    </div>
  );
};

export default Layout;
