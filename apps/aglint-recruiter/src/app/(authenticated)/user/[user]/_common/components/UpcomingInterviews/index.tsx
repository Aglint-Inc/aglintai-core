import { dayjsLocal, getFullName } from '@aglint/shared-utils';
import { Calendar } from 'lucide-react';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { UIButton } from '@/components/Common/UIButton';
import UISectionCard from '@/components/Common/UISectionCard';
import { useRouterPro } from '@/hooks/useRouterPro';

import { type InterviewerDetailType } from '../../hooks/useInterviewer';

export const UpcomingInterview = ({
  interviews,
}: {
  interviews: NonNullable<InterviewerDetailType['all_meetings']>;
}) => {
  return (
    <>
      <UISectionCard title='Upcoming Interviews'>
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
            header='No upcoming interviews found'
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
    <div className='flex items-center justify-between rounded-lg bg-gray-50 p-4'>
      <div>
        <h3 className='font-medium'>
          {getFullName(
            interview?.candidate?.first_name || '',
            interview?.candidate?.last_name || '',
          )}
        </h3>
        <p className='text-sm text-gray-500'>{interview.job}</p>
        <p className='text-sm text-gray-500'>
          {`${dayjsLocal(interview.start_time).format('YYYY-MM-DD')} at ${dayjsLocal(interview.start_time).format('hh:mm A')}`}
        </p>
      </div>
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
  );
};
