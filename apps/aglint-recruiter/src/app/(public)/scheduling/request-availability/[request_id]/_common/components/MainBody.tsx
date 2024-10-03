import { SINGLE_DAY_TIME } from '@aglint/shared-utils';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import axios from 'axios';
import dayjs from 'dayjs';
import { AlertCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { ConfirmedInvitePage } from 'src/app/_common/components/CandidateConfirm';
import { type CandidateInviteType } from 'src/app/(public)/scheduling/invite/[id]/_common/store';

import { Loader } from '@/components/Common/Loader';
import timeZones from '@/utils/timeZone';

import { useRequestAvailabilityContext } from '../contexts/RequestAvailabilityContext';
import {
  useCandidateAvailabilityData,
  useCandidateAvailabilityMeetings,
} from '../hooks/useRequestAvailability';
import {
  type CandidateAvailabilityType,
  type CandidateMeetingsType,
} from '../types';
import MultiDaySessions from './MultiDaySessions';
import SingleDaySessions from './SingleDaySessions';
import SlotsSubmitted from './SlotsSubmitted';

function CandidateAvailability() {
  const { multiDaySessions, loading, isSubmitted } =
    useRequestAvailabilityContext();
  const [meetingsAndRounds, setMeetingsAndRound] = useState<{
    rounds: any[];
    meetings: any[];
    schedule: any;
  } | null>(null);

  const { data: meetings } = useCandidateAvailabilityMeetings();
  const { data: candidateRequestAvailability } = useCandidateAvailabilityData();

  const getMeetings = async (
    application_id: string,
    meetings: CandidateMeetingsType,
  ) => {
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
      const { data: sch } = await axios.post(
        `/api/scheduling/request_availability/candidateAvailability/getScheduleMeetings`,
        {
          application_id,
        },
      );
      setMeetingsAndRound({
        rounds: rounds,
        meetings: meetings,
        schedule: sch,
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
      getMeetings(candidateRequestAvailability.application_id, meetings);
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
        //@ts-ignore // remove after nullable fix
        candidate={candidateRequestAvailability.applications.candidates}
        meetings={meetingsAndRounds.meetings}
        rounds={meetingsAndRounds.rounds}
        recruiter={{
          id: candidateRequestAvailability?.recruiter_id,
          name: candidateRequestAvailability?.recruiter.name,
          logo: candidateRequestAvailability?.recruiter.logo,
        }}
        timezone={initialTimezone}
        application_id={candidateRequestAvailability.application_id}
      />
    );
  }
  if (loading) {
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
            <AlertCircle className='h-16 w-16 text-red-500' />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='mx-auto flex w-full max-w-screen-md flex-col items-center gap-4 rounded-lg border border-border bg-white p-6'>
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
          <Avatar className='h-[100px] w-[100px]'>
            <AvatarImage
              src={candidateRequestAvailability?.recruiter.logo}
              alt='Recruiter logo'
            />
            <AvatarFallback>Logo</AvatarFallback>
          </Avatar>
        ) : null}
      </div>
      <div
        className={`mb-8 flex items-center gap-2 ${isSubmitted ? 'text-green-500' : 'text-neutral-500'}'} `}
      >
        {isSubmitted ? (
          <></>
        ) : (
          <>
            <p className='text-2xl font-semibold'>
              Your Availability Requested
            </p>
          </>
        )}
      </div>
      {isSubmitted && (
        <div className='w-full'>
          <div className='flex w-full flex-col gap-2 rounded-md bg-green-100 p-4'>
            <div className='text-lg font-medium text-green-700'>
              Availability Submitted successfully
            </div>
            <div className='text-md font-normal text-gray-600'>
              Thank you for submitting your availability.We will review the
              selected time slots and confirm the schedule soon. You will
              recieve a confirmation shortly.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
