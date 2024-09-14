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
        <div className='space-y-4 max-h-[360px] overflow-y-auto'>
          {interview_types?.length ? (
            interview_types.map((interview_type, index) => (
              <div key={index} className='bg-gray-50 p-4 rounded-lg'>
                <h3 className='text-base font-medium mb-2'>
                  {interview_type.module_name}
                </h3>
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
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
            <div className='w-full h-[100px] flex items-center justify-center'>
              No Qulifications found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
