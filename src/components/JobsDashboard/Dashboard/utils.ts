import { CountJobs } from '@/src/context/JobsContext/types';

export const totalCount = (data: CountJobs) =>
  data && Object.values(data).reduce((acc, count) => acc + count, 0);

export type scoreMatchesScore = {
  score: number;
  color: string;
};
export const countMatches = (inputData) => {
  function convertData(inputData: {
    topMatch: any;
    goodMatch: any;
    averageMatch: any;
    poorMatch: any;
    noMatch: any;
  }) {
    return {
      top_Matches: {
        score: inputData.topMatch,
        color: '#A8189733',
      },
      good_Matches: {
        score: inputData.goodMatch,
        color: '#D1E8DF80',
      },
      average_Matches: {
        score: inputData.averageMatch,
        color: '#FFEDC2',
      },
      poor_Matches: {
        score: inputData.poorMatch,
        color: '#FFEEDB',
      },
      not_Matches: {
        score: inputData.noMatch,
        color: '#F5D5D8',
      },
    };
  }

  return convertData(inputData);
};

export const grapDependencies = {
  colors: ['#95A4FC', '#BAEDBD', '#B1E3FF', '#A8C5DA', '#A1E3CB'],
  defer: 'others',
};

export const getOrderedGraphValues = (data: { [id: string]: number }) => {
  const safeData = { ...data };
  const others = safeData[grapDependencies.defer] ?? null;
  if (others) delete safeData[grapDependencies.defer];
  const result = Object.entries(safeData)
    .sort((a, b) => b[1] - a[1])
    .reduce((acc, curr, i) => {
      acc.push({
        name: curr[0],
        count: curr[1],
        color: grapDependencies.colors[i % grapDependencies.colors.length],
      });
      return acc;
    }, []) as { name: string; count: number; color: string }[];
  if (others) {
    const colorPosition = (result.length + 1) % grapDependencies.colors.length;
    result.push({
      name: grapDependencies.defer,
      count: others,
      color: grapDependencies.colors[colorPosition === 0 ? 1 : colorPosition],
    });
  }
  return result;
};
