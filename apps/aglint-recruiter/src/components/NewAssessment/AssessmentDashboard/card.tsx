import { useRouter } from 'next/router';
import React from 'react';

import {
  AssessmentCard as AssementCardDev,
  AssessmentDuration,
  AssessmentLevel as AssementLevelDev,
} from '@/devlink2';
import { type Assessment } from '@/src/queries/assessment/types';

import LevelIcon from '../Common/icons/levels';
import TypeIcon from '../Common/icons/types';
import StatusTag from '../Common/tags/status';
import useAssessmentStore from '../Stores';

const AssessmentCard: React.FC<{
  id: string;
  assessment: Assessment;
}> = ({ id, assessment }) => {
  const router = useRouter();
  const setCurrentQuestion = useAssessmentStore(
    (state) => state.setCurrentQuestion,
  );
  return (
    <AssementCardDev
      textAssessmentName={assessment.title}
      textDescription={assessment.description}
      slotDurationAndLevel={
        <AssessmentDetails
          level={assessment.level}
          duration={assessment.duration}
        />
      }
      slotAssessmentType={<TypeIcon type={assessment.type} />}
      onClickCard={{
        onClick: () => {
          if (assessment.duration) setCurrentQuestion(0);
          router.push(`/assessment-new/${id}`);
        },
      }}
      slotAssessmentStatus={<StatusTag jobs={assessment.jobs} />}
    />
  );
};

export const AssessmentDetails: React.FC<{
  level: Assessment['level'];
  duration: Assessment['duration'];
}> = ({ level, duration }) => {
  return (
    <>
      <AssementLevelDev
        slotLevelIcon={<LevelIcon level={level} />}
        textLevel={level}
      />
      <AssessmentDuration textDuration={duration ? `${duration} mins` : '--'} />
    </>
  );
};

export default AssessmentCard;
