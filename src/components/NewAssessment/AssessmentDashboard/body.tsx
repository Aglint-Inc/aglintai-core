import React from 'react';

import {
  AssesmentCardLoader,
  AssessmentEmpty as AssessmentEmptyDev,
  AssessmentError as AssessmentErrorDev,
  AssessmentLandingBody,
} from '@/devlink2';
import {
  useAllAssessments,
  useCreateAssessment,
} from '@/src/queries/assessment';

import AssessmentCard from './card';
import OptimisticWrapper from '../Common/wrapper/loadingWapper';
import useAssessmentStore from '../Stores';

const AssessmentDashboardBody = () => {
  return <AssessmentLandingBody slotAssessmentCards={<AssessmentGroups />} />;
};

export default AssessmentDashboardBody;

const AssessmentGroups = () => {
  const { status, data } = useAllAssessments();
  const { mutationQueue } = useCreateAssessment();
  if (mutationQueue.length !== 0) return <AssessmentCards />;
  if (status === 'pending') return <LoadingCards />;
  if (status === 'error') return <AssessmentError />;
  if (data.length === 0) return <AssessmentEmpty />;
  return <AssessmentCards />;
};

const AssessmentError = () => {
  const { refetch } = useAllAssessments();
  return <AssessmentErrorDev onClickRetry={{ onClick: () => refetch() }} />;
};

const AssessmentEmpty = () => {
  const setOpenModal = useAssessmentStore((state) => state.setOpenModal);
  return (
    <AssessmentEmptyDev onClickCreate={{ onClick: () => setOpenModal(true) }} />
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
  const { data } = useAllAssessments();
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
  const { mutationQueue } = useCreateAssessment();
  const cards = mutationQueue.map((queuedAssessment, i) => (
    <OptimisticWrapper key={i}>
      <AssessmentCard id={`${i}`} assessment={queuedAssessment} />
    </OptimisticWrapper>
  ));
  return <>{cards}</>;
};
