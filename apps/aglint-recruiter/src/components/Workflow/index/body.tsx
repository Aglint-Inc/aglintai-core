import { WorkflowCard } from '@/devlink3/WorkflowCard';
import { WorkflowLanding } from '@/devlink3/WorkflowLanding';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import {
  useWorkflow,
  useWorkflowDelete,
  useWorkflowState,
} from '@/src/queries/workflow';

import Loader from '../../Common/Loader';
import OptimisticWrapper from '../../NewAssessment/Common/wrapper/loadingWapper';

const Body = () => {
  return (
    <WorkflowLanding
      slotSearchAndFilter={<SearchAndFilter />}
      slotWorkflowCard={<Content />}
    />
  );
};

export default Body;

const SearchAndFilter = () => {
  return <></>;
};

const Content = () => {
  const { recruiter_id } = useAuthDetails();
  const { data, status } = useWorkflow({ recruiter_id });
  if (status === 'error') return <>Error</>;
  if (status == 'pending') return <Loader />;
  return <Cards data={data} />;
};

const Cards = (props: { data: ReturnType<typeof useWorkflow>['data'] }) => {
  const { recruiter_id } = useAuthDetails();
  const { mutate: handleDelete } = useWorkflowDelete({ recruiter_id });
  const mutations = useWorkflowState({ recruiter_id });
  const cards = props.data.map(({ id, title, trigger }) => {
    const loading = !!mutations.find((mutation) => mutation.id === id);
    return (
      <OptimisticWrapper key={id} loading={loading}>
        <WorkflowCard
          key={id}
          textWorkflowName={title}
          textWorkflowTrigger={trigger}
          textJobs={'---'}
          onClickDelete={{ onClick: () => handleDelete({ id }) }}
        />
      </OptimisticWrapper>
    );
  });
  return <>{cards}</>;
};
