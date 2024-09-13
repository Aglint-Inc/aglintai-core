import { useToast } from '@components/hooks/use-toast';

import { type MemberTypeAutoComplete } from '@/components/Scheduling/Common/MembersTextField';

import { addMemberbyUserIds, updateRelations } from '../utils/utils';
import { type useModuleAndUsers } from './useModuleAndUsers';

export const useAddMemberHandler = ({
  editModule,
}: {
  editModule: ReturnType<typeof useModuleAndUsers>['data'];
}) => {
  const { toast } = useToast();
  const addMemberHandler = async ({
    selectedUsers,
    trainingStatus,
  }: {
    selectedUsers: MemberTypeAutoComplete[];
    trainingStatus: 'training' | 'qualified';
  }) => {
    try {
      if (!editModule) throw new Error('Interview type not found');

      const seletedUserIds = selectedUsers.map((user) => user.user_id);

      const archivedRelations = editModule.relations
        .filter((rel) => rel.is_archived)
        .filter((rel) => seletedUserIds.includes(rel.user_id));

      if (archivedRelations.length > 0) {
        await updateRelations(archivedRelations, trainingStatus);
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
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: e.message,
      });
    }
  };
  return { addMemberHandler };
};
