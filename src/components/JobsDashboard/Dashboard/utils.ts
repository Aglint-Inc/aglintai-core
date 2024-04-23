/* eslint-disable security/detect-object-injection */
import { CountJobs } from '@/src/context/JobsContext/types';

export const totalCount = (data: CountJobs) =>
  data && Object.values(data).reduce((acc, count) => acc + count, 0);

export type scoreMatchesScore = {
  score: number;
  color: string;
};

export const grapDependencies = {
  colors: [
    '#B1E3FF',
    '#A1E3CB',
    '#A8C5DA',
    '#949494',
    '#BAEDBD',
    '#95A4FC',
    '#C4D2CD'
  ],
  defer: ['others', 'unknown']
};

export const getOrderedGraphValues = (data: { [id: string]: number }) => {
  const safeData = { ...data };
  const deferedValues = grapDependencies.defer.reduce((acc, curr) => {
    if (safeData[curr]) {
      acc['others'] = acc['others']
        ? acc['others'] + safeData[curr]
        : safeData[curr];
      delete safeData[curr];
    }
    return acc;
  }, {}) as { [id: string]: number };
  const result = Object.entries(safeData)
    .sort((a, b) => b[1] - a[1])
    .reduce((acc, curr, i) => {
      if (curr[1])
        acc.push({
          name: curr[0],
          count: curr[1],
          color: grapDependencies.colors[i % grapDependencies.colors.length]
        });
      return acc;
    }, []) as { name: string; count: number; color: string }[];
  (result.length + 1) % grapDependencies.colors.length;
  Object.entries(deferedValues).forEach(([key, value], i) => {
    const colorPosition =
      (result.length + 1 + i) % grapDependencies.colors.length;
    result.push({
      name: key,
      count: value,
      color: grapDependencies.colors[colorPosition]
    });
  });
  return result;
};
