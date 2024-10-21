import { toast } from '@components/hooks/use-toast';

import { useTenant } from '@/company/hooks';
import { api } from '@/trpc/client';
import { supabase } from '@/utils/supabase/client';

import { useModuleAndUsers } from './useModuleAndUsers';

export const useApproveUsers = () => {
  const { recruiter_user } = useTenant();
  const utils = api.useUtils();

  const { data: editModule } = useModuleAndUsers();
  const trainer_ids = editModule?.relations
    .filter((rel) => rel.training_status === 'training')
    .map((user) => {
      return user.id;
    });

  const approveTrainingProgress = async (id: string) => {
    await supabase
      .from('interview_training_progress')
      .update({
        is_approved: true,
        approved_user_id: recruiter_user.user_id,
      })
      .eq('id', id);
    utils.interview_pool.training_progress.invalidate({
      trainer_ids,
    });
    toast({
      title: 'Approved',
      description: 'Approved successfully.',
    });
  };

  return { approveTrainingProgress };
};
