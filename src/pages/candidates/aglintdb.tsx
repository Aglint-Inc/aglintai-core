import AppoloSearch from '@/src/components/CandidateDatabase/AppoloSearch';
import Seo from '@/src/components/Common/Seo';

function CandidatesPage() {
  return (
    <>
      <Seo
        title='Aglint | Candidate Search'
        description='Find Your Ideal Candidate with AI-Powered Matching!'
      />
        <AppoloSearch />
    </>
  );
}

export default CandidatesPage;
