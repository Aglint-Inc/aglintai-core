import AppoloSearch from '@/src/components/CandidateDatabase/AppoloSearch';
import Seo from '@/src/components/Common/Seo';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

function CandidatesPage() {
  const { recruiter } = useAuthDetails();
  return (
    <>
      <Seo
        title={`${recruiter.name} | Candidate Search`}
        description='AI for People Products'
      />
      <AppoloSearch />
    </>
  );
}

export default CandidatesPage;
