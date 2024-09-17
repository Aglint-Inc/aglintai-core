import type { RecruiterUserType } from '@aglint/shared-types';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Badge } from '@components/ui/badge';
import { TableCell, TableRow } from '@components/ui/table';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { capitalize } from 'lodash';
import { Globe, MapPin } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { getFullName } from '@/utils/jsonResume';

import { UserListThreeDot } from './ThreeDot';

dayjs.extend(relativeTime);

const Member = ({ member }: { member: RecruiterUserType }) => {
  const { checkPermissions } = useRolesAndPermissions();
  const { recruiterUser } = useAuthDetails();

  const canManage = checkPermissions(['manage_users']);

  return (
    <TableRow>
      <TableCell>
        <div className='flex items-center space-x-3'>
          <Avatar className='h-8 w-8'>
            <AvatarImage
              src={member.profile_image}
              alt={getFullName(member.first_name, member.last_name)}
            />
            <AvatarFallback>
              {getFullName(member.first_name, member.last_name).charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <Link
              href={`/user/${member.user_id}`}
              className='font-medium hover:underline'
            >
              {getFullName(member.first_name, member.last_name)}
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
            <MapPin className='h-4 w-4' />
            <span>{member?.office_location?.city || '--'}</span>
          </div>
          <div className='flex items-center space-x-2 text-sm'>
            <Globe className='h-4 w-4' />
            <span>{member?.office_location?.timezone || '--'}</span>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={member.status !== 'active' ? 'outline' : 'default'}>
          {capitalize(member.status)}
        </Badge>
      </TableCell>
      <TableCell className='text-sm text-muted-foreground'>
        {member.last_login ? dayjs(member.last_login).fromNow() : '--:--'}
      </TableCell>
      <TableCell>
        {canManage &&
          (member.role !== 'admin' ||
            member.status === 'invited' ||
            recruiterUser.primary ||
            recruiterUser.user_id === member.user_id) && (
            <UserListThreeDot member={member} />
          )}
      </TableCell>
    </TableRow>
  );
};

export default Member;
