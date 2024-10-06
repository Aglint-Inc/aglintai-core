import { Skeleton } from '@components/ui/skeleton';
import { UIAlert } from '@components/ui-alert';

import { UIButton } from '@/common/UIButton';

import { useApplicationDetails } from '../../hooks/useApplicationDetails';
import { useInterviewStages } from '../../hooks/useInterviewStages';
import SideDrawerEdit from '../EditDrawer';
import StageSessions from '../InterviewStage';
import Progress from '../InterviewStage/Progress';
import DialogSchedule from '../ScheduleDialog';
import { InterviewStage } from '../ui/InterviewStage';

function InterviewTabContent() {
  const { data: stages, isLoading, error, refetch } = useInterviewStages();
  const { data: details, isLoading: isLoadingDetails } =
    useApplicationDetails();

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
    return <UIAlert type='error' title='Error Fetching Stages' />;
  }

  if (details?.status === 'new') {
    return (
      <div className='p-4'>
        <UIAlert
          type='info'
          title='Move candidate to interview stage'
          action={
            <UIButton variant='default' size='sm'>
              Move
            </UIButton>
          }
        />
      </div>
    );
  }

  if (stages?.length === 0)
    return (
      <div className='p-4'>
        <UIAlert
          type='info'
          title='No Stages Found'
          action={
            <UIButton variant='default' size='sm'>
              Create Stage
            </UIButton>
          }
        />
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
