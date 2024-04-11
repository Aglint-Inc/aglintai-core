import React from 'react';

import ScheduleProgress from '../components/Scheduling/Common/ScheduleProgress';

const Page = () => {
  return (
    <>
      <Comp />
    </>
  );
};

export default Page;

const Comp = () => {
  return (
    <>
      <ScheduleProgress
        sessions={[
          {
            duration: 30,
            name: 'ABC',
            scheduleType: 'google_meet',
            sessionType: 'debrief',
            status: 'cancelled',
          },
          {
            duration: 30,
            name: 'DEF',
            scheduleType: 'in_person_meeting',
            sessionType: 'individual',
            status: 'completed',
          },
          {
            duration: 30,
            name: 'GHI',
            scheduleType: 'phone_call',
            sessionType: 'panel',
            status: 'confirmed',
          },
          {
            duration: 30,
            name: 'JKL',
            scheduleType: 'zoom',
            sessionType: 'debrief',
            status: 'not_scheduled',
          },
          {
            duration: 30,
            name: 'MNO',
            scheduleType: 'google_meet',
            sessionType: 'individual',
            status: 'waiting',
          },
        ]}
      />
    </>
  );
};
