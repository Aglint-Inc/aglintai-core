import { Breadcrum, PageLayout } from '@/devlink2';

import AssessmentDashboardBody from './assessmentDashboardBody';
import AssessmentDashboardActions from './createAssessmentPopup';

const AssessmentDashboard = () => {
  return (
    <PageLayout
      slotTopbarLeft={<AssessmentDashboardBreadCrumbs />}
      slotTopbarRight={<AssessmentDashboardActions />}
      slotBody={<AssessmentDashboardBody />}
    />
  );
};

export default AssessmentDashboard;

const AssessmentDashboardBreadCrumbs = () => {
  return <Breadcrum textName={`Assessment`} />;
};
