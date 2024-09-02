'use client';
/* eslint-disable security/detect-object-injection */
import { SINGLE_DAY_TIME } from '@aglint/shared-utils';
import { Container, Dialog, Stack } from '@mui/material';
import React, { useEffect } from 'react';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { CandidateConfirmationPage } from '@/devlink/CandidateConfirmationPage';
import { CandidateScheduleCard } from '@/devlink/CandidateScheduleCard';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { IconButtonGhost } from '@/devlink/IconButtonGhost';
import { Page404 } from '@/devlink/Page404';
import { SessionInfo } from '@/devlink/SessionInfo';
import CandidateSlotLoad from '@/public/lottie/CandidateSlotLoad';
import { useCandidateInvite } from '@/src/context/CandidateInviteContext';
import { useInviteSlots } from '@/src/queries/candidate-invite';
import toast from '@/src/utils/toast';

import CompanyLogo from '../../Common/CompanyLogo';
import Footer from '../../Common/Footer';
import Loader from '../../Common/Loader';
import { TimezoneSelector } from '../../CompanyDetailComp/SettingsSchedule';
import { getBreakLabel } from '../../Jobs/Job/Interview-Plan/utils';
import IconScheduleType from '../Candidates/ListCard/Icon/IconScheduleType';
import { getScheduleType } from '../Candidates/utils';
import { SessionIcon } from '../Common/ScheduleProgress/ScheduleProgressPillComp';
import CandidateInviteCalendar, {
  type CandidateInviteCalendarProps,
} from './calender';
import { ConfirmedInvitePage } from './CandidateConfirm';
import MultiDay from './MultiDay';
import { SingleDayConfirmation } from './SingleDayConfirmation';
import { type ScheduleCardProps, type ScheduleCardsProps } from './types';
import { getDurationText } from './utils';

const CandidateInviteNew = () => {
  const load = useCandidateInvite();

  return (
    <Stack
      height={'100vh'}
      width={'100%'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      {load === undefined ? (
        <Stack>
          <Loader />
        </Stack>
      ) : load === null ? (
        <Stack width={'100%'} height={'100vh'}>
          <Page404 text404='The requested page was not found' />
          <Stack bgcolor={'var(--neutral-2)'} height={'48px'}>
            <Footer brand={true} />
          </Stack>
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
      data: { candidate, meetings, filter_json, recruiter, application_id },
    },
    timezone,
    setSelectedSlots,
    setTimezone,
    handleViewedOn,
  } = useCandidateInvite();

  useEffect(() => {
    if (filter_json?.id) {
      handleViewedOn();
    }
  }, [filter_json]);

  const waiting = meetings.some(
    ({ interview_meeting: { status } }) => status === 'waiting',
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

  if (meetings.length === 0)
    return (
      <Stack width={'100%'} height={'100vh'}>
        <Page404 />
        <Stack bgcolor={'var(--neutral-2)'} height={'48px'}>
          <Footer brand={true} />
        </Stack>
      </Stack>
    );

  if (!waiting)
    return (
      <ConfirmedInvitePage
        rounds={rounds}
        candidate={candidate}
        filter_json={filter_json}
        meetings={meetings}
        recruiter={recruiter}
        timezone={timezone}
        application_id={application_id}
      />
    );

  return (
    <Stack
      sx={{
        backgroundColor: 'var(--sand-3)',
        width: '100%',
        minHeight: '100vh',
        overflow: 'auto',
        paddingBottom: '24px',
      }}
    >
      <CandidateConfirmationPage
        slotCompanyLogo={
          <Logo companyName={recruiter.name} logo={recruiter.logo} />
        }
        onClickView={{
          onClick: () => {
            setDetailsPop(true);
          },
        }}
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
            <Container maxWidth='md'>
              <Stack spacing={'var(--space-4)'}>
                <Invite rounds={rounds} />
              </Stack>
            </Container>
          </>
        }
      />
      <Footer brand={true} />
    </Stack>
  );
};

const DetailsPopup = () => {
  const {
    detailsPop,
    setDetailsPop,
    meta: {
      data: { meetings },
    },
  } = useCandidateInvite();

  const duration = meetings.reduce((acc, curr) => {
    acc += curr.interview_session.session_duration;
    return acc;
  }, 0);

  const schedule_name = '';

  return (
    <Dialog
      open={detailsPop}
      onClose={() => setDetailsPop(false)}
      maxWidth='md'
    >
      <CandidateScheduleCard
        isPopup={true}
        isSelected={false}
        slotButton={
          <IconButtonGhost
            color={'neutral'}
            size={1}
            iconName={'close'}
            onClickButton={{
              onClick: () => {
                setDetailsPop(false);
              },
            }}
          />
        }
        isSlotButtonVisible={true}
        textDuration={getDurationText(duration)}
        onClickClose={{ onClick: () => setDetailsPop(false) }}
        textPopupTitle={schedule_name}
        slotSessionInfo={<Sessions sessions={meetings} showBreak={true} />}
        isTitle={false}
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
    toast.error('Something went wrong. Please try again.');
  }, []);
  return (
    <ButtonSolid
      textButton='Try again'
      size={2}
      onClickButton={{ onClick: () => refetch() }}
    />
  );
};

const SingleDayLoading = () => {
  return (
    <Stack direction={'row'} justifyContent={'center'}>
      <Stack width={'120px'}>
        <CandidateSlotLoad />
      </Stack>
    </Stack>
  );
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

const Logo = ({ companyName, logo }: { companyName: string; logo: string }) => {
  return (
    <Stack height={'60px'}>
      <CompanyLogo companyName={companyName} companyLogo={logo} />
    </Stack>
  );
};

const BreakIcon = () => {
  return <GlobalIcon iconName='emoji_food_beverage' />;
};
