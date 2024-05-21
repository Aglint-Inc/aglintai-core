import CandidatesSearch from '@/src/components/CandidateDatabase/Search/Search';
import Seo from '@/src/components/Common/Seo';
import CandidateSearchProvider from '@/src/context/CandidateSearchProvider/CandidateSearchProvider';

function CandidatesPage() {
  return (
    <>
      <Seo
        title={`Talent Rediscovery - Sourcing Hub | Aglint AI`}
        description='AI for People Products'
      />
      <CandidateSearchProvider>
        <CandidatesSearch />
      </CandidateSearchProvider>
    </>
  );
}

export default CandidatesPage;
