import Seo from '@components/Common/Seo';

import ApplicationsDashboard from '@/src/components/Jobs/Job/Candidate-List';
import { ApplicationsProvider } from '@/src/context/ApplicationsContext';
import { JobProvider } from '@/src/context/JobContext';

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
    <JobProvider>
      <ApplicationsProvider>{page}</ApplicationsProvider>
    </JobProvider>
  );
};

export default JobCandidateListPage;
