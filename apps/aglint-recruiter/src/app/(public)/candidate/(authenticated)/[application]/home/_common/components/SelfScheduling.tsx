import { dayjsLocal } from '@aglint/shared-utils';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import React from 'react';

import { type schedule } from '@/api/candidate_portal/home_page/route';
import { formatSessions } from '@/utils/formatSessions';

function SelfScheduling({ scheduleData }: { scheduleData: schedule }) {
  const latestSchedule = scheduleData
    .filter((item) => item.sessions?.[0]?.start_time)
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
        {latestSchedule ? (
          <SelfSchedulingComp schedule={latestSchedule} />
        ) : (
          <SelfSchedulingEmpty />
        )}
      </Card>
    </div>
  );
}

export default SelfScheduling;

const SelfSchedulingEmpty = () => {
  return (
    <CardContent className='p-0 pb-4 pl-4'>
      <CardHeader className='text-md p-4 pl-0 font-semibold'>
        Self Scheduling Request
      </CardHeader>
      <p className='text-muted-foreground'>No Self Scheduling Requests</p>
    </CardContent>
  );
};
const SelfSchedulingComp = ({ schedule }: { schedule: schedule[number] }) => {
  return (
    <>
      <CardHeader>
        <h2 className='font-semibold'>
          Self scheduling request for
          {formatSessions(schedule.sessions.map(({ name }) => name))}
        </h2>
        <p className='mb-4 text-sm text-gray-600'>
          Requested on $
          {dayjsLocal(schedule.created_at).format('mmm DD, hh:mm A')}
        </p>
      </CardHeader>
      <CardContent>
        <h5 className='mb-2'>
          Please schedule your next{' '}
          {formatSessions(schedule.sessions.map(({ name }) => name))} using the
          link below
        </h5>

        <Button
          className='w-full'
          onClick={() => {
            window.open(schedule.link, '_blank');
          }}
        >
          Self Schedule Now
        </Button>
      </CardContent>
    </>
  );
};
