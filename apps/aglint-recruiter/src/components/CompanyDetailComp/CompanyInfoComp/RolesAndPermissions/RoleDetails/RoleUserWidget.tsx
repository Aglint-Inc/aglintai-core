import { RecruiterUserType } from '@aglint/shared-types';
import { Avatar, Stack } from '@mui/material';
import Link from 'next/link';
import React from 'react';

import { GlobalBadge } from '@/devlink/GlobalBadge';
import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { UserWithRole } from '@/devlink/UserWithRole';
import { GetRoleAndPermissionsAPI } from '@/src/pages/api/getRoleAndPermissions/type';

export const RoleUserWidget = ({
  role,
  members,
}: {
  role: Awaited<
    GetRoleAndPermissionsAPI['response']
  >['rolesAndPermissions'][string] & {
    name: string;
  };
  members: RecruiterUserType[];
}) => {
  return (
    <>
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
  const user = members.find(
    (member) =>
      member.user_id === user_id && member.user_id !== member.created_by,
  );
  if (!user) return;
  return (
    <Stack key={user_id}>
      <UserWithRole
        textName={
          <Link href={`/user/profile/${user.user_id}`}>
            {`${user.first_name || ''} ${user.last_name || ''}`.trim()}
          </Link>
        }
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
