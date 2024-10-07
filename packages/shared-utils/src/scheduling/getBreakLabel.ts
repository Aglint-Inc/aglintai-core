export const getBreakLabel = (minutes: number) => {
  if (minutes >= 1440) {
    const days = Math.trunc(minutes / 60 / 24);
    return `${days} day${days === 1 ? '' : 's'}`;
  } else if (minutes >= 60) {
    const hours = Math.trunc(minutes / 60);
    return `${hours} hour${hours === 1 ? '' : 's'}`;
  } else {
    return `${minutes} minute${minutes === 1 ? '' : 's'}`;
  }
};
