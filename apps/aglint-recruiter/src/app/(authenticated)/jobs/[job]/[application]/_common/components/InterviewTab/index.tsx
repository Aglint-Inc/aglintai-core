import { Skeleton } from '@components/ui/skeleton';

import { UIAlert } from '@/components/Common/UIAlert';
import { useInterviewModules } from '@/queries/interview-modules';

import { useApplicationDetails } from '../../hooks/useApplicationDetails';
import { useInterviewStages } from '../../hooks/useInterviewStages';
import SideDrawerEdit from '../EditDrawer';
import StageSessions from '../InterviewStage';
import Progress from '../InterviewStage/Progress';
import DialogSchedule from '../ScheduleDialog';
import { InterviewStage } from '../ui/InterviewStage';

function InterviewTabContent() {
  const { data: stages, isLoading, refetch, error } = useInterviewStages();
  const { data: details, isLoading: isLoadingDetails } =
    useApplicationDetails();

  useInterviewModules(); //needed to fetch interview modules which is used in edit interview plan

  if (isLoading || isLoadingDetails)
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

  if (error) {
    return <UIAlert title={'Error Fetching Stages'} />;
  }

  if (details?.status === 'new') {
    return (
      <div className='p-4'>
        <UIAlert title={'Move candidate to interview stage'} />
      </div>
    );
  }

  if (stages?.length === 0)
    return (
      <div className='p-4'>
        <UIAlert title={'No Stages Found'} />
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
