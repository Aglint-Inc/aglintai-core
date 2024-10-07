import { getBreakLabel } from '@aglint/shared-utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@components/ui/alert-dialog';
import { Coffee, Plus, Repeat } from 'lucide-react';
import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from 'react';

import IconScheduleType from '@/components/Common/Icons/IconScheduleType';
import { Loader } from '@/components/Common/Loader';
import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import toast from '@/utils/toast';

import { getScheduleType } from '../../../../../../../../utils/scheduling/colors_and_enums';
import { SessionIcon } from '../../../../../../../_common/components/ScheduleProgressPillComp';
import useInviteActions from '../../hooks/useInviteActions';
import { useInviteSlots } from '../../hooks/useInviteSlots';
import { type CandidateInviteType, useCandidateInviteStore } from '../../store';
import {
  type ScheduleCardProps,
  type ScheduleCardsProps,
} from '../../types/types';
import { dayJS, getDurationText } from '../../utils/utils';
import CandidateInviteCalendar, {
  type CandidateInviteCalendarProps,
} from '../CalenderComp';
import { CandidateScheduleCard } from '../ui/CandidateScheduleCard';
import { SelectedDateAndTime } from '../ui/SelectedDateAndTime';
import { SessionAndTime } from '../ui/SessionAndTime';
import { SessionInfo } from '../ui/SessionInfo';

const MultiDay = ({ rounds }: ScheduleCardsProps) => {
  const { status } = useInviteSlots();
  if (status === 'error') return <MultiDayError />;
  if (status === 'pending') return <MultiDayLoading />;
  return <MultiDaySuccess rounds={rounds} />;
};

export default MultiDay;

const MultiDayError = () => {
  const { refetch } = useInviteSlots();
  useEffect(() => {
    toast.error('Something went wrong. Please try again.');
  }, []);
  return (
    <UIButton variant='default' onClick={() => refetch()}>
      Try again
    </UIButton>
  );
};

const MultiDayLoading = () => {
  return (
    <div className={'flex justify-center'}>
      <div className={'w-[120px]'}>
        <Loader />
      </div>
    </div>
  );
};

const MultiDaySuccess = (props: ScheduleCardsProps) => {
  const { selectedSlots } = useCandidateInviteStore();
  const [open, setOpen] = useState(false);
  const enabled = selectedSlots.length === props.rounds.length;

  return (
    <>
      <ScheduleCards rounds={props.rounds} />
      <div className={'flex justify-center'}>
        <UIButton
          variant='default'
          onClick={() => {
            setOpen(true);
          }}
          disabled={!enabled}
        >
          Proceed
        </UIButton>
      </div>
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
  const { handleSubmit } = useInviteActions();
  const handleClose = () => {
    props.setOpen(false);
  };
  const { selectedSlots, timezone } = useCandidateInviteStore();

  type SelectedDateAndSessionsType = {
    date: string;
    sessions: CandidateInviteType['selectedSlots'][0]['sessions'];
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
    <AlertDialog open={props.open} onOpenChange={props.setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm your interview</AlertDialogTitle>
          <AlertDialogDescription>
            <div className='gap-2'>
              <div>
                {selectedDateAndSessions.map((item, index) => (
                  <p key={index}>
                    Day-{index + 1} -{' '}
                    {item.sessions.map((ele) => ele.session_name).join(' ,')} on{' '}
                    {item.date}
                  </p>
                ))}
              </div>
              <p>
                Please review and confirm your selected time slot before we
                finalize your schedule. It&apos;s important that your interview
                time aligns with your availability.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const ScheduleCards = (props: ScheduleCardsProps) => {
  const scheduleCards = props.rounds.map((round, index) => (
    <ScheduleCard key={index} round={round} index={index} showTitle={true} />
  ));

  return <>{scheduleCards}</>;
};

const ScheduleCard = (props: ScheduleCardProps) => {
  const { selectedSlots, timezone } = useCandidateInviteStore();
  const { handleSelectSlot } = useInviteActions();
  const { data } = useInviteSlots();

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
    // setOpen(false);
  };

  const duration = (props?.round?.sessions ?? []).reduce((acc, curr) => {
    acc += curr.interview_session.session_duration;
    return acc;
  }, 0);

  return (
    <div
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
              <UIButton
                size='sm'
                onClick={() => setOpen(true)}
                icon={<Repeat className='h-4 w-4' />}
              ></UIButton>
            ) : (
              <UIButton
                size='sm'
                variant='outline'
                onClick={() => setOpen(true)}
              >
                <Plus className='h-4 w-4' size={'sm'} />
                Select Option
              </UIButton>
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
      />
      <UIDialog
        open={open}
        onClose={() => setOpen(false)}
        slotButtons={
          <>
            <UIButton
              variant='ghost'
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </UIButton>
            <UIButton
              onClick={() => {
                setOpen(false);
              }}
              variant='default'
            >
              Choose
            </UIButton>
          </>
        }
        size='lg'
        title='Select Date and Time'
      >
        <CandidateInviteCalendar
          sessions={sessions}
          selections={selectedSlots}
          handleSelect={handleSelect}
          tz={timezone.tzCode}
        />
      </UIDialog>
    </div>
  );
};

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
      slotInterviewtypeIcon={<Coffee size={'sm'} />}
      iconName={null}
    />
  );
};

type SessionCardProps = {
  session: SessionsProps['sessions'][number];
};
