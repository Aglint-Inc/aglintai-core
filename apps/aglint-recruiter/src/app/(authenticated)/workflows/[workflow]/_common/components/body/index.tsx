import OptimisticWrapper from '@components/loadingWapper';
import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { BriefcaseBusiness } from 'lucide-react';
import { useState } from 'react';

import { NotFound } from '@/components/Common/404';
import { Loader } from '@/components/Common/Loader';
import { UIBadge } from '@/components/Common/UIBadge';
import UITypography from '@/components/Common/UITypography';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useRouterPro } from '@/hooks/useRouterPro';
import {
  useJobWorkflowDisconnect,
  useJobWorkflowMutations,
} from '@/queries/(old)-job-workflow';
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
import {
  SectionHeader,
  SectionTitle,
  Section,
} from '@components/layouts/sections-header';
import GlobalEmpty from '@/components/Common/GlobalEmpty';

const Body = () => {
  const { workflow } = useWorkflow();
  if (workflow === null) return <Loader />;
  if (workflow === undefined) return <NotFound />;
  return (
    <div className='mx-auto flex max-w-4xl flex-row'>
      <div className='flex flex-col gap-4'>
        <Edit />
        <Trigger />
        <ActionsProvider>
          <Actions />
        </ActionsProvider>
      </div>
    </div>
  );
};

export default Body;

export const ConnectedJobs = () => {
  const { workflow } = useWorkflow();
  const { devlinkProps } = useRolesAndPermissions();
  const devlink = devlinkProps(['manage_job']);
  const count = workflow?.jobs?.length ?? 0;
  if (count === 0)
    return (
      <Section>
        <SectionHeader>
          <SectionTitle>Connected Jobs</SectionTitle>
        </SectionHeader>
        <GlobalEmpty
          header='No jobs connected'
          description='You can connect jobs to this workflow to automate your workflow.'
          icon={<BriefcaseBusiness strokeWidth={2} className='h-6 w-6' />}
        />
      </Section>
    );
  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Connected Jobs</SectionTitle>
      </SectionHeader>
      {(workflow?.jobs ?? []).map((job) => (
        <WorkflowJob
          key={job.id}
          {...(job as Workflow['jobs'][number])}
          devlinkProps={devlink}
          workflow_id={workflow?.id}
        />
      ))}
    </Section>
  );
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
            <p className='text-sm text-muted-foreground'>
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
