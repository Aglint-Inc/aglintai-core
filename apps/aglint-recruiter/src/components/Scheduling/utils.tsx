/* eslint-disable security/detect-object-injection */
import { getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import dayjs from 'dayjs';

import { userTzDayjs } from '@/services/CandidateScheduleV2/utils/userTzDayjs';

export function getLastDayOfMonth(date: string) {
  return dayjs(date).endOf('month').date();
}

export function convertTimeZoneToAbbreviation(sourceTimeZone) {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: sourceTimeZone,
    timeZoneName: 'short',
  });
  const timeZoneAbbreviation = formatter
    .formatToParts(date)
    .find((part) => part.type === 'timeZoneName').value;

  const abbreviationMapping = {
    'GMT+5:30': 'IST',
    'GMT+9:30': 'ACST',
  };

  return abbreviationMapping[timeZoneAbbreviation] || timeZoneAbbreviation;
}

export const getScheduleName = ({
  job_title,
  first_name,
  last_name,
}: {
  job_title: string;
  first_name: string;
  last_name: string;
}) => {
  return `Interview for ${job_title} - ${getFullName(first_name, last_name)}`;
};

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
    .tz(timeZone || userTzDayjs.tz.guess())
    .format('zzz');
  const timezone = tZTime
    .split(' ')
    .map((ele) => ele[0])
    .join('');
  return start_time
    ? `${dayjsLocal(start_time)
        .tz(timeZone || userTzDayjs.tz.guess())
        .format('hh:mm A')} - ${dayjsLocal(end_time)
        .tz(timeZone || userTzDayjs.tz.guess())
        .format('hh:mm A')} ${timeZone ? timezone : ''}`
    : '--';
};

//accept dayjs.tz only
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
