import { InterviewModule } from './types';

export const filterAddedModules = (
  allModules: InterviewModule[],
  currModules: InterviewModule[]
) => {
  return allModules.filter((alMod) => {
    return !currModules.find((eMod) => eMod.module_id === alMod.module_id);
  });
};
