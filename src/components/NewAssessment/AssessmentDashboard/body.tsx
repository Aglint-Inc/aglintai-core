import React from 'react';

import {
  AssesmentCardLoader,
  AssessmentEmpty as AssessmentEmptyDev,
  AssessmentError as AssessmentErrorDev,
  AssessmentLandingBody,
} from '@/devlink2';
import { useAllAssessments } from '@/src/queries/assessment';

import AssessmentCard from './card';
import OptimisticWrapper from '../Common/wrapper/loadingWapper';
import useAssessmentStore from '../Stores';

const AssessmentDashboardBody = () => {
  return <AssessmentLandingBody slotAssessmentCards={<AssessmentGroups />} />;
};

export default AssessmentDashboardBody;

const AssessmentGroups = () => {
  const { status, data } = useAllAssessments();
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
  const setCreateModal = useAssessmentStore((state) => state.setCreateModal);
  return (
    <AssessmentEmptyDev
      onClickCreate={{ onClick: () => setCreateModal(true) }}
    />
  );
};

const LoadingCards = () => {
  const cards = [...Array(16)].map((a, i) => <AssesmentCardLoader key={i} />);
  return <>{cards}</>;
};

const AssessmentCards = () => {
  const { data } = useAllAssessments();
  const cards = data.map((assessment) => {
    const card = (
      <AssessmentCard
        key={assessment.id}
        id={assessment.id}
        assessment={assessment}
      />
    );
    return assessment.loading ? (
      <OptimisticWrapper key={assessment.id}>{card}</OptimisticWrapper>
    ) : (
      card
    );
  });
  return <>{cards}</>;
};
