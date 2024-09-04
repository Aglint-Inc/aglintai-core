import { dayjsLocal } from '@aglint/shared-utils';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import React from 'react';

import {
  type apiHomepageResponse,
  type availability,
} from '@/app/api/candidate_portal/home_page/route';
import dayjs from '@/utils/dayjs';

function RequestedAvailability({
  availabilityData,
  job,
}: {
  availabilityData: availability;
  job: apiHomepageResponse['job'];
}) {
  const latestavailability = availabilityData.sort((a, b) =>
    dayjsLocal(a.sessions[0].start_time).isAfter(
      dayjsLocal(b.sessions[0].start_time),
    )
      ? 1
      : -1,
  )[0];

  return (
    <div>
      <Card className='bg-background/80 backdrop-blur-sm shadow-sm border border-border'>
        {latestavailability ? (
          <AvailabilityCard latestavailability={latestavailability} job={job} />
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
    <CardContent>
      <CardHeader>Availability Request</CardHeader>
      <p>No availability request found</p>
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
      <CardHeader>
        <h2 className='font-semibold'>Availability Requested for {job.name}</h2>
        <p className='text-sm text-gray-600'>
          Requested on{' '}
          {dayjs(latestavailability.created_at).format('MMM DD YYYY, hh:mm A')}
        </p>
        {/* <p className='text-sm text-gray-600'>Requested on Aug 22, 05:00 PM</p> */}
      </CardHeader>
      <CardContent>
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
