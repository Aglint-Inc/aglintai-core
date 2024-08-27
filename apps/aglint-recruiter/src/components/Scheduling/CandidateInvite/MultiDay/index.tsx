import { SessionsCombType } from '@aglint/shared-types';
import { Dialog, Stack, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { ButtonSurface } from '@/devlink/ButtonSurface';
import { CandidateScheduleCard } from '@/devlink/CandidateScheduleCard';
import { DcPopup } from '@/devlink/DcPopup';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { IconButtonSoft } from '@/devlink/IconButtonSoft';
import { SelectedDateAndTime } from '@/devlink/SelectedDateAndTime';
import { SessionAndTime } from '@/devlink/SessionAndTime';
import { SessionInfo } from '@/devlink/SessionInfo';
import CandidateSlotLoad from '@/public/lottie/CandidateSlotLoad';
import { getBreakLabel } from '@/src/components/Jobs/Job/Interview-Plan/utils';
import { useCandidateInvite } from '@/src/context/CandidateInviteContext';
import { useInviteSlots } from '@/src/queries/candidate-invite';
import toast from '@/src/utils/toast';

import IconScheduleType from '../../Candidates/ListCard/Icon/IconScheduleType';
import { getScheduleType } from '../../Candidates/utils';
import { SessionIcon } from '../../Common/ScheduleProgress/ScheduleProgressPillComp';
import CandidateInviteCalendar, {
  CandidateInviteCalendarProps,
} from '../calender';
import { ScheduleCardProps, ScheduleCardsProps } from '../types';
import { dayJS, getDurationText } from '../utils';

const MultiDay = ({ rounds }: ScheduleCardsProps) => {
  const { params } = useCandidateInvite();
  const { status } = useInviteSlots(params);
  if (status === 'error') return <MultiDayError />;
  if (status === 'pending') return <MultiDayLoading />;
  return <MultiDaySuccess rounds={rounds} />;
};

export default MultiDay;

const MultiDayError = () => {
  const { params } = useCandidateInvite();
  const { refetch } = useInviteSlots(params);
  useEffect(() => {
    toast.error('Something went wrong. Please try again.');
  }, []);
  return (
    <ButtonSolid
      size={2}
      textButton='Try again'
      onClickButton={{ onClick: () => refetch() }}
    />
  );
};

const MultiDayLoading = () => {
  return (
    <Stack direction={'row'} justifyContent={'center'}>
      <Stack width={'120px'}>
        <CandidateSlotLoad />
      </Stack>
    </Stack>
  );
};

const MultiDaySuccess = (props: ScheduleCardsProps) => {
  const { selectedSlots } = useCandidateInvite();
  const [open, setOpen] = useState(false);
  const enabled = selectedSlots.length === props.rounds.length;
  return (
    <>
      <ScheduleCards rounds={props.rounds} />
      <Stack direction={'row'} justifyContent={'center'}>
        <ButtonSolid
          isLeftIcon={false}
          isRightIcon={false}
          textButton='Proceed'
          size={2}
          onClickButton={{
            onClick: () => {
              setOpen(true);
            },
          }}
          isDisabled={!enabled}
        />
      </Stack>
      <MultiDayConfirmation
        rounds={props.rounds}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

type MultiDayConfirmationProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  rounds: ScheduleCardsProps['rounds'];
};

const MultiDayConfirmation = (props: MultiDayConfirmationProps) => {
  const { handleSubmit } = useCandidateInvite();
  const handleClose = () => {
    props.setOpen(false);
  };
  const { selectedSlots, timezone } = useCandidateInvite();

  type SelectedDateAndSessionsType = {
    date: string;
    sessions: SessionsCombType['sessions'] | null;
  }[];
  const [selectedDateAndSessions, setSelectedDateAndSessions] =
    useState<SelectedDateAndSessionsType>([]);

  function getSelectedDateAndSessions() {
    const sessions = selectedSlots.map((round, i) => {
      return {
        date: dayJS(
          round?.sessions?.[0]?.start_time ?? null,
          timezone.tzCode,
        ).format('MMMM DD'),
        // eslint-disable-next-line security/detect-object-injection
        sessions: selectedSlots?.[i]?.sessions,
      };
    });
    setSelectedDateAndSessions(sessions);
  }
  useEffect(() => {
    getSelectedDateAndSessions();
  }, [props.rounds]);

  return (
    <Dialog open={props.open} onClose={() => handleClose()}>
      <DcPopup
        popupName={'Confirm your interview'}
        slotBody={
          <Stack gap={'10px'}>
            <Stack>
              {selectedDateAndSessions.map((item, index) => (
                <>
                  <Typography variant='subtitle1'>
                    Day-{index + 1} -{' '}
                    {item.sessions.map((ele) => ele.session_name).join(' ,')} on{' '}
                    {item.date}
                  </Typography>
                </>
              ))}
            </Stack>
            <Typography>
              Please review and confirm your selected time slot before we
              finalize your schedule. It’s important that your interview time
              aligns with your availability.
            </Typography>
          </Stack>
        }
        onClickClosePopup={{ onClick: handleClose }}
        slotButtons={
          <>
            <ButtonSoft
              textButton='Cancel'
              size={2}
              color={'neutral'}
              onClickButton={{
                onClick: () => handleClose(),
              }}
            />
            <ButtonSolid
              size={2}
              textButton={'Confirm'}
              onClickButton={{ onClick: handleSubmit }}
            />
          </>
        }
      />
    </Dialog>
  );
};

const ScheduleCards = (props: ScheduleCardsProps) => {
  const scheduleCards = props.rounds.map((round, index) => (
    <ScheduleCard key={index} round={round} index={index} showTitle={true} />
  ));

  return <>{scheduleCards}</>;
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
          enabled ? (
            isSelected ? (
              <IconButtonSoft
                color={'neutral'}
                onClickButton={{
                  onClick: () => setOpen(true),
                }}
                iconName='repeat'
                highContrast={true}
              />
            ) : (
              <ButtonSurface
                slotIcon={<GlobalIcon iconName='add' size={'sm'} />}
                isLeftIcon={true}
                isRightIcon={false}
                size={1}
                onClickButton={{ onClick: () => setOpen(true) }}
                textButton='Select Option'
              />
            )
          ) : (
            <></>
          )
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
        <SessionIcon session_type={interview_session.session_type} />
      }
      iconName={
        interview_session.schedule_type === 'google_meet' ||
        interview_session.schedule_type === 'zoom'
          ? 'videocam'
          : interview_session.schedule_type === 'phone_call'
            ? 'call'
            : 'person'
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
      iconName={''}
    />
  );
};

const BreakIcon = () => {
  return <GlobalIcon iconName='emoji_food_beverage' />;
};

type SessionCardProps = {
  session: SessionsProps['sessions'][number];
};
