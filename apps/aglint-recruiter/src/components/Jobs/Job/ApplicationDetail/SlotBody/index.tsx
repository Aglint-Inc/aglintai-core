import { useRouter } from 'next/router';

import { ApplicationDetail } from '@/devlink2/ApplicationDetail';

import CandidateInfo from './CandidateInfo';
import Progress from './Progress';
import StageSessions from './StageSessions';
import Tabs, { TabsType } from './Tabs';

function SlotBody({
  application_id,
  job_id,
}: {
  application_id: string;
  job_id: string;
}) {
  const router = useRouter();
  const tab = router.query.tab as TabsType;
  return (
    <>
      <ApplicationDetail
        slotApplicantDetailStage={
          tab === 'stages' ? (
            <StageSessions application_id={application_id} job_id={job_id} />
          ) : tab === 'activity' ? (
            ''
          ) : (
            ''
          )
        }
        slotApplicantInfoBox={
          <CandidateInfo application_id={application_id} job_id={job_id} />
        }
        slotCandidateInterviewProgress={
          tab === 'stages' && (
            <Progress application_id={application_id} job_id={job_id} />
          )
        }
        slotTab={<Tabs application_id={application_id} job_id={job_id} />}
      />
    </>
  );
}

export default SlotBody;
