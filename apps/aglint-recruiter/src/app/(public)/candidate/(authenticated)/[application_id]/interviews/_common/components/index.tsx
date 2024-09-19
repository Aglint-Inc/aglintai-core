'use client';
import { getFullName } from '@aglint/shared-utils';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import { Card, CardContent } from '@components/ui/card';
import { Calendar, Linkedin } from 'lucide-react';

import EmptyState from '@/candidate/authenticated/components/EmptyState';
import dayjs from '@/utils/dayjs';
import { capitalizeAll } from '@/utils/text/textUtils';

import { useCandidatePortalInterviews } from '../hooks';
import InterviewsSkeleton from './skeleton/InterviewSkeleton';

export default function InterviewsPage() {
  const { isPending, data } = useCandidatePortalInterviews();

  if (isPending) {
    return <InterviewsSkeleton />;
  }

  const upcoming =
    data?.filter((interview) => interview.status === 'confirmed') || [];
  const past =
    data?.filter((interview) => interview.status === 'completed') || [];

  return (
    <div className='container mx-auto flex flex-col gap-8 p-6'>
      <main className='mx-auto space-y-6 lg:w-[70%]'>
        <div>
          <h2 className='mb-4 text-lg font-semibold'>Upcoming interviews</h2>
          {upcoming?.length > 0 ? (
            upcoming.map((interview, index) => (
              <InterviewCard key={index} interview={interview} />
            ))
          ) : (
            <div className='h-60'>
              <EmptyState icon={Calendar} text='No upcoming interviews' />
            </div>
          )}
        </div>
        <div>
          <h2 className='mb-4 text-lg font-semibold'>Past interviews</h2>
          {past?.length > 0 ? (
            past.map((interview, index) => (
              <InterviewCard key={index} interview={interview} />
            ))
          ) : (
            <div className='h-60'>
              <EmptyState icon={Calendar} text='No Past interviews' />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function InterviewCard({
  interview,
}: {
  interview: ReturnType<typeof useCandidatePortalInterviews>['data'][number];
}) {
  return (
    <Card className='mb-4 border border-border bg-background/80 shadow-sm backdrop-blur-sm'>
      <CardContent className='pt-4'>
        <div className='mb-4 flex items-center justify-between'>
          <div className='flex items-center'>
            <div className='mr-3 flex h-16 w-16 flex-col justify-center rounded-md bg-primary/10 p-2 text-center text-primary'>
              <span className='text-xs'>
                {dayjs(interview.start_time).format('dddd')}
              </span>
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
              <p className='text-xs text-gray-500'>
                {capitalizeAll(interview.schedule_type)}
              </p>
            </div>
          </div>
        </div>
        {interview.interviewers.map((participant, index) => (
          <div key={index} className='mb-2 flex items-center'>
            <Avatar className='mr-3 h-8 w-8'>
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
                <Linkedin className='ml-2 h-4 w-4 cursor-pointer text-blue-500' />
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
            className='p-0 text-xs'
            onClick={() => {
              window.open(interview.meeting_link, '_blank');
            }}
          >
            Open Coding link
          </Button>
          <Button
            variant='link'
            size='sm'
            className='p-0 text-xs'
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
