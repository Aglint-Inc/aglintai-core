import { Button } from '@components/ui/button';
import { useState } from 'react';

import { Loader } from '@/common/Loader';
import UIDialog from '@/common/UIDialog';
import { useTenantMembers } from '@/company/hooks';
import { useMemberUpdate } from '@/company/hooks/useMemberUpdate';
import { useRoleData } from '@/company/hooks/useRoleAndPermissionsHook';

import { RoleEditDialogUI } from './ui/RoleEditDialogUI';

function RoleEditDialog({
  isOpen,
  role,
  close,
}: {
  isOpen: boolean;
  role: { role: string; id: string; assignedTo: string[] };
  close: () => void;
}) {
  const { members } = useTenantMembers();
  const { updateMember } = useMemberUpdate();
  const { refetch } = useRoleData();
  const [search, setSearch] = useState('');
  const [selectedMember, setSelectedMember] = useState<
    (typeof members)[number] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const filteredMember = members
    .filter(
      (member) =>
        member.role_id !== role.id &&
        !(role.assignedTo || []).includes(member.user_id),
    )
    .filter(
      (member) =>
        `${member.first_name || ''} ${member.last_name || ''}`
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        member.role?.toLowerCase().includes(search.toLowerCase()),
    );

  return (
    <UIDialog
      open={isOpen}
      onClose={close}
      title='Update Role'
      slotButtons={
        <>
          <Button variant='outline' onClick={close}>
            Cancel
          </Button>
          <Button
            onClick={async () => {
              setIsLoading(true);
              if (selectedMember) {
                await updateMember({
                  user_id: selectedMember.user_id,
                  role_id: role.id,
                });
                refetch();
                setIsLoading(false);
                close();
              }
            }}
            disabled={!selectedMember || isLoading}
          >
            {isLoading ? <Loader /> : null}
            Update
          </Button>
        </>
      }
    >
      <RoleEditDialogUI
        filteredMember={filteredMember}
        role={role.role}
        search={search}
        selectedMember={selectedMember!}
        setSearch={setSearch}
        setSelectedMember={setSelectedMember}
      />
    </UIDialog>
  );
}

export default RoleEditDialog;
