import { dayjsLocal } from './dayjsLocal';

export const getShortTimeZone = (timeZone: string) => {
  const tZTime = dayjsLocal().tz(timeZone).format('zzz');
  const timezone = tZTime
    .split(' ')
    .map((ele) => ele[0])
    .join('');

  return timezone;
};
