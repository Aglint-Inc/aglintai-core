import { InterviewModuleStats, InterviewModuleStatsCard } from '@/devlink3';
import { useInterviewTrainingStatus } from '@/src/queries/scheduling-dashboard';

const TrainingStatus = () => {
  const { data, status } = useInterviewTrainingStatus();

  if (status === 'error') return <>Error</>;

  if (status === 'pending') return <>Loading...</>;

  if (!(!!data && !!Array.isArray(data) && data.length !== 0))
    return <>Empty</>;

  return <TrainingStatusComponent interviewTrainingStatus={data} />;
};

export default TrainingStatus;

type TrainingStatusProps = {
  interviewTrainingStatus: ReturnType<
    typeof useInterviewTrainingStatus
  >['data'];
};

const TrainingStatusComponent = ({
  interviewTrainingStatus,
}: TrainingStatusProps) => {
  const rows = interviewTrainingStatus.map(
    ({ id, name, training_status_count: { qualified, training } }) => (
      <InterviewModuleStatsCard
        key={id}
        textInterviewModule={name}
        textQualifiedMember={qualified}
        textTraineeShadow={training}
        textTraineeReverse={training}
      />
    ),
  );
  return <InterviewModuleStats slotInterviewModuleStatsCard={rows} />;
};
