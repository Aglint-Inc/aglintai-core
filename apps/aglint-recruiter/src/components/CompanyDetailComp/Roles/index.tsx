/* eslint-disable security/detect-object-injection */
import { Avatar, Typography } from '@mui/material';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { GlobalBadge } from '@/devlink/GlobalBadge';
import { RolesAndPermissions } from '@/devlink/RolesAndPermissions';
import { RolesRow } from '@/devlink/RolesRow';
import { RolesRowSkeleton } from '@/devlink/RolesRowSkeleton';
import { Skeleton } from '@/devlink2/Skeleton';
import { rolesOrder } from '@/src/constant/role_and_permissions';
import { useAllMembers } from '@/src/queries/members';
import {
  type getRoleAndPermissionsWithUserCount,
  useRoleAndPermissionsHook,
} from '@/src/queries/RolesSettings';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import RoleDetails from './RoleDetails';

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
          // updateRole={setRole}
          updateRoles={handelUpdateRole}
        />
      ) : (
        <RolesAndPermissions
          slotRolesRow={
            <RoleTable
              roles={data?.rolesAndPermissions || {}}
              loading={loading}
              setRole={setSelectRole}
            />
          }
        />
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
  // eslint-disable-next-line no-unused-vars
  setRole: (role_id: string, addMode?: boolean) => void;
}) => {
  const { members } = useAllMembers();
  return loading
    ? [
        <RolesRowSkeleton key={'x'} slotSkeleton={<Skeleton />} />,
        <RolesRowSkeleton key={'y'} slotSkeleton={<Skeleton />} />,
        <RolesRowSkeleton key={'z'} slotSkeleton={<Skeleton />} />,
      ]
    : Object.entries(roles || {})
        .sort((a, b) => rolesOrder[a[1].name] - rolesOrder[b[1].name])
        .map(([key, details]) => {
          const role = details;
          const count = role.assignedTo.length;
          return (
            <RolesRow
              key={role.id}
              textRole={capitalizeFirstLetter(role.name)}
              textDescription={role.description}
              onClickRow={{
                onClick: () => {
                  setRole(key);
                },
              }}
              slotAvatars={
                <>
                  {count ? (
                    <>
                      {role.assignedTo.slice(0, 3).map((user_id) => {
                        const user = members.find(
                          (member) =>
                            member.user_id === user_id &&
                            member.user_id !== member.created_by,
                        );
                        if (!user) return;
                        return (
                          <Avatar
                            key={user_id}
                            src={user.profile_image}
                            variant='rounded'
                            alt={user.first_name}
                            sx={{ height: '24px', width: '24px' }}
                          />
                        );
                      })}
                      {count > 3 && (
                        <GlobalBadge
                          textBadge={`+${count - 3} more.`}
                          color={'neutral'}
                        />
                      )}
                    </>
                  ) : (
                    <Typography color={'neutral'}>
                      {`No users with ${details.name}`}
                    </Typography>
                  )}
                </>
              }
              slotButtonAdd={
                !count && (
                  <ButtonSoft
                    textButton='Add'
                    size={1}
                    iconName='Add'
                    isLeftIcon
                    onClickButton={{
                      onClick: (e) => {
                        e.stopPropagation();
                        // setQueryParams({ add: true, role: details.name });
                        setRole(key, true);
                      },
                    }}
                  />
                )
              }
            />
          );
        });
};
