import CandidateInviteNew from '@/src/components/Scheduling/CandidateInvite';
import CandidateInviteProvider from '@/src/context/CandidateInviteContext';

const CandidateInvitePage = () => {
  return <CandidateInviteNew />;
};
CandidateInvitePage.publicProvider = (page) => {
  return <CandidateInviteProvider>{page}</CandidateInviteProvider>;
};
export default CandidateInvitePage;
