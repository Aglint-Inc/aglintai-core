/* eslint-disable */

import { rolesOrder } from '@/constant/role_and_permissions';
import { useAllMembers } from '@/queries/members';

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
import {
  getRoleAndPermissionsWithUserCount,
  useRoleAndPermissionsHook,
} from '@/company/hooks/useRoleAndPermissionsHook';
import { TableLoading } from './ui/TableLoading';
import { RoleList } from './ui/RoleList';

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
        <div>
          <h1 className='mb-4 text-lg font-semibold'>Roles & Permissions</h1>
          <p className='mb-6 text-gray-600'>
            Customize permissions for each role and control access by enabling
            or disabling the toggle next to each permission.
          </p>
          <div className='mt-6 overflow-x-auto rounded-lg border bg-white'>
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
    return <TableLoading />;
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
              <RoleList
                count={count}
                details={details}
                members={members}
                onClickAdd={(e) => {
                  e.stopPropagation();
                  setRole(key, true);
                }}
                onClickRow={() => setRole(key)}
                role={role}
              />
            );
          })}
      </TableBody>
    </Table>
  );
};
