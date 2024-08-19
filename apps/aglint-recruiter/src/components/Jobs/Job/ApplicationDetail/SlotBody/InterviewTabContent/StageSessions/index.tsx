import { useApplication } from '@/src/context/ApplicationContext';

import StageIndividual from './StageIndividual';

function StageSessions() {
  const {
    interview: { data: stages },
  } = useApplication();

  return (
    <>
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
    </>
  );
}

export default StageSessions;
