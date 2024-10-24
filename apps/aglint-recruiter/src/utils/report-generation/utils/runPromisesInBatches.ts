/* eslint-disable no-console */
export const runPromisesInBatches = async (
  promises: Promise<any>[],
  _concurrent_cnt: number,
) => {
  // Since we're executing promises sequentially, concurrent_cnt is set to 1
  const finished_results: PromiseSettledResult<any>[] = [];

  for (let idx = 0; idx < promises.length; idx += 1) {
    console.log('running promise', `${idx + 1} of ${promises.length}`);
    try {
      const value = await promises[idx];
      finished_results.push({ status: 'fulfilled', value });
    } catch (reason) {
      finished_results.push({ status: 'rejected', reason });
    }
  }

  console.log('finished_results', finished_results);
};
