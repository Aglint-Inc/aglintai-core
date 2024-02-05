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



export function stringToColor(string: string): string {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */
  return color + 'cc';
}
