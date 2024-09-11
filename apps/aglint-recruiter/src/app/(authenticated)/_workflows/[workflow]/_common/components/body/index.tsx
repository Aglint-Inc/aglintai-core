import OptimisticWrapper from '@components/loadingWapper';
import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { GlobalBadge } from '@devlink/GlobalBadge';
import { Page404 } from '@devlink/Page404';
import { WorkflowDetail } from '@devlink3/WorkflowDetail';
import { Briefcase } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Loader from '@/components/Common/Loader';
import Seo from '@/components/Common/Seo';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
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
  if (workflow === undefined) return <Page404 />;
  return (
    <>
      <Seo title='Workflow | Aglint AI' description='AI for People Products' />
      <WorkflowDetail
        slotWorkflowItem={
          <>
            <Edit />
            <Trigger />
            <ActionsProvider>
              <Actions />
            </ActionsProvider>
          </>
        }
        slotConnectedJobs={<ConnectedJobs />}
      />
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
        <Briefcase className='w-16 h-16 text-gray-400 mb-4' />
        <p className='text-lg text-gray-600'>No jobs connected</p>
      </div>
    );
  return (workflow?.jobs ?? []).map((job) => (
    <WorkflowJob
      key={job.id}
      {...job}
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
  const { push } = useRouter();
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
              <GlobalBadge
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
