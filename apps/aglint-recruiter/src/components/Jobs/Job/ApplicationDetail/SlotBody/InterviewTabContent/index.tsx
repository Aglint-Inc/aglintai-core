import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { InterviewPlanApplication } from '@/devlink2/InterviewPlanApplication';
import Loader from '@/src/components/Common/Loader';
import { useApplication } from '@/src/context/ApplicationContext';
import { useInterviewModules } from '@/src/queries/interview-modules';
import ROUTES from '@/src/utils/routing/routes';

import { ActionEmptyState } from '../../../Common/CandidateDrawer/Common/ActionEmptyState';
import Progress from '../Progress';
import DialogSchedule from './ScheduleDialog';
import StageSessions from './StageSessions';

function InterviewTabContent() {
  const {
    interview: { data: stages, isLoading: isLoadingSession },
    job_id,
  } = useApplication();

  const router = useRouter();
  useInterviewModules(); //needed to fetch interview modules which is used in edit interview plan

  if (isLoadingSession)
    return (
      <Stack height={'100%'}>
        <Loader />
      </Stack>
    );

  if (stages.length === 0)
    return (
      <Stack padding={'var(--space-4)'}>
        <ActionEmptyState
          title='No interview plans set up.'
          description='Set up interview plans to schedule interviews.'
          action={{
            title: 'Set up',
            onClick: () =>
              router.push(ROUTES['/jobs/[id]/interview-plan']({ id: job_id })),
          }}
        />
      </Stack>
    );

  return (
    <>
      <InterviewPlanApplication
        slotApplicantDetailStage={<StageSessions />}
        slotCandidateInterviewProgress={<Progress />}
      />
      <DialogSchedule />
    </>
  );
}

export default InterviewTabContent;
