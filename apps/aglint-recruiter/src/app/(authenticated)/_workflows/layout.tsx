import { type PropsWithChildren } from 'react';

import { Actions } from '@/workflows/components/actions';
import { BreadCrumbs } from '@/workflows/components/breadCrumbs';
import { WorkflowsStoreProvider } from '@/workflows/contexts';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <WorkflowsStoreProvider>
      <div className='flex min-h-screen flex-col'>
        <header className='sticky top-0 z-10 border-b border-gray-200 bg-white'>
          <div className='container mx-auto flex items-center justify-between px-4 py-4'>
            <div className='flex-1'>
              <BreadCrumbs />
            </div>
            <div>
              <Actions />
            </div>
          </div>
        </header>
        <main className='container mx-auto flex-grow px-4 py-8'>
          {children}
        </main>
      </div>
    </WorkflowsStoreProvider>
  );
};

export default Layout;
