import { EmptyState } from '@components/empty-state';
import {
  Section,
  SectionHeader,
  SectionTitle,
} from '@components/layouts/sections-header';
import OptimisticWrapper from '@components/loadingWapper';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@components/ui/alert-dialog';
import { BriefcaseBusiness } from 'lucide-react';
import { useState } from 'react';

import { NotFound } from '@/components/Common/404';
import { Loader } from '@/components/Common/Loader';
// import { UIBadge } from '@/components/Common/UIBadge';
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
import { UIBadge } from '@components/ui-badge';

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
  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Connected Jobs</SectionTitle>
      </SectionHeader>
      {count === 0 ? (
        <EmptyState
          header='No jobs connected'
          description='You can connect jobs to this workflow to automate your workflow.'
          icon={BriefcaseBusiness}
        />
      ) : (
        (workflow?.jobs ?? []).map((job) => (
          <WorkflowJob
            key={job.id}
            {...(job as Workflow['jobs'][number])}
            devlinkProps={devlink}
            workflow_id={workflow?.id ?? null!}
          />
        ))
      )}
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
  const { mutateAsync } = useJobWorkflowDisconnect({ id: id! });
  const mutationState = useJobWorkflowMutations({ id: id! });
  const loading = !!(mutationState?.remove ?? []).find(
    ({ job_id, workflow_id: wf_id }) => job_id === id && wf_id == workflow_id,
  );

  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <OptimisticWrapper loading={loading}>
        <WorkflowConnectedCard
          key={id}
          role={capitalizeAll(job_title!)}
          textLocation={formatOfficeLocation(location)}
          textRoleCategory={department || '---'}
          slotBadges={
            status && (
              <UIBadge
                variant={
                  status === 'published'
                    ? 'success'
                    : status === 'closed'
                      ? 'destructive'
                      : 'warning'
                }
                textBadge={capitalizeAll(status)}
              />
            )
          }
          onClickJob={() => push(ROUTES['/jobs/[job]/workflows']({ job: id! }))}
          onClickLinkOff={() => setOpen(true)}
          // onClickLinkOff={{
          //   onClick: async () => await mutateAsync({ job_id: id, workflow_id }),
          //   ...devlinkProps,
          // }}
        />
      </OptimisticWrapper>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className='border border-border'>
          <AlertDialogHeader>
            <AlertDialogTitle>Unlink confirmation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure to unlink this job from this workflow?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () =>
                await mutateAsync({ job_id: id!, workflow_id })
              }
            >
              Unlink
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
