import CandidateInviteNew from 'src/app/(public)/scheduling/invite/[id]/_common/components';

import Seo from '@/components/Common/Seo';
import CandidateInviteProvider from '@/context/CandidateInviteContext';

const CandidateInvitePage = () => {
  return (
    <>
      <CandidateInviteProvider>
        <Seo title={'Candidate Booking | Aglint AI'} />
        <CandidateInviteNew />
      </CandidateInviteProvider>
    </>
  );
};

export default CandidateInvitePage;
