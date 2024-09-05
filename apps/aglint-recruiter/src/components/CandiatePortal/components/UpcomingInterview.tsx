import { dayjsLocal, getFullName } from '@aglint/shared-utils';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader } from '@components/ui/card';

import { type apiPortalInterviewsResponse } from '@/app/api/candidate_portal/get_interviews/route';
import { capitalizeAll } from '@/utils/text/textUtils';

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
            {capitalizeAll(latestUpcoming.schedule_type)}
          </div>
        </div>
      </div>
      {latestUpcoming.interviewers.map((interviewer, index) => (
        <div className='flex items-center gap-2 mt-4' key={index}>
          <Avatar className='w-10 h-10 rounded-md overflow-hidden'>
            <AvatarImage
              className='w-10 h-10 rounded-md overflow-hidden'
              src={interviewer.profile_image}
              alt={interviewer.first_name}
            />
            <AvatarFallback>
              {interviewer?.first_name[0]}
              {interviewer?.last_name[0] || interviewer?.first_name[1]}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className='font-medium'>
              {getFullName(interviewer.first_name, interviewer.last_name)}
            </div>
            <div className='text-sm text-gray-600'>{interviewer.position}</div>
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
    </>
  );
};
