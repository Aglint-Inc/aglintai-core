import CandidateSearchHistory from '@/src/components/CandidateDatabase';
import Seo from '@/src/components/Common/Seo';

const history = () => {
  return (
    <>
      <Seo
        title='Aglint | Candidate Search History'
        description='Find Your Ideal Candidate with AI-Powered Matching!'
      />
      {<CandidateSearchHistory />}
    </>
  );
};

export default history;
