import { api } from '@/trpc/client';
import toast from '@/utils/toast';

export const useMemberUpdate = () => {
  const apiUtils = api.useUtils();
  const { mutateAsync } = api.tenant.updateWithRole.useMutation({
    onMutate: async (input) => {
      await apiUtils.tenant.members.cancel();
      const prevData = apiUtils.tenant.members.getData();
      apiUtils.tenant.members.setQueriesData(undefined, {}, (pre) => {
        return (pre || []).map((item) => {
          if (input && item.user_id === input.user_id) {
            return { ...item, ...input };
          }
          return item;
        });
      });
      return { prevData };
    },
    onSuccess() {
      apiUtils.tenant.members.invalidate();
      toast.success('Updated successfully');
    },
    onError(error, _data, context) {
      toast.error(String(error));
      apiUtils.tenant.members.setData(undefined, context?.prevData);
    },
  });
  return { updateMember: mutateAsync };
};
