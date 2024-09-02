/* eslint-disable security/detect-object-injection */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import axios from '@/src/client/axios';
import { app_modules } from '@/src/constant/role_and_permissions';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useSearchQuery } from '@/src/hooks/useSearchQuery';
import { type GetRoleAndPermissionsAPI } from '@/src/pages/api/getRoleAndPermissions/type';
import { type SetRoleAndPermissionAPI } from '@/src/pages/api/setRoleAndPermission/type';
import toast from '@/src/utils/toast';

export const useRoleAndPermissionsHook = () => {
  const { queryParams, setQueryParams } = useSearchQuery<{
    role: string;
    add: boolean;
  }>();
  const { recruiter } = useAuthDetails();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['app', recruiter?.id, 'role-and-permissions'],
    queryFn: getRoleAndPermissionsWithUserCount,
    enabled: Boolean(recruiter?.id),
  });
  useEffect(() => {
    if (
      query.isFetched &&
      queryParams.role &&
      query.data?.rolesAndPermissions
    ) {
      const role_id = Object.values(query.data?.rolesAndPermissions).find(
        (val) => val.name == queryParams.role,
      )?.id;
      role_id && setSelectRole(role_id);
    }
  }, [query.isFetched]);

  const [selectRole, setSelectRole] = useState<string>(null);

  const role = query.data?.rolesAndPermissions?.[selectRole] || null;
  const roleDetails = app_modules.reduce(
    (acc, curr) => {
      if (
        !curr.dependency ||
        role?.permissions.find((pre) => pre.name == curr.dependency)?.isActive
      ) {
        acc[curr.name] = {
          description: curr.description,
          permissions: curr.permissions.map((permission) =>
            role?.permissions.find((pre) => pre.name == permission),
          ),
        };
      }
      return acc;
    },
    {} as {
      [key: string]: {
        description: string;
        permissions: (typeof role)['permissions'];
      };
    },
  );

  const handelUpdateRole = async (data: Parameters<typeof updateRole>['0']) => {
    return mutateAsync(data);
  };
  const [lastState, setLastState] = useState<{
    index: number;
    permission: (typeof role)['permissions'][number];
  }>(null);
  const { mutate: mutateAsync } = useMutation({
    mutationFn: updateRole,
    onMutate({ add, delete: toDelete, role_id }) {
      queryClient.setQueryData(
        ['app', recruiter?.id, 'role-and-permissions'],
        (
          prevData: Awaited<
            ReturnType<typeof getRoleAndPermissionsWithUserCount>
          >,
        ) => {
          const tempData = structuredClone(prevData);
          tempData.rolesAndPermissions[role_id].permissions =
            tempData.rolesAndPermissions[role_id].permissions.map(
              (item, index) => {
                if (add === item.id) {
                  setLastState({ index, permission: item });
                  return { ...item, isActive: true };
                }
                if (toDelete && toDelete === item.relation_id) {
                  setLastState({ index, permission: item });
                  return { ...item, relation_id: null, isActive: false };
                }
                return item;
              },
            );
          return tempData;
        },
      );
    },
    onSuccess(resData, { add, delete: toDelete, role_id }) {
      add;
      queryClient.setQueryData(
        ['app', recruiter?.id, 'role-and-permissions'],
        (
          prevData: Awaited<
            ReturnType<typeof getRoleAndPermissionsWithUserCount>
          >,
        ) => {
          const tempData = structuredClone(prevData);
          tempData.rolesAndPermissions[role_id].permissions =
            tempData.rolesAndPermissions[role_id].permissions.map((item) => {
              if (resData.addedPermissions?.length) {
                const temp = resData.addedPermissions.find(
                  (added) => added.id == item.id,
                );
                if (temp) {
                  item = { ...item, ...temp, isActive: true };
                }
              }
              if (toDelete === item.relation_id) {
                item = { ...item, relation_id: null, isActive: false };
              }
              return item;
            });
          toast.success('Role updated successfully');
          setLastState(null);
          return tempData;
        },
      );
    },
    onError(error, { role_id }) {
      toast.error(String(error));
      if (lastState)
        queryClient.setQueryData(
          ['app', recruiter?.id, 'role-and-permissions'],
          (
            prevData: Awaited<
              ReturnType<typeof getRoleAndPermissionsWithUserCount>
            >,
          ) => {
            const tempData = structuredClone(prevData);
            tempData.rolesAndPermissions[role_id].permissions[lastState.index] =
              lastState.permission;
            setLastState(null);
            return tempData;
          },
        );
    },
  });

  const handelSelectRole = (role_id: string, addMode?: boolean) => {
    setSelectRole(role_id);
    const role = query.data?.rolesAndPermissions[role_id]?.name || null;
    setQueryParams({ role, add: addMode });
  };
  return {
    role,
    roleDetails,
    selectRole,
    setSelectRole: handelSelectRole,
    handelUpdateRole,
    ...query,
  };
};

export const getRoleAndPermissionsWithUserCount = async () => {
  return axios.call<GetRoleAndPermissionsAPI>(
    'POST',
    '/api/getRoleAndPermissions',
    {},
  );
};

const updateRole = (data: SetRoleAndPermissionAPI['request']) => {
  return axios.call<SetRoleAndPermissionAPI>(
    'POST',
    '/api/setRoleAndPermission',
    data,
  );
};
