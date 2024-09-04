import CandDbProvider from '@/components/CandidateDatabase/Database/CandDbProvider';
import CandDatabase from '@/components/CandidateDatabase/Database/Database';
import Seo from '@/components/Common/Seo';

const Candidates = () => {
  return (
    <>
      <Seo
        title={`Talent Directory - Sourcing Hub | Aglint AI`}
        description='AI for People Products'
      />
      <CandDbProvider>
        <CandDatabase />
      </CandDbProvider>
    </>
  );
};

export default Candidates;
