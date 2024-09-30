'use client';

import { type PropsWithChildren } from 'react';

import { Actions } from '@/workflows/components/actions';
import { WorkflowsStoreProvider } from '@/workflows/contexts';

import { useWorkflows } from './_common/hooks';

const Layout = ({ children }: PropsWithChildren) => {
  const {
    workflows: { data },
  } = useWorkflows();
  return (
    <WorkflowsStoreProvider>
      <div className='container-lg mx-auto w-full px-4'>
        <header className='mb-4'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-semibold'>Automations</h1>
              <p className='mb-4 text-gray-600'>
                You can create automations to streamline your workflow.
              </p>
            </div>
            {data?.length > 0 && <Actions />}
          </div>
        </header>
        {children}
      </div>
    </WorkflowsStoreProvider>
  );
};

export default Layout;
