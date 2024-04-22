import dayjs from 'dayjs';

export function getLastDayOfMonth(date: string) {
  return dayjs(date).endOf('month').date();
}
