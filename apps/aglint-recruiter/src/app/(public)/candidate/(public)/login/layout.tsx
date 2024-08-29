import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='absolute flex w-full min-h-full justify-center items-center'>
      {children}
    </div>
  );
};

export default Layout;
