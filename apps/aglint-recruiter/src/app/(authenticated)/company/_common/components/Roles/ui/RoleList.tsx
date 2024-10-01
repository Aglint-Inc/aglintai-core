import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Badge } from '@components/ui/badge';
import { TableCell, TableRow } from '@components/ui/table';
import { CirclePlus } from 'lucide-react';

import type { useTenantMembers } from '@/company/hooks';
import type { useRoleData } from '@/company/hooks/useRoleAndPermissionsHook';
import { UIButton } from '@/components/Common/UIButton';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

type getRoleAndPermissionsWithUserCountType = ReturnType<
  typeof useRoleData
>['role'];

type Props = {
  role: getRoleAndPermissionsWithUserCountType;
  details: getRoleAndPermissionsWithUserCountType;
  count: number;
  members: ReturnType<typeof useTenantMembers>['members'];
  // eslint-disable-next-line no-unused-vars
  onClickAdd: (e: any) => void;
  onClickRow: () => void;
};
export const RoleList = ({
  role,
  onClickRow,
  count,
  members,
  details,
  onClickAdd,
}: Props) => {
  return (
    <TableRow
      key={role.id}
      className='cursor-pointer hover:bg-gray-100'
      onClick={onClickRow}
    >
      <TableCell className='font-medium'>
        {capitalizeFirstLetter(role.name)}
      </TableCell>
      <TableCell>{role.description}</TableCell>
      <TableCell>
        <div className='flex items-center space-x-2'>
          {count ? (
            <>
              {role.assignedTo.slice(0, 3).map((user_id) => {
                const user = members.find(
                  (member) =>
                    member.user_id === user_id &&
                    member.user_id !== member.created_by,
                );
                if (!user) return null;
                return (
                  <Avatar key={user_id} className='h-6 w-6'>
                    <AvatarImage
                      src={user.profile_image}
                      alt={user.first_name}
                    />
                    <AvatarFallback>{user.first_name[0]}</AvatarFallback>
                  </Avatar>
                );
              })}
              {count > 3 && (
                <Badge variant='secondary'>+{count - 3} more</Badge>
              )}
            </>
          ) : (
            <p className='text-sm text-muted-foreground'>
              {`No users with ${details.name}`}
            </p>
          )}
        </div>
      </TableCell>
      <TableCell>
        {!count && (
          <UIButton
            variant='outline'
            size='sm'
            onClick={onClickAdd}
            className='flex items-center space-x-1'
          >
            <CirclePlus className='h-4 w-4' />
            <span>Add</span>
          </UIButton>
        )}
      </TableCell>
    </TableRow>
  );
};
