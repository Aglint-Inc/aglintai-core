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
        members.map((member) => (
          <UserCard member={member} key={member.user_id} />
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

const UserCard = ({ member }) => {
  if (!member) return;
  return (
    <Stack>
      <UserWithRole
        textName={
          <Link href={`/user/profile/${member.user_id}`}>
            {`${member.first_name || ''} ${member.last_name || ''}`.trim()}
          </Link>
        }
        textRole={member.position}
        slotBadge={
          <GlobalBadge
            color={member.is_suspended ? 'error' : 'success'}
            textBadge={member.is_suspended ? 'Suspended' : 'Active'}
          />
        }
        slotButton={<></>}
        slotAvatar={
          <Avatar
            src={member.profile_image}
            variant='rounded'
            alt={member.first_name}
            sx={{ height: '100%', width: '100%' }}
          />
        }
      />
    </Stack>
  );
};
