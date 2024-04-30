import dayjs from '@utils/dayjs';

import { TimezoneObj } from '../Settings';

export const getDurationText = (duration: number) => {
  const hours = Math.trunc(duration / 60);
  const minutes = Math.trunc(duration % 60);
  const durationText = `${
    hours ? `${hours} hour${hours === 1 ? '' : 's'}` : ''
  }${hours && minutes ? ' ' : ''}${
    minutes ? `${minutes} minute${minutes === 1 ? '' : 's'}` : ''
  }`;
  return durationText;
};

export const dayJS = (timestamp: string, tz: TimezoneObj['tzCode']) => {
  return dayjs(timestamp).tz(tz);
};
