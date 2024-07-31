import Seo from '@/src/components/Common/Seo';
import CandidateInviteNew from '@/src/components/Scheduling/CandidateInvite';
import CandidateInviteProvider from '@/src/context/CandidateInviteContext';

const CandidateInvitePage = () => {
  return (
    <>
      <CandidateInviteProvider>
        <Seo title={'Candidate Booking | Aglint AI'} />
        <CandidateInviteNew />;
      </CandidateInviteProvider>
    </>
  );
};

export default CandidateInvitePage;
