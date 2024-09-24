'use client';
/* eslint-disable security/detect-object-injection */
import { SINGLE_DAY_TIME } from '@aglint/shared-utils';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import { Building2, Coffee } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect } from 'react';

import { NotFound } from '@/components/Common/404';
import TimezonePicker from '@/components/Common/TimezonePicker';
import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import { useCandidateInvite } from '@/context/CandidateInviteContext';
import { useInviteSlots } from '@/queries/candidate-invite';
import { getBreakLabel } from '@/utils/getBreakLabel';
import toast from '@/utils/toast';

import IconScheduleType from '../../../../../../../components/Common/Icons/IconScheduleType';
import { Loader } from '../../../../../../../components/Common/Loader';
import { SessionIcon } from '../../../../../../../components/Scheduling/Common/ScheduleProgress/ScheduleProgressPillComp';
import { getScheduleType } from '../../../../../../_common/utils/sessionScheduleType';
import {
  type ScheduleCardProps,
  type ScheduleCardsProps,
} from '../types/types';
import { getDurationText } from '../utils/utils';
import CandidateInviteCalendar, {
  type CandidateInviteCalendarProps,
} from './calender';
import { ConfirmedInvitePage } from './CandidateConfirm';
import { CandidateScheduleCard } from './Components/CandidateScheduleCard';
import { SessionInfo } from './Components/SessionInfo';
import MultiDay from './MultiDay';
import { SingleDayConfirmation } from './SingleDayConfirmation';

const CandidateInviteNew = () => {
  const load = useCandidateInvite();

  return (
    <div className='h-screen'>
      <div className='w-full py-10'>
        {load === undefined ? (
          <LoadingState />
        ) : load === null ? (
          <ErrorState />
        ) : (
          <>
            <CandidateInvitePlanPage key={load.timezone.tzCode} />
            <DetailsPopup />
          </>
        )}
      </div>
    </div>
  );
};
export default CandidateInviteNew;

const LoadingState = () => (
  <div
    className='flex h-screen w-full items-center justify-center'
    aria-live='polite'
    aria-busy='true'
  >
    <div className='space-y-4'>
      <Loader className='mx-auto h-12 w-12' />
      <p className='text-center text-gray-600'>
        Loading your interview details...
      </p>
    </div>
  </div>
);

const ErrorState = () => (
  <div className='flex h-screen w-full items-center justify-center'>
    <div className='text-center'>
      <NotFound />
      <p className='mt-4 text-gray-600'>
        We couldn&apos;t load your interview details.
      </p>
      <UIButton
        variant='default'
        className='mt-4'
        onClick={() => window.location.reload()}
      >
        Try Again
      </UIButton>
    </div>
  </div>
);

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
      <div className='h-screen w-full'>
        <NotFound />
      </div>
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
    <div className='bg-sand-3 flex w-full flex-col items-center justify-center py-4'>
      <Card className='border-neutral-6 w-full max-w-[900px] space-y-4'>
        <CardHeader className='space-y-2 text-center'>
          <div className='flex w-full justify-center'>
            <Logo companyName={recruiter.name} logo={recruiter.logo} />
          </div>
          <CardTitle className='text-2xl font-medium'>
            Select a date and time that works best for you.
          </CardTitle>
          <p className='text-neutral-11 text-center'>
            Available slots are organized by day. Each slot includes the total
            time required for your interview, including breaks.
          </p>
          <div>
            <UIButton
              variant='ghost'
              onClick={() => {
                setDetailsPop(true);
              }}
            >
              View Schedule details
            </UIButton>
          </div>
        </CardHeader>
        <CardContent>
          <div className='mx-auto w-full max-w-[900px] space-y-2'>
            <div className='flex w-full justify-end'>
              <div className='w-[300px]'>
                <TimezonePicker
                  onChange={(e) => {
                    setTimezone(e);
                    setSelectedSlots([]);
                  }}
                  value={timezone.tzCode}
                />
              </div>
            </div>
            <Invite rounds={rounds} />
          </div>
        </CardContent>
      </Card>
    </div>
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

  // const schedule_name = '';

  return (
    <UIDialog
      open={detailsPop}
      onClose={() => setDetailsPop(false)}
      title='Schedule Details'
      slotButtons={<></>}
    >
      <CandidateScheduleCard
        isSelected={false}
        slotButton={null}
        textDuration={getDurationText(duration)}
        slotSessionInfo={<Sessions sessions={meetings} showBreak={true} />}
        isTitle={false}
      />
    </UIDialog>
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
    <UIButton variant='default' onClick={() => refetch()}>
      Try again
    </UIButton>
  );
};

const SingleDayLoading = () => {
  return (
    <div className='space-y-4'>
      {[1, 2, 3].map((index) => (
        <Card key={index}>
          <CardHeader className='space-y-2'>
            <Skeleton className='h-4 w-1/4' />
          </CardHeader>
          <CardContent className='space-y-2'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-4/5' />
            <Skeleton className='h-4 w-3/5' />
          </CardContent>
        </Card>
      ))}
    </div>
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
      <>
        <SessionCard
          key={curr.interview_session.id + curr.interview_session.id}
          session={curr}
        />
      </>,
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
      slotInterviewtypeIcon={<Coffee size={16} className='text-neutral-100' />}
      iconName={null}
    />
  );
};

const Logo = ({ companyName, logo }: { companyName: string; logo: string }) => {
  return (
    <div className={'relative max-h-[60px] max-w-[60px]'}>
      <div className='relative h-[60px] w-[60px]'>
        <Image
          src={logo}
          alt={companyName}
          width={60}
          height={60}
          className='object-contain'
          onError={(e) => {
            if (e.currentTarget instanceof HTMLImageElement) {
              e.currentTarget.style.display = 'none';
              const fallback =
                e.currentTarget.parentElement?.querySelector('.fallback');
              if (fallback instanceof HTMLElement)
                fallback.style.display = 'flex';
            }
          }}
        />
        <div className='fallback absolute inset-0 hidden items-center justify-center'>
          <Building2 className='h-10 w-10 text-neutral-400' />
        </div>
      </div>
    </div>
  );
};
