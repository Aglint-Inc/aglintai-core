import Seo from '@/components/Common/Seo';
import ApplicationsDashboard from '@/components/Jobs/Job/Candidate-List';
import { ApplicationsProvider } from '@/context/ApplicationsContext';
import { JobProvider } from '@/context/JobContext';

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
