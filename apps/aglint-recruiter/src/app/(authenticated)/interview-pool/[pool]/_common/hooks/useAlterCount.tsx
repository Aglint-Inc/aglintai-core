import { type DatabaseTable } from '@aglint/shared-types';
import { toast } from '@components/hooks/use-toast';
import { useState } from 'react';

import { supabase } from '@/utils/supabase/client';

export const useAlterCount = () => {
  const [isSaving, setIsSaving] = useState(false);

  const alterCount = async ({
    type,
    count,
    module_relation_id,
  }: {
    type: DatabaseTable['interview_session_relation']['training_type'];
    count: number;
    module_relation_id: string;
  }) => {
    try {
      if (count === 0) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Minimum count should be 1',
        });
        return;
      }
      setIsSaving(true);
      if (type === 'shadow') {
        await supabase
          .from('interview_module_relation')
          .update({
            number_of_shadow: count,
          })
          .eq('id', module_relation_id);
      } else {
        await supabase
          .from('interview_module_relation')
          .update({
            number_of_reverse_shadow: count,
          })
          .eq('id', module_relation_id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => {
        setIsSaving(false);
      }, 1000); // added for refetching react query
    }
  };

  return { alterCount, isSaving, setIsSaving };
};
