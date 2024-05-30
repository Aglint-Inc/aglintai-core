/* eslint-disable security/detect-object-injection */
import { DatabaseTable } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Page404 } from '@/devlink/Page404';
import { AvailabilityEmpty } from '@/devlink2/AvailabilityEmpty';
import { AvailabilityReq } from '@/devlink2/AvailabilityReq';
import { ButtonPrimary } from '@/devlink2/ButtonPrimary';
import { CalendarPick } from '@/devlink2/CalendarPick';
import { DatePicker } from '@/devlink2/DatePicker';
import { TimePick } from '@/devlink2/TimePick';
import CandidateSlotLoad from '@/src/components/Common/Lotties/CandidateSlotLoad';
import { ShowCode } from '@/src/components/Common/ShowCode';
import toast from '@/src/utils/toast';

import {
  updateCandidateRequestAvailability,
  useRequestAvailabilityContext,
} from '../RequestAvailabilityContext';
import SlotColumn from './SlotColumn';

function CandidateAvailability() {
  const router = useRouter();
  const {
    dateSlots,
    candidateRequestAvailability,
    loading,
    setSelectedDateSlots,
    setSelectedSlots,
    selectedDateSlots,
    selectedSlots,
  } = useRequestAvailabilityContext();

  const handleClickDate = (
    ele: DatabaseTable['candidate_request_availability']['slots'][number],
  ) => {
    setSelectedDateSlots(
      //@ts-ignore
      (pre: DatabaseTable['candidate_request_availability']['slots']) => {
        if (pre.map((ele) => ele.curr_day).includes(ele.curr_day)) {
          return pre.filter((date) => date.curr_day !== ele.curr_day);
        } else {
          return [...pre, ele];
        }
      },
    );
    setSelectedSlots(
      //@ts-ignore
      (pre: DatabaseTable['candidate_request_availability']['slots']) => {
        if (pre.map((ele) => ele.curr_day).includes(ele.curr_day)) {
          return pre.filter((date) => date.curr_day !== ele.curr_day);
        } else {
          return [...pre, { curr_day: ele.curr_day, slots: [] }];
        }
      },
    );
  };
  const markAsAllDateSelected =
    selectedDateSlots.length &&
    selectedDateSlots.length >= candidateRequestAvailability.number_of_days;
  const markAsAllSlotsSelected =
    selectedSlots.length &&
    selectedSlots.every(
      (item) =>
        item.slots.length >= candidateRequestAvailability.number_of_slots,
    );
  const handleSubmit = async () => {
    const eventsByDate = selectedSlots
      .map((ele) => ele.slots)
      .flat()
      .reduce((acc, event) => {
        const date = event.startTime.split('T')[0];
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(event);
        return acc;
      }, {});
    const checkMinimumSlotsSelected = Object.keys(eventsByDate).filter(
      (date) =>
        eventsByDate[date].length <
        candidateRequestAvailability.number_of_slots,
    );

    const checkSlotsSelectedForDates = selectedDateSlots
      .map((ele) => ele.curr_day.split('T')[0])
      .filter((date) => !Object.keys(eventsByDate).includes(date));

    if (
      selectedDateSlots.length < candidateRequestAvailability.number_of_days
    ) {
      toast.message(
        `Please Select minimum ${candidateRequestAvailability.number_of_days} days`,
      );
      return;
    }
    if (checkSlotsSelectedForDates.length) {
      toast.message(
        `You have not selected any slots for ${checkSlotsSelectedForDates.map((date) => dayjs(date).format('MMM DD')).join(',')}`,
      );
      return;
    }
    if (checkMinimumSlotsSelected.length) {
      toast.message(
        `You have to select minimum ${candidateRequestAvailability.number_of_slots} slots on ${checkMinimumSlotsSelected.map((date) => dayjs(date).format('MMM DD')).join(',')} `,
      );
      return;
    }
    router.push('/scheduling/request-availability/submitted');
    await updateCandidateRequestAvailability({
      data: { slots: selectedSlots },
      id: String(router.query?.request_id),
    });
  };

  useEffect(() => {
    if (candidateRequestAvailability?.slots) {
      router.push('/scheduling/request-availability/submitted');
    }
  }, [candidateRequestAvailability]);

  if (loading) {
    return (
      <Stack
        width={'100%'}
        height={'100%'}
        direction={'row'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Stack width={'120px'} style={{ transform: 'translateY(-50%)' }}>
          <CandidateSlotLoad />
        </Stack>
      </Stack>
    );
  }
  if (candidateRequestAvailability) {
    return (
      <AvailabilityReq
        isPickedCalendarActive={markAsAllDateSelected}
        textPickDays={`Pick at least ${candidateRequestAvailability.number_of_days} days.`}
        isPickSlotIconActive={markAsAllSlotsSelected}
        textPickSlots={`Pick at least  ${candidateRequestAvailability.number_of_slots} slots from each day.`}
        slotPrimaryButton={
          <ButtonPrimary
            onClickButton={{
              onClick: handleSubmit,
            }}
            textLabel={'Submit Availability'}
          />
        }
        slotCalenderPick={
          <CalendarPick
            slotDatePicker={dateSlots
              .filter((ele) => ele.slots.length)
              .map((dateSlot) => {
                return (
                  <DatePicker
                    // isDisable={}
                    isActive={selectedDateSlots
                      .map((ele) => ele.curr_day)
                      .includes(dateSlot.curr_day)}
                    key={dateSlot.curr_day}
                    textDate={dayjs(dateSlot.curr_day).format('DD')}
                    textDay={dayjs(dateSlot.curr_day).format('dddd')}
                    textMonth={dayjs(dateSlot.curr_day).format('MMM')}
                    onClickDate={{
                      onClick: () => handleClickDate(dateSlot),
                    }}
                  />
                );
              })}
          />
        }
        slotTimePick={
          <TimePick
            slotSlotPicker={
              <ShowCode>
                <ShowCode.When isTrue={selectedDateSlots.length === 0}>
                  <AvailabilityEmpty />
                </ShowCode.When>
                <ShowCode.Else>
                  {selectedDateSlots
                    .sort((a, b) =>
                      dayjs(a.curr_day).isAfter(dayjs(b.curr_day)) ? 1 : -1,
                    )
                    .map((slotTime, i) => {
                      return (
                        <SlotColumn
                          onClose={() => handleClickDate(slotTime)}
                          key={i}
                          slotTime={slotTime}
                        />
                      );
                    })}
                </ShowCode.Else>
              </ShowCode>
            }
          />
        }
      />
    );
  }
  if (!candidateRequestAvailability) {
    return (
      <Stack>
        <Page404 />
      </Stack>
    );
  }
}

export default CandidateAvailability;
