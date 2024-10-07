import { SINGLE_DAY_TIME } from '@aglint/shared-utils';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { ScrollArea } from '@components/ui/scroll-area';
import { UIAlert } from '@components/ui-alert';
import dayjs from 'dayjs';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { ConfirmedInvitePage } from 'src/app/_common/components/CandidateConfirm/_common/components';
import { type CandidateInviteType } from 'src/app/(public)/scheduling/invite/[id]/_common/store';

import { UIButton } from '@/common/UIButton';
import { Loader } from '@/components/Common/Loader';
import timeZones from '@/utils/timeZone';

import { useRequestAvailabilityContext } from '../contexts/RequestAvailabilityContext';
import {
  useCandidateAvailabilityData,
  useCandidateAvailabilityMeetings,
  useCandidateAvailabilityScheduleDMeetings,
} from '../hooks/useRequestAvailability';
import {
  type CandidateAvailabilityType,
  type CandidateMeetingsType,
} from '../types';
import MultiDaySessions from './MultiDaySessions';
import SingleDaySessions from './SingleDaySessions';
import SlotsSubmitted from './SlotsSubmitted';

function CandidateAvailability() {
  const { multiDaySessions, isSubmitted } = useRequestAvailabilityContext();
  const [meetingsAndRounds, setMeetingsAndRound] = useState<{
    rounds: any[];
    meetings: any[];
    schedule: any;
  } | null>(null);

  const { data: meetings } = useCandidateAvailabilityMeetings();
  const { data: candidateRequestAvailability, isFetched } =
    useCandidateAvailabilityData();
  const { data: scheduledMeetings } =
    useCandidateAvailabilityScheduleDMeetings();

  const getMeetings = async (meetings: CandidateMeetingsType) => {
    if (meetings) {
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
        { rounds: [] as any },
      );

      setMeetingsAndRound({
        rounds: rounds,
        meetings: meetings,
        schedule: scheduledMeetings,
      });
    }
  };

  const initialTimezone = useMemo(() => {
    const tz = dayjs.tz.guess();
    return timeZones.find(
      ({ tzCode }) => tzCode === tz,
    ) as CandidateInviteType['timezone'];
  }, []);
  useEffect(() => {
    if (
      candidateRequestAvailability &&
      candidateRequestAvailability.booking_confirmed &&
      meetings?.length
    ) {
      getMeetings(meetings);
    }
  }, [meetings]);
  if (
    candidateRequestAvailability &&
    candidateRequestAvailability?.booking_confirmed === true &&
    meetingsAndRounds?.meetings
  ) {
    return (
      <ConfirmedInvitePage
        avail_request_id={candidateRequestAvailability.id}
        candidate={candidateRequestAvailability.applications.candidates}
        meetings={meetingsAndRounds.meetings}
        rounds={meetingsAndRounds.rounds}
        recruiter={{
          name: candidateRequestAvailability?.recruiter.name,
          logo: candidateRequestAvailability?.recruiter.logo,
        }}
        timezone={initialTimezone}
        application_id={candidateRequestAvailability.application_id}
      />
    );
  }
  if (!isFetched) {
    return (
      <div className='flex w-full items-center justify-center'>
        <Loader />
      </div>
    );
  }

  if (!candidateRequestAvailability) {
    return (
      <div className='flex w-full items-center justify-center'>
        <div className='text-center'>
          <AlertTriangle
            className='mx-auto h-12 w-12 text-red-500'
            strokeWidth={1}
          />
          <p className='mt-4 text-muted-foreground'>
            We couldn&apos;t load your availability link.
          </p>
          <p className='mt-2 text-sm text-muted-foreground'>
            Contact the recruiter or try again.
          </p>
          <UIButton
            variant='outline'
            className='mt-4'
            onClick={() => window.location.reload()}
          >
            <RefreshCcw className='mr-2 h-4 w-4' />
            Try Again
          </UIButton>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header
        candidateRequestAvailability={candidateRequestAvailability}
        isSubmitted={isSubmitted}
      />
      <ScrollArea className='h-[calc(100vh-400px)]'>
        {isSubmitted && <SlotsSubmitted />}
        {!isSubmitted && (multiDaySessions ?? []).length === 1 && (
          <SingleDaySessions />
        )}
        {!isSubmitted && (multiDaySessions ?? []).length > 1 && (
          <MultiDaySessions />
        )}
      </ScrollArea>
    </>
  );
}

export default CandidateAvailability;

function Header({
  candidateRequestAvailability,
  isSubmitted,
}: {
  candidateRequestAvailability: CandidateAvailabilityType;
  isSubmitted: boolean;
}) {
  return (
    <div className='w-lg flex w-full flex-col items-center'>
      <div className='mb-4 flex items-center justify-center'>
        {candidateRequestAvailability &&
        candidateRequestAvailability?.recruiter?.logo ? (
          <>
            <Avatar className='h-[100px] w-[100px]'>
              <AvatarImage
                src={candidateRequestAvailability?.recruiter.logo}
                alt={candidateRequestAvailability?.recruiter.name}
              />
              <AvatarFallback>
                {candidateRequestAvailability?.recruiter.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h1 className='text-2xl font-semibold'>
              {candidateRequestAvailability?.recruiter.name}
            </h1>
          </>
        ) : null}
      </div>
      <div className='mb-8 flex items-center gap-2'>
        {isSubmitted ? (
          <UIAlert type='success' title='Availability Submitted Successfully'>
            <p>
              Thank you for submitting your availability. We will review the
              selected time slots and confirm the schedule soon. You will
              receive a confirmation shortly.
            </p>
          </UIAlert>
        ) : (
          <h1 className='text-2xl font-semibold text-muted-foreground'>
            Your Availability Requested
          </h1>
        )}
      </div>
    </div>
  );
}
