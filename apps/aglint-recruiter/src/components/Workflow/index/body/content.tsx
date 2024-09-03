import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { memo } from 'react';

import OptimisticWrapper from '@/components/loadingWapper';
import { LoaderSvg } from '@/devlink/LoaderSvg';
import { GlobalBadge } from '@/devlink3/GlobalBadge';
import { WorkflowCard } from '@/devlink3/WorkflowCard';
import { WorkflowEmpty } from '@/devlink3/WorkflowEmpty';
import { useWorkflows } from '@/src/context/Workflows';
import { type Workflow } from '@/src/types/workflow.types';
import ROUTES from '@/src/utils/routing/routes';
import { capitalizeSentence } from '@/src/utils/text/textUtils';

import { useWorkflowStore } from '../../../../context/Workflows/store';
import { getTriggerOption, TAG_OPTIONS } from '../../constants';
import { getFilteredWorkflows } from './filters';

const Content = memo(() => {
  const {
    workflows: { data, status },
  } = useWorkflows();
  if (status === 'error') return <>Error</>;
  if (status == 'pending')
    return (
      <Stack
        direction={'row'}
        alignItems={'center'}
        width={'100%'}
        height={'100vh'}
        justifyContent={'center'}
      >
        <LoaderSvg />
      </Stack>
    );
  return <Cards data={data} />;
});
Content.displayName = 'Content';

export default Content;

const Cards = (props: {
  data: ReturnType<typeof useWorkflows>['workflows']['data'];
}) => {
  const { devlinkProps } = useWorkflows();
  const { push } = useRouter();
  const { filters, setDeletion } = useWorkflowStore(
    ({ filters, setDeletion }) => ({ filters, setDeletion }),
  );
  const { workflowMutations: mutations } = useWorkflows();
  const cards = getFilteredWorkflows(filters, props.data).map(
    ({ id, title, trigger, phase, jobs, tags }) => {
      const loading = !!mutations.find((mutationId) => mutationId === id);
      const jobCount = (jobs ?? []).length;
      return (
        <OptimisticWrapper key={id} loading={loading}>
          <WorkflowCard
            key={id}
            border={'visible'}
            isCheckboxVisible={false}
            textWorkflowName={capitalizeSentence(title ?? '---')}
            slotBadge={<WorkflowTags tags={tags} />}
            textWorkflowTrigger={getTriggerOption(trigger, phase)}
            textJobs={`Used in ${jobCount} job${jobCount === 1 ? '' : 's'}`}
            onClickDelete={{
              onClick: () =>
                setDeletion({ open: true, workflow: { id, jobs } }),
              ...devlinkProps,
            }}
            onClickEdit={{
              onClick: () => push(ROUTES['/workflows/[id]']({ id })),
            }}
          />
        </OptimisticWrapper>
      );
    },
  );
  if (cards.length === 0) return <WorkflowEmpty />;
  return <>{cards}</>;
};

export const WorkflowTags = ({ tags }: Pick<Workflow, 'tags'>) => {
  return (tags ?? []).map((tag) => {
    // eslint-disable-next-line security/detect-object-injection
    const option = TAG_OPTIONS[tag];
    return (
      <GlobalBadge
        key={tag}
        textBadge={option.name}
        size={1}
        showIcon={!!option.iconName || !!option.icon}
        color={option.color}
        iconName={option.iconName}
        slotIcon={option.icon}
      />
    );
  });
};
