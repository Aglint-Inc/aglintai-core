import dayjs from 'dayjs';

export function calculateTimeDifference(postedDate) {
  const now = dayjs();
  const posted = dayjs(postedDate);
  const diff = now.diff(posted, 'second'); // Calculate the difference in seconds

  if (diff < 60) {
    return 'Just now';
  } else if (diff < 3600) {
    return `${Math.floor(diff / 60)} minutes ago`;
  } else if (diff < 86400) {
    return `${Math.floor(diff / 3600)} hours ago`;
  } else {
    return `${Math.floor(diff / 86400)} days ago`;
  }
}
