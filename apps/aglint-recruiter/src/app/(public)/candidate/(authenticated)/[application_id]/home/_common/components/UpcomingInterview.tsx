import { dayjsLocal } from '@aglint/shared-utils';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader } from '@components/ui/card';

import { type apiPortalInterviewsResponse } from '@/api/candidate_portal/get_interviews/route';
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
      <Card className='border border-border bg-background/80 shadow-sm backdrop-blur-sm'>
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
        <div className='flex w-24 flex-col items-center justify-center rounded-lg bg-gray-100 py-2'>
          <span className='text-sm font-normal text-muted-foreground'>
            {dayjsLocal(latestUpcoming.start_time).format('MMMM')}
          </span>
          <span className='my-1 text-2xl font-medium'>
            {dayjsLocal(latestUpcoming.start_time).format('DD')}
          </span>
          <span className='text-sm font-medium text-muted-foreground'>
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

      <div className='flex w-full gap-2'>
        <Button
          className='mt-4 w-full'
          onClick={() => {
            window.open('', '_blank');
          }}
        >
          Schedule Info
        </Button>
        <Button
          className='mt-4 w-full'
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
