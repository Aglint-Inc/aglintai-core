import { useToast } from '@components/hooks/use-toast';

import { deleteRelationByUserDbDelete } from '../utils/utils';

export const useDeleteRelationHandler = () => {
  const { toast } = useToast();

  const deleteRelationByUserId = async ({
    module_relation_id,
  }: {
    module_relation_id: string;
  }) => {
    try {
      const isDeleted = await deleteRelationByUserDbDelete({
        module_relation_id,
      });
      return isDeleted;
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: e.message,
      });
    }
  };
  return { deleteRelationByUserId };
};
