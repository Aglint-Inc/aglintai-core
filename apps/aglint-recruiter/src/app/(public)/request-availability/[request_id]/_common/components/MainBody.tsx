'use client';
import dayjs from 'dayjs';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { useMemo } from 'react';
import { ConfirmedInvitePage } from 'src/app/_common/components/CandidateConfirm/_common/components';
import { type CandidateInviteType } from 'src/app/(public)/self-scheduling/[filter]/_common/store';

import { UIButton } from '@/common/UIButton';
import { Loader } from '@/components/Common/Loader';
import timeZones from '@/utils/timeZone';

import { useRequestAvailabilityContext } from '../contexts/RequestAvailabilityContext';
import {
  useCandidateAvailabilityData,
  useCandidateAvailabilityMeetings,
} from '../hooks/useRequestAvailability';
import MultiDaySessions from './MultiDaySessions';
import SingleDaySessions from './SingleDaySessions';
import SlotsSubmitted from './SlotsSubmitted';

function CandidateAvailability() {
  const { multiDaySessions, isSubmitted, meetingsAndRounds } =
    useRequestAvailabilityContext();
  const { isFetched: isMeetingFetched } = useCandidateAvailabilityMeetings();

  const { data: candidateRequestAvailability, isFetched } =
    useCandidateAvailabilityData();

  const initialTimezone = useMemo(() => {
    const tz = dayjs.tz.guess();
    return timeZones.find(
      ({ tzCode }) => tzCode === tz,
    ) as CandidateInviteType['timezone'];
  }, []);

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
  if (!isFetched || !isMeetingFetched) {
    return (
      <div className='flex h-[200px] w-full items-center justify-center'>
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
      {isSubmitted && <SlotsSubmitted />}
      {!isSubmitted && (multiDaySessions ?? []).length === 1 && (
        <SingleDaySessions />
      )}
      {!isSubmitted && (multiDaySessions ?? []).length > 1 && (
        <MultiDaySessions />
      )}
    </>
  );
}

export default CandidateAvailability;
