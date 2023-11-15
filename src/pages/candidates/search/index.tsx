import Search from '@/src/components/CandidateDatabase/Search/Search';
import Seo from '@/src/components/Common/Seo';

function CandidatesPage() {
  return (
    <>
      <Seo
        title='Aglint | Candidate Search'
        description='Find Your Ideal Candidate with AI-Powered Matching!'
      />
      <Search />
    </>
  );
}

export default CandidatesPage;
