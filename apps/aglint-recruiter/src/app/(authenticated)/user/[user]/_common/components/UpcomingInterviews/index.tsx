import { dayjsLocal, getFullName } from '@aglint/shared-utils';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Calendar } from 'lucide-react';

import { UIButton } from '@/components/Common/UIButton';
import { useRouterPro } from '@/hooks/useRouterPro';

import { type InterviewerDetailType } from '../../hooks/useInterviewer';

export const UpcomingInterview = ({
  interviews,
}: {
  interviews: InterviewerDetailType['all_meetings'];
}) => {
  const router = useRouterPro();
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl'>Upcoming Interviews</CardTitle>
      </CardHeader>
      <CardContent>
        {interviews?.length > 0 ? (
          <div className='space-y-4'>
            {interviews.map((interview, index) => (
              <div
                key={index}
                className='flex items-center justify-between rounded-lg bg-gray-50 p-4'
              >
                <div>
                  <h3 className='font-medium'>
                    {getFullName(
                      interview.candidate.first_name,
                      interview.candidate.last_name,
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
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center py-10'>
            <Calendar className='h-12 w-12 text-gray-400' />
            <p className='mt-4 text-gray-600'>
              No upcoming interviews scheduled.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
