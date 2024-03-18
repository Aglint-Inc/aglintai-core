import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import toast from '@/src/utils/toast';

import { QueryKeysInteviewModules } from './type';
import {
  addMemberbyUserIds,
  deleteRelationByUserDbDelete,
  fetchInterviewModuleById,
  fetchInterviewModules,
  fetchModules,
  fetchProgress,
  resumePauseDbUpdate,
  updatePauseJsonByUserId
} from './utils';
import { PauseType } from '../ModuleMembers/type';
import { MemberType, ModuleType, PauseJson } from '../types';

export const useAllInterviewModules = () => {
  const { recruiter } = useAuthDetails();
  const query = useQuery({
    queryKey: QueryKeysInteviewModules.INTERVIEW_MODULES,
    queryFn: () => fetchInterviewModules(recruiter.id),
    enabled: !!recruiter.id,
    initialData: [],
    refetchOnWindowFocus: false
  });
  return query;
};

export const useAllSchedulesByModuleId = () => {
  const router = useRouter();
  const query = useQuery({
    queryKey: QueryKeysInteviewModules.SCHEDULES_BY_MODULE_ID({
      moduleId: router.query.module_id as string
    }),
    queryFn: () => fetchModules(router.query.module_id as string),
    enabled: !!router.query.module_id,
    initialData: [],
    refetchOnWindowFocus: false
  });
  return query;
};

export const useProgressModuleUsers = ({
  trainer_ids
}: {
  trainer_ids: string[];
}) => {
  const router = useRouter();

  const query = useQuery({
    queryKey: QueryKeysInteviewModules.PROGRESS_BY_MODULE_ID({
      moduleId: router.query.module_id as string
    }),
    queryFn: () =>
      fetchProgress({
        module_id: router.query.module_id as string,
        trainer_ids: trainer_ids
      }),
    enabled: router.query.module_id && trainer_ids.length > 0,
    initialData: [],
    refetchOnWindowFocus: false
  });
  return query;
};

export const useModuleAndUsers = () => {
  const router = useRouter();

  const query = useQuery({
    queryKey: QueryKeysInteviewModules.USERS_BY_MODULE_ID({
      moduleId: router.query.module_id as string
    }),
    queryFn: () => fetchInterviewModuleById(router.query.module_id as string),
    initialData: null,
    enabled: !!router.query.module_id,
    refetchOnWindowFocus: false
  });
  return query;
};

export const usePauseHandler = () => {
  const queryClient = useQueryClient();

  const resumeHandler = async ({
    module_id,
    user_id
  }: {
    module_id: string;
    user_id: string;
  }): Promise<boolean> => {
    const editModule = queryClient.getQueryData<ModuleType>(
      QueryKeysInteviewModules.USERS_BY_MODULE_ID({ moduleId: module_id })
    );
    if (user_id && editModule) {
      const isUpdated = await resumePauseDbUpdate({ module_id, user_id });

      if (isUpdated) {
        const updatedEditModule = {
          ...editModule,
          relations: editModule.relations.map((rel) =>
            rel.user_id === user_id ? { ...rel, pause_json: null } : rel
          )
        };
        queryClient.setQueryData(
          QueryKeysInteviewModules.USERS_BY_MODULE_ID({
            moduleId: editModule.id
          }),
          {
            ...updatedEditModule
          }
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
    pause_json
  }: {
    module_id: string;
    user_id: string;
    selectedType: PauseType;
    pause_json: PauseJson;
  }) => {
    try {
      if (user_id) {
        const editModule = queryClient.getQueryData<ModuleType>(
          QueryKeysInteviewModules.USERS_BY_MODULE_ID({ moduleId: module_id })
        );
        if (selectedType === 'custom' && !pause_json?.end_date) {
          return toast.error('Please select end date');
        }
        const isUpdated = await updatePauseJsonByUserId({
          user_id: user_id,
          pause_json: pause_json,
          module_id: module_id
        });
        if (isUpdated) {
          const updatedEditModule = {
            ...editModule,
            relations: editModule.relations.map((rel) =>
              rel.user_id === user_id ? { ...rel, pause_json: pause_json } : rel
            )
          } as ModuleType;

          queryClient.setQueryData<ModuleType>(
            QueryKeysInteviewModules.USERS_BY_MODULE_ID({
              moduleId: editModule.id
            }),
            {
              ...updatedEditModule
            }
          );
        }
      } else {
        throw new Error();
      }
    } catch {
      toast.error('Error pausing user');
    }
  };

  return { resumeHandler, pauseHandler };
};

export const useDeleteRelationHandler = () => {
  const queryClient = useQueryClient();

  const deleteRelationByUserId = async ({
    module_id,
    user_id
  }: {
    module_id: string;
    user_id: string;
  }) => {
    try {
      const editModule = queryClient.getQueryData<ModuleType>(
        QueryKeysInteviewModules.USERS_BY_MODULE_ID({ moduleId: module_id })
      );
      if (!editModule) throw new Error('Module not found');
      const isDeleted = await deleteRelationByUserDbDelete({
        module_id: module_id,
        user_id: user_id
      });
      if (!isDeleted) {
        throw new Error('Error deleting user');
      }
      const updatedEditModule = {
        ...editModule,
        relations: editModule.relations.filter((rel) => rel.user_id !== user_id)
      } as ModuleType;
      queryClient.setQueryData<ModuleType>(
        QueryKeysInteviewModules.USERS_BY_MODULE_ID({
          moduleId: editModule.id
        }),
        {
          ...updatedEditModule
        }
      );

      return true;
    } catch (e) {
      toast.error(e.message);
    }
  };
  return { deleteRelationByUserId };
};

export const useAddMemberHandler = () => {
  const queryClient = useQueryClient();

  const addMemberHandler = async ({
    module_id,
    selectedUsers,
    trainingStatus
  }: {
    module_id: string;
    selectedUsers: MemberType[];
    trainingStatus: 'training' | 'qualified';
  }) => {
    try {
      const editModule = queryClient.getQueryData<ModuleType>(
        QueryKeysInteviewModules.USERS_BY_MODULE_ID({ moduleId: module_id })
      );

      if (!editModule) throw new Error('Module not found');

      const { data, error } = await addMemberbyUserIds({
        module_id: editModule.id,
        user_ids: selectedUsers.map((user) => user.user_id),
        training_status: trainingStatus
      });
      if (error) {
        throw new Error(error.message);
      }
      const updatedEditModule = {
        ...editModule,
        relations: [...editModule.relations, ...data]
      } as ModuleType;

      queryClient.setQueryData<ModuleType>(
        QueryKeysInteviewModules.USERS_BY_MODULE_ID({
          moduleId: editModule.id
        }),
        {
          ...updatedEditModule
        }
      );
    } catch (e) {
      toast.error(e.message);
    }
  };
  return { addMemberHandler };
};
