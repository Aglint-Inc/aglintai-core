import { api } from '@/trpc/client';

import { resumePauseDbUpdate } from '../utils/utils';
import { type useModuleAndUsers } from './useModuleAndUsers';

export const useResumeHandler = () => {
  const utils = api.useUtils();
  const resumeHandler = async ({
    module_id,
    user_id,
    editModule,
  }: {
    module_id: string;
    user_id: string;
    editModule: ReturnType<typeof useModuleAndUsers>['data'];
  }) => {
    if (user_id && editModule) {
      const isUpdated = await resumePauseDbUpdate({ module_id, user_id });
      if (isUpdated) {
        await utils.interview_pool.module_and_users.invalidate({
          module_id: module_id,
        });
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return { resumeHandler };
};
