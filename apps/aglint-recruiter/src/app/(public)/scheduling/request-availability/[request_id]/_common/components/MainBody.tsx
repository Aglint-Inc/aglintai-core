import { SINGLE_DAY_TIME } from '@aglint/shared-utils';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { UIAlert } from '@components/ui-alert';
import dayjs from 'dayjs';
import { AlertCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { ConfirmedInvitePage } from 'src/app/_common/components/CandidateConfirm/_common/components';
import { type CandidateInviteType } from 'src/app/(public)/scheduling/invite/[id]/_common/store';

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
      <div className='flex h-[100vh] w-full items-center justify-center'>
        <Loader />
      </div>
    );
  }

  if (!candidateRequestAvailability) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100'>
        <div className='text-center'>
          <h1 className='mb-4 text-6xl font-bold text-gray-800'>404</h1>
          <p className='mb-8 text-xl text-gray-600'>Page not found</p>
          <div className='flex justify-center'>
            <AlertCircle className='h-16 w-16 text-destructive' />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='mx-auto flex w-full max-w-screen-md flex-col items-center'>
      <Header
        candidateRequestAvailability={candidateRequestAvailability}
        isSubmitted={isSubmitted}
      />
      {isSubmitted && <SlotsSubmitted />}
      {!isSubmitted && (multiDaySessions ?? []).length === 1 && (
        <SingleDaySessions />
      )}
      {!isSubmitted && (multiDaySessions ?? []).length > 1 && (
        <MultiDaySessions />
      )}
    </div>
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
