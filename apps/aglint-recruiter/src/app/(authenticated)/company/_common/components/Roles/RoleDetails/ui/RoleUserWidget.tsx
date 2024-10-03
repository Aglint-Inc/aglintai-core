import { Alert, AlertDescription } from '@components/ui/alert';
import { Badge } from '@components/ui/badge';
import Link from 'next/link';
import React from 'react';

import type { useTenantMembers } from '@/company/hooks';
import type { useRoleData } from '@/company/hooks/useRoleAndPermissionsHook';

export const RoleUserWidget = ({
  role,
  members,
}: {
  role: ReturnType<typeof useRoleData>['role'];
  members: ReturnType<typeof useTenantMembers>['members'];
}) => {
  return (
    <>
      {role?.assignedTo.length ? (
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
    <div className='flex flex-col space-x-4 p-2'>
      <div className='flex flex-row'>
        <div className='flex-grow'>
          <Link href={`/user/${member.user_id}`} className='font-medium'>
            {`${member.first_name || ''} ${member.last_name || ''}`.trim()}
          </Link>
          <p className='text-sm text-muted-foreground'>{member.position}</p>
        </div>
        <div>
          <Badge variant={member.is_suspended ? 'destructive' : 'default'}>
            {member.is_suspended ? 'Suspended' : 'Active'}
          </Badge>
        </div>
      </div>
    </div>
  );
};
