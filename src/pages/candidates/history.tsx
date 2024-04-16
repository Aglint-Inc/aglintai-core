import CandidateSearchHistory from '@/src/components/CandidateDatabase';
import Seo from '@/src/components/Common/Seo';

const History = () => {
  return (
    <>
      <Seo
        title={`Candidate Search History`}
        description='AI for People Products'
      />
      <CandidateSearchHistory />
    </>
  );
};

export default History;
