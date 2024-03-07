import { InterviewModuleDbType } from '@/src/components/JobInterviewPlan/types';

export type ModuleCombination = Pick<
  InterviewModuleDbType,
  'module_id' | 'duration' | 'meetingIntervCnt' | 'module_name'
> & {
  participating_inters: {
    id: string;
    email: string;
    profile_img: string;
    name: string;
  }[];
};

export const calcIntervCombsForModule = (plan: InterviewModuleDbType[]) => {
  const calcSingleModuleCombinations = (
    plan_module: InterviewModuleDbType,
    comb: number
  ) => {
    let module_combs: ModuleCombination[] = [];
    const combs = findCombinationOfStrings(
      plan_module.selectedIntervs.map((int) => int.interv_id),
      comb
    );

    for (let comb of combs) {
      module_combs.push({
        participating_inters: comb.map((id) => {
          const inter = plan_module.selectedIntervs.find(
            (i) => i.interv_id === id
          );
          return {
            id: inter.interv_id,
            email: inter.email,
            profile_img: inter.profile_img,
            name: inter.name
          };
        }),
        duration: plan_module.duration,
        meetingIntervCnt: plan_module.meetingIntervCnt,
        module_id: plan_module.module_id,
        module_name: plan_module.module_name
      });
    }
    return module_combs;
  };

  let total_combs: ModuleCombination[][] = [];

  for (const int_module of plan) {
    if (int_module.isBreak) continue;
    // module level filter settings
    const combs = calcSingleModuleCombinations(
      int_module,
      int_module.meetingIntervCnt
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
    r: number
  ) => {
    if (index === r) {
      total_combs.push(single_comb);
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

// given  array of items, find all the combinations of picking each item in in arry item
