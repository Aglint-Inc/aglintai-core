import dayjs, { Dayjs } from 'dayjs';

export const convertDateFormatToDayjs = (user_date) => {
  const [day, month, year] = user_date.split('/');
  if (!day || !month || !year) {
    throw new Error(`Date should in the format DD/MM/YYYY`);
  }
  return dayjs(`${year}-${month}-${day}`);
};

export const convertDayjsToUserTimeZoneDate = (
  user_date: Dayjs,
  userTimeZone,
  isStartTime = true,
) => {
  let d: Dayjs;
  d = user_date.tz(userTimeZone);
  if (isStartTime) {
    d = d.startOf('day');
  } else {
    d = d.endOf('day');
  }
  return d.format();
};
