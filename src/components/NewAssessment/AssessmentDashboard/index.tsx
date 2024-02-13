import { Breadcrum, PageLayout } from '@/devlink2';

import AssessmentDashboardActions from './assessmentDashboardActions';
import AssessmentDashboardBody from './assessmentDashboardBody';

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
