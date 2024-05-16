/* eslint-disable security/detect-object-injection */
import dayjs from 'dayjs';

import { getFullName } from '@/src/utils/jsonResume';

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
    'GMT+5:30': 'IST', // Mapping for Asia/Calcutta
    // Add more mappings for other time zones as needed
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
