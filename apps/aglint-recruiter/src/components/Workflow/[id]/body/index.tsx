import OptimisticWrapper from '@components/loadingWapper';
import { ButtonSoft } from '@devlink/ButtonSoft';
import { ButtonSolid } from '@devlink/ButtonSolid';
import { DcPopup } from '@devlink/DcPopup';
import { GlobalBadge } from '@devlink/GlobalBadge';
import { GlobalEmptyState } from '@devlink/GlobalEmptyState';
import { Page404 } from '@devlink/Page404';
import { WorkflowConnectedCard } from '@devlink3/WorkflowConnectedCard';
import { WorkflowDetail } from '@devlink3/WorkflowDetail';
import { Dialog, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Loader from '@/components/Common/Loader';
import Seo from '@/components/Common/Seo';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useWorkflow } from '@/context/Workflows/[id]';
import {
  useJobWorkflowDisconnect,
  useJobWorkflowMutations,
} from '@/queries/job-workflow';
import { type Workflow } from '@/types/workflow.types';
import { formatOfficeLocation } from '@/utils/formatOfficeLocation';
import ROUTES from '@/utils/routing/routes';
import { capitalizeAll } from '@/utils/text/textUtils';

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
          onClickJob={{
            onClick: () => push(ROUTES['/jobs/[id]/workflows']({ id })),
            ...devlinkProps,
          }}
          onClickLinkOff={{
            onClick: () => setOpen(true),
          }}
          // onClickLinkOff={{
          //   onClick: async () => await mutateAsync({ job_id: id, workflow_id }),
          //   ...devlinkProps,
          // }}
        />
      </OptimisticWrapper>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DcPopup
          onClickClosePopup={{ onClick: () => setOpen(false) }}
          popupName='Unlink confirmation'
          slotBody={
            <Typography>
              Are you sure to unlink this job from this workflow ?
            </Typography>
          }
          slotButtons={
            <>
              <ButtonSoft
                textButton='Cancel'
                size={2}
                color={'neutral'}
                onClickButton={{ onClick: () => setOpen(false) }}
              />
              <ButtonSolid
                textButton='Unlink'
                size={2}
                onClickButton={{
                  onClick: async () =>
                    await mutateAsync({ job_id: id, workflow_id }),
                }}
              />
            </>
          }
        />
      </Dialog>
    </>
  );
};
