import { dayjsLocal } from '@aglint/shared-utils';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import { BriefcaseBusinessIcon } from 'lucide-react';
import React from 'react';

import {
  type apiHomepageResponse,
  type availability,
} from '@/api/candidate_portal/home_page/route';

function RequestedAvailability({
  availabilityData,
  job,
}: {
  availabilityData: availability;
  job: apiHomepageResponse['job'];
}) {
  const latestAvailability = availabilityData
    .filter((item) => item.sessions?.[0]?.start_time) // Ensure sessions and start_time exist
    .sort((a, b) =>
      dayjsLocal(a.sessions![0].start_time).isAfter(
        dayjsLocal(b.sessions![0].start_time),
      )
        ? 1
        : -1,
    )[0];

  return (
    <div>
      <Card className='border border-border bg-background/80 shadow-sm backdrop-blur-sm'>
        {latestAvailability ? (
          <AvailabilityCard latestavailability={latestAvailability} job={job} />
        ) : (
          <AvailabilityEmpty />
        )}
      </Card>
    </div>
  );
}

export default RequestedAvailability;

const AvailabilityEmpty = () => {
  return (
    <CardContent className='p-0 pb-4 pl-4'>
      <CardHeader className='text-md p-4 pl-0 font-semibold'>
        Availability Request
      </CardHeader>
      <p className='text-muted-foreground'>No Availability Requests</p>
    </CardContent>
  );
};

const AvailabilityCard = ({
  latestavailability,
  job,
}: {
  latestavailability: availability[number];
  job: apiHomepageResponse['job'];
}) => {
  return (
    <>
      <CardHeader className='p-0 pb-4 pl-4 pt-4'>
        <h2 className='font-semibold'>Availability Requested</h2>
        <div className='flex items-center gap-2'>
          <BriefcaseBusinessIcon className='h-4 w-4' strokeWidth={1.5} />
          <div className='text-sm'>{job.name}</div>
        </div>

        <p className='text-sm text-gray-600'>
          Requested on{' '}
          {dayjsLocal(latestavailability.created_at).format(
            'MMM DD YYYY, hh:mm A',
          )}
        </p>
        {/* <p className='text-sm text-gray-600'>Requested on Aug 22, 05:00 PM</p> */}
      </CardHeader>
      <CardContent className='p-0 pb-4 pl-4 pr-4'>
        <Button
          className='w-full'
          variant='outline'
          onClick={() => {
            window.open(latestavailability.link, '_blank');
          }}
        >
          Submit availability
        </Button>
      </CardContent>
    </>
  );
};
