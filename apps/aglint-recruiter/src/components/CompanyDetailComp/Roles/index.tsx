/* eslint-disable */

import { rolesOrder } from '@/constant/role_and_permissions';
import { useAllMembers } from '@/queries/members';
import {
  type getRoleAndPermissionsWithUserCount,
  useRoleAndPermissionsHook,
} from '@/queries/RolesSettings';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';
import RoleDetails from './RoleDetails';
import { CirclePlus } from 'lucide-react';
import { Button } from '@components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { Skeleton } from '@components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Badge } from '@components/ui/badge';

function RolesAndPermissionsComponent() {
  const {
    data,
    isPending: loading,
    handelUpdateRole,
    role,
    roleDetails,
    setSelectRole,
  } = useRoleAndPermissionsHook();

  return (
    <>
      {role ? ( // roleDetailsComponent
        <RoleDetails
          role={role}
          roleDetails={roleDetails}
          back={() => setSelectRole(null)}
          AllRoles={Object.entries(data.rolesAndPermissions).map(
            // eslint-disable-next-line no-unused-vars
            ([key, details]) => ({
              role: details.name,
              id: details.id,
              count: {
                users: details?.assignedTo.length || 0,
                permissions:
                  details?.permissions.filter((item) => item.isActive).length ||
                  0,
              },
              switchRole: () => setSelectRole(key),
            }),
          )}
          updateRoles={handelUpdateRole}
        />
      ) : (
        <div className=''>
          <h1 className='text-lg font-semibold mb-4'>Roles & Permissions</h1>
          <p className='text-gray-600 mb-6'>
            Customize permissions for each role and control access by enabling
            or disabling the toggle next to each permission.
          </p>
          <div className='mt-6 overflow-x-auto bg-white border rounded-lg'>
            <RoleTable
              roles={data?.rolesAndPermissions || {}}
              loading={loading}
              setRole={setSelectRole}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default RolesAndPermissionsComponent;

const RoleTable = ({
  loading,
  roles,
  setRole,
}: {
  loading: boolean;
  roles: Awaited<
    ReturnType<typeof getRoleAndPermissionsWithUserCount>
  >['rolesAndPermissions'];
  setRole: (role_id: string, addMode?: boolean) => void;
}) => {
  const { members } = useAllMembers();

  if (loading) {
    return (
      <Table>
        <TableHeader className='bg-gray-100'>
          <TableRow>
            <TableHead>
              <Skeleton className='h-6 w-24' />
            </TableHead>
            <TableHead>
              <Skeleton className='h-6 w-32' />
            </TableHead>
            <TableHead>
              <Skeleton className='h-6 w-16' />
            </TableHead>
            <TableHead>
              <Skeleton className='h-6 w-20' />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={4}>
              <Skeleton className='h-12 w-full' />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4}>
              <Skeleton className='h-12 w-full' />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4}>
              <Skeleton className='h-12 w-full' />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className='bg-gray-100'>
          <TableHead>Role</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Users</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(roles || {})
          .sort((a, b) => rolesOrder[a[1].name] - rolesOrder[b[1].name])
          .map(([key, details]) => {
            const role = details;
            const count = role.assignedTo.length;
            return (
              <TableRow
                key={role.id}
                className='cursor-pointer hover:bg-gray-100'
                onClick={() => setRole(key)}
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
                              <AvatarFallback>
                                {user.first_name[0]}
                              </AvatarFallback>
                            </Avatar>
                          );
                        })}
                        {count > 3 && (
                          <Badge variant='secondary'>+{count - 3} more</Badge>
                        )}
                      </>
                    ) : (
                      <p className='text-sm text-gray-500'>
                        {`No users with ${details.name}`}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {!count && (
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={(e) => {
                        e.stopPropagation();
                        setRole(key, true);
                      }}
                      className='flex items-center space-x-1'
                    >
                      <CirclePlus className='h-4 w-4' />
                      <span>Add</span>
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};
