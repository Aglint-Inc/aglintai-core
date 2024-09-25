import OptimisticWrapper from '@components/loadingWapper';
import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { Briefcase } from 'lucide-react';
import { useState } from 'react';

import { NotFound } from '@/components/Common/404';
import { Loader } from '@/components/Common/Loader';
import Seo from '@/components/Common/Seo';
import { UIBadge } from '@/components/Common/UIBadge';
import UITypography from '@/components/Common/UITypography';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useRouterPro } from '@/hooks/useRouterPro';
import {
  useJobWorkflowDisconnect,
  useJobWorkflowMutations,
} from '@/queries/job-workflow';
import { type Workflow } from '@/types/workflow.types';
import { formatOfficeLocation } from '@/utils/formatOfficeLocation';
import ROUTES from '@/utils/routing/routes';
import { capitalizeAll } from '@/utils/text/textUtils';
import { useWorkflow } from '@/workflow/hooks';

import { Edit } from '../edit';
import { WorkflowConnectedCard } from '../WorkflowConnectedCard';
import Actions from './action';
import { ActionsProvider } from './context';
import Trigger from './trigger';

const Body = () => {
  const { workflow } = useWorkflow();
  if (workflow === null) return <Loader />;
  if (workflow === undefined) return <NotFound />;
  return (
    <>
      <Seo title='Workflow | Aglint AI' description='AI for People Products' />
      <div className='flex flex-row'>
        <div className='w-7/12 pr-16'>
          <>
            <Edit />
            <Trigger />
            <ActionsProvider>
              <Actions />
            </ActionsProvider>
          </>
        </div>
        <div className='w-4/12 flex-row space-y-1'>
          <div className='mb-4 flex items-center font-medium text-neutral-900'>
            Connected Jobs
          </div>
          <div className='flex flex-col space-y-2'>
            <ConnectedJobs />
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;

const ConnectedJobs = () => {
  const { workflow } = useWorkflow();
  const { devlinkProps } = useRolesAndPermissions();
  const devlink = devlinkProps(['manage_job']);
  const count = workflow?.jobs?.length ?? 0;
  if (count === 0)
    return (
      <div className='flex flex-col items-center justify-center p-6 text-center'>
        <Briefcase size={30} className='mb-4 text-gray-400' />
        <UITypography variant='p' type='small'>
          No jobs connected
        </UITypography>
      </div>
    );
  return (workflow?.jobs ?? []).map((job) => (
    <WorkflowJob
      key={job.id}
      {...(job as Workflow['jobs'][number])}
      devlinkProps={devlink}
      workflow_id={workflow?.id}
    />
  ));
};

const WorkflowJob = ({
  id,
  job_title,
  location,
  department,
  status,
  workflow_id,
}: Workflow['jobs'][number] & {
  devlinkProps: ReturnType<
    ReturnType<typeof useRolesAndPermissions>['devlinkProps']
  >;
  workflow_id: string;
}) => {
  const { push } = useRouterPro();
  const { mutateAsync } = useJobWorkflowDisconnect({ id });
  const mutationState = useJobWorkflowMutations({ id });
  const loading = !!(mutationState?.remove ?? []).find(
    ({ job_id, workflow_id: wf_id }) => job_id === id && wf_id == workflow_id,
  );

  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <OptimisticWrapper loading={loading}>
        <WorkflowConnectedCard
          key={id}
          role={capitalizeAll(job_title)}
          textLocation={formatOfficeLocation(location)}
          textRoleCategory={department || '---'}
          slotBadges={
            status && (
              <UIBadge
                color={
                  status === 'published'
                    ? 'success'
                    : status === 'closed'
                      ? 'error'
                      : 'warning'
                }
                textBadge={capitalizeAll(status)}
              />
            )
          }
          onClickJob={() => push(ROUTES['/jobs/[job]/workflows']({ job: id }))}
          onClickLinkOff={() => setOpen(true)}
          // onClickLinkOff={{
          //   onClick: async () => await mutateAsync({ job_id: id, workflow_id }),
          //   ...devlinkProps,
          // }}
        />
      </OptimisticWrapper>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unlink confirmation</DialogTitle>
          </DialogHeader>
          <div className='py-4'>
            <p className='text-sm text-gray-500'>
              Are you sure to unlink this job from this workflow?
            </p>
          </div>
          <DialogFooter>
            <Button variant='outline' size='sm' onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              size='sm'
              onClick={async () =>
                await mutateAsync({ job_id: id, workflow_id })
              }
            >
              Unlink
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
