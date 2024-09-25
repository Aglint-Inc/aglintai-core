import { dayjsLocal, getFullName } from '@aglint/shared-utils';
import { Calendar } from 'lucide-react';

import { SectionCard } from '@/authenticated/components/SectionCard';
import { UIButton } from '@/components/Common/UIButton';
import { useRouterPro } from '@/hooks/useRouterPro';

import { type InterviewerDetailType } from '../../hooks/useInterviewer';

export const RecentInterviews = ({
  interviews,
}: {
  interviews: InterviewerDetailType['all_meetings'];
}) => {
  return (
    <>
      <SectionCard title='Recent Interviews'>
        {interviews?.length ? (
          <div className='space-y-4'>
            {interviews.map((interview) => (
              <List key={interview.id} interview={interview} />
            ))}
          </div>
        ) : (
          <div className='flex h-[100px] w-full flex-col items-center justify-center space-y-2 text-gray-500'>
            <Calendar className='h-8 w-8' />
            <p>No recent interviews</p>
          </div>
        )}
      </SectionCard>
    </>
  );
};

const List = ({
  interview,
}: {
  interview: NonNullable<InterviewerDetailType['all_meetings']>[number];
}) => {
  const router = useRouterPro();
  const candidate = interview?.candidate;

  const name = getFullName(
    candidate?.first_name ?? '',
    candidate?.last_name ?? '',
  );
  const date = `${dayjsLocal(interview.start_time).format('YYYY-MM-DD')} at ${dayjsLocal(interview.start_time).format('hh:mm A')}`;
  return (
    <div className='flex items-center justify-between rounded-lg bg-gray-50 p-4'>
      <div>
        <h3 className='font-medium'>{name}</h3>
        <p className='text-sm text-gray-500'>{interview.job}</p>
        <p className='text-sm text-gray-500'>{date}</p>
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
