import { useRouter } from 'next/router';

import { Breadcrum, PageLayout } from '@/devlink2';

// import AssessmentResetWrapper from '../Common/wrapper/resetWrapper';
import AssessmentPageActions from './actions';
import AssessmentPageBody from './body';
import { AssessmentPageContextProvider, useAssessment } from './context';

const AssessmentComponent = () => {
  return (
    // <AssessmentResetWrapper>
    <AssessmentPageContextProvider>
      <PageLayout
        slotTopbarLeft={<AssessmentComponentBreadCrumbs />}
        slotTopbarRight={<AssessmentPageActions />}
        slotBody={<AssessmentPageBody />}
      />
    </AssessmentPageContextProvider>
    // </AssessmentResetWrapper>
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
