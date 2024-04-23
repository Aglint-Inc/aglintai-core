import CandDbProvider from '@/src/components/CandidateDatabase/Database/CandDbProvider';
import CandDatabase from '@/src/components/CandidateDatabase/Database/Database';
import Seo from '@/src/components/Common/Seo';

const Candidates = () => {
  return (
    <>
      <Seo title={`Candidate Search`} description='AI for People Products' />
      <CandDbProvider>
        <CandDatabase />
      </CandDbProvider>
    </>
  );
};

export default Candidates;
