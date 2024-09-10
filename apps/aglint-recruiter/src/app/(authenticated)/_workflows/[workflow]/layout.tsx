import { PageLayout } from '@devlink2/PageLayout';
import type { PropsWithChildren } from 'react';
import { BreadCrumbs } from '@/workflow/components/breadCrumbs';
import { DeletePopup } from '@/workflow//components/deletePopup';
import { WorkflowsStoreProvider } from '@/workflows/contexts';
import { WorkflowProvider } from '@/workflow/contexts';
import { useWorkflow } from '@/workflow/hooks';
import { useWorkflowsActions } from '@/workflows/hooks';
import { WithPermission } from '@/components/withPermission';
import { Button } from '@components/ui/button';
import { MoreHorizontal, Zap } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <WorkflowsStoreProvider>
      <WorkflowProvider>
        <PageLayout
          slotTopbarLeft={<BreadCrumbs />}
          slotBody={children}
          slotTopbarRight={<Edit />}
        />
        <DeletePopup />
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
      workflow: { id: workflow.id, jobs: workflow.jobs },
    });
  };

  return (
    <WithPermission permission={['manage_workflow']}>
      {workflow ? (
        <>
          <div className='flex flex-row items-center gap-2'>
            <Button size='sm' onClick={() => setPopup({ open: true })}>
              <Zap size={12} className='mr-2' />
              Edit Workflow
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size='sm' variant='outline'>
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
