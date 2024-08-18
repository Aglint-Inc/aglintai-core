import { applicationQuery } from '@/src/queries/application';
import { useQuery } from '@tanstack/react-query';
import StageIndividual from './StageIndividual';

function StageSessions({
  application_id,
  job_id,
}: {
  application_id: string;
  job_id: string;
}) {
  const { data: stages, isLoading: isLoadingSession } = useQuery(
    applicationQuery.interview({
      application_id,
      job_id,
      enabled: true,
    }),
  );

  return (
    <>
      {isLoadingSession ? (
        <div>Loading...</div>
      ) : (
        <>
          {stages.map((stage, index) => {
            return (
              <StageIndividual
                key={stage.interview_plan.id}
                stage={stage}
                index={index}
              />
            );
          })}
        </>
      )}
    </>
  );
}

export default StageSessions;
