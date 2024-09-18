import { Skeleton } from '@components/ui/skeleton';

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
    interview: { data: stages, isLoading, refetch },
  } = useApplication();

  useInterviewModules(); //needed to fetch interview modules which is used in edit interview plan

  if (isLoading)
    return (
      <div className='flex flex-row gap-4'>
        <div className='flex min-w-[320px] flex-col space-y-4'>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className='h-[70px] w-full' />
          ))}
        </div>
        <div className='flex w-full flex-col space-y-4'>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className='h-[100px] w-full' />
          ))}
        </div>
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
