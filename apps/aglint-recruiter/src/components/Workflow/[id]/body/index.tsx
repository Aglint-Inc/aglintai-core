import { useRouter } from 'next/router';

import { GlobalBadge } from '@/devlink/GlobalBadge';
import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { Page404 } from '@/devlink/Page404';
import { WorkflowConnectedCard } from '@/devlink3/WorkflowConnectedCard';
import { WorkflowDetail } from '@/devlink3/WorkflowDetail';
import Loader from '@/src/components/Common/Loader';
import Seo from '@/src/components/Common/Seo';
import OptimisticWrapper from '@/src/components/NewAssessment/Common/wrapper/loadingWapper';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useWorkflow } from '@/src/context/Workflows/[id]';
import {
  useJobWorkflowDeleteMutations,
  useJobWorkflowDisconnect,
} from '@/src/queries/job-workflow';
import { Workflow } from '@/src/types/workflow.types';
import ROUTES from '@/src/utils/routing/routes';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import Edit from '../edit';
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
      <GlobalEmptyState
        iconName={'work'}
        size={4}
        slotButton={<></>}
        textDesc={'No jobs connected'}
      />
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
  devlinkProps,
  workflow_id,
}: Workflow['jobs'][number] & {
  devlinkProps: ReturnType<
    ReturnType<typeof useRolesAndPermissions>['devlinkProps']
  >;
  workflow_id: string;
}) => {
  const { push } = useRouter();
  const { mutateAsync } = useJobWorkflowDisconnect({ id });
  const mutationState = useJobWorkflowDeleteMutations({ id });
  const loading = !!(mutationState ?? []).find(
    ({ job_id, workflow_id: wf_id }) => job_id === id && wf_id == workflow_id,
  );
  return (
    <OptimisticWrapper loading={loading}>
      <WorkflowConnectedCard
        key={id}
        role={capitalizeAll(job_title)}
        textLocation={location || '---'}
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
        onClickJob={{
          onClick: () => push(ROUTES['/jobs/[id]/workflows']({ id })),
          ...devlinkProps,
        }}
        onClickLinkOff={{
          onClick: async () => await mutateAsync({ job_id: id, workflow_id }),
          ...devlinkProps,
        }}
      />
    </OptimisticWrapper>
  );
};
