import { type RecruiterUserType } from '@aglint/shared-types';
import { Alert, AlertDescription } from '@components/ui/alert';
import { Avatar } from '@components/ui/avatar';
import { Badge } from '@components/ui/badge';
import Link from 'next/link';
import React from 'react';

import { type GetRoleAndPermissionsAPI } from '@/pages/api/getRoleAndPermissions/type';

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
        <Alert variant='default' className='bg-neutral-100'>
          <AlertDescription>No users found with this role</AlertDescription>
        </Alert>
      )}
    </>
  );
};

const UserCard = ({ member }) => {
  if (!member) return null;
  return (
    <div className='flex items-center space-x-4 p-4 border rounded-lg'>
      <Avatar className='h-12 w-12'>
        <img
          src={member.profile_image}
          alt={member.first_name}
          className='rounded-full'
        />
      </Avatar>
      <div className='flex-grow'>
        <Link href={`/user/profile/${member.user_id}`} className='font-medium'>
          {`${member.first_name || ''} ${member.last_name || ''}`.trim()}
        </Link>
        <p className='text-sm text-gray-500'>{member.position}</p>
      </div>
      <Badge variant={member.is_suspended ? 'destructive' : 'default'}>
        {member.is_suspended ? 'Suspended' : 'Active'}
      </Badge>
    </div>
  );
};
