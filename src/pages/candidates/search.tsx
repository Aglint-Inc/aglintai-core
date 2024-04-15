import CandidatesSearch from '@/src/components/CandidateDatabase/Search/Search';
import Seo from '@/src/components/Common/Seo';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import CandidateSearchProvider from '@/src/context/CandidateSearchProvider/CandidateSearchProvider';

function CandidatesPage() {
  const { recruiter } = useAuthDetails();
  return (
    <>
      <Seo
        title={`${recruiter.name} | Candidate Search`}
        description='AI for People Products'
      />
      <CandidateSearchProvider>
        <CandidatesSearch />
      </CandidateSearchProvider>
    </>
  );
}

export default CandidatesPage;
