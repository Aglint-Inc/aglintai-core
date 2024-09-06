import { DcPopup } from '@devlink/DcPopup';
import { RolesPopover } from '@devlink/RolesPopover';
import { UserNameRoleCard } from '@devlink/UserNameRoleCard';
import { GlobalBannerInline } from '@devlink2/GlobalBannerInline';
import { Avatar, Dialog, Stack } from '@mui/material';
import { ChevronDown, Loader2 } from 'lucide-react';
import { useState } from 'react';

import SearchField from '@/components/Common/SearchField/SearchField';
import { updateMember } from '@/context/AuthContext/utils';
import { useAllMembers } from '@/queries/members';
import { useRoleAndPermissionsHook } from '@/queries/RolesSettings';
import { Button } from '@components/ui/button';

function RoleEditMember({
  role,
  close,
}: {
  role: { role: string; id: string; assignedTo: string[] };
  close: () => void;
}) {
  const { members } = useAllMembers();
  const { refetch } = useRoleAndPermissionsHook();
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
        member.role.toLowerCase().includes(search.toLowerCase()),
    );

  return (
    <Dialog
      open={true}
      onClose={() => {
        // resetState();
        close();
      }}
    >
      <DcPopup
        popupName='Update Role'
        onClickClosePopup={{ onClick: close }}
        slotButtons={
          <>
            <Button
              variant="outline"
              onClick={close}
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                setIsLoading(true);
                await updateMember({
                  data: {
                    user_id: selectedMember.user_id,
                    role_id: role.id,
                  },
                });
                refetch();
                setIsLoading(false);
                close();
              }}
              disabled={!selectedMember}
            >
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Update
            </Button>
            </>
        }
        slotBody={
          <RolesPopover
            slotSearch={
              <SearchField
                key={'search-role'}
                value={search}
                isFullWidth
                placeholder='Search users to Add'
                onClear={() => {
                  setSearch(null);
                }}
                onChange={({ target }) => {
                  setSearch(target.value);
                }}
              />
            }
            isHeaderVisible={!selectedMember}
            slotCard={
              <>
                {selectedMember ? (
                  <>
                    <GlobalBannerInline
                      color={'error'}
                      textContent={`You are about to update ${`${selectedMember.first_name || ''} ${selectedMember.last_name || ''}`.trim()}'s role.`}
                      iconName={'warning'}
                      slotButton={<></>}
                    />
                    {/* <GlobalBanner
                      color={'error'}
                      textTitle={
                        'You are about to change a role of the selected user'
                      }
                      textDescription={`You are attempting to change ${`${selectedMember.first_name || ''} ${selectedMember.last_name || ''}`.trim()} current role "${capitalize(selectedMember?.role || '')}" to new role "${capitalize(role.role || '')}".`}
                      iconName={'warning'}
                      slotButtons={<></>}
                    /> */}
                    <UserNameRoleCard
                      textName={`${selectedMember.first_name || ''} ${selectedMember.last_name || ''}`.trim()}
                      textRole={selectedMember.role}
                      slotImage={
                        <Avatar
                          key={selectedMember.user_id}
                          src={selectedMember.profile_image}
                          variant='rounded'
                          alt={selectedMember.first_name}
                          sx={{ height: '100%', width: '100%' }}
                        />
                      }
                    />
                    <Stack
                      alignItems={'center'}
                      width={'100%'}
                      sx={{ transform: 'rotate(180deg)' }}
                    >
                      <ChevronDown size={20} />
                    </Stack>
                    <UserNameRoleCard
                      textName={`${selectedMember.first_name || ''} ${selectedMember.last_name || ''}`.trim()}
                      textRole={role.role}
                      borderStyle={'dash'}
                      slotImage={
                        <Avatar
                          key={selectedMember.user_id}
                          src={selectedMember.profile_image}
                          variant='rounded'
                          alt={selectedMember.first_name}
                          sx={{ height: '100%', width: '100%' }}
                        />
                      }
                    />
                  </>
                ) : (
                  filteredMember.map((member) => {
                    return (
                      <UserNameRoleCard
                        key={member.user_id}
                        textName={`${member.first_name || ''} ${member.last_name || ''}`.trim()}
                        textRole={member.role}
                        slotImage={
                          <Avatar
                            key={member.user_id}
                            src={member.profile_image}
                            variant='rounded'
                            alt={member.first_name}
                            sx={{ height: '100%', width: '100%' }}
                          />
                        }
                        onClickCard={{
                          onClick: () => {
                            setSelectedMember(member);
                          },
                        }}
                      />
                    );
                  })
                )}
              </>
            }
          />
        }
      />
    </Dialog>
  );
}

export default RoleEditMember;
