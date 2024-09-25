import { dayjsLocal } from '@aglint/shared-utils';

import { userTzDayjs } from '@/services/CandidateScheduleV2/utils/userTzDayjs';

export const getShortTimeZone = (timeZone: string) => {
  const tZTime = dayjsLocal()
    .tz(timeZone || userTzDayjs.tz.guess())
    .format('zzz');
  const timezone = tZTime
    .split(' ')
    .map((ele) => ele[0])
    .join('');

  return timezone;
};
