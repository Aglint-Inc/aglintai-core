import Seo from '@components/Common/Seo';

import JobAssessmentDashboard from '@/src/components/Jobs/Job/Assessment';
import { JobProvider } from '@/src/context/JobContext';
import JobDashboardProvider from '@/src/context/JobDashboard';

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
      <JobDashboardProvider>{page}</JobDashboardProvider>
    </JobProvider>
  );
};

export default JobAssessmentPage;
