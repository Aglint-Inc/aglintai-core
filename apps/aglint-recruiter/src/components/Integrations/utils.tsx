import {
  type DatabaseTableUpdate,
} from '@aglint/shared-types';

// import { useToast } from '@components/hooks/use-toast';
import { supabase } from '@/utils/supabase/client';

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
