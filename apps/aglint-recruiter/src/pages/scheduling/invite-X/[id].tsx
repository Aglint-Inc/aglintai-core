import Seo from '@/src/components/Common/Seo';
import CandidateInviteNew from '@/src/components/Scheduling/CandidateInvite';
import CandidateInviteProvider from '@/src/context/CandidateInviteContext';

const CandidateInvitePage = () => {
  return (
    <>
      <Seo title={'Candidate Booking | Aglint AI'} />
      <CandidateInviteNew />;
    </>
  );
};
CandidateInvitePage.publicProvider = (page) => {
  return <CandidateInviteProvider>{page}</CandidateInviteProvider>;
};
export default CandidateInvitePage;
