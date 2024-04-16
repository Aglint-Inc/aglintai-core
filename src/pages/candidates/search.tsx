import CandidatesSearch from '@/src/components/CandidateDatabase/Search/Search';
import Seo from '@/src/components/Common/Seo';
import CandidateSearchProvider from '@/src/context/CandidateSearchProvider/CandidateSearchProvider';

function CandidatesPage() {
  return (
    <>
      <Seo title={`Candidate Search`} description='AI for People Products' />
      <CandidateSearchProvider>
        <CandidatesSearch />
      </CandidateSearchProvider>
    </>
  );
}

export default CandidatesPage;
