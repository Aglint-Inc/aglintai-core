import { InterviewModule } from './store';

export const filterAddedModules = (
  allModules: InterviewModule[],
  currModules: InterviewModule[]
) => {
  return allModules.filter((alMod) => {
    return !currModules.find((eMod) => eMod.module_id === alMod.module_id);
  });
};
