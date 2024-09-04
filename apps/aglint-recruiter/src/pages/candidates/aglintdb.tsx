import AppoloSearch from '@/components/CandidateDatabase/AppoloSearch';
import Seo from '@/components/Common/Seo';

function CandidatesPage() {
  return (
    <>
      <Seo
        title={`Discover Talent - Sourcing Hub | Aglint AI`}
        description='AI for People Products'
      />
      <AppoloSearch />
    </>
  );
}

export default CandidatesPage;
