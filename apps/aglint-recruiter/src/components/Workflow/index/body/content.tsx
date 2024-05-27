import { useRouter } from 'next/router';

import { WorkflowCard } from '@/devlink3/WorkflowCard';
import { WorkflowEmpty } from '@/devlink3/WorkflowEmpty';
import Loader from '@/src/components/Common/Loader';
import OptimisticWrapper from '@/src/components/NewAssessment/Common/wrapper/loadingWapper';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useWorkflows } from '@/src/context/Workflow';
import { useWorkflowDelete, useWorkflowState } from '@/src/queries/workflow';
import ROUTES from '@/src/utils/routing/routes';

import {
  useWorkflowStore,
  WorkflowStore,
} from '../../../../context/Workflow/store';

const Content = () => {
  const {
    workflows: { data, status },
  } = useWorkflows();
  if (status === 'error') return <>Error</>;
  if (status == 'pending') return <Loader />;
  return <Cards data={data} />;
};

export default Content;

const Cards = (props: {
  data: ReturnType<typeof useWorkflows>['workflows']['data'];
}) => {
  const { recruiter_id } = useAuthDetails();
  const { push } = useRouter();
  const filters = useWorkflowStore((state) => state.filters);
  const mutations = useWorkflowState({ recruiter_id });
  const { mutate: handleDelete } = useWorkflowDelete({ recruiter_id });
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
                if ((value as string[]).includes(curr)) acc.push(curr);
                return acc;
              }, []).length
            );
        }
      }, true);
    })
    .map(({ id, title, trigger, jobs }) => {
      const loading = !!mutations.find((mutation) => mutation.id === id);
      const jobCount = jobs.length;
      return (
        <OptimisticWrapper key={id} loading={loading}>
          <WorkflowCard
            key={id}
            textWorkflowName={title}
            textWorkflowTrigger={trigger}
            textJobs={`Used in ${jobCount} job${jobCount === 1 ? '' : 's'}`}
            onClickDelete={{ onClick: () => handleDelete({ id }) }}
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
