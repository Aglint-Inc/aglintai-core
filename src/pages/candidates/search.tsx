import CandidatesSearch from '@/src/components/CandidateDatabase/Search/Search';
import Seo from '@/src/components/Common/Seo';
import CandidateSearchProvider from '@/src/context/CandidateSearchProvider/CandidateSearchProvider';

function CandidatesPage() {
  return (
    <>
      <Seo
        title='Aglint | Candidate Search'
        description='Find Your Ideal Candidate with AI-Powered Matching!'
      />
      <CandidateSearchProvider>
        <CandidatesSearch />
      </CandidateSearchProvider>
    </>
  );
}

export default CandidatesPage;
