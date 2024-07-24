import { DatabaseTable, PauseJson } from '@aglint/shared-types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import axios from '@/src/client/axios';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { ApiResponseInterviewModuleById } from '@/src/pages/api/scheduling/fetch_interview_module_by_id';
import toast from '@/src/utils/toast';

import { PauseType } from '../ModuleMembers/type';
import { MemberType, ModuleType } from '../types';
import { QueryKeysInteviewModules } from './type';
import {
  addMemberbyUserIds,
  deleteRelationByUserDbDelete,
  fetchInterviewModules,
  fetchModuleSchedules,
  fetchProgress,
  resumePauseDbUpdate,
  updatePauseJsonByUserId,
  updateRelations,
} from './utils';

export const useAllInterviewModules = () => {
  const { recruiter } = useAuthDetails();
  const query = useQuery({
    queryKey: QueryKeysInteviewModules.INTERVIEW_MODULES,
    queryFn: () => fetchInterviewModules(recruiter.id),
    enabled: !!recruiter.id,
    refetchOnMount: true,
  });
  return query;
};

export const useAllSchedulesByModuleId = ({
  filter,
  changeText,
}: {
  filter: DatabaseTable['interview_meeting']['status'];
  changeText: string;
}) => {
  const router = useRouter();
  const module_id = router.query.module_id as string;
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
  const module_id = router.query.module_id as string;

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

export const useModuleAndUsers = () => {
  const router = useRouter();
  const module_id = router.query.module_id as string;

  const query = useQuery({
    queryKey: QueryKeysInteviewModules.USERS_BY_MODULE_ID({
      moduleId: module_id,
    }),
    queryFn: async () => {
      const res = await axios.call<ApiResponseInterviewModuleById>(
        'POST',
        '/api/scheduling/fetch_interview_module_by_id',
        {
          module_id,
        },
      );
      return res;
    },
    enabled: !!module_id,
    refetchOnWindowFocus: false,
  });
  return query;
};

export const usePauseHandler = () => {
  const queryClient = useQueryClient();

  const resumeHandler = async ({
    module_id,
    user_id,
  }: {
    module_id: string;
    user_id: string;
  }): Promise<boolean> => {
    const editModule = queryClient.getQueryData<ModuleType>(
      QueryKeysInteviewModules.USERS_BY_MODULE_ID({ moduleId: module_id }),
    );
    if (user_id && editModule) {
      const isUpdated = await resumePauseDbUpdate({ module_id, user_id });

      if (isUpdated) {
        const updatedEditModule = {
          ...editModule,
          relations: editModule.relations.map((rel) =>
            rel.user_id === user_id ? { ...rel, pause_json: null } : rel,
          ),
        };
        queryClient.setQueryData(
          QueryKeysInteviewModules.USERS_BY_MODULE_ID({
            moduleId: editModule.id,
          }),
          {
            ...updatedEditModule,
          },
        );
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

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
        const editModule = queryClient.getQueryData<ModuleType>(
          QueryKeysInteviewModules.USERS_BY_MODULE_ID({ moduleId: module_id }),
        );
        if (selectedType === 'custom' && !pause_json?.end_date) {
          return toast.error('Please select end date.');
        }
        const isUpdated = await updatePauseJsonByUserId({
          user_id: user_id,
          pause_json: pause_json,
          module_id: module_id,
        });
        if (isUpdated) {
          const updatedEditModule = {
            ...editModule,
            relations: editModule.relations.map((rel) =>
              rel.user_id === user_id
                ? { ...rel, pause_json: pause_json }
                : rel,
            ),
          } as ModuleType;

          queryClient.setQueryData<ModuleType>(
            QueryKeysInteviewModules.USERS_BY_MODULE_ID({
              moduleId: editModule.id,
            }),
            {
              ...updatedEditModule,
            },
          );
        }
      } else {
        throw new Error();
      }
    } catch {
      toast.error('Error pausing user.');
    }
  };

  return { resumeHandler, pauseHandler };
};

export const useDeleteRelationHandler = () => {
  const queryClient = useQueryClient();

  const deleteRelationByUserId = async ({
    module_relation_id,
    module_id,
  }: {
    module_relation_id: string;
    module_id: string;
  }) => {
    try {
      const editModule = queryClient.getQueryData<ModuleType>(
        QueryKeysInteviewModules.USERS_BY_MODULE_ID({ moduleId: module_id }),
      );
      if (!editModule) throw new Error('Interview type not found');

      const isDeleted = await deleteRelationByUserDbDelete({
        module_relation_id,
      });
      if (isDeleted) {
        const updatedEditModule = {
          ...editModule,
          relations: editModule.relations.filter(
            (rel) => rel.id !== module_relation_id,
          ),
        } as ModuleType;
        queryClient.setQueryData<ModuleType>(
          QueryKeysInteviewModules.USERS_BY_MODULE_ID({
            moduleId: editModule.id,
          }),
          {
            ...updatedEditModule,
          },
        );
        return true;
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  return { deleteRelationByUserId };
};

export const useAddMemberHandler = ({
  editModule,
  refetch,
}: {
  editModule: ModuleType;
  refetch: () => void;
}) => {
  const addMemberHandler = async ({
    selectedUsers,
    trainingStatus,
  }: {
    selectedUsers: MemberType[];
    trainingStatus: 'training' | 'qualified';
  }) => {
    try {
      console.log(editModule.relations, 'editModule');

      if (!editModule) throw new Error('Interview type not found');

      console.log(selectedUsers, 'selectedUsers');

      const seletedUserIds = selectedUsers.map((user) => user.user_id);

      console.log(editModule.relations.filter((rel) => rel.is_archived));

      const archivedRelations = editModule.relations
        .filter((rel) => rel.is_archived)
        .filter((rel) => seletedUserIds.includes(rel.user_id));

      console.log(archivedRelations, 'archivedRelations');

      if (archivedRelations.length > 0) {
        await updateRelations(archivedRelations);
      }

      const newRelations = selectedUsers.filter(
        (user) =>
          archivedRelations.findIndex((rel) => rel.user_id === user.user_id) ===
          -1,
      );

      if (newRelations.length > 0) {
        await addMemberbyUserIds({
          module_id: editModule.id,
          user_ids: selectedUsers.map((user) => user.user_id),
          training_status: trainingStatus,
          number_of_reverse_shadow: editModule.settings.noReverseShadow,
          number_of_shadow: editModule.settings.noShadow,
        });
      }

      refetch();
    } catch (e) {
      toast.error(e.message);
    }
  };
  return { addMemberHandler };
};
