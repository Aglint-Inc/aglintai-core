import { RecruiterUserType } from '@aglint/shared-types';
import { Avatar, Stack } from '@mui/material';
import React from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { GlobalBadge } from '@/devlink/GlobalBadge';
import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { UserWithRole } from '@/devlink/UserWithRole';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import { GetRoleAndPermissionsAPI } from '@/src/pages/api/getRoleAndPermissions/type';

export const RoleUserWidget = ({
  role,
  members,
  setEditUser,
}: {
  role: Awaited<
    GetRoleAndPermissionsAPI['response']
  >['rolesAndPermissions'][string] & {
    name: string;
  };
  members: RecruiterUserType[];
  // eslint-disable-next-line no-unused-vars
  setEditUser: () => void;
}) => {
  const { ifAllowed } = useRolesAndPermissions();
  return (
    <>
      {ifAllowed(
        <Stack direction={'row'}>
          <ButtonGhost
            onClickButton={{ onClick: () => setEditUser() }}
            textButton={'Add'}
            size={2}
            isLeftIcon={true}
            iconName={'add'}
          />
        </Stack>,
        ['manage_roles'],
      )}
      {role.assignedTo.length ? (
        role.assignedTo.map((user_id) => (
          <UserCard members={members} user_id={user_id} key={user_id} />
        ))
      ) : (
        <GlobalEmptyState
          styleEmpty={{
            style: {
              backgroundColor: 'var(--neutral-3)',
            },
          }}
          iconName={'group'}
          textDesc={'No users found with this role'}
        />
      )}
    </>
  );
};

const UserCard = ({ members, user_id }) => {
  const user = members.find((member) => member.user_id === user_id);
  if (!user) return;
  return (
    <Stack key={user_id}>
      <UserWithRole
        textName={`${user.first_name || ''} ${user.last_name || ''}`.trim()}
        textRole={user.position}
        slotBadge={
          <GlobalBadge
            color={user.is_suspended ? 'error' : 'success'}
            textBadge={user.is_suspended ? 'Suspended' : 'Active'}
          />
        }
        slotButton={<></>}
        slotAvatar={
          <Avatar
            key={user_id}
            src={user.profile_image}
            variant='rounded'
            alt={user.first_name}
            sx={{ height: '100%', width: '100%' }}
          />
        }
      />
    </Stack>
  );
};
