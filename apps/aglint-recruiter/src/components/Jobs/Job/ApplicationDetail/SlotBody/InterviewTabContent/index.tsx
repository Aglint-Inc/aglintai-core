import { Stack } from '@mui/material';

import { InterviewStage } from '@/devlink3/InterviewStage';
import Loader from '@/src/components/Common/Loader';
import { useApplication } from '@/src/context/ApplicationContext';
import { useInterviewModules } from '@/src/queries/interview-modules';

import { ActionEmptyState } from '../../../Common/CandidateDrawer/Common/ActionEmptyState';
import Progress from '../Progress';
import DialogSchedule from './ScheduleDialog';
import StageSessions from './StageSessions';
import SideDrawerEdit from './StageSessions/EditDrawer';

function InterviewTabContent() {
  const {
    interview: { data: stages, isLoading: isLoadingSession, refetch },
    details: { isLoading: isLoadingDetail },
  } = useApplication();

  useInterviewModules(); //needed to fetch interview modules which is used in edit interview plan

  if (isLoadingSession || isLoadingDetail)
    return (
      <Stack height={'50vh'}>
        <Loader />
      </Stack>
    );

  if (stages.length === 0)
    return (
      <Stack padding={'var(--space-4)'}>
        <ActionEmptyState />
      </Stack>
    );

  return (
    <>
      <SideDrawerEdit refetch={refetch} />
      <InterviewStage
        slotInterviewStage={<StageSessions />}
        slotPiplineTab={<Progress />}
      />

      <DialogSchedule />
    </>
  );
}

export default InterviewTabContent;
