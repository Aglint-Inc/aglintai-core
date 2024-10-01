'use client';

import { TwoColumnLayout } from '@components/layouts/two-column-layout';
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

import { ConnectedJobs } from './_common/components/body';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <WorkflowsStoreProvider>
      <WorkflowProvider>
        <TwoColumnLayout
          sidebarPosition='right'
          sidebarWidth={480}
          sidebar={<ConnectedJobs />}
          header={
            <div className='flex flex-row items-center justify-between'>
              <BreadCrumbs />
              <div className='flex flex-row gap-2'>
                <Edit />
                <DeletePopup />
              </div>
            </div>
          }
        >
          <div className='px-4'>{children}</div>
        </TwoColumnLayout>
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
              <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <></>
      )}
    </WithPermission>
  );
};
