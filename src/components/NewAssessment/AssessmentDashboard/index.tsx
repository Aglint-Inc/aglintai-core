import { Breadcrum, PageLayout } from '@/devlink2';

import AssessmentDashboardActions from './actions';
import AssessmentDashboardBody from './body';
import AssessmentResetWrapper from '../Common/wrapper/resetWrapper';

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
