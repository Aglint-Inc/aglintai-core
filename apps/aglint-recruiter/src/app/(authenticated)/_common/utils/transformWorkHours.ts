export const transformWorkHours = (
  workHours: {
    day: string;
    isWorkDay: boolean;
    timeRange: {
      startTime: string;
      endTime: string;
    };
  }[],
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

  const transformed = workHours.map(({ day, isWorkDay, timeRange }) => ({
    daysOfWeek: [dayMapping[day]],
    startTime: isWorkDay ? timeRange.startTime : '00:00',
    endTime: isWorkDay ? timeRange.endTime : '24:00',
  }));

  return transformed;
};
