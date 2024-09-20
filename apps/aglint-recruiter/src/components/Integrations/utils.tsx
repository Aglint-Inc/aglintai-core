import {
  type DatabaseTableUpdate,
  type RecruiterType,
} from '@aglint/shared-types';

// import { useToast } from '@components/hooks/use-toast';
import { supabase } from '@/utils/supabase/client';

export async function updateRecruiter(id: string, obj: RecruiterType) {
  const { data, error } = await supabase
    .from('recruiter')
    .update({ ...obj })
    .eq('id', id)
    .select('* , office_locations(*), departments(id,name)')
    .single();
  if (!error) {
    return data;
  }
}

export const updateIntegrations = async (
  int: DatabaseTableUpdate['integrations'],
  rec_id: string,
) => {
  try {
    await supabase
      .from('integrations')
      .update({ ...int })
      .eq('recruiter_id', rec_id)
      .throwOnError();
  } catch {
    // toast({
    //   variant: 'destructive',
    //   title: 'Failed to update integrations',
    // });
  }
};
