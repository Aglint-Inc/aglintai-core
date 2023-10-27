import { CandidateDatabaseComingSoon } from '@/devlink';
import Seo from '@/src/components/Common/Seo';

function CandidatesPage() {
  return (
    <>
    <Seo
        title='Aglint | Candidate Search'
        description='Find Your Ideal Candidate with AI-Powered Matching!'
      />
      <CandidateDatabaseComingSoon />
      {/* <CandidateDatabaseComp /> */}
    </>
  );
}

export default CandidatesPage;
