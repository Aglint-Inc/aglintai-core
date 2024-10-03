import { dayjsLocal } from '@aglint/shared-utils';

export const transformWorkHours = (
  workHours: {
    day: string;
    isWorkDay: boolean;
    timeRange: {
      startTime: string;
      endTime: string;
    };
  }[],
  timezone: string,
) => {
  const dayMapping = {
    sunday: 7,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  const transformed = workHours.map(({ day, isWorkDay, timeRange }) => {
    const referenceDate = dayjsLocal().format('YYYY-MM-DD');
    const convertedStartTime = isWorkDay
      ? dayjsLocal
          .tz(`${referenceDate}T${timeRange.startTime}`, timezone)
          .format('HH:mm')
      : '00:00';
    const convertedEndTime = isWorkDay
      ? dayjsLocal
          .tz(`${referenceDate}T${timeRange.endTime}`, timezone)
          .format('HH:mm')
      : '24:00';
    return {
      daysOfWeek: [dayMapping[day as keyof typeof dayMapping]],
      startTime: convertedStartTime,
      endTime: convertedEndTime,
    };
  });

  return transformed;
};
