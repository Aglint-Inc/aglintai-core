import { dayjsLocal, getFullName } from '@aglint/shared-utils';
import { Calendar } from 'lucide-react';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { UIButton } from '@/components/Common/UIButton';
import UISectionCard from '@/components/Common/UISectionCard';
import { useRouterPro } from '@/hooks/useRouterPro';

import {
  type InterviewerDetailType,
  useInterviewer,
} from '../../hooks/useInterviewer';

export const UpcomingInterview = () => {
  const {
    data: { all_meetings },
  } = useInterviewer();

  const interviews = all_meetings?.length
    ? all_meetings.filter((meeting) => meeting.status === 'confirmed')
    : [];

  return (
    <>
      <UISectionCard title='Upcoming Interviews' type='compact'>
        {interviews?.length > 0 ? (
          <div className='space-y-4'>
            {interviews.map((interview) => (
              <List key={interview.id} interview={interview} />
            ))}
          </div>
        ) : (
          <GlobalEmpty
            icon={
              <Calendar
                strokeWidth={2}
                className='h-6 w-6 text-muted-foreground'
              />
            }
            description='No upcoming interviews found'
          />
        )}
      </UISectionCard>
    </>
  );
};

const List = ({
  interview,
}: {
  interview: NonNullable<InterviewerDetailType['all_meetings']>[number];
}) => {
  const router = useRouterPro();
  return (
    <div className='flex items-center gap-4 rounded-lg'>
      <div className='flex h-[94px] w-[90px] flex-col items-center justify-center rounded-sm bg-gray-50'>
        <div className='text-sm'>
          {dayjsLocal(interview.start_time).format('MMMM')}
        </div>
        <div className='text-2xl font-semibold text-black'>
          {dayjsLocal(interview.start_time).format('DD')}
        </div>
        <div className='text-sm'>
          {dayjsLocal(interview.start_time).format('dddd')}
        </div>
      </div>
      <div className='flex flex-col items-start gap-2'>
        <h3 className='text-md font-medium'>
          {getFullName(
            interview?.candidate?.first_name || '',
            interview?.candidate?.last_name || '',
          )}{' '}
          for {interview.job}
        </h3>
        <p className='text-sm text-muted-foreground'>
          {' '}
          {dayjsLocal(interview.start_time).format('hh:mm A')} to{' '}
          {dayjsLocal(interview.end_time).format('hh:mm A')}
        </p>
        <UIButton
          onClick={() => {
            router.push(
              `/interviews/view?meeting_id=${interview.id}&tab=candidate_details`,
            );
          }}
          variant='outline'
          size='sm'
        >
          View Details
        </UIButton>
      </div>
    </div>
  );
};
