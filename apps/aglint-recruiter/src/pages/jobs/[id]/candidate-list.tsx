import Seo from '@components/Common/Seo';

import JobApplicationsDashboard from '@/src/components/JobApplicationsDashboard';
import { ApplicationProvider } from '@/src/context/ApplicationsContext';
import JobApplicationProvider from '@/src/context/JobApplicationsContext';
import JobDashboardProvider from '@/src/context/JobDashboard';
import JobInterviewPlanProvider from '@/src/context/JobInterviewPlanContext';

const JobCandidateListPage = () => {
  return (
    <>
      <Seo
        title='Candidate List - Job | Aglint AI'
        description='AI for People Products'
      />
      <JobApplicationsDashboard />
    </>
  );
};

JobCandidateListPage.privateProvider = function privateProvider(page) {
  return (
    <JobDashboardProvider>
      <ApplicationProvider>
        <JobInterviewPlanProvider>
          <JobApplicationProvider>{page}</JobApplicationProvider>
        </JobInterviewPlanProvider>
      </ApplicationProvider>
    </JobDashboardProvider>
  );
};

export default JobCandidateListPage;
