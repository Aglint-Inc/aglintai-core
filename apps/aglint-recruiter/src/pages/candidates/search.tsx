import CandidatesSearch from '@/components/CandidateDatabase/Search/Search';
import Seo from '@/components/Common/Seo';
import CandidateSearchProvider from '@/context/CandidateSearchProvider/CandidateSearchProvider';

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
