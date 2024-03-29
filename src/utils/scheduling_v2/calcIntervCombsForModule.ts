import { InterviewSessionApiType } from '../scheduling_v1/types';

export const calcIntervCombsForModule = (
  sessions: InterviewSessionApiType[],
) => {
  const calcSingleModuleCombinations = (
    session: InterviewSessionApiType,
    comb: number,
  ) => {
    let session_combs: InterviewSessionApiType[] = [];
    const combs = findCombinationOfStrings(
      [...session.selectedIntervs.map((int) => int.user_id)],
      comb,
    );
    for (let comb of combs) {
      session_combs.push({
        ...session,
        selectedIntervs: comb.map((id) => {
          const inter = session.selectedIntervs.find((i) => i.user_id === id);
          return {
            ...inter,
          };
        }),
      });
    }
    return session_combs;
  };

  let total_combs: InterviewSessionApiType[][] = [];

  for (const session of sessions) {
    const combs = calcSingleModuleCombinations(
      session,
      session.interviewer_cnt,
    );
    total_combs.push(combs);
  }

  return total_combs;
};

const findCombinationOfStrings = (str_arr: string[], comb: number) => {
  let total_combs: string[][] = [];

  const findCombinationUtil = (
    arr: string[],
    single_comb: string[],
    start: number,
    end: number,
    index: number,
    r: number,
  ) => {
    if (index === r) {
      total_combs.push([...single_comb]);
      return;
    }

    for (let i = start; i <= end && end - i + 1 >= r - index; ++i) {
      single_comb[Number(index)] = arr[Number(i)];
      findCombinationUtil(arr, single_comb, i + 1, end, index + 1, r);
    }
  };
  let temp_arr = Array(comb).fill('');
  findCombinationUtil(str_arr, temp_arr, 0, str_arr.length - 1, 0, comb);

  return total_combs;
};
