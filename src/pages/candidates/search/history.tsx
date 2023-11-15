import CandidateSearch from '@/src/components/CandidateDatabase/Search/History';
import Seo from '@/src/components/Common/Seo';

function CandidatesPage() {
  return (
    <>
      <Seo
        title='Aglint | Candidate Search'
        description='Find Your Ideal Candidate with AI-Powered Matching!'
      />
      <CandidateSearch />
      {/* <CandidateDatabaseComingSoon /> */}
      {/* <CandidateDatabaseComp /> */}
    </>
  );
}

export default CandidatesPage;
