import { GRAPH_DEPENDENCIES } from '@/job/metrics/constants/graphDependencies';

type GraphEntries = Record<string, number> | Record<string, string | number>[];
export const getOrderedGraphValues = (data: GraphEntries) => {
  const safeData = mutateData(data);
  const deferedValues = GRAPH_DEPENDENCIES.defer.reduce((acc, curr) => {
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
          color:
            GRAPH_DEPENDENCIES.colors[i % GRAPH_DEPENDENCIES.colors.length],
        });
      return acc;
    }, []) as { name: string; count: number; color: string }[];
  (result.length + 1) % GRAPH_DEPENDENCIES.colors.length;
  Object.entries(deferedValues).forEach(([key, value], i) => {
    const colorPosition =
      (result.length + 1 + i) % GRAPH_DEPENDENCIES.colors.length;
    result.push({
      name: key,
      count: value,
      color: GRAPH_DEPENDENCIES.colors[colorPosition],
    });
  });
  return result;
};

const mutateData = (data: GraphEntries) =>
  (Array.isArray(data)
    ? (data ?? []).reduce((acc, curr) => {
        return {
          ...acc,
          ...Object.assign(
            {},
            Object.values(curr).reduce((acc, curr) => {
              if (typeof curr === 'number') {
                if (Object.values(acc).length === 0) acc['key'] = curr;
                else acc[Object.keys(acc)[0]] = curr;
              } else {
                if (acc['key']) {
                  acc[curr] = acc['key'];
                  delete acc['key'];
                } else acc[curr] = undefined;
              }
              return acc;
            }, {}),
          ),
        };
      }, {})
    : { ...data }) as Record<string, number>;
