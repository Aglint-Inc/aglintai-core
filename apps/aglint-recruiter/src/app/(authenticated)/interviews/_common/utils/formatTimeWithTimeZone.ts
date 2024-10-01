import { dayjsLocal } from '@aglint/shared-utils';

export const formatTimeWithTimeZone = ({
  start_time,
  end_time,
  timeZone, // send time zone like Asia/Calcutta
}: {
  start_time: string;
  end_time: string;
  timeZone?: string;
}) => {
  const tZTime = dayjsLocal(end_time)
    .tz(timeZone || dayjsLocal.tz.guess())
    .format('zzz');
  const timezone = tZTime
    .split(' ')
    .map((ele) => ele[0])
    .join('');
  return start_time
    ? `${dayjsLocal(start_time)
        .tz(timeZone || dayjsLocal.tz.guess())
        .format('hh:mm A')} - ${dayjsLocal(end_time)
        .tz(timeZone || dayjsLocal.tz.guess())
        .format('hh:mm A')} ${timeZone ? timezone : ''}`
    : '--';
};
