import Seo from '@/src/components/Common/Seo';
import CandidateInvite from '@/src/components/Scheduling/CandidateInvite';

function CandidateSchedule() {
  return (
    <>
      <Seo title={`Interviewer`} description='AI for People Products' />
      <CandidateInvite />
    </>
  );
}

export default CandidateSchedule;

CandidateSchedule.getLayout = (page) => {
  return <>{page}</>;
};
