/* eslint-disable security/detect-object-injection */
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useApplication } from '@/src/context/ApplicationContext';
import { useKeyPress } from '@/src/hooks/useKeyPress';

import StageIndividual from './StageIndividual';

function StageSessions() {
  const router = useRouter();
  const {
    interview: { data: stages },
  } = useApplication();

  const selectedStageId = router.query.stage as string;

  const filteredStages = stages.filter(
    (stage) => selectedStageId === stage.interview_plan.id,
  );

  const sections = stages.map((item) => item.interview_plan.id);
  const tabCount: number = sections.length - 1;
  const currentIndex: number = sections.indexOf(selectedStageId);

  const handlePrevious = () => {
    const pre =
      currentIndex === 0 ? sections[tabCount] : sections[currentIndex - 1];
    const currentQuery = { ...router.query };
    currentQuery.stage = pre;
    router.replace({
      pathname: router.pathname,
      query: currentQuery,
    });
  };
  const handleNext = () => {
    const next =
      currentIndex === tabCount ? sections[0] : sections[currentIndex + 1];
    const currentQuery = { ...router.query };
    currentQuery.stage = next;
    router.replace({
      pathname: router.pathname,
      query: currentQuery,
    });
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
