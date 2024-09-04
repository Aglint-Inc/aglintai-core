import Seo from '@/components/Common/Seo';
import CandidateInviteNew from '@/components/Scheduling/CandidateInvite';
import CandidateInviteProvider from '@/context/CandidateInviteContext';

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
