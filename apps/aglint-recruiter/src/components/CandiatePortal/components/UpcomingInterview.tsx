import { dayjsLocal, getFullName } from '@aglint/shared-utils';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { apiPortalInterviewsResponse } from '@/src/app/api/candidate_portal/get_interviews/route';

// const interviewData = {
//   date: 'August 24 Sunday ',
//   time: '09:00 AM - 09:45 AM PT',
//   type: 'Recruiter initial call',
//   interviewers: [
//     {
//       name: 'Jane Margeret',
//       role: 'Recruiter',
//       image: '/images/user-1.jpg',
//     },
//     {
//       name: 'John D Sandrus',
//       role: 'HR Manager',
//       image: '/images/user-2.jpg',
//     },
//   ],
// };

function UpcomingInterview({
  upcomingData,
}: {
  upcomingData: apiPortalInterviewsResponse;
}) {
  const latestUpcoming = upcomingData.sort((a, b) =>
    dayjsLocal(a.start_time).isAfter(dayjsLocal(b.start_time)) ? 1 : -1,
  )[0];

  return (
    <div>
      <Card className='bg-background/80 backdrop-blur-sm shadow-sm border border-border'>
        <CardHeader>
          <h3 className='text-xl font-semibold'>Upcoming Interview</h3>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-gray-600 mb-4'>
            {dayjsLocal(latestUpcoming.start_time).format('MMMM DD dddd')}
          </p>
          {/* <p className='text-sm text-gray-600 mb-4'>{interviewData.date}</p> */}
          <div className='flex items-center justify-between'>
            <div>
              <div className='font-semibold'>
                {dayjsLocal(latestUpcoming.start_time).format('hh:mm A - ')}
                {dayjsLocal(latestUpcoming.end_time).format('hh:mm A')}
              </div>
              {/* <div className='font-semibold'>{interviewData.time}</div> */}
              <div className='text-sm text-gray-600'>
                {latestUpcoming.schedule_type}
              </div>
              {/* <div className='text-sm text-gray-600'>{interviewData.type}</div> */}
            </div>
          </div>
          {latestUpcoming.interviewers.map((interviewer, index) => (
            <div className='flex items-center gap-2 mt-4' key={index}>
              <Avatar className='w-10 h-10 rounded-md overflow-hidden'>
                <AvatarImage
                  src={interviewer.profile_image}
                  alt={interviewer.first_name}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <div className='font-medium'>
                  {getFullName(interviewer.first_name, interviewer.last_name)}
                </div>
                <div className='text-sm text-gray-600'>
                  {interviewer.position}
                </div>
              </div>
            </div>
          ))}
          <div className='flex w-full gap-2'>
            <Button
              className='w-full mt-4'
              onClick={() => {
                window.open('', '_blank');
              }}
            >
              Schedule Info
            </Button>
            <Button
              className='w-full mt-4'
              variant='outline'
              onClick={() => {
                window.open(latestUpcoming.meeting_link, '_blank');
              }}
            >
              Join meeting
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default UpcomingInterview;
