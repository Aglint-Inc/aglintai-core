import CandidateDatabasePage from '@/src/components/CandidateDatabase/CandidateDatabase';
import CandidateSearchProvider from '@/src/components/CandidateDatabase/context/CandidateSearchProvider';
import Seo from '@/src/components/Common/Seo';

function CandidatesPage() {
  return (
    <>
      <Seo
        title='Aglint | Candidate Search'
        description='Find Your Ideal Candidate with AI-Powered Matching!'
      />
      <CandidateSearchProvider>
        <CandidateDatabasePage />
      </CandidateSearchProvider>
    </>
  );
}

export default CandidatesPage;
