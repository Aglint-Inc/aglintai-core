'use client';
import { type DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils';
import { toast } from '@components/hooks/use-toast';
import { Separator } from '@components/ui/separator';
import { cn } from '@lib/utils';
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
import DaySessions from './DaySessions';
import SlotsPicker from './SlotsPicker';

function CandidateAvailability() {
  const {
    multiDaySessions,
    meetingsAndRounds,
    selectedSlots,
    selectedDateSlots,
    setOpenDaySlotPopup,
    openDaySlotPopup: day,
    submitting,
    isSubmitted,
    submitAvailability,
    setDaySlots,
  } = useRequestAvailabilityContext();
  const { isFetched: isMeetingFetched } = useCandidateAvailabilityMeetings();

  const { data: candidateRequestAvailability } = useCandidateAvailabilityData();

  const NoOfSlotsNeeds = candidateRequestAvailability?.number_of_slots || 2;
  const NoOfDaysNeeds = candidateRequestAvailability?.number_of_days || 2;
  const allCriteriaMeets = candidateRequestAvailability
    ? multiDaySessions.length === selectedSlots.length &&
      selectedSlots.every((ele) => ele.dates.length >= NoOfDaysNeeds) &&
      selectedSlots
        .flatMap((ele) => ele.dates)
        .every((ele) => ele.slots.length >= NoOfSlotsNeeds)
    : false;

  const daySlotDates =
    selectedDateSlots.find((ele) => ele.round === day)?.dates ?? [];

  const markAsAllDateSelected = daySlotDates.length >= (NoOfDaysNeeds ?? 0);

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
      <div className='flex max-h-[60vh] min-h-[60vh] flex-row overflow-auto p-4'>
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
      </div>
    );
  }
  if (candidateRequestAvailability?.booking_confirmed && !isMeetingFetched) {
    return (
      <div className='flex max-h-[60vh] min-h-[60vh] flex-row items-center justify-center overflow-auto p-4'>
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
            {` We couldn't load your availability link.`}
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

  const markAsAllSlotsSelected = selectedSlots.length
    ? selectedSlots
        .find((ele) => ele.round === day)
        ?.dates.every((item) => item.slots.length >= (NoOfSlotsNeeds ?? 0))
    : false;
  const handleSubmit = async () => {
    const eventsByDate = (
      selectedSlots.find((ele) => ele.round === day)?.dates ?? []
    )
      .map((ele) => ele.slots)
      .flat()
      .reduce((acc: Record<string, any[]>, event) => {
        const date = event.startTime.split('T')[0];
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(event);
        return acc;
      }, {});
    const checkMinimumSlotsSelected = Object.keys(eventsByDate).filter(
      (date) => eventsByDate[date].length < (NoOfSlotsNeeds ?? 0),
    );

    const checkSlotsSelectedForDates = daySlotDates
      .map((ele) => ele.curr_day.split('T')[0])
      .filter((date) => !Object.keys(eventsByDate).includes(date));

    if (!markAsAllDateSelected) {
      toast({
        title: `Please Select minimum ${NoOfDaysNeeds} days`,
      });
      return;
    }
    if (checkSlotsSelectedForDates.length) {
      toast({
        title: `You have not selected any slots for ${checkSlotsSelectedForDates.map((date) => dayjsLocal(date).format('MMM DD')).join(',')}`,
      });
      return;
    }
    if (checkMinimumSlotsSelected.length) {
      toast({
        title: `You have to select minimum ${NoOfSlotsNeeds} slots on ${checkMinimumSlotsSelected.map((date) => dayjsLocal(date).format('MMM DD')).join(',')} `,
      });
      return;
    }

    if (multiDaySessions.length > 1) {
      setDaySlots(
        //@ts-expect-error
        (
          pre: NonNullable<
            DatabaseTable['candidate_request_availability']['slots']
          >,
        ) => {
          const updatedSlots = [...pre];
          const existingSlotIndex = updatedSlots.findIndex(
            (slot) => slot.round === day,
          );

          const daySlots = (selectedSlots.find((ele) => ele.round === day) ||
            []) as NonNullable<
            DatabaseTable['candidate_request_availability']['slots']
          >[0];
          if (existingSlotIndex !== -1) {
            updatedSlots[existingSlotIndex] = {
              ...daySlots,
            };
            if (day < multiDaySessions.length) setOpenDaySlotPopup(day + 1);
          } else {
            updatedSlots.push({
              ...daySlots,
            });
            if (day < multiDaySessions.length) setOpenDaySlotPopup(day + 1);
          }
          return updatedSlots;
        },
      );
    }
  };
  return (
    <div className='flex max-h-[60vh] min-h-[60vh] flex-row p-4'>
      {!candidateRequestAvailability?.slots && (
        <>
          <div className='w-8/12 overflow-auto px-2'>
            <SlotsPicker singleDay={multiDaySessions.length === 1} />
          </div>
        </>
      )}
      <Separator className='mx-2 h-auto w-[1px]' />
      <div
        className={cn('w-4/12', {
          'w-full': !!candidateRequestAvailability?.slots,
        })}
      >
        <div className='max-h-[calc(100%-50px)] min-h-[calc(100%-50px)] overflow-auto'>
          <DaySessions singleDay={multiDaySessions.length === 1} />
        </div>
        <div className='flex h-[50px] w-full items-end rounded-none'>
          {day < multiDaySessions.length ? (
            <UIButton
              size='md'
              onClick={handleSubmit}
              disabled={
                !markAsAllSlotsSelected || !markAsAllDateSelected || submitting
              }
              className='w-full rounded-none'
              isLoading={submitting}
            >
              Next Day
            </UIButton>
          ) : null}
          {!isSubmitted && day === multiDaySessions.length && (
            <div className='w-full'>
              <UIButton
                size='md'
                className='w-full rounded-b-md'
                onClick={submitAvailability}
                disabled={!allCriteriaMeets || submitting}
                isLoading={submitting}
              >
                Submit Availability
              </UIButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CandidateAvailability;
