import { InterviewModuleCType } from './types';

export const filterAddedModules = (
  allModules: InterviewModuleCType[],
  currModules: InterviewModuleCType[]
) => {
  return allModules.filter((alMod) => {
    return !currModules.find((eMod) => eMod.module_id === alMod.module_id);
  });
};
