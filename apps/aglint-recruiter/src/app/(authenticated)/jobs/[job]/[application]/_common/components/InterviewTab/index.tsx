import { type DatabaseTable } from '@aglint/shared-types';
import { Skeleton } from '@components/ui/skeleton';
import { UIAlert } from '@components/ui-alert';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import { UIButton } from '@/common/UIButton';
import UIDialog from '@/common/UIDialog';
import { useFlags } from '@/company/hooks/useFlags';
import CreateRequest from '@/job/components/Actions/CreateRequest';
import { type SessionType } from '@/job/components/Actions/CreateRequest/SessionsList';
import { api } from '@/trpc/client';

import { useApplicationDetails } from '../../hooks/useApplicationDetails';
import { useInterviewStages } from '../../hooks/useInterviewStages';
import SideDrawerEdit from '../EditDrawer';
import StageSessions from '../InterviewStage';
import Progress from '../InterviewStage/Progress';
import DialogSchedule from '../ScheduleDialog';
import { InterviewStage } from '../ui/InterviewStage';

function InterviewTabContent() {
  const params = useParams();
  const application_id = (params?.application ?? '') as string;
  const job_id = (params?.job ?? '') as string;
  const { data: stages, isLoading, error, refetch } = useInterviewStages();
  const { data: details, isLoading: isLoadingDetails } =
    useApplicationDetails();
  const { isShowFeature } = useFlags();

  const [request, setRequest] = useState<DatabaseTable['request'] | null>(null);
  const [priority, setPriority] = useState<'urgent' | 'standard'>('standard');
  const [note, setNote] = useState<string>('');
  const [selectedSession, setSelectedSession] = useState<SessionType[]>([]);
  const showRequest = isShowFeature('SCHEDULING') && selectedSession.length > 0;
  const [openMovePopup, setOpenMovePopup] = useState(false);
  const { mutate, isPending } = api.jobs.job.applications.move.useMutation({
    onSuccess: () => {
      setOpenMovePopup(false);
    },
  });

  async function handleSubmit() {
    mutate({
      status: 'interview',
      job_id: job_id,
      applications: [application_id],
      body: showRequest
        ? {
            request: { ...request!, note },
            sessions: selectedSession.map(({ id }) => id),
          }
        : null,
    });
  }
  if (isLoading || isLoadingDetails)
    return (
      <div className='grid grid-cols-[0.4fr_1fr] gap-4 px-4 pt-2'>
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
        <UIDialog
          title='Move candidate to interview stage'
          open={openMovePopup}
          onClickPrimary={handleSubmit}
          onClose={() => setOpenMovePopup(false)}
        >
          <CreateRequest
            setRequest={setRequest}
            setSelectedSession={setSelectedSession}
            selectedSession={selectedSession}
            setPriority={setPriority}
            priority={priority}
            note={note}
            setNote={setNote}
          />
        </UIDialog>
        <UIAlert
          type='info'
          title='Move candidate to interview stage'
          action={
            <UIButton
              onClick={() => setOpenMovePopup(true)}
              variant='outline'
              size='sm'
              isLoading={isPending}
              disabled={isPending}
            >
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
