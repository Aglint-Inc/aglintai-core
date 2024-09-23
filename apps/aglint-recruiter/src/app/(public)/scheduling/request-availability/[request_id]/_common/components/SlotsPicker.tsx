/* eslint-disable security/detect-object-injection */
import { type DatabaseTable } from '@aglint/shared-types';
// import { Badge } from '@components/ui/badge';
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from '@components/ui/carousel';
// import { ScrollArea } from '@components/ui/scroll-area';
import dayjs from 'dayjs';
import {  CheckCircle } from 'lucide-react';
import { useEffect } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import { UIDivider } from '@/components/Common/UIDivider';
import toast from '@/utils/toast';

import { useRequestAvailabilityContext } from '../contexts/RequestAvailabilityContext';
import { DateCard } from './DateCard';
import TimeSlotsColumn from './TimeSlotsColumn';

export default function SlotsPicker({ singleDay }: { singleDay: boolean }) {
  const {
    candidateRequestAvailability,
    selectedDateSlots,
    selectedSlots,  
    setDaySlots,
    openDaySlotPopup: day,
    setOpenDaySlotPopup,
    setIsSubmitted,
    dateSlots,
    submitAvailability,
    handleClickDate,
    multiDaySessions
  } = useRequestAvailabilityContext();

  const markAsAllDateSelected =
    selectedDateSlots.find((ele) => ele.round === day)?.dates.length &&
    selectedDateSlots.find((ele) => ele.round === day)?.dates.length >=
      candidateRequestAvailability.number_of_days;
  const markAsAllSlotsSelected = selectedSlots.length
    ? selectedSlots
        .find((ele) => ele.round === day)
        ?.dates.every(
          (item) =>
            item.slots.length >= candidateRequestAvailability.number_of_slots,
        )
    : false;
  const handleSubmit = async () => {
    const eventsByDate = selectedSlots
      .find((ele) => ele.round === day)
      .dates.map((ele) => ele.slots)
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
      .find((ele) => ele.round === day)
      .dates.map((ele) => ele.curr_day.split('T')[0])
      .filter((date) => !Object.keys(eventsByDate).includes(date));

    if (!markAsAllDateSelected) {
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
    if (!singleDay) {
      setDaySlots(
        //@ts-expect-error
        (pre: DatabaseTable['candidate_request_availability']['slots']) => {
          const updatedSlots = [...pre];
          const existingSlotIndex = updatedSlots.findIndex(
            (slot) => slot.round === day,
          );

          if (existingSlotIndex !== -1) {
            updatedSlots[existingSlotIndex] = {
              ...selectedSlots.find((ele) => ele.round === day),
            };
          } else {
            updatedSlots.push({
              ...selectedSlots.find((ele) => ele.round === day),
            });
          }
          return updatedSlots;
        },
      );
    } else {
      submitAvailability();
    }
    setOpenDaySlotPopup(null);
  };

  useEffect(() => {
    if (candidateRequestAvailability?.slots) {
      setIsSubmitted(true);
    }
  }, [candidateRequestAvailability]);
  if (candidateRequestAvailability) {
    return (
      <>
        <div className='bg-white '>
          <div className='flex flex-col gap-10 px-0'>
            <div className='flex flex-col items-left gap-4'>
              <div className='flex items-center gap-4'>
                <div className='relative'>
                  {markAsAllDateSelected ? (
                    <CheckCircle className='h-10 w-10 text-green-500' />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          1
                          </div>
                  )}
                </div>
                <div className="flex flex-col">
                <div className="text-lg font-medium">Select available dates</div>
                <span className='text-sm'> {`Select ${candidateRequestAvailability.number_of_days} or more days.`}</span>
                </div>
              </div>
              <div className='text-muted-foreground'>Click on a date to select. Click again to deselect.</div>
              
              <div className='w-full'>
                {/* <Carousel className='w-full'>
                  <CarouselContent>
                    <DaysWrapInWeek isSingleDay={singleDay} />
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel> */}
                {
                  <div>
                  {/* <ScrollArea className='w-[800px]'> */}
                   <div className='flex flex-row flex-wrap justify-start gap-2 w-full'>
                   {singleDay
                     ? (dateSlots?.find((slot) => slot.round === day || 1)?.dates || []).map((dateSlot, i) => {
                         return (
                           <DateCard
                             isDisable={dateSlot.slots.length === 0}
                             isActive={selectedDateSlots
                               .find((ele) => ele.round === day || 1)
                               ?.dates.map((ele) => ele.curr_day)
                               .includes(dateSlot.curr_day)}
                             key={i}
                             textDate={dayjs(dateSlot.curr_day).format('DD')}
                             textDay={dayjs(dateSlot.curr_day).format('dddd')}
                             textMonth={dayjs(dateSlot.curr_day).format('MMM')}
                             onClickDate={() => {
                               handleClickDate({ selectedDate: dateSlot, day });
                             }}
                           />
                         );
                       })
                     : (dateSlots?.find((slot) => slot.round === day || 1)?.dates || []).map((dateSlot, i) => {
                         let enable = false;
                         const justPrevDay =
                           day > 1 &&
                           multiDaySessions[day - 2][0].break_duration / 1440;
                         const dates = dateSlots
                           .find((ele) => ele.round === day || 1)
                           ?.dates.filter((ele) => ele.slots.length);
                         const prevSelectedDates = selectedDateSlots
                           .filter((ele) => ele.round === day - 1)
                           .map((ele) => ele.dates)
                           .flat()
                           ?.map((ele) => ele.curr_day.split('T')[0]);
     
                         const totalDayDurations = multiDaySessions.reduce(
                           (accumulator, sessions) => {
                             const breakDurations = sessions.filter(
                               (session) => session.break_duration >= 1440,
                             );
                             return (
                               accumulator +
                               breakDurations.reduce(
                                 (acc, session) => acc + session.break_duration,
                                 0,
                               )
                             );
                           },
                           0,
                         );
                         const prevDayDurations = multiDaySessions
                           .slice(0, day - 1)
                           .reduce((accumulator, sessions) => {
                             const breakDurations = sessions.filter(
                               (session) => session.break_duration >= 1440,
                             );
                             return (
                               accumulator +
                               breakDurations.reduce(
                                 (acc, session) => acc + session.break_duration,
                                 0,
                               )
                             );
                           }, 0);
     
                         const prevNumberOfDay = prevDayDurations / 1440;
     
                         const numberOfDay =
                           totalDayDurations / 1440 - prevNumberOfDay;
     
                         if (i >= dates.length - numberOfDay) {
                           enable = true;
                         }
     
                         if (
                           day > 1 &&
                           dayjs(prevSelectedDates[justPrevDay]).isAfter(
                             dayjs(dateSlot.curr_day),
                             'day',
                           )
                         ) {
                           enable = true;
                         }
     
                         if (
                           dayjs(dayjs(dateSlot.curr_day)).isAfter(
                             prevSelectedDates[0],
                             'day',
                           ) &&
                           dayjs(dayjs(dateSlot.curr_day)).isBefore(
                             prevSelectedDates[prevSelectedDates.length - 1],
                             'day',
                           ) &&
                           !prevSelectedDates.includes(
                             dateSlot.curr_day.split('T')[0],
                           )
                         ) {
                           enable = false;
                         }
     
                         return (
                           <DateCard
                             isDisable={enable || dateSlot.slots.length === 0}
                             isActive={selectedDateSlots
                               .find((ele) => ele.round === day)
                               ?.dates.map((ele) => ele.curr_day)
                               .includes(dateSlot.curr_day)}
                             key={i}
                             textDate={dayjs(dateSlot.curr_day).format('DD')}
                             textDay={dayjs(dateSlot.curr_day).format('dddd')}
                             textMonth={dayjs(dateSlot.curr_day).format('MMM')}
                             onClickDate={() => {
                               handleClickDate({ selectedDate: dateSlot, day });
                             }}
                           />
                         );
                       })}
                  </div>
                 {/* </ScrollArea> */}
                 </div>
                }
              </div>
              {/* <div className="flex flex-col gap-2">
                    <div>Selected Dates :</div>
                    <div className="flex gap-2">
                    <Badge variant='secondary' className='px-4 py-1 text-md font-medium flex items-center gap-2 bg-blue-100'>Sep 18 Monday
                    <X className="w-4 h-4 cursor-pointer" />
                    </Badge>
                    <Badge variant='secondary' className='px-4 py-1 text-md font-medium flex items-center gap-2  bg-blue-100'>Sep 19 Tuesday
                    <X className="w-4 h-4 cursor-pointer" />
                    </Badge>
                    </div>
              </div> */}
            </div>
            
            <div className='flex flex-col items-start gap-4 w-full '>
            
              {markAsAllDateSelected ? (
                <div className='flex flex-col items-start gap-4 w-full'>
                  <UIDivider/>
                  <div className='flex items-center gap-4'>
                    <div className='relative'>
                      {markAsAllSlotsSelected ? (
                        <CheckCircle className='h-10 w-10 text-green-500' />
                      ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          2
                          </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                    <div className="text-lg font-medium">Choose time slots</div>
                    <span className='text-sm'>{`Choose ${candidateRequestAvailability.number_of_slots} or more slots per day.`}</span>
                    </div>
                  </div>
                  <div className='text-muted-foreground'>Click on a timeslot to select. Click again to deselect.</div>
                </div>
              ) : null}
              <div>{markAsAllDateSelected ? <TimeSlotsWrapper /> : null}</div>
            </div>
            <div className='flex justify-center items-center w-full'>
              {markAsAllDateSelected && markAsAllSlotsSelected ? (
                <div className='w-[300px] mx-auto mb-4'>
                  <UIButton
                    size='md'
                    onClick={handleSubmit}
                    disabled={!markAsAllSlotsSelected}
                    className='w-full'
                  >
                    {singleDay ? 'Submit Availability' : 'Done'}
                  </UIButton>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </>
    );
  }
}

function TimeSlotsWrapper() {
  const {
    selectedDateSlots,
    handleClickDate,
    openDaySlotPopup: day,
  } = useRequestAvailabilityContext();
  return (
    <div className=''>
      <div className='flex flex-col gap-3'>
        {selectedDateSlots
          .find((ele) => ele.round === day)
          ?.dates.sort((a, b) =>
            dayjs(a.curr_day).isAfter(dayjs(b.curr_day)) ? 1 : -1,
          )
          .map((slotTime, i) => (
            <TimeSlotsColumn
              onClose={() =>
                handleClickDate({
                  selectedDate: slotTime,
                  day,
                })
              }
              key={i}
              slotTime={slotTime}
            />
          ))}
      </div>
    </div>
  );
}
// function DaysWrapInWeek({ isSingleDay }: { isSingleDay: boolean }) {
//   const {
//     multiDaySessions,
//     dateSlots,
//     handleClickDate,
//     selectedDateSlots,
//     openDaySlotPopup: day,
//   } = useRequestAvailabilityContext();
//   const dates = dateSlots?.find((slot) => slot.round === day || 1)?.dates || [];
//   const weeks: DatabaseTable['candidate_request_availability']['slots'][number]['dates'][] =
//     [];
//   for (let i = 0; i < dates.length; i += 7) {
//     weeks.push(dates.slice(i, i + 7));
//   }

//   return (
//     <>
//       {weeks.map((week, weekIndex) => {
//         return (
//           <CarouselItem key={weekIndex}>
//             <div className='flex justify-center space-x-2 p-2'>
//               {isSingleDay
//                 ? week.map((dateSlot, i) => {
//                     return (
//                       <DateCard
//                         isDisable={dateSlot.slots.length === 0}
//                         isActive={selectedDateSlots
//                           .find((ele) => ele.round === day || 1)
//                           ?.dates.map((ele) => ele.curr_day)
//                           .includes(dateSlot.curr_day)}
//                         key={i}
//                         textDate={dayjs(dateSlot.curr_day).format('DD')}
//                         textDay={dayjs(dateSlot.curr_day).format('dddd')}
//                         textMonth={dayjs(dateSlot.curr_day).format('MMM')}
//                         onClickDate={() => {
//                           handleClickDate({ selectedDate: dateSlot, day });
//                         }}
//                       />
//                     );
//                   })
//                 : week.map((dateSlot, i) => {
//                     let enable = false;
//                     const justPrevDay =
//                       day > 1 &&
//                       multiDaySessions[day - 2][0].break_duration / 1440;
//                     const dates = dateSlots
//                       .find((ele) => ele.round === day || 1)
//                       ?.dates.filter((ele) => ele.slots.length);
//                     const prevSelectedDates = selectedDateSlots
//                       .filter((ele) => ele.round === day - 1)
//                       .map((ele) => ele.dates)
//                       .flat()
//                       ?.map((ele) => ele.curr_day.split('T')[0]);

//                     const totalDayDurations = multiDaySessions.reduce(
//                       (accumulator, sessions) => {
//                         const breakDurations = sessions.filter(
//                           (session) => session.break_duration >= 1440,
//                         );
//                         return (
//                           accumulator +
//                           breakDurations.reduce(
//                             (acc, session) => acc + session.break_duration,
//                             0,
//                           )
//                         );
//                       },
//                       0,
//                     );
//                     const prevDayDurations = multiDaySessions
//                       .slice(0, day - 1)
//                       .reduce((accumulator, sessions) => {
//                         const breakDurations = sessions.filter(
//                           (session) => session.break_duration >= 1440,
//                         );
//                         return (
//                           accumulator +
//                           breakDurations.reduce(
//                             (acc, session) => acc + session.break_duration,
//                             0,
//                           )
//                         );
//                       }, 0);

//                     const prevNumberOfDay = prevDayDurations / 1440;

//                     const numberOfDay =
//                       totalDayDurations / 1440 - prevNumberOfDay;

//                     if (i >= dates.length - numberOfDay) {
//                       enable = true;
//                     }

//                     if (
//                       day > 1 &&
//                       dayjs(prevSelectedDates[justPrevDay]).isAfter(
//                         dayjs(dateSlot.curr_day),
//                         'day',
//                       )
//                     ) {
//                       enable = true;
//                     }

//                     if (
//                       dayjs(dayjs(dateSlot.curr_day)).isAfter(
//                         prevSelectedDates[0],
//                         'day',
//                       ) &&
//                       dayjs(dayjs(dateSlot.curr_day)).isBefore(
//                         prevSelectedDates[prevSelectedDates.length - 1],
//                         'day',
//                       ) &&
//                       !prevSelectedDates.includes(
//                         dateSlot.curr_day.split('T')[0],
//                       )
//                     ) {
//                       enable = false;
//                     }

//                     return (
//                       <DateCard
//                         isDisable={enable || dateSlot.slots.length === 0}
//                         isActive={selectedDateSlots
//                           .find((ele) => ele.round === day)
//                           ?.dates.map((ele) => ele.curr_day)
//                           .includes(dateSlot.curr_day)}
//                         key={i}
//                         textDate={dayjs(dateSlot.curr_day).format('DD')}
//                         textDay={dayjs(dateSlot.curr_day).format('dddd')}
//                         textMonth={dayjs(dateSlot.curr_day).format('MMM')}
//                         onClickDate={() => {
//                           handleClickDate({ selectedDate: dateSlot, day });
//                         }}
//                       />
//                     );
//                   })}
//             </div>
//           </CarouselItem>
//         );
//       })}
//     </>
//   );
// }
