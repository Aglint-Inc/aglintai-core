/* eslint-disable security/detect-object-injection */
import { Dialog, Stack } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import {
  // AvailableTimerangeEmpty,
  // AvailableTimeRangeLoader,
  CandidateConfirmationPage,
  CandidateScheduleCard,
  CandidateSuccessPage,
  ChangeButton,
  SelectButton,
  SelectedDateAndTime,
  SessionAndTime,
  SessionInfo,
} from '@/devlink';
import { ConfirmationPopup } from '@/devlink3';
// import { Skeleton } from '@/devlink2';
import { useCandidateInvite } from '@/src/context/CandidateInviteContext';
import NotFoundPage from '@/src/pages/404';
import { useInviteSlots } from '@/src/queries/candidate-invite';
import { SINGLE_DAY_TIME } from '@/src/utils/integrations/constants';
import toast from '@/src/utils/toast';

import AUIButton from '../../Common/AUIButton';
import Loader from '../../Common/Loader';
import CandidateSlotLoad from '../../Common/Lotties/CandidateSlotLoad';
import CompanyLogo from '../../JobApplicationsDashboard/Common/CompanyLogo';
import { getBreakLabel } from '../../JobNewInterviewPlan/utils';
import IconScheduleType from '../AllSchedules/ListCard/Icon';
import { getScheduleType } from '../AllSchedules/utils';
import { SessionIcon } from '../Common/ScheduleProgress/scheduleProgressPill';
import { TimezoneSelector } from '../Settings';
import CandidateInviteCalendar, {
  CandidateInviteCalendarProps,
} from './calender';
import { dayJS, getDurationText } from './utils';

const CandidateInviteNew = () => {
  const load = useCandidateInvite();
  return (
    <Stack
      height={'100%'}
      width={'100%'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      {load === undefined ? (
        <Stack width={'120px'} style={{ transform: 'translateY(-50%)' }}>
          <CandidateSlotLoad />
        </Stack>
      ) : load === null ? (
        <Stack style={{ transform: 'translateY(-50%)' }}>
          <NotFoundPage />
        </Stack>
      ) : (
        <>
          <CandidateInvitePlanPage key={load.timezone.tzCode} />
          <DetailsPopup />
        </>
      )}
    </Stack>
  );
};
export default CandidateInviteNew;

const CandidateInvitePlanPage = () => {
  const {
    setDetailsPop,
    meta: {
      data: { meetings },
    },
    timezone,
    setSelectedSlots,
    setTimezone,
  } = useCandidateInvite();
  const confirmed = !!meetings.find(
    ({ interview_meeting: { status } }) => status === 'confirmed',
  );
  const { rounds } = meetings.reduce(
    (acc, curr) => {
      const count = acc.rounds.length;
      if (
        count === 0 ||
        acc.rounds[count - 1].sessions[
          acc.rounds[count - 1].sessions.length - 1
        ].interview_session.break_duration >= SINGLE_DAY_TIME
      )
        acc.rounds.push({
          title: `Day ${acc.rounds.length + 1}`,
          sessions: [curr],
        });
      else acc.rounds[count - 1].sessions.push(curr);
      return acc;
    },
    { rounds: [] as ScheduleCardProps['round'][] },
  );
  if (confirmed) return <ConfirmedPage rounds={rounds} />;
  return (
    <CandidateConfirmationPage
      slotCompanyLogo={<Logo />}
      onClickView={{ onClick: () => setDetailsPop(true) }}
      slotCandidateCalender={
        <>
          <TimezoneSelector
            disabled={false}
            value={timezone}
            setValue={(e) => {
              setTimezone(e);
              setSelectedSlots([]);
            }}
          />
          <Invite rounds={rounds} />
        </>
      }
    />
  );
};

const ConfirmedPage = (props: ScheduleCardsProps) => {
  const {
    meta: {
      data: { schedule, candidate },
    },
  } = useCandidateInvite();

  return (
    <CandidateSuccessPage
      textDesc={
        <>
          <p style={{ marginBottom: '0px' }}>
            Your interview is scheduled, and we look forward to speaking with
            you.
          </p>
          <p>Please check {candidate.email} for the calendar invite.</p>
        </>
      }
      slotScheduleCard={<ConfirmedScheduleCards rounds={props.rounds} />}
      slotCompanyLogo={<Logo />}
      onClickSupport={{
        onClick: () => {
          window.open(
            `${process.env.NEXT_PUBLIC_HOST_NAME}/support/create?id=${schedule.application_id}`,
            '_blank',
          );
        },
      }}
    />
  );
};

const DetailsPopup = () => {
  const {
    detailsPop,
    setDetailsPop,
    meta: {
      data: {
        meetings,
        schedule: { schedule_name },
      },
    },
  } = useCandidateInvite();

  const duration = meetings.reduce((acc, curr) => {
    acc += curr.interview_session.session_duration;
    return acc;
  }, 0);

  return (
    <Dialog
      open={detailsPop}
      onClose={() => setDetailsPop(false)}
      maxWidth='md'
    >
      <CandidateScheduleCard
        isPopup={true}
        isSelected={false}
        textDuration={getDurationText(duration)}
        onClickClose={{ onClick: () => setDetailsPop(false) }}
        textPopupTitle={schedule_name}
        slotSessionInfo={<Sessions sessions={meetings} showBreak={true} />}
      />
    </Dialog>
  );
};

const Invite = ({ rounds }: ScheduleCardsProps) => {
  if (rounds.length === 1) return <SingleDay />;
  return <MultiDay rounds={rounds} />;
};

const SingleDay = () => {
  const { params } = useCandidateInvite();
  const { status } = useInviteSlots(params);
  if (status === 'error') return <SingleDayError />;
  if (status === 'pending') return <SingleDayLoading />;
  return <SingleDaySuccess />;
};

const SingleDayError = () => {
  const { params } = useCandidateInvite();
  const { refetch } = useInviteSlots(params);
  useEffect(() => {
    toast.error('Something went wrong. Please try again');
  }, []);
  return <AUIButton onClick={() => refetch()}>Try again</AUIButton>;
};

const SingleDayLoading = () => {
  return <Loader />;
};

const SingleDaySuccess = () => {
  const { params, selectedSlots, handleSelectSlot, timezone } =
    useCandidateInvite();
  const { data } = useInviteSlots(params);
  const sessions = data.reduce(
    (acc, curr) => {
      const { start_time } = curr[0][0].sessions[0];
      acc.push({
        date: start_time,
        slots: curr[0],
      });
      return acc;
    },
    [] as CandidateInviteCalendarProps['sessions'],
  );
  return (
    <>
      <CandidateInviteCalendar
        sessions={sessions}
        selections={selectedSlots}
        handleSelect={(id) => handleSelectSlot(0, id)}
        tz={timezone.tzCode}
      />
      <SingleDayConfirmation />
    </>
  );
};

const SingleDayConfirmation = () => {
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
    <Dialog open={open} onClose={() => handleClose()}>
      <ConfirmationPopup
        isIcon={false}
        textPopupTitle={'Confirm your interview'}
        isDescriptionVisible={true}
        textPopupDescription={
          'Before we finalize your schedule, please take a moment to confirm the chosen option. Your interview is crucial, and we want to ensure it aligns perfectly with your availability.'
        }
        isWidget={true}
        slotWidget={
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
        }
        textPopupButton={'Confirm'}
        onClickAction={{ onClick: () => handleSubmit() }}
        onClickCancel={{ onClick: () => handleClose() }}
      />
    </Dialog>
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

const ConfirmedScheduleCards = (props: ScheduleCardsProps) => {
  const scheduleCards = props.rounds.map((round, index) => (
    <ConfirmedScheduleCard
      key={index}
      round={round}
      index={index}
      showTitle={props.rounds.length !== 1}
    />
  ));

  return <>{scheduleCards}</>;
};

const ConfirmedScheduleCard = (props: ScheduleCardProps) => {
  const { timezone } = useCandidateInvite();
  const [month, date, day] = dayJS(
    props?.round?.sessions?.[0].interview_meeting?.start_time ?? null,
    timezone.tzCode,
  )
    .format('MMMM DD dddd')
    .split(' ');
  const duration = (props?.round?.sessions ?? []).reduce((acc, curr) => {
    acc += curr.interview_session.session_duration;
    return acc;
  }, 0);

  const sessions = props.round.sessions.map((session, i) => {
    const name = session.interview_session.name;
    const duration = `${dayJS(
      session.interview_meeting.start_time,
      timezone.tzCode,
    ).format('hh:mm A')} to ${dayJS(
      session.interview_meeting.end_time,
      timezone.tzCode,
    ).format('hh:mm A')}`;
    return (
      <SessionAndTime key={i} textSessionName={name} textTime={duration} />
    );
  });

  return (
    <CandidateScheduleCard
      isTitle={props.showTitle}
      textDay={props.round.title}
      isSelected={true}
      slotButton={<></>}
      textDuration={getDurationText(duration)}
      slotSessionInfo={
        <SelectedDateAndTime
          slotSessionAndTime={sessions}
          textDate={date}
          textDay={day}
          textMonth={month}
        />
      }
    />
  );
};

const MultiDay = ({ rounds }: ScheduleCardsProps) => {
  const { params } = useCandidateInvite();
  const { status } = useInviteSlots(params);
  if (status === 'error') return <MultiDayError />;
  if (status === 'pending') return <MultiDayLoading />;
  return <MultiDaySuccess rounds={rounds} />;
};

const MultiDayError = () => {
  const { params } = useCandidateInvite();
  const { refetch } = useInviteSlots(params);
  useEffect(() => {
    toast.error('Something went wrong. Please try again');
  }, []);
  return <AUIButton onClick={() => refetch()}>Try again</AUIButton>;
};

const MultiDayLoading = () => {
  return <Loader />;
};

const MultiDaySuccess = (props: ScheduleCardsProps) => {
  const { selectedSlots } = useCandidateInvite();
  const [open, setOpen] = useState(false);

  const enabled = selectedSlots.length === props.rounds.length;
  return (
    <>
      <ScheduleCards rounds={props.rounds} />
      <Stack sx={{ width: '350px' }}>
        <AUIButton
          size='large'
          onClick={() => setOpen(true)}
          disabled={!enabled}
        >
          Proceed
        </AUIButton>
      </Stack>
      <MultiDayConfirmation open={open} setOpen={setOpen} />
    </>
  );
};

type MultiDayConfirmationProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const MultiDayConfirmation = (props: MultiDayConfirmationProps) => {
  const { handleSubmit } = useCandidateInvite();
  const handleClose = () => {
    props.setOpen(false);
  };
  return (
    <Dialog open={props.open} onClose={() => handleClose()}>
      <ConfirmationPopup
        isIcon={false}
        textPopupTitle={'Confirm Your Interview'}
        isDescriptionVisible={true}
        textPopupDescription={
          'Please review and confirm your selected time slot before we finalize your schedule. It’s important that your interview time aligns with your availability.'
        }
        isWidget={false}
        textPopupButton={'Confirm'}
        onClickAction={{ onClick: () => handleSubmit() }}
        onClickCancel={{ onClick: () => handleClose() }}
      />
    </Dialog>
  );
};

type ScheduleCardsProps = {
  rounds: {
    title: string;
    sessions: ReturnType<typeof useCandidateInvite>['meta']['data']['meetings'];
  }[];
};

const ScheduleCards = (props: ScheduleCardsProps) => {
  const scheduleCards = props.rounds.map((round, index) => (
    <ScheduleCard key={index} round={round} index={index} showTitle={true} />
  ));

  return <>{scheduleCards}</>;
};

type ScheduleCardProps = {
  round: ScheduleCardsProps['rounds'][number];
  index: number;
  showTitle: boolean;
};

const ScheduleCard = (props: ScheduleCardProps) => {
  const { params, selectedSlots, handleSelectSlot, timezone } =
    useCandidateInvite();
  const { data } = useInviteSlots(params);

  const [open, setOpen] = useState(false);

  const isSelected = !!selectedSlots[props.index];
  const enabled = props.index <= selectedSlots.length;

  const [month, date, day] = dayJS(
    selectedSlots?.[props.index]?.sessions?.[0]?.start_time ?? null,
    timezone.tzCode,
  )
    .format('MMMM DD dddd')
    .split(' ');

  const sessions =
    props.index === 0
      ? data.reduce(
          (acc, curr) => {
            const { start_time } = curr[props.index][0].sessions[0];
            acc.push({
              date: start_time,
              slots: curr[props.index],
            });
            return acc;
          },
          [] as CandidateInviteCalendarProps['sessions'],
        )
      : data.reduce(
          (acc, curr) => {
            if (
              selectedSlots.length !== 0 &&
              curr[0].includes(selectedSlots[0])
            ) {
              const { start_time } = curr[props.index][0].sessions[0];
              acc.push({
                date: start_time,
                slots: curr[props.index],
              });
            }
            return acc;
          },
          [] as CandidateInviteCalendarProps['sessions'],
        );

  const handleSelect = (session: Parameters<typeof handleSelectSlot>['1']) => {
    handleSelectSlot(props.index, session);
    setOpen(false);
  };

  const duration = (props?.round?.sessions ?? []).reduce((acc, curr) => {
    acc += curr.interview_session.session_duration;
    return acc;
  }, 0);

  return (
    <Stack
      style={{
        pointerEvents: enabled ? 'auto' : 'none',
        opacity: enabled ? 1 : 0.4,
      }}
    >
      <CandidateScheduleCard
        textDay={props.round.title}
        isSelected={isSelected}
        slotButton={
          enabled ? isSelected ? <ChangeButton /> : <SelectButton /> : <></>
        }
        textDuration={getDurationText(duration)}
        slotSessionInfo={
          isSelected ? (
            <SelectedDateAndTime
              slotSessionAndTime={<SingleDaySessions index={props.index} />}
              textDate={date}
              textDay={day}
              textMonth={month}
            />
          ) : (
            <Sessions sessions={props.round.sessions} showBreak={false} />
          )
        }
        onClickCard={{ onClick: () => setOpen(true) }}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        sx={{ '& .MuiPaper-root': { maxWidth: 'none !important' } }}
      >
        <CandidateInviteCalendar
          sessions={sessions}
          selections={selectedSlots}
          handleSelect={handleSelect}
          tz={timezone.tzCode}
        />
      </Dialog>
    </Stack>
  );
};

type SessionsProps = Pick<ScheduleCardProps['round'], 'sessions'> & {
  showBreak: boolean;
};
const Sessions = (props: SessionsProps) => {
  const sessions = props.sessions.reduce((acc, curr) => {
    acc.push(
      <SessionCard
        key={curr.interview_session.id + curr.interview_session.id}
        session={curr}
      />,
    );
    if (curr.interview_session.break_duration !== 0 && props.showBreak)
      acc.push(
        <BreakCard break_duration={curr.interview_session.break_duration} />,
      );
    return acc;
  }, [] as React.JSX.Element[]);
  return <>{sessions}</>;
};

type SessionCardProps = {
  session: SessionsProps['sessions'][number];
};
const SessionCard = ({ session: { interview_session } }: SessionCardProps) => {
  const duration = getBreakLabel(interview_session.session_duration);
  const scheduleType = getScheduleType(interview_session.schedule_type);
  return (
    <SessionInfo
      textSessionName={interview_session.name}
      textSessionDuration={duration}
      textMeetingType={scheduleType}
      slotMeetingTypeIcon={
        <IconScheduleType type={interview_session.schedule_type} />
      }
      slotInterviewtypeIcon={
        <SessionIcon sessionType={interview_session.session_type} />
      }
    />
  );
};

const BreakCard = ({ break_duration }: { break_duration: number }) => {
  const duration = getBreakLabel(break_duration);
  return (
    <SessionInfo
      textSessionName={'Break'}
      textSessionDuration={duration}
      textMeetingType={''}
      slotMeetingTypeIcon={<></>}
      slotInterviewtypeIcon={<BreakIcon />}
    />
  );
};

const Logo = () => {
  const {
    meta: {
      data: { recruiter },
    },
  } = useCandidateInvite();
  return (
    <Stack height={'60px'}>
      <CompanyLogo companyName={recruiter.name} companyLogo={recruiter.logo} />
    </Stack>
  );
};

const BreakIcon = () => {
  return (
    <svg
      width='14'
      height='14'
      viewBox='0 0 12 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M2.0625 0C2.40625 0.03125 2.59375 0.21875 2.625 0.5625C2.625 0.75 2.67188 0.90625 2.76562 1.03125C2.85938 1.15625 3 1.29687 3.1875 1.45312L3.21094 1.47656C3.41406 1.63281 3.60938 1.84375 3.79688 2.10938C4 2.375 4.10938 2.73438 4.125 3.1875C4.09375 3.53125 3.90625 3.71875 3.5625 3.75C3.21875 3.71875 3.03125 3.53125 3 3.1875C3 3 2.95312 2.84375 2.85938 2.71875C2.76562 2.59375 2.625 2.45313 2.4375 2.29688L2.41406 2.27344C2.21094 2.11719 2.01562 1.90625 1.82812 1.64062C1.625 1.375 1.51562 1.01562 1.5 0.5625C1.53125 0.21875 1.71875 0.03125 2.0625 0ZM1.125 9.75C1.14062 10.0625 1.25 10.3281 1.45312 10.5469C1.67188 10.75 1.9375 10.8594 2.25 10.875H6.75C7.0625 10.8594 7.32812 10.75 7.54688 10.5469C7.75 10.3281 7.85938 10.0625 7.875 9.75V5.625H1.125V9.75ZM0 5.25C0 5.03125 0.0703125 4.85156 0.210938 4.71094C0.351562 4.57031 0.53125 4.5 0.75 4.5H8.25H9.375C10.125 4.51562 10.7422 4.77344 11.2266 5.27344C11.7266 5.75781 11.9844 6.375 12 7.125C11.9844 7.875 11.7266 8.49219 11.2266 8.97656C10.7422 9.47656 10.125 9.73438 9.375 9.75H9C8.98438 10.3906 8.76562 10.9219 8.34375 11.3438C7.92188 11.7656 7.39062 11.9844 6.75 12H2.25C1.60938 11.9844 1.07812 11.7656 0.65625 11.3438C0.234375 10.9219 0.015625 10.3906 0 9.75L0 5.25ZM9 8.625H9.375C9.79688 8.60938 10.1484 8.46094 10.4297 8.17969C10.7109 7.89844 10.8594 7.54688 10.875 7.125C10.8594 6.70312 10.7109 6.35156 10.4297 6.07031C10.1484 5.78906 9.79688 5.64062 9.375 5.625H9V8.625ZM5.25 0.5625C5.25 0.75 5.29688 0.90625 5.39062 1.03125C5.48438 1.15625 5.625 1.29687 5.8125 1.45312L5.83594 1.47656C6.03906 1.63281 6.23438 1.84375 6.42188 2.10938C6.625 2.375 6.73438 2.73438 6.75 3.1875C6.71875 3.53125 6.53125 3.71875 6.1875 3.75C5.84375 3.71875 5.65625 3.53125 5.625 3.1875C5.625 3 5.57812 2.84375 5.48438 2.71875C5.39062 2.59375 5.25 2.45313 5.0625 2.29688L5.03906 2.27344C4.83594 2.11719 4.64062 1.90625 4.45312 1.64062C4.25 1.375 4.14062 1.01562 4.125 0.5625C4.15625 0.21875 4.34375 0.03125 4.6875 0C5.03125 0.03125 5.21875 0.21875 5.25 0.5625Z'
        fill='#49545C'
      ></path>
    </svg>
  );
};
