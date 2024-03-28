import { InterviewModuleApiType } from '@/src/components/JobInterviewPlan/types';

export type ModuleCombination = Pick<
  InterviewModuleApiType,
  | 'module_id'
  | 'duration'
  | 'meetingIntervCnt'
  | 'module_name'
  | 'session_name'
  | 'selectedIntervs'
  | 'revShadowIntervs'
  | 'shadowIntervs'
  | 'meeting_type'
>;
export const calcIntervCombsForModule = (plan: InterviewModuleApiType[]) => {
  const calcSingleModuleCombinations = (
    plan_module: InterviewModuleApiType,
    comb: number,
  ) => {
    let module_combs: ModuleCombination[] = [];
    const combs = findCombinationOfStrings(
      [...plan_module.selectedIntervs.map((int) => int.interv_id)],
      comb,
    );
    for (let comb of combs) {
      module_combs.push({
        selectedIntervs: comb.map((id) => {
          const inter = plan_module.selectedIntervs.find(
            (i) => i.interv_id === id,
          );
          return {
            interv_id: inter.interv_id,
            email: inter.email,
            profile_img: inter.profile_img,
            name: inter.name,
            pause_json: inter.pause_json,
          };
        }),
        duration: plan_module.duration,
        meetingIntervCnt: plan_module.meetingIntervCnt,
        module_id: plan_module.module_id,
        module_name: plan_module.module_name,
        session_name: plan_module.session_name,
        revShadowIntervs: plan_module.revShadowIntervs,
        shadowIntervs: plan_module.shadowIntervs,
        meeting_type: plan_module.meeting_type,
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
      int_module.meetingIntervCnt,
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

// given  array of items, find all the combinations of picking each item in in arry item
