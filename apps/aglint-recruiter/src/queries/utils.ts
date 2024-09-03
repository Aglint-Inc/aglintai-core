/* eslint-disable security/detect-object-injection */
import { type DB } from '@aglint/shared-types';

export type SupabaseQuery<T extends keyof DB['public']['Tables']> =
  readonly (keyof DB['public']['Tables'][T]['Row'])[];

type SupabaseQueryString<T extends readonly any[]> = T extends readonly [
  infer Head extends string,
  ...infer Tail extends string[],
]
  ? `${Head}${Tail['length'] extends 0 ? '' : ', '}${SupabaseQueryString<Tail>}`
  : '';

export const getSupabaseQuery = <T extends readonly string[]>(query: T) => {
  return query.join(', ') as SupabaseQueryString<T>;
};

export function getNthDateFromToday({
  n,
  unit,
}: {
  n: number;
  unit: 'days' | 'months' | 'years';
}) {
  const today = new Date();
  const nthDate = new Date(today);

  switch (unit) {
    case 'days':
      nthDate.setDate(today.getDate() + n);
      break;
    case 'months':
      nthDate.setMonth(today.getMonth() + n);
      break;
    case 'years':
      nthDate.setFullYear(today.getFullYear() + n);
      break;
    default:
      throw new Error('Invalid duration unit');
  }
  nthDate.setHours(0, 0, 0, 0);
  return nthDate.toISOString();
}

interface DataItem {
  date: string;
}

interface GroupedData {
  [key: string]: number;
}

export const groupDateBy = (array: DataItem[], type: 'month' | 'week') => {
  const groupedData: GroupedData = array.reduce(
    (acc: GroupedData, obj: DataItem) => {
      const date = new Date(obj.date);
      let key: string;

      if (type === 'month') {
        key = date.toLocaleString('default', { month: 'short' });
      } else {
        key = `Week ${getWeekNumber(date)}`;
      }

      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key]++;
      return acc;
    },
    {},
  );
  return groupedData;
};

const getWeekNumber = (date: Date): number => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.valueOf() - firstDayOfYear.valueOf()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};
