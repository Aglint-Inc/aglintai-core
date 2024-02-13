import { useRouter } from 'next/router';

import { Breadcrum, PageLayout } from '@/devlink2';
import { useAssessment } from '@/src/queries/assessment/pages';

import AssessmentPageActions from './assessmentPageActions';
import AssessmentPageBody from './assessmentPageBody';

const AssessmentComponent = () => {
  return (
    <PageLayout
      slotTopbarLeft={<AssessmentComponentBreadCrumbs />}
      slotTopbarRight={<AssessmentPageActions />}
      slotBody={<AssessmentPageBody />}
    />
  );
};

export default AssessmentComponent;

const AssessmentComponentBreadCrumbs = () => {
  const router = useRouter();
  const { assessment } = useAssessment();
  return (
    <>
      <Breadcrum
        key={0}
        textName={`Assessment`}
        isLink
        onClickLink={{ onClick: () => router.push('/assessment-new') }}
      />
      <Breadcrum textName={assessment?.title ?? '---'} showArrow />
    </>
  );
};
