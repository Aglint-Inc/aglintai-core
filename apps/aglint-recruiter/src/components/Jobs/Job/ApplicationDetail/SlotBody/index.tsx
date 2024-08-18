
import { ApplicationDetail } from '@/devlink2/ApplicationDetail';

import CandidateInfo from './CandidateInfo';
import StageSessions from './StageSessions';

function SlotBody({
  application_id,
  job_id,
}: {
  application_id: string;
  job_id: string;
}) {

  return (
    <>
      <ApplicationDetail
        slotApplicantDetailStage={
          <StageSessions application_id={application_id} job_id={job_id} />
        }
        slotApplicantInfoBox={
          <CandidateInfo application_id={application_id} job_id={job_id} />
        }
      />
    </>
  );
}

export default SlotBody;
