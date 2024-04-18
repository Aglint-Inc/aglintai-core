/* eslint-disable security/detect-object-injection */
import { Dialog, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

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
import { SINGLE_DAY_TIME } from '@/src/utils/integrations/constants';

import AUIButton from '../../Common/AUIButton';
import CandidateSlotLoad from '../../Common/Lotties/CandidateSlotLoad';
import CompanyLogo from '../../JobApplicationsDashboard/Common/CompanyLogo';
import { getBreakLabel } from '../../JobNewInterviewPlan/utils';
import IconScheduleType from '../AllSchedules/ListCard/Icon';
import { getScheduleType } from '../AllSchedules/utils';
import { SessionIcon } from '../Common/ScheduleProgress/scheduleProgressPill';
import CandidateInviteCalendar, {
  CandidateInviteCalendarProps,
} from './calender';
import { getDurationText } from './utils';

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
          <CandidateInvitePlanPage />
          <DetailsPopup />
        </>
      )}
    </Stack>
  );
};
export default CandidateInviteNew;

const CandidateInvitePlanPage = () => {
  const {
    invites: {
      data: { meetings },
    },
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
  if (rounds.length === 1) return <SingleDay />;
  return <MultiDay rounds={rounds} />;
};

const ConfirmedPage = (props: ScheduleCardsProps) => {
  const {
    invites: {
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
    invites: {
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
    <Dialog open={detailsPop} onClose={() => setDetailsPop(false)}>
      <CandidateScheduleCard
        isPopup={true}
        isSelected={false}
        textDuration={getDurationText(duration)}
        onClickClose={{ onClick: () => setDetailsPop(false) }}
        textPopupTitle={schedule_name}
        slotSessionInfo={<Sessions sessions={meetings} />}
      />
    </Dialog>
  );
};

const SingleDay = () => {
  const {
    invites: {
      data: { allSlots },
    },
    setDetailsPop,
    selectedSlots,
    handleSelectSlot,
  } = useCandidateInvite();
  const sessions = allSlots.reduce(
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
      <CandidateConfirmationPage
        slotCompanyLogo={<Logo />}
        onClickView={{ onClick: () => setDetailsPop(true) }}
        slotCandidateCalender={
          <CandidateInviteCalendar
            sessions={sessions}
            selections={selectedSlots}
            handleSelect={(id) => handleSelectSlot(0, id)}
          />
        }
      />
      <SingleDayConfirmation />
    </>
  );
};

const SingleDayConfirmation = () => {
  const { selectedSlots, setSelectedSlots, handleSubmit } =
    useCandidateInvite();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (selectedSlots.length !== 0) setOpen(true);
  }, [selectedSlots.length]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setSelectedSlots([]), 200);
  };
  const [month, date, day] = dayjs(
    selectedSlots?.[0]?.sessions?.[0]?.start_time ?? null,
  )
    .format('MMMM DD dddd')
    .split(' ');
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
  const name = props.session.session_name;
  const duration = `${dayjs(props.session.start_time).format(
    'hh:mm A',
  )} to ${dayjs(props.session.end_time).format('hh:mm A')}`;
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
  const [month, date, day] = dayjs(
    props?.round?.sessions?.[0].interview_meeting?.start_time ?? null,
  )
    .format('MMMM DD dddd')
    .split(' ');
  const duration = (props?.round?.sessions ?? []).reduce((acc, curr) => {
    acc += curr.interview_session.session_duration;
    return acc;
  }, 0);

  const sessions = props.round.sessions.map((session, i) => {
    const name = session.interview_session.name;
    const duration = `${dayjs(session.interview_meeting.start_time).format(
      'hh:mm A',
    )} to ${dayjs(session.interview_meeting.end_time).format('hh:mm A')}`;
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

const MultiDay = (props: ScheduleCardsProps) => {
  const { setDetailsPop, selectedSlots } = useCandidateInvite();
  const [open, setOpen] = useState(false);

  const enabled = selectedSlots.length === props.rounds.length;
  return (
    <>
      <CandidateConfirmationPage
        slotCompanyLogo={<Logo />}
        onClickView={{ onClick: () => setDetailsPop(true) }}
        slotCandidateCalender={
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
          </>
        }
      />
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
    sessions: ReturnType<
      typeof useCandidateInvite
    >['invites']['data']['meetings'];
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
  const {
    invites: {
      data: { allSlots },
    },
    selectedSlots,
    handleSelectSlot,
  } = useCandidateInvite();

  const [open, setOpen] = useState(false);

  const isSelected = !!selectedSlots[props.index];
  const enabled = props.index <= selectedSlots.length;

  const [month, date, day] = dayjs(
    selectedSlots?.[props.index]?.sessions?.[0]?.start_time ?? null,
  )
    .format('MMMM DD dddd')
    .split(' ');

  const sessions =
    props.index === 0
      ? allSlots.reduce(
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
      : allSlots.reduce(
          (acc, curr) => {
            if (selectedSlots.length !== 0 && curr[0][0] === selectedSlots[0]) {
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
            <Sessions sessions={props.round.sessions} />
          )
        }
        onClickCard={{ onClick: () => setOpen(true) }}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        sx={{ '& .MuiPaper-root': { maxWidth: 'none !important' } }}
      >
        <Stack width={'1000px'}>
          <CandidateInviteCalendar
            sessions={sessions}
            selections={selectedSlots}
            handleSelect={handleSelect}
          />
        </Stack>
      </Dialog>
    </Stack>
  );
};

type SessionsProps = Pick<ScheduleCardProps['round'], 'sessions'>;
const Sessions = (props: SessionsProps) => {
  const sessions = props.sessions.map((session) => (
    <SessionCard
      key={session.interview_session.id + session.interview_session.id}
      session={session}
    />
  ));
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

const Logo = () => {
  const {
    invites: {
      data: { recruiter },
    },
  } = useCandidateInvite();
  return (
    <Stack height={'60px'}>
      <CompanyLogo companyName={recruiter.name} companyLogo={recruiter.logo} />
    </Stack>
  );
};
