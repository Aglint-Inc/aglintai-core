import React from 'react';

import {
  AssesmentCardLoader,
  AssessmentEmpty as AssessmentEmptyDev,
  AssessmentError as AssessmentErrorDev,
  AssessmentLandingBody,
} from '@/devlink2';
import {
  useAssessmentDashboard,
  useCreateAssessmentQueue,
} from '@/src/queries/assessment/dashboard';

import AssessmentCard from './assessmentCard';
import OptimisticWrapper from '../Common/wrapper/loadingWapper';
import { useAssessmentCreateEditModal } from '../Stores/modal';

const AssessmentDashboardBody = () => {
  return <AssessmentLandingBody slotAssessmentCards={<AssessmentGroups />} />;
};

export default AssessmentDashboardBody;

const AssessmentGroups = () => {
  const { status, data } = useAssessmentDashboard();
  const queue = useCreateAssessmentQueue();
  if (queue.length !== 0) return <AssessmentCards />;
  if (status === 'pending') return <LoadingCards />;
  if (status === 'error') return <AssessmentError />;
  if (data.length === 0) return <AssessmentEmpty />;
  return <AssessmentCards />;
};

const AssessmentError = () => {
  const { refetch } = useAssessmentDashboard();
  return <AssessmentErrorDev onClickRetry={{ onClick: () => refetch() }} />;
};

const AssessmentEmpty = () => {
  const { setOpen } = useAssessmentCreateEditModal();
  return (
    <AssessmentEmptyDev onClickCreate={{ onClick: () => setOpen(true) }} />
  );
};

const LoadingCards = () => {
  const cards = [...Array(16)].map((a, i) => <AssesmentCardLoader key={i} />);
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
  const { data } = useAssessmentDashboard();
  const cards = data.map((assessment) => (
    <AssessmentCard
      key={assessment.id}
      id={assessment.id}
      assessment={assessment}
    />
  ));
  return <>{cards}</>;
};

const FreshAssessmentCards = () => {
  const queue = useCreateAssessmentQueue();
  const cards = queue.map((queuedAssessment, i) => (
    <OptimisticWrapper key={i}>
      <AssessmentCard id={`${i}`} assessment={queuedAssessment} />
    </OptimisticWrapper>
  ));
  return <>{cards}</>;
};
