import { type DatabaseTable } from '@aglint/shared-types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import {
  fetchModuleSchedules,
  fetchProgress,
} from '../DetailPage/_common/utils/utils';
import { QueryKeysInteviewModules } from './type';

export const useAllSchedulesByModuleId = ({
  filter,
  changeText,
}: {
  filter: DatabaseTable['interview_meeting']['status'][];
  changeText: string;
}) => {
  const router = useRouter();
  const module_id = router.query.type_id as string;
  const query = useQuery({
    queryKey: QueryKeysInteviewModules.SCHEDULES_BY_MODULE_ID({
      moduleId: module_id,
      filter,
      changeText,
    }),
    queryFn: () => fetchModuleSchedules(module_id, filter, changeText),
    enabled: !!module_id,
    placeholderData: [],
  });
  return query;
};

export const useProgressModuleUsers = ({
  trainer_ids,
}: {
  trainer_ids: string[]; // interview_module_relation_id
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const module_id = router.query.type_id as string;

  const query = useQuery({
    queryKey: QueryKeysInteviewModules.PROGRESS_BY_MODULE_ID({
      moduleId: module_id,
    }),
    queryFn: () =>
      fetchProgress({
        trainer_ids: trainer_ids,
      }),
    enabled: router.query.module_id && trainer_ids.length > 0,
    refetchOnWindowFocus: false,
  });

  const refetch = async () => {
    await queryClient.invalidateQueries({
      queryKey: QueryKeysInteviewModules.PROGRESS_BY_MODULE_ID({
        moduleId: module_id,
      }),
    });
  };

  return { ...query, refetch };
};
