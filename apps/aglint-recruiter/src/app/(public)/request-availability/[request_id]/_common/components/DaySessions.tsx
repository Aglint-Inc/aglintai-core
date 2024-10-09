import { type DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils';
import { toast } from '@components/hooks/use-toast';
import { ScrollArea } from '@components/ui/scroll-area';

import { UIButton } from '@/common/UIButton';

import { useRequestAvailabilityContext } from '../contexts/RequestAvailabilityContext';
import { useCandidateAvailabilityData } from '../hooks/useRequestAvailability';
import DaySessionCard from './DaySessionCard';

function DaySessions({ singleDay }: { singleDay: boolean }) {
  const {
    multiDaySessions,
    selectedSlots,
    selectedDateSlots,
    openDaySlotPopup: day,
    setDaySlots,
    setOpenDaySlotPopup,
    submitting,
    submitAvailability,
    isSubmitted,
  } = useRequestAvailabilityContext();
  const { data: candidateRequestAvailability } = useCandidateAvailabilityData();
  const NoOfSlotsNeeds = candidateRequestAvailability?.number_of_slots || 2;
  const NoOfDaysNeeds = candidateRequestAvailability?.number_of_days || 2;
  const allCriteriaMeets = candidateRequestAvailability
    ? multiDaySessions.length === selectedSlots.length &&
      selectedDateSlots.every((ele) => ele.dates.length >= NoOfDaysNeeds) &&
      selectedSlots
        .flatMap((ele) => ele.dates)
        .every((ele) => ele.slots.length >= NoOfSlotsNeeds)
    : false;

  const daySlotDates =
    selectedDateSlots.find((ele) => ele.round === day)?.dates ?? [];

  const markAsAllDateSelected = daySlotDates.length >= (NoOfDaysNeeds ?? 0);
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

    if (!singleDay) {
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
    <>
      <div className='relative flex flex-col items-center'>
        <ScrollArea className='h-[calc(100vh-260px)] w-full border-l border-border p-4'>
          <div className='flex w-full flex-col gap-2'>
            {multiDaySessions.map((sessions, i) => {
              const totalSessionMinutes = sessions.reduce(
                (accumulator, session) =>
                  accumulator + session.session_duration,
                0,
              );
              const dates =
                selectedSlots.find((ele) => ele.round === i + 1)?.dates || [];
              return (
                <DaySessionCard
                  singleDay={singleDay}
                  key={i}
                  cardIndex={i}
                  totalSessionMinutes={totalSessionMinutes}
                  sessions={sessions}
                  dates={dates}
                />
              );
            })}
          </div>
        </ScrollArea>
        <div className='absolute bottom-0 -mx-4 flex w-full items-center rounded-none'>
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
          {!isSubmitted && (
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
    </>
  );
}

export default DaySessions;
