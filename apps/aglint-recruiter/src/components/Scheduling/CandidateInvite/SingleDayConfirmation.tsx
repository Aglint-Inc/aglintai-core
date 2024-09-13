import { useEffect, useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import { useCandidateInvite } from '@/context/CandidateInviteContext';

import { CandidateScheduleCard } from './Components/CandidateScheduleCard';
import { SelectedDateAndTime } from './Components/SelectedDateAndTime';
import { SessionAndTime } from './Components/SessionAndTime';
import { dayJS } from './utils';

export const SingleDayConfirmation = () => {
  const { selectedSlots, setSelectedSlots, handleSubmit, timezone } =
    useCandidateInvite();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (selectedSlots.length !== 0) setOpen(true);
  }, [selectedSlots.length]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setSelectedSlots([]), 200);
  };
  const [month, date, day] = dayJS(
    selectedSlots?.[0]?.sessions?.[0]?.start_time ?? null,
    timezone.tzCode,
  )
    .format('MMMM DD dddd')
    .split(' ');
  // calculate total duration of each session
  let totalHours = 0;
  let totalMinutes = 0;

  selectedSlots[0]?.sessions.forEach((session) => {
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
  // end

  return (
    <UIDialog
      title='Confirm your interview'
      open={open}
      onClose={() => handleClose()}
      slotButtons={
        <>
          <UIButton variant='secondary' onClick={() => handleClose()}>
            Cancel
          </UIButton>
          <UIButton variant='default' onClick={() => handleSubmit()}>
            Confirm
          </UIButton>
        </>
      }
    >
      <>
        <div>
          <p className='mb-2'>
            Before we finalize your schedule, please take a moment to confirm
            the chosen option. Your interview is crucial, and we want to ensure
            it aligns perfectly with your availability.
          </p>
          <CandidateScheduleCard
            isTitle={false}
            textDuration={totalTimeDifference}
            slotButton={<></>}
            slotSessionInfo={
              <SelectedDateAndTime
                slotSessionAndTime={<SingleDaySessions index={0} />}
                textDate={date}
                textDay={day}
                textMonth={month}
              />
            }
          />
        </div>
      </>
    </UIDialog>
  );
};

type SingleDaySessionsProps = {
  index: number;
};

const SingleDaySessions = (props: SingleDaySessionsProps) => {
  const { selectedSlots } = useCandidateInvite();
  const sessions = (selectedSlots?.[props.index]?.sessions ?? []).map(
    (session) => (
      <SingleDaySession key={session.session_id} session={session} />
    ),
  );
  return <>{sessions}</>;
};

type SingleDaySessionProps = {
  session: ReturnType<
    typeof useCandidateInvite
  >['selectedSlots'][number]['sessions'][number];
};

const SingleDaySession = (props: SingleDaySessionProps) => {
  const { timezone } = useCandidateInvite();
  const name = props.session.session_name;
  const duration = `${dayJS(props.session.start_time, timezone.tzCode).format(
    'hh:mm A',
  )} to ${dayJS(props.session.end_time, timezone.tzCode).format('hh:mm A')}`;
  return <SessionAndTime textSessionName={name} textTime={duration} />;
};
