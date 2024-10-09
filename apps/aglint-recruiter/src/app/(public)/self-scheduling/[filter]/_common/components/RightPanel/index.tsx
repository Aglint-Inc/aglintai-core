'use client';

import React from 'react';

import { useCandidateInviteStore } from '../../store';
import { dayJS } from '../../utils/utils';
import { CandidateScheduleCard } from '../ui/CandidateScheduleCard';
import { SelectedDateAndTime } from '../ui/SelectedDateAndTime';
import { SessionAndTime } from '../ui/SessionAndTime';
import { SessionDetails } from './SessionDetails';

function RightPanel() {
  const { selectedSlots, timezone } = useCandidateInviteStore();
  console.log(selectedSlots);

  return (
    <div className='flex flex-col gap-2'>
      <SessionDetails />
      {selectedSlots?.map((slot) => {
        const [month, date, day] = dayJS(
          selectedSlots?.[0]?.sessions?.[0]?.start_time ?? null,
          timezone.tzCode,
        )
          .format('MMMM DD dddd')
          .split(' ');
        // calculate total duration of each session
        let totalHours = 0;
        let totalMinutes = 0;

        slot.sessions.forEach((session) => {
          const start = dayJS(session.start_time, timezone.tzCode);
          const end = dayJS(session.end_time, timezone.tzCode);
          const duration = end.diff(start, 'minutes');

          totalHours += Math.floor(duration / 60);
          totalMinutes += duration % 60;
        });

        totalHours += Math.floor(totalMinutes / 60);
        totalMinutes %= 60;

        const totalTimeDifference = `${
          totalHours ? totalHours + ' hour' : ''
        } ${totalMinutes} minutes`;

        return (
          <>
            <CandidateScheduleCard
              isTitle={false}
              textDuration={totalTimeDifference}
              slotButton={<></>}
              slotSessionInfo={
                <SelectedDateAndTime
                  slotSessionAndTime={<SingleDaySessions />}
                  textDate={date}
                  textDay={day}
                  textMonth={month}
                />
              }
            />
          </>
        );
      })}
    </div>
  );
}

export default RightPanel;

type SingleDaySessionsProps = {
  index: number;
};

const SingleDaySessions = (props: SingleDaySessionsProps) => {
  const { selectedSlots } = useCandidateInviteStore();
  const sessions = (selectedSlots?.[props.index]?.sessions ?? []).map(
    (session) => (
      <SingleDaySession key={session.session_id} session={session} />
    ),
  );
  return <>{sessions}</>;
};

type SingleDaySessionProps = {
  session: CandidateInviteType['selectedSlots'][number]['sessions'][number];
};

const SingleDaySession = (props: SingleDaySessionProps) => {
  const { timezone } = useCandidateInviteStore();
  const name = props.session.session_name;
  const duration = `${dayJS(props.session.start_time, timezone.tzCode).format(
    'hh:mm A',
  )} to ${dayJS(props.session.end_time, timezone.tzCode).format('hh:mm A')}`;
  return <SessionAndTime textSessionName={name} textTime={duration} />;
};
