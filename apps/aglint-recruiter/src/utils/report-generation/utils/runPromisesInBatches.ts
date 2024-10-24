/* eslint-disable no-console */
export const runPromisesInBatches = async (
  promises: Promise<any>[],
  concurrent_cnt: number,
) => {
  concurrent_cnt = 1;
  const finished_results: PromiseSettledResult<any>[] = [];
  let idx = 0;
  for (idx = 0; idx < promises.length; idx += concurrent_cnt) {
    console.log('running batch', `${idx} - ${idx + concurrent_cnt}`);
    const results = await Promise.allSettled(
      promises.slice(idx, idx + concurrent_cnt),
    );
    finished_results.push(...results);
  }
  if (idx < promises.length) {
    console.log('running last batch', `${idx} - ${promises.length}`);
    const results = await Promise.allSettled(promises.slice(idx));
    finished_results.push(...results);
  }
  console.log('finished_results', finished_results);
};
