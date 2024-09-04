import { dayjsLocal } from '@aglint/shared-utils';
// import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import React from 'react';

import { type apiPortalInterviewsResponse } from '@/app/api/candidate_portal/get_interviews/route';


// const dummyInterviews: apiPortalInterviewsResponse = [
//   {
//     start_time: '2023-10-01T10:00:00Z',
//     end_time: '2023-10-01T11:00:00Z',
//     session_name: 'Frontend Developer Interview',
//     session_duration: 60,
//     schedule_type: 'google_meet',
//     meeting_link: 'https://meet.google.com/example1',
//     status: 'confirmed',
//     session_id: 'session_1',
//     interviewers: [
//       {
//         first_name: 'Alice',
//         last_name: 'Smith',
//         profile_image: 'https://example.com/image1.jpg',
//         position: 'Senior Developer',
//       },
//     ],
//   },
//   {
//     start_time: '2023-10-02T14:00:00Z',
//     end_time: '2023-10-02T15:00:00Z',
//     session_name: 'Backend Developer Interview',
//     session_duration: 60,
//     schedule_type: 'in_person_meeting',
//     meeting_link: 'https://example.com/meeting2',
//     status: 'waiting',
//     session_id: 'session_2',
//     interviewers: [
//       {
//         first_name: 'Bob',
//         last_name: 'Johnson',
//         profile_image: 'https://example.com/image2.jpg',
//         position: 'Tech Lead',
//       },
//     ],
//   },
//   {
//     start_time: '2023-10-03T09:00:00Z',
//     end_time: '2023-10-03T10:00:00Z',
//     session_name: 'UX Designer Interview',
//     session_duration: 60,
//     schedule_type: 'zoom',
//     meeting_link: 'https://zoom.us/example3',
//     status: 'not_scheduled',
//     session_id: 'session_3',
//     interviewers: [
//       {
//         first_name: 'Charlie',
//         last_name: 'Brown',
//         profile_image: 'https://example.com/image3.jpg',
//         position: 'Product Manager',
//       },
//     ],
//   },
// ];

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
      <Card className='bg-background/80 backdrop-blur-sm shadow-sm border border-border '>
        <CardHeader className='p-4'>
          <h3 className='text-md font-semibold'>Upcoming Interview</h3>
         
        </CardHeader>
        <CardContent className='p-4 pt-0'>
          {latestUpcoming ? (
            <UpcomingCard latestUpcoming={latestUpcoming} />
          ) : (
            <UpcomingEmpty />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default UpcomingInterview;

const UpcomingEmpty = () => {
  return <h1 className='text-muted-foreground'>No Upcoming Interviews</h1>;
};

const UpcomingCard = ({
  latestUpcoming,
}: {
  latestUpcoming: apiPortalInterviewsResponse[number];
}) => {
  return (
    <>
    <div className='flex items-center gap-3'>
    <div className='flex flex-col items-center justify-center bg-gray-100 py-2 rounded-lg w-24'>
        <span className='text-sm font-normal text-gray-500'>
          {dayjsLocal(latestUpcoming.start_time).format('MMMM')}
        </span>
        <span className='text-2xl font-medium my-1'>
          {dayjsLocal(latestUpcoming.start_time).format('DD')}
        </span>
        <span className='text-sm font-medium text-gray-500'>
          {dayjsLocal(latestUpcoming.start_time).format('dddd')}
        </span>
      </div>
      <div className='flex flex-col gap-1'>
      <div className='font-semibold'>
            {dayjsLocal(latestUpcoming.start_time).format('hh:mm A - ')}
            {dayjsLocal(latestUpcoming.end_time).format('hh:mm A')}
          </div>
          <div className='text-md'>{latestUpcoming?.session_name}</div>
          <div className='text-sm text-gray-600'>
            {latestUpcoming.schedule_type}
          </div>
      </div>
      
    </div>
   
      {/* <p className='text-sm text-gray-600'>
        {dayjsLocal(latestUpcoming.start_time).format('MMMM DD dddd')}
      </p> */}

      {/* <p className='text-sm text-gray-600 mb-4'>{interviewData.date}</p> */}
      <div className='flex items-center justify-between'>
        <div>

          {/* <div className='font-semibold'>{interviewData.time}</div> */}
          
          {/* <div className='text-sm text-gray-600'>{interviewData.type}</div> */}
        </div>
      </div>

      {/* {latestUpcoming.interviewers.map((interviewer, index) => (
        <div className='flex items-center gap-2 mt-4' key={index}>
          <Avatar className='w-10 h-10 rounded-md overflow-hidden'>
            <AvatarImage
              className='w-10 h-10 rounded-md overflow-hidden'
              src={interviewer.profile_image}
              alt={interviewer.first_name}
            />
            <AvatarFallback className='w-10 h-10 rounded-md overflow-hidden'>
              {interviewer.first_name.charAt(0)}
              {interviewer.last_name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className='font-medium'>
              {getFullName(interviewer.first_name, interviewer.last_name)}
            </div>
            <div className='text-sm text-gray-600'>{interviewer.position}</div>
          </div>
        </div>
      ))} */}
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
    </>
  );
};
