/* eslint-disable security/detect-object-injection */
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

export function convertTimeZoneToAbbreviation(sourceTimeZone: string) {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: sourceTimeZone,
    timeZoneName: 'short',
  });
  const timeZoneAbbreviation =
    formatter?.formatToParts(date)?.find((part) => part.type === 'timeZoneName')
      ?.value ?? '';

  const abbreviationMapping: { [key: string]: string } = {
    'GMT+5:30': 'IST',
    'GMT+9:30': 'ACST',
  };

  return timeZoneAbbreviation
    ? abbreviationMapping[timeZoneAbbreviation]
    : timeZoneAbbreviation;
}

export const formatTimeWithTimeZone = ({
  start_time,
  end_time,
  timeZone, // send time zone like Asia/Calcutta
}: {
  start_time: string;
  end_time: string | null;
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

//accept dayjs.tz only
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
