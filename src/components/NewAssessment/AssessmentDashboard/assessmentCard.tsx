import React from 'react';

import {
  AssessmentCard as AssementCardDev,
  AssessmentDuration,
  AssessmentLevel as AssementLevelDev,
} from '@/devlink2';
import { type useAssessment } from '@/src/queries/assessment';
import { type AssessmentCard as TAssessmentCard } from '@/src/queries/assessment/types';

import { Advanced, Basic, Intermediate } from '../Common/svg/levels';
import {
  Cognitive,
  Culture,
  Langugage,
  Programming,
  Role,
  Situational,
  Software,
  Typing,
} from '../Common/svg/types';

type Assesment = ReturnType<typeof useAssessment>['data'][number];

const AssessmentCard: React.FC<{
  assessment: TAssessmentCard;
}> = ({ assessment }) => {
  return (
    <AssementCardDev
      textAssessmentName={assessment.title}
      textDescription={assessment.description}
      slotDurationAndLevel={<AssessmentDetails level={assessment.level} />}
      slotAssessmentType={getAssessmentTypeIcon(assessment.type)}
    />
  );
};

const AssessmentDetails: React.FC<{ level: Assesment['level'] }> = ({
  level,
}) => {
  return (
    <>
      <AssementLevelDev
        slotLevelIcon={getAssessmentLevelIcon(level)}
        textLevel={level}
      />
      <AssessmentDuration textDuration={'--'} />
    </>
  );
};

const getAssessmentLevelIcon = (level: Assesment['level']) => {
  switch (level) {
    case 'basic':
      return <Basic />;
    case 'intermediate':
      return <Intermediate />;
    case 'advanced':
      return <Advanced />;
  }
};

const getAssessmentTypeIcon = (type: Assesment['type']) => {
  switch (type) {
    case 'cognitive':
      return <Cognitive />;
    case 'language':
      return <Langugage />;
    case 'culture':
      return <Culture />;
    case 'programming':
      return <Programming />;
    case 'role':
      return <Role />;
    case 'situational':
      return <Situational />;
    case 'software':
      return <Software />;
    case 'typing':
      return <Typing />;
  }
};

export default AssessmentCard;
