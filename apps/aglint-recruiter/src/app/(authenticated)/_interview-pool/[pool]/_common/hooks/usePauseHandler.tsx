import { type PauseJson } from '@aglint/shared-types';
import { useToast } from '@components/hooks/use-toast';

import { api } from '@/trpc/client';

import { type PauseType } from '../types/type';
import { updatePauseJsonByUserId } from '../utils/utils';

export const usePauseHandler = () => {
  const { toast } = useToast();
  const utils = api.useUtils();

  const pauseHandler = async ({
    module_id,
    user_id,
    selectedType,
    pause_json,
  }: {
    module_id: string;
    user_id: string;
    selectedType: PauseType;
    pause_json: PauseJson;
  }) => {
    try {
      if (user_id) {
        if (selectedType === 'custom' && !pause_json?.end_date) {
          return toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Please select end date.',
          });
        }
        const isUpdated = await updatePauseJsonByUserId({
          user_id: user_id,
          pause_json: pause_json,
          module_id: module_id,
        });
        if (isUpdated) {
          await utils.interview_pool.module_and_users.invalidate({
            module_id: module_id,
          });
        }
      } else {
        throw new Error();
      }
    } catch {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Error pausing user.',
      });
    }
  };

  return { pauseHandler };
};
