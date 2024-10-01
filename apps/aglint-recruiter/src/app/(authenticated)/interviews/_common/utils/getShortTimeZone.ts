import { dayjsLocal } from '@aglint/shared-utils';

export const getShortTimeZone = (timeZone: string) => {
  const tZTime = dayjsLocal()
    .tz(timeZone || dayjsLocal.tz.guess())
    .format('zzz');
  const timezone = tZTime
    .split(' ')
    .map((ele) => ele[0])
    .join('');

  return timezone;
};
