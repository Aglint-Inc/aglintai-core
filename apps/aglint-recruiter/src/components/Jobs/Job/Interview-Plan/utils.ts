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

export const getBreakLabelV2 = (minutes: number) => {
  const res: string[] = [];
  const days = Math.trunc(minutes / 1440);
  minutes = minutes % 1440;
  const hours = Math.trunc(minutes / 60);
  minutes = minutes % 60;
  if (days) {
    res.push(`${days} day${days === 1 ? '' : 's'}`);
  }
  if (hours) {
    res.push(`${hours} hour${hours === 1 ? '' : 's'}`);
  }
  if (minutes) {
    res.push(`${minutes} minute${minutes === 1 ? '' : 's'}`);
  }
  return res.join(' ');
};
