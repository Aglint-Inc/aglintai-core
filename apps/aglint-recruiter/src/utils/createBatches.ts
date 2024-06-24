export const createBatches = <T>(
  payload: T[],
  count: number,
  limit?: number,
) => {
  payload = payload.slice(0, limit);
  const batches = Array.from({ length: count }, () => [] as T[]);
  return payload
    .reduce((acc, curr, i) => {
      acc[i % acc.length].push(curr);
      return acc;
    }, batches)
    .filter((f) => f.length !== 0);
};
