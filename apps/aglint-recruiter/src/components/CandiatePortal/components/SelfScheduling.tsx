import { dayjsLocal } from '@aglint/shared-utils';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import React from 'react';

import { schedule } from '@/app/api/candidate_portal/home_page/route';

import { formatSessions } from '../../Jobs/Job/Candidate-List/utils';

function SelfScheduling({ scheduleData }: { scheduleData: schedule }) {
  const latestschedule = scheduleData.sort((a, b) =>
    dayjsLocal(a.sessions[0].start_time).isAfter(
      dayjsLocal(b.sessions[0].start_time),
    )
      ? 1
      : -1,
  )[0];
  return (
    <div>
      <Card className='bg-background/80 backdrop-blur-sm shadow-sm border border-border'>
        {latestschedule ? (
          <SelfSchedulingComp schedule={latestschedule} />
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
    <CardContent>
      <CardHeader>SelfScheduling Request</CardHeader>
      <p>No SelfScheduling request found</p>
    </CardContent>
  );
};
const SelfSchedulingComp = ({ schedule }) => {
  return (
    <>
      <CardHeader>
        <h2 className='font-semibold'>
          Self scheduling request for
          {formatSessions(schedule.sessions.map(({ name }) => name))}
        </h2>
        <p className='text-sm text-gray-600 mb-4'>
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
