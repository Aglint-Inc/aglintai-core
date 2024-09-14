import { dayjsLocal, getFullName } from '@aglint/shared-utils';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { useRouter } from 'next/router';

import { UIButton } from '@/components/Common/UIButton';

import { type InterviewerDetailType } from '../hook';

export const RecentInterviews = ({
  interviews,
}: {
  interviews: InterviewerDetailType['all_meetings'];
}) => {
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Interviews</CardTitle>
      </CardHeader>
      <CardContent>
        {interviews?.length > 0 ? (
          <div className='space-y-4'>
            {interviews.map((interview, index) => (
              <div
                key={index}
                className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'
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
                      `/scheduling/view?meeting_id=${interview.id}&tab=candidate_details`,
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
          <div className='w-full h-[100px] flex items-center justify-center'>
            No recent
          </div>
        )}
      </CardContent>
    </Card>
  );
};
