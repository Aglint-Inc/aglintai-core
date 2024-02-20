import dayjs from 'dayjs';

import { BodyParams } from '@/src/pages/api/scheduling/list-availability';

export function findAvailableTimeSlots(
  events: { start: Date; end: Date }[],
  requiredTimeSlotInMinutes: number,
  startDate: Date,
  endDate: Date,
  working_hours: BodyParams['working_hours'],
) {
  const availableTimeSlots = [];

  // Helper function to check if two events overlap
  //   e1.start  e2.start  e1.end e2.end
  function isOverlap(event1, event2) {
    return event1.start < event2.end && event2.start < event1.end;
  }

  // Iterate through each day between startDate and endDate
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const dayStartTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      dayjs(working_hours.startTime).get('hour'),
      dayjs(working_hours.startTime).get('minutes'),
    );
    const dayEndTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      dayjs(working_hours.endTime).get('hour'),
    );

    // Find available time slots within the current day
    let currentTime = new Date(dayStartTime);
    while (currentTime < dayEndTime) {
      const endTime = new Date(
        currentTime.getTime() + requiredTimeSlotInMinutes * 60000,
      );

      // Check if the current time slot overlaps with any event
      const overlappedEvent = events.find((event) =>
        isOverlap(event, { start: currentTime, end: endTime }),
      );

      if (overlappedEvent) {
        currentTime = overlappedEvent.end;
      } else {
        availableTimeSlots.push({
          start: currentTime,
          end: endTime,
        });
        currentTime = endTime;
      }
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return availableTimeSlots;
}
