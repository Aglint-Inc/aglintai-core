import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';

import { type InterviewerDetailType } from '../hook';
export const Qualifications = ({
  interview_types,
}: {
  interview_types: InterviewerDetailType['interview_type'];
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Qualifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='max-h-[360px] space-y-4 overflow-y-auto'>
          {interview_types?.length ? (
            interview_types.map((interview_type, index) => (
              <div key={index} className='rounded-lg bg-gray-50 p-4'>
                <h3 className='mb-2 text-base font-medium'>
                  {interview_type.module_name}
                </h3>
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
                  <div>
                    <p className='text-sm text-gray-500'>Monthly Scheduled</p>
                    <p className='text-base font-bold'>-</p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Avg. Duration</p>
                    <p className='text-base font-bold'>
                      {interview_type.completed_meeting_duration || 0} min
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Pass Rate</p>
                    <p className='text-base font-bold'>-</p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Upcoming Slots</p>
                    <p className='text-base font-bold'>
                      {interview_type.confirmed_meeting_count || 0}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='flex h-[100px] w-full items-center justify-center'>
              No Qulifications found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
