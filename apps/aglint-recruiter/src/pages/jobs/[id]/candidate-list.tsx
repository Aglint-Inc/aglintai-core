import Seo from '@components/Common/Seo';

import ApplicationsDashboard from '@/src/components/JobNewApplications';
import { ApplicationProvider } from '@/src/context/ApplicationsContext';
import JobDashboardProvider from '@/src/context/JobDashboard';
import JobInterviewPlanProvider from '@/src/context/JobInterviewPlanContext';

const JobCandidateListPage = () => {
  return (
    <>
      <Seo
        title='Candidate List - Job | Aglint AI'
        description='AI for People Products'
      />
      <ApplicationsDashboard />
    </>
  );
};

JobCandidateListPage.privateProvider = function privateProvider(page) {
  return (
    <JobDashboardProvider>
      <JobInterviewPlanProvider>
        <ApplicationProvider>{page}</ApplicationProvider>
      </JobInterviewPlanProvider>
    </JobDashboardProvider>
  );
};

export default JobCandidateListPage;
