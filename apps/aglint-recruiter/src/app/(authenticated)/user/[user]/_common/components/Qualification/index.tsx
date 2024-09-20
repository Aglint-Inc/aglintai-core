import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { ScrollArea } from '@components/ui/scroll-area';
import { FileX } from 'lucide-react';

import { type InterviewerDetailType } from '../../hooks/useInterviewer';

export const Qualifications = ({
  interview_types,
}: {
  interview_types: InterviewerDetailType['interview_type'];
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl'>Qualifications</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className='h-[360px] w-full'>
          <div className='space-y-4'>
            {interview_types?.length ? (
              interview_types.map((interview_type, index) => (
                <div key={index} className='rounded-lg bg-gray-50 p-4'>
                  <h3 className='mb-2 text-base font-medium'>
                    {interview_type.module_name}
                  </h3>
                  <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
                    {/* <div>
                      <p className='text-sm text-gray-500'>Monthly Scheduled</p>
                      <p className='text-base font-bold'>-</p>
                    </div> */}
                    <div>
                      <p className='text-sm text-gray-500'>Duration</p>
                      <p className='text-base font-bold'>
                        {interview_type.completed_meeting_duration || 0} min
                      </p>
                    </div>
                    {/* <div>
                      <p className='text-sm text-gray-500'>Pass Rate</p>
                      <p className='text-base font-bold'>-</p>
                    </div> */}
                    <div>
                      <p className='text-sm text-gray-500'>Completed Slots</p>
                      <p className='text-base font-bold'>
                        {interview_type.completed_meeting_count || 0}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-500'>Upcoming Slots</p>
                      <p className='text-base font-bold'>
                        {interview_type.confirmed_meeting_count || 0}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-500'>Cancalled Slots</p>
                      <p className='text-base font-bold'>
                        {interview_type.cancelled_meeting_count || 0}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className='flex h-[100px] w-full flex-col items-center justify-center space-y-2 text-gray-500'>
                <FileX size={24} />
                <p>No qualifications found</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
