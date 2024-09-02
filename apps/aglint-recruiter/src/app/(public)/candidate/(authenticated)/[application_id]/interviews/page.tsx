'use client';
import { getFullName } from '@aglint/shared-utils';
import { Linkedin } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { type apiPortalInterviewsResponse } from '@/src/app/api/candidate_portal/get_interviews/route';
import { usePortalInterviews } from '@/src/components/CandiatePortal/hook';
import Loader from '@/src/components/Common/Loader';
import dayjs from '@/src/utils/dayjs';

export default function InterviewsPage({ params }) {
  const application_id = params.application_id;
  const { isLoading, data } = usePortalInterviews({ application_id });

  if (isLoading) {
    return <Loader />;
  }
  if (!data) return 'No data';

  const upcomingInterviews = data.filter(
    (interview) => interview.status === 'confirmed',
  );
  const pastInterviews = data.filter(
    (interview) => interview.status === 'completed',
  );

  if (data)
    return (
      <div className='container mx-auto max-w-screen-xl flex flex-col lg:flex-row gap-8 p-6'>
        <main className='lg:w-[70%] space-y-6'>
          <div>
            <h2 className='text-xl font-bold mb-4'>Upcoming interviews</h2>
            {upcomingInterviews.length > 0 ? (
              upcomingInterviews.map((interview, index) => (
                <InterviewCard key={index} interview={interview} />
              ))
            ) : (
              <p>No Upcoming interviews</p>
            )}
          </div>
          <div>
            <h2 className='text-xl font-bold mb-4'>Past interviews</h2>
            {pastInterviews.length > 0 ? (
              pastInterviews.map((interview, index) => (
                <InterviewCard key={index} interview={interview} />
              ))
            ) : (
              <p>No Past Interviews available</p>
            )}
          </div>
        </main>
        <aside className='lg:w-[30%] space-y-6'>
          {/* You can add additional content or widgets here */}
        </aside>
      </div>
    );
}

function InterviewCard({
  interview,
}: {
  interview: apiPortalInterviewsResponse[number];
}) {
  return (
    <Card className='mb-4 bg-background/80 backdrop-blur-sm shadow-sm border border-border'>
      <CardContent className='pt-4'>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex items-center'>
            <div className='bg-primary/10 text-primary rounded-md p-2 mr-3 text-center w-16 h-16 flex flex-col justify-center'>
              <span className='text-lg font-semibold'>
                {dayjs(interview.start_time).format('DD')}
              </span>
              <span className='text-xs'>
                {dayjs(interview.start_time).format('MMM')}
              </span>
            </div>
            <div>
              <p className='text-sm font-semibold'>
                {dayjs(interview.start_time).format('hh:mm A  - ')}
                {dayjs(interview.end_time).format('hh:mm A ')}
              </p>
              <p className='text-xs text-gray-500'>{interview.schedule_type}</p>
            </div>
          </div>
        </div>
        {interview.interviewers.map((participant, index) => (
          <div key={index} className='flex items-center mb-2'>
            <Avatar className='w-8 h-8 mr-3'>
              <AvatarImage src={participant.profile_image} />
              <AvatarFallback>
                {getFullName(participant.first_name, participant.last_name)}
              </AvatarFallback>
            </Avatar>
            <div className='flex-grow'>
              <div className='flex items-center'>
                <p className='text-sm font-semibold'>
                  {getFullName(participant.first_name, participant.last_name)}
                </p>
                <Linkedin className='w-4 h-4 ml-2 text-blue-500 cursor-pointer' />
              </div>
              {participant.position && (
                <p className='text-xs text-gray-500'>{participant.position}</p>
              )}
            </div>
          </div>
        ))}
        <div className='mt-4 flex space-x-2'>
          <Button
            variant='link'
            size='sm'
            className='text-xs p-0'
            onClick={() => {
              window.open(interview.meeting_link, '_blank');
            }}
          >
            Open Coding link
          </Button>
          <Button
            variant='link'
            size='sm'
            className='text-xs p-0'
            onClick={() => {
              window.open(interview.meeting_link, '_blank');
            }}
          >
            Join meeting
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// interface Interview {
//   date: Date;
//   startTime: string;
//   endTime: string;
//   timeZone: string;
//   platform: string;
//   participants: {
//     name: string;
//     role: string;
//   }[];
// }

// const upcomingInterviews: Interview[] = [
//   {
//     date: new Date(2023, 3, 13),
//     startTime: '9:00am',
//     endTime: '9:45am',
//     timeZone: 'PT',
//     platform: 'Zoom call',
//     participants: [
//       { name: 'Jim Halpert', role: 'Senior infra software engineer' },
//     ],
//   },
//   {
//     date: new Date(2023, 3, 13),
//     startTime: '9:00am',
//     endTime: '9:45am',
//     timeZone: 'PT',
//     platform: 'Zoom call',
//     participants: [
//       { name: 'Jim Halpert', role: 'Senior infra software engineer' },
//       { name: 'Jane M.', role: '' },
//       { name: 'Lydia Han', role: '' },
//     ],
//   },
//   {
//     date: new Date(2023, 3, 14),
//     startTime: '9:00am',
//     endTime: '9:45am',
//     timeZone: 'PT',
//     platform: 'Zoom call',
//     participants: [
//       { name: 'Jim Halpert', role: 'Senior infra software engineer' },
//       { name: 'Jane M.', role: '' },
//       { name: 'Lydia Han', role: '' },
//     ],
//   },
// ];

// const pastInterview: Interview[] = [
//   {
//     date: new Date(2023, 3, 5),
//     startTime: '9:00am',
//     endTime: '9:45am',
//     timeZone: 'PT',
//     platform: 'Zoom call',
//     participants: [
//       { name: 'Jim Halpert', role: 'Senior infra software engineer' },
//     ],
//   },
// ];
