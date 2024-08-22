import { useEffect } from 'react';

import { useApplication } from '@/src/context/ApplicationContext';

import { setSelectedStageId, useApplicationDetailStore } from '../../../store';
import StageIndividual from './StageIndividual';

function StageSessions() {
  const {
    interview: { data: stages },
  } = useApplication();

  const { selectedStageId } = useApplicationDetailStore((state) => ({
    selectedStageId: state.selectedStageId,
  }));

  const filteredStages = stages.filter(
    (stage) => selectedStageId === stage.interview_plan.id,
  );

  useEffect(() => {
    if (stages.length > 0) {
      setSelectedStageId(stages[0].interview_plan.id);
    }
  }, [stages.length]);

  return (
    <>
      <>
        {filteredStages.map((stage, index) => {
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
