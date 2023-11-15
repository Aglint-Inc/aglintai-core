export function getLocationString(location) {
  const { city, region, address, country, postalCode } = location;

  // Create an array with non-empty properties
  const locationArray = [address, city, region, postalCode, country].filter(
    Boolean,
  );

  // Create the formatted location string
  const locationString = locationArray.join(', ');

  return locationString;
}

export const getFullName = ({ firstName, lastName }) => {
  return [firstName, lastName]
    .map((s) => s.trim())
    .filter(Boolean)
    .join(',');
};

export const getformatedDate = (start: string, end: string) => {
  return [start, end]
    .map((s) => s.trim())
    .filter(Boolean)
    .join('-');
};

export function getTimeDifference(date1: string, date2: string) {
  // Parse the ISO format strings into Date objects
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  // Calculate the time difference in milliseconds
  const timeDiff = Math.abs(d2.getTime() - d1.getTime());

  // Calculate seconds, minutes, hours, days, and months
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(timeDiff / (1000 * 60));
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);

  // Create an array to store the time difference components
  const timeComponents = [];

  // Conditionally add components based on existence
  if (months >= 12) {
    const years = Math.floor(months / 12);
    timeComponents.push(`${years} year${years !== 1 ? 's' : ''}`);
  } else if (months > 0) {
    timeComponents.push(`${months} month${months !== 1 ? 's' : ''}`);
  } else if (days > 0) {
    timeComponents.push(`${days} day${days !== 1 ? 's' : ''}`);
  } else if (hours > 0) {
    timeComponents.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
  } else if (minutes > 0) {
    timeComponents.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
  } else {
    timeComponents.push(`${seconds} second${seconds !== 1 ? 's' : ''}`);
  }

  return timeComponents[0] + ' ago';
}
