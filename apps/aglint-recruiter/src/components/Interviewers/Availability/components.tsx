const officeHours = [9, 17]; // 9 AM to 5 PM
const extendedHours = [7, 20]; // 7 AM to 8 PM
const sleepTimes = [0, 6]; // 12 AM to 6 AM

const radixColors = {
  officeHoursBg: 'hsl(190, 70%, 40%)', // Darker Cyan
  extendedHoursBg: 'hsl(190, 70%, 30%)', // Even Darker Cyan
  sleepTimesBg: 'hsl(190, 70%, 20%)', // Darkest Cyan
  availabilityOverlay: 'hsla(142, 100%, 68%, 0.8)', // Green for availability
  softConflictsOverlay: 'hsla(48, 100%, 67%, 0.8)', // Yellow for soft conflicts
};

export const getColor = ({
  hour,
  interviewer,
}: {
  hour: number;
  interviewer: interviewer;
}) => {
  let backgroundColor = radixColors.sleepTimesBg; // Default to sleep times

  if (hour >= officeHours[0] && hour <= officeHours[1]) {
    backgroundColor = radixColors.officeHoursBg; // Office hours
  } else if (hour >= extendedHours[0] && hour <= extendedHours[1]) {
    backgroundColor = radixColors.extendedHoursBg; // Extended hours
  }

  let overlayColor = null; // Default to no overlay

  if (interviewer.availability.includes(hour)) {
    overlayColor = radixColors.availabilityOverlay; // Green overlay for availability
  } else if (interviewer.softConflicts.includes(hour)) {
    overlayColor = radixColors.softConflictsOverlay; // Yellow overlay for soft conflicts
  }

  return { backgroundColor, overlayColor };
};

type interviewer = {
  name: string;
  timezone: string;
  availability: number[];
  softConflicts: number[];
};
