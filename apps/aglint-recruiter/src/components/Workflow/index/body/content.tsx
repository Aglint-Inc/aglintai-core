import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { memo } from 'react';

import { LoaderSvg } from '@/devlink/LoaderSvg';
import { WorkflowCard } from '@/devlink3/WorkflowCard';
import { WorkflowEmpty } from '@/devlink3/WorkflowEmpty';
import OptimisticWrapper from '@/src/components/NewAssessment/Common/wrapper/loadingWapper';
import { useWorkflows } from '@/src/context/Workflows';
import ROUTES from '@/src/utils/routing/routes';
import { capitalizeSentence } from '@/src/utils/text/textUtils';

import {
  useWorkflowStore,
  WorkflowStore,
} from '../../../../context/Workflows/store';
import { getTriggerOption } from '../../[id]/body/constants';

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
  const cards = props.data
    .filter(({ title, jobs }) => {
      return Object.entries(filters).reduce((acc, [key, value]) => {
        if (!acc) return acc;
        switch (key as keyof WorkflowStore['filters']) {
          case 'search':
            return title
              .toLowerCase()
              .includes((value as string).toLowerCase());
          case 'job':
            return (
              filters.job.length === 0 ||
              !!jobs.reduce((acc, curr) => {
                if ((value as string[]).includes(curr.id)) acc.push(curr);
                return acc;
              }, []).length
            );
        }
      }, true);
    })
    .map(({ id, title, trigger, phase, jobs, tags }) => {
      const loading = !!mutations.find((mutationId) => mutationId === id);
      const jobCount = (jobs ?? []).length;
      return (
        <OptimisticWrapper key={id} loading={loading}>
          <WorkflowCard
            key={id}
            border={'visible'}
            isCheckboxVisible={false}
            textWorkflowName={
              <Stack>
                <>{capitalizeSentence(title ?? '---')}</>
                {(tags ?? []).map((tag) => (
                  <Stack key={tag} color={'red'}>
                    {tag}
                  </Stack>
                ))}
              </Stack>
            }
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
    });
  if (cards.length === 0) return <WorkflowEmpty />;
  return <>{cards}</>;
};
