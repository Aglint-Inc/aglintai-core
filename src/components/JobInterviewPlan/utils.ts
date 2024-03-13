import { InterviewSession } from './types';

export const filterAddedModules = (
  allModules: InterviewSession[],
  currModules: InterviewSession[]
) => {
  return allModules.filter((alMod) => {
    return !currModules.find((eMod) => eMod.module_id === alMod.module_id);
  });
};
