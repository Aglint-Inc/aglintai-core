import { type PropsWithChildren } from 'react';

import { WorkflowsStoreProvider } from '@/workflows/contexts';
import { BreadCrumbs } from '@/workflows/components/breadCrumbs';
import { Actions } from '@/workflows/components/actions';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <WorkflowsStoreProvider>
      <div className='flex flex-col min-h-screen'>
        <header className='sticky top-0 z-10 bg-white border-b border-gray-200'>
          <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
            <div className='flex-1'>
              <BreadCrumbs />
            </div>
            <div>
              <Actions />
            </div>
          </div>
        </header>
        <main className='flex-grow container mx-auto px-4 py-8'>
          {children}
        </main>
      </div>
    </WorkflowsStoreProvider>
  );
};

export default Layout;
