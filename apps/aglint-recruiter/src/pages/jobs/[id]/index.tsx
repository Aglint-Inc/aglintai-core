import Seo from '@/components/Common/Seo';
import { ApplicationsProvider } from '@/context/ApplicationsContext';
import { JobProvider } from '@/context/JobContext';
import ApplicationsDashboard from '@/jobcomponents';

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
