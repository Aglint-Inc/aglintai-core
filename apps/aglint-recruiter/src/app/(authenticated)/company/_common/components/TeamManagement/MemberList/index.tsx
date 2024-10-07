import { getFullName } from '@aglint/shared-utils';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Badge } from '@components/ui/badge';
import { Skeleton } from '@components/ui/skeleton';
import { TableCell, TableRow } from '@components/ui/table';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { capitalize } from 'lodash';
import { Globe, MapPin } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { useTenant, type useTenantMembers } from '@/company/hooks';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';

import { UserListThreeDot } from './ThreeDot';

dayjs.extend(relativeTime);

const Member = ({
  member,
  lastLogin,
}: {
  member: ReturnType<typeof useTenantMembers>['data'][number];
  lastLogin: {
    time: string | undefined;
    isPending: boolean;
  };
}) => {
  const { checkPermissions } = useRolesAndPermissions();
  const { recruiter_user: tempRecruiterUser, recruiter } = useTenant();
  const recruiterUser = tempRecruiterUser!;

  const canManage = checkPermissions(['manage_users']);
  const fullName = getFullName(member.first_name, member.last_name || '');
  return (
    <TableRow>
      <TableCell>
        <div className='flex items-center gap-2'>
          <Avatar className='h-10 w-10 rounded-sm'>
            <AvatarImage src={member.profile_image || ''} alt={fullName} />
            <AvatarFallback className='h-10 w-10 rounded-sm bg-gray-200'>
              {fullName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <Link
              href={`/user/${member.user_id}`}
              className='font-medium hover:underline'
            >
              {fullName}
              {member.user_id === recruiterUser?.user_id && ' (You)'}
            </Link>
            <p className='text-sm text-muted-foreground'>
              {member.position} | {member.department?.name || 'Not Assigned'}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className='flex flex-col space-y-1'>
          <div className='flex items-center space-x-2 text-sm'>
            <MapPin className='h-3 w-3 text-gray-500' />
            <span>{member?.office_location?.city || '--'}</span>
          </div>
          <div className='flex items-center space-x-2 text-sm'>
            <Globe className='h-3 w-3 text-gray-500' />
            <span>{member?.office_location?.timezone || '--'}</span>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge
          className={`rounded-sm ${member.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800' : ''} ${member.status === 'invited' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800' : ''} ${member.status === 'suspended' ? 'bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800' : ''} `}
        >
          {capitalize(member.status)}
        </Badge>
      </TableCell>
      <TableCell className='text-sm text-muted-foreground'>
        {lastLogin.isPending ? (
          <Skeleton className='h-6 w-24' />
        ) : lastLogin.time ? (
          dayjs(lastLogin.time).fromNow()
        ) : (
          '--:--'
        )}
      </TableCell>
      <TableCell>
        {canManage &&
          (member.role !== 'admin' ||
            member.status === 'invited' ||
            recruiter.primary_admin === recruiterUser.user_id ||
            recruiterUser.user_id === member.user_id) && (
            <UserListThreeDot member={member} />
          )}
      </TableCell>
    </TableRow>
  );
};

export default Member;
