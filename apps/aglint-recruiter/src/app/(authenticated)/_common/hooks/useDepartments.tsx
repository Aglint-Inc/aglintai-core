import { toast } from '@components/hooks/use-toast';

import type { AllDepartments } from '@/routers/tenant/department/read';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useDepartments = () => {
  const query = useProcedure();
  return { ...query, data: query.data ?? [] };
};

const useProcedure = (): ProcedureQuery<AllDepartments> =>
  api.tenant.departments.useQuery(undefined, {
    staleTime: Infinity,
  });

//  delete ------------

export const useDepartmentDelete = () => {
  const { refetch } = useDepartments();
  return api.tenant.deleteDepartment.useMutation({
    onSuccess: () => {
      refetch();
    },
  });
};

//insert -------------

export const useDepartmentInsert = () => {
  const { refetch } = useDepartments();
  return api.tenant.insertDepartment.useMutation({
    onSuccess: () => {
      refetch();
    },
    onError: (err) => {
      toast({
        title: String(err.message).includes('unique_deps')
          ? `Department is already exists.`
          : String(err),
        description: '',
      });
    },
  });
};
