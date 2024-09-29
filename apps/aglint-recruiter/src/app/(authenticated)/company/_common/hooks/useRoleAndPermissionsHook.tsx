/* eslint-disable security/detect-object-injection */
import { useEffect, useState } from 'react';

import { app_modules } from '@/constant/role_and_permissions';
import { useSearchQuery } from '@/hooks/useSearchQuery';
import { api } from '@/trpc/client';
import toast from '@/utils/toast';

export function useRoleData() {
  const [selectRole, setSelectRole] = useState<string | null>(null);
  const { queryParams, setQueryParams } = useSearchQuery<{
    role: string;
    add: boolean;
  }>();
  const query = api.rolesAndPermissions.get.useQuery(undefined, {
    placeholderData: { rolesAndPermissions: {}, all_permission: {} },
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
  const handelSelectRole = (role_id: string | null, addMode?: boolean) => {
    setSelectRole(role_id);
    const role =
      (role_id ? query.data?.rolesAndPermissions[role_id]?.name : undefined) ||
      undefined;
    setQueryParams({ role, add: addMode });
  };
  const role =
    (selectRole ? query.data?.rolesAndPermissions?.[selectRole] : null) || null;
  const roleDetails = app_modules.reduce(
    (acc, curr) => {
      if (
        !curr.dependency ||
        role?.permissions.find((pre) => pre.name == curr.dependency)?.isActive
      ) {
        acc[curr.name] = {
          description: curr.description,
          permissions: curr.permissions
            .map((permission) =>
              role?.permissions.find((pre) => pre.name == permission),
            )
            .filter((item) => !!item),
        };
      }
      return acc;
    },
    {} as {
      [key: string]: {
        description: string;
        permissions: NonNullable<typeof role>['permissions'];
      };
    },
  );
  return {
    role,
    roleDetails,
    selectRole,
    setSelectRole: handelSelectRole,
    ...query,
    data: query.data || { rolesAndPermissions: {}, all_permission: {} },
  };
}

export function useRoleDataSetter() {
  const apiUtils = api.useUtils();
  const { mutate: mutateAsync } = api.rolesAndPermissions.post.useMutation({
    async onMutate(input) {
      // @ts-ignore
      const { add, delete: toDelete, role_id } = input;
      await apiUtils.rolesAndPermissions.get.cancel();
      const prevData = apiUtils.rolesAndPermissions.get.getData();
      apiUtils.rolesAndPermissions.get.setData(undefined, (prevData) => {
        const tempData = structuredClone(
          prevData || { rolesAndPermissions: {}, all_permission: {} },
        );
        tempData.rolesAndPermissions[role_id].permissions =
          tempData.rolesAndPermissions[role_id].permissions.map((item) => {
            if (add === item.id) {
              // setLastState({ index, permission: item });
              return { ...item, isActive: true };
            }
            if (toDelete && toDelete === item.relation_id) {
              // setLastState({ index, permission: item });
              return { ...item, relation_id: null, isActive: false };
            }
            return item;
          });
        return tempData;
      });
      return { prevData };
    },
    onSuccess() {
      toast.success('Role updated successfully');
    },
    onError(error, _data, context) {
      toast.error(String(error));
      apiUtils.rolesAndPermissions.get.setData(undefined, context?.prevData);
    },
    onSettled: () => {
      void apiUtils.rolesAndPermissions.get.invalidate();
    },
  });

  return {
    handelUpdateRole: mutateAsync,
  };
}
