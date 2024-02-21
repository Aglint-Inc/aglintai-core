import { useRouter } from 'next/router';
import React from 'react';

import {
  AssessmentCard as AssementCardDev,
  AssessmentDuration,
  AssessmentLevel as AssementLevelDev,
} from '@/devlink2';
import { type useAllAssessments } from '@/src/queries/assessment';
import { type AssessmentCreate as TAssessmentCreate } from '@/src/queries/assessment/types';

import LevelIcon from '../Common/icons/levels';
import TypeIcon from '../Common/icons/types';
import StatusTag from '../Common/tags/status';

type Assesment = ReturnType<typeof useAllAssessments>['data'][number];

const AssessmentCard: React.FC<{
  id: string;
  assessment: TAssessmentCreate;
}> = ({ id, assessment }) => {
  const router = useRouter();
  return (
    <AssementCardDev
      textAssessmentName={assessment.title}
      textDescription={assessment.description}
      slotDurationAndLevel={<AssessmentDetails level={assessment.level} />}
      slotAssessmentType={<TypeIcon type={assessment.type} />}
      onClickCard={{ onClick: () => router.push(`/assessment-new/${id}`) }}
      slotAssessmentStatus={<StatusTag status='draft' />}
    />
  );
};

const AssessmentDetails: React.FC<{ level: Assesment['level'] }> = ({
  level,
}) => {
  return (
    <>
      <AssementLevelDev
        slotLevelIcon={<LevelIcon level={level} />}
        textLevel={level}
      />
      <AssessmentDuration textDuration={'--'} />
    </>
  );
};

export default AssessmentCard;
