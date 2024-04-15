import CandidateSearchHistory from '@/src/components/CandidateDatabase';
import Seo from '@/src/components/Common/Seo';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

const History = () => {
  const { recruiter } = useAuthDetails();
  return (
    <>
      <Seo
        title={`${recruiter.name} | Candidate Search History`}
        description='AI for People Products'
      />
      <CandidateSearchHistory />
    </>
  );
};

export default History;
