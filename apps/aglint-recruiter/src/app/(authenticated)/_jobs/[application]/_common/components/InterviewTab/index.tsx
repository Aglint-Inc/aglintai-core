import { Loader } from '@/components/Common/Loader';
import { useApplication } from '@/context/ApplicationContext';
import { ActionEmptyState } from '@/job/components/CandidateDrawer/Common/ActionEmptyState';
import { useInterviewModules } from '@/queries/interview-modules';

import SideDrawerEdit from '../EditDrawer';
import StageSessions from '../InterviewStage';
import Progress from '../InterviewStage/Progress';
import DialogSchedule from '../ScheduleDialog';
import { InterviewStage } from '../ui/InterviewStage';

function InterviewTabContent() {
  const {
    interview: { data: stages, isLoading: isLoadingSession, refetch },
    details: { isLoading: isLoadingDetail },
  } = useApplication();

  useInterviewModules(); //needed to fetch interview modules which is used in edit interview plan

  if (isLoadingSession || isLoadingDetail)
    return (
      <div className='flex h-[50vh] items-center justify-center'>
        <Loader />
      </div>
    );

  if (stages.length === 0)
    return (
      <div className='p-4'>
        <ActionEmptyState />
      </div>
    );

  return (
    <>
      <SideDrawerEdit refetch={refetch} />
      <InterviewStage
        slotInterviewStage={<StageSessions />}
        slotPipelineTab={<Progress />}
      />
      <DialogSchedule />
    </>
  );
}

export default InterviewTabContent;
