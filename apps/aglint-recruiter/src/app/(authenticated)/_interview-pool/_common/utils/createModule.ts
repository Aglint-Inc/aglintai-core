import { supabase } from '@/utils/supabase/client';

export const createModule = async ({
  name,
  recruiter_id,
  description,
  isTraining,
  department_id,
}: {
  name: string;
  description: string;
  isTraining: boolean;
  recruiter_id: string;
  department_id: number;
}) => {
  const { data: interMod, error: errorModule } = await supabase
    .from('interview_module')
    .insert({
      name,
      recruiter_id,
      description,
      settings: {
        require_training: isTraining ? true : false,
        noShadow: 2,
        noReverseShadow: 2,
        reqruire_approval: false,
      },
      department_id,
    })
    .select();

  if (errorModule) {
    throw errorModule;
  }

  return interMod[0];
};
