import React from 'react';

import {
  AssesmentCardLoader,
  AssessmentEmpty,
  AssessmentError as AssessmentErrorDev,
  AssessmentLandingBody,
} from '@/devlink2';
import {
  useAssessment,
  useCreateAssessmentQueue,
} from '@/src/queries/assessment';

import AssessmentCard from './assessmentCard';
import OptimisticWrapper from '../Common/wrapper/LoadingWapper';

const AssessmentDashboardBody = () => {
  return <AssessmentLandingBody slotAssessmentCards={<AssessmentGroups />} />;
};

const AssessmentGroups = () => {
  const { status, data } = useAssessment();
  if (status === 'pending') return <LoadingCards />;
  if (status === 'error') return <AssessmentError />;
  if (data.length === 0) return <AssessmentEmpty />;
  return <AssessmentCards />;
};

const AssessmentError = () => {
  const { retry } = useAssessment();
  return <AssessmentErrorDev onClickRetry={{ onClick: () => retry() }} />;
};

const LoadingCards = () => {
  const cards = [...Array(16)].map((i) => <AssesmentCardLoader key={i} />);
  return <>{cards}</>;
};

const AssessmentCards = () => {
  return (
    <>
      <OldAssessmentCards />
      <FreshAssessmentCards />
    </>
  );
};

const OldAssessmentCards = () => {
  const { data } = useAssessment();
  const cards = data.map((assessment) => (
    <AssessmentCard key={assessment.id} assessment={assessment} />
  ));
  return <>{cards}</>;
};

const FreshAssessmentCards = () => {
  const queue = useCreateAssessmentQueue();
  const cards = queue.map((queuedAssessment, i) => (
    <OptimisticWrapper key={i}>
      <AssessmentCard assessment={queuedAssessment} />
    </OptimisticWrapper>
  ));
  return <>{cards}</>;
};

export default AssessmentDashboardBody;
