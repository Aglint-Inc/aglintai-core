import { Breadcrum, PageLayout } from '@/devlink2';

import AssessmentResetWrapper from '../Common/wrapper/resetWrapper';
import AssessmentDashboardActions from './actions';
import AssessmentDashboardBody from './body';

const AssessmentDashboard = () => {
  return (
    <AssessmentResetWrapper>
      <PageLayout
        slotTopbarLeft={<AssessmentDashboardBreadCrumbs />}
        slotTopbarRight={<AssessmentDashboardActions />}
        slotBody={<AssessmentDashboardBody />}
      />
    </AssessmentResetWrapper>
  );
};

export default AssessmentDashboard;

const AssessmentDashboardBreadCrumbs = () => {
  return <Breadcrum textName={`Assessment`} />;
};
