'use client';

import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import type { PropsWithChildren } from 'react';

import { WithPermission } from '@/components/withPermission';
import type { Workflow } from '@/types/workflow.types';
import { DeletePopup } from '@/workflow//components/deletePopup';
import { BreadCrumbs } from '@/workflow/components/breadCrumbs';
import { WorkflowProvider } from '@/workflow/contexts';
import { useWorkflow } from '@/workflow/hooks';
import { WorkflowsStoreProvider } from '@/workflows/contexts';
import { useWorkflowsActions } from '@/workflows/hooks';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <WorkflowsStoreProvider>
      <WorkflowProvider>
        <div className='container-lg mx-auto w-full px-16'>
          <div className='flex flex-row justify-between'>
            <div className='mb-4 flex flex-col'>
              <h2 className='text-lg font-semibold'>Automation Details</h2>
              <p className='mb-4 text-sm text-gray-600'>
                All the Reports can be found here.
              </p>
              <BreadCrumbs />
            </div>
            <div className='space-y-8'>
              <Edit />
              <DeletePopup />
            </div>
          </div>
          {children}
        </div>
      </WorkflowProvider>
    </WorkflowsStoreProvider>
  );
};

export default Layout;

const Edit = () => {
  const { workflow } = useWorkflow();
  const { setPopup, setDeletion } = useWorkflowsActions();

  const handleDelete = () => {
    setDeletion({
      open: true,
      workflow: { id: workflow.id, jobs: workflow.jobs as Workflow['jobs'] },
    });
  };

  return (
    <WithPermission permission={['manage_workflow']}>
      {workflow ? (
        <>
          <div className='flex flex-row items-center gap-2'>
            <Button variant='outline' onClick={() => setPopup({ open: true })}>
              Edit
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline'>
                  <MoreHorizontal className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={handleDelete}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      ) : (
        <></>
      )}
    </WithPermission>
  );
};
