import { useRouter } from 'next/dist/client/router';

import CandidateSearchHistory from '@/components/CandidateDatabase';
import Seo from '@/components/Common/Seo';

const History = () => {
  const {
    query: { currentTab },
  } = useRouter();
  return (
    <>
      {currentTab === 'discover talent' && (
        <Seo
          title={`Discover Talent - Sourcing Hub | Aglint AI`}
          description='AI for People Products'
        />
      )}
      {currentTab === 'talent rediscovery' && (
        <Seo
          title={`Talent Rediscovery - Sourcing Hub | Aglint AI`}
          description='AI for People Products'
        />
      )}

      <CandidateSearchHistory />
    </>
  );
};

export default History;
