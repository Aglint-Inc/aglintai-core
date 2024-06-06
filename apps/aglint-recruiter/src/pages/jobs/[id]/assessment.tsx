import Seo from '@components/Common/Seo';

import JobAssessmentDashboard from '@/src/components/JobAssessment';
import { ApplicationProvider } from '@/src/context/ApplicationsContext';
import { JobProvider } from '@/src/context/JobContext';
import JobDashboardProvider from '@/src/context/JobDashboard';
import JobInterviewPlanProvider from '@/src/context/JobInterviewPlanContext';

const JobAssessmentPage = () => {
  return (
    <>
      <Seo
        title={`Assessments - Job | Aglint AI`}
        description='AI for People Products'
      />
      <JobAssessmentDashboard />
    </>
  );
};

JobAssessmentPage.privateProvider = function privateProvider(page) {
  return (
    <JobProvider>
      <JobDashboardProvider>
        <JobInterviewPlanProvider>
          <ApplicationProvider>{page}</ApplicationProvider>
        </JobInterviewPlanProvider>
      </JobDashboardProvider>
    </JobProvider>
  );
};

export default JobAssessmentPage;
