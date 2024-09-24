/* eslint-disable security/detect-object-injection */
import { useEffect } from 'react';

import { useKeyPress } from '@/hooks/useKeyPress';
import { useRouterPro } from '@/hooks/useRouterPro';

import { useInterviewStages } from '../../hooks/useInterviewStages';
import StageIndividual from './StageIndividual';

function StageSessions() {
  const router = useRouterPro();
  const { data: stages } = useInterviewStages();

  const selectedStageId = router.queryParams.stage as string;

  const filteredStages = (stages || []).filter(
    (stage) => selectedStageId === stage.interview_plan.id,
  );

  const sections = (stages || []).map((item) => item.interview_plan.id);
  const tabCount: number = sections.length - 1;
  const currentIndex: number = sections.indexOf(selectedStageId);

  const handlePrevious = () => {
    const pre =
      currentIndex === 0 ? sections[tabCount] : sections[currentIndex - 1];
    router.setQueryParams({ stage: pre });
  };

  const handleNext = () => {
    const next =
      currentIndex === tabCount ? sections[0] : sections[currentIndex + 1];
    router.setQueryParams({ stage: next });
  };

  const { pressed: up } = useKeyPress('ArrowUp');
  const { pressed: down } = useKeyPress('ArrowDown');

  useEffect(() => {
    if (up) handlePrevious();
    else if (down) handleNext();
  }, [down, up]);

  return (
    <>
      <>
        {filteredStages.map((stage) => {
          return (
            <StageIndividual key={stage.interview_plan.id} stage={stage} />
          );
        })}
      </>
    </>
  );
}

export default StageSessions;
