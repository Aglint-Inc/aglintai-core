/* eslint-disable security/detect-object-injection */
import {
  Avatar,
  List,
  ListItemButton,
  Popover,
  Stack,
  Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalBadge } from '@/devlink/GlobalBadge';
import { Permissions } from '@/devlink/Permissions';
import { RolesAndPermissions } from '@/devlink/RolesAndPermissions';
import { RolesAndPermissionsDetail } from '@/devlink/RolesAndPermissionsDetail';
import { RolesRow } from '@/devlink/RolesRow';
import { RolesRowSkeleton } from '@/devlink/RolesRowSkeleton';
import { GlobalBannerInline } from '@/devlink2/GlobalBannerInline';
import { Skeleton } from '@/devlink2/Skeleton';
import { ToggleWithText } from '@/devlink3/ToggleWithText';
import axios from '@/src/client/axios';
import { AntSwitch } from '@/src/components/NewAssessment/AssessmentPage/editor';
import {
  allPermissions,
  app_modules,
} from '@/src/constant/role_and_permissions';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useRolesAndPermissions as useRolesAndPermissionsContext } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useSearchQuery } from '@/src/hooks/useSearchQuery';
import { type GetRoleAndPermissionsAPI } from '@/src/pages/api/getRoleAndPermissions/type';
import { type SetRoleAndPermissionAPI } from '@/src/pages/api/setRoleAndPermission/type';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';
import toast from '@/src/utils/toast';

import RoleEditMember from './RoleDetails/RoleEditMember';
import { RoleUserWidget } from './RoleDetails/RoleUserWidget';

function RolesAndPermissionsComponent() {
  const {
    data,
    isPending: loading,
    handelUpdateRole,
    role,
    roleDetails,
    setSelectRole,
  } = useRoleAndPermissions();

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
  const { allMember: members } = useAuthDetails();
  return loading
    ? [
        <RolesRowSkeleton key={'x'} slotSkeleton={<Skeleton />} />,
        <RolesRowSkeleton key={'y'} slotSkeleton={<Skeleton />} />,
        <RolesRowSkeleton key={'z'} slotSkeleton={<Skeleton />} />,
      ]
    : Object.entries(roles || {})
        .sort((a, b) => rolesOrder[a[1].name] - rolesOrder[b[1].name])
        .map(([key, details]) => {
          return (
            <RoleRow
              details={details}
              key={key}
              keyid={key}
              members={members}
              setRole={setRole}
            />
          );
        });
};

const RoleRow = ({ details, setRole, keyid, members }) => {
  const [isHovered, setIsHovered] = useState(false);
  const role = details;
  const count = role.assignedTo.length;

  return (
    <Stack
      key={role.id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <RolesRow
        textRole={capitalizeFirstLetter(role.name)}
        textDescription={role.description}
        onClickRow={{
          onClick: () => {
            setRole(keyid);
          },
        }}
        slotAvatars={
          <>
            {count ? (
              <>
                {role.assignedTo.slice(0, 3).map((user_id) => {
                  const user = members.find(
                    (member) => member.user_id === user_id,
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
              <Stack direction={'row'} alignItems={'center'} spacing={2}>
                <Typography color={'neutral'}>
                  {`No users with ${details.name}`}
                </Typography>
                {isHovered && (
                  <ButtonGhost
                    textButton='Add'
                    size={1}
                    iconName='Add'
                    isLeftIcon
                    onClickButton={{
                      onClick: (e) => {
                        e.stopPropagation();
                        // setQueryParams({ add: true, role: details.name });
                        setRole(keyid, true);
                      },
                    }}
                  />
                )}
              </Stack>
            )}
          </>
        }
      />
    </Stack>
  );
};

const useRoleAndPermissions = () => {
  const { queryParams, setQueryParams } = useSearchQuery<{
    role: string;
    add: boolean;
  }>();
  const { recruiter } = useAuthDetails();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['app', recruiter?.id, 'role-and-permissions'],
    queryFn: getRoleAndPermissionsWithUserCount,
    enabled: Boolean(recruiter?.id),
  });
  useEffect(() => {
    if (
      query.isFetched &&
      queryParams.role &&
      query.data?.rolesAndPermissions
    ) {
      const role_id = Object.values(query.data?.rolesAndPermissions).find(
        (val) => val.name == queryParams.role,
      )?.id;
      role_id && setSelectRole(role_id);
    }
  }, [query.isFetched]);

  const [selectRole, setSelectRole] = useState<string>(null);

  const role = query.data?.rolesAndPermissions?.[selectRole] || null;
  const roleDetails = app_modules.reduce(
    (acc, curr) => {
      if (
        !curr.dependency ||
        role?.permissions.find((pre) => pre.name == curr.dependency)?.isActive
      ) {
        acc[curr.name] = {
          description: curr.description,
          permissions: curr.permissions.map((permission) =>
            role?.permissions.find((pre) => pre.name == permission),
          ),
        };
      }
      return acc;
    },
    {} as {
      [key: string]: {
        description: string;
        permissions: (typeof role)['permissions'];
      };
    },
  );

  const handelUpdateRole = async (data: Parameters<typeof updateRole>['0']) => {
    return mutateAsync(data);
  };
  const [lastState, setLastState] = useState<{
    index: number;
    permission: (typeof role)['permissions'][number];
  }>(null);
  const { mutate: mutateAsync } = useMutation({
    mutationFn: updateRole,
    onMutate({ add, delete: toDelete, role_id }) {
      queryClient.setQueryData(
        ['app', recruiter?.id, 'role-and-permissions'],
        (
          prevData: Awaited<
            ReturnType<typeof getRoleAndPermissionsWithUserCount>
          >,
        ) => {
          const tempData = structuredClone(prevData);
          tempData.rolesAndPermissions[role_id].permissions =
            tempData.rolesAndPermissions[role_id].permissions.map(
              (item, index) => {
                if (add === item.id) {
                  setLastState({ index, permission: item });
                  return { ...item, isActive: true };
                }
                if (toDelete && toDelete === item.relation_id) {
                  setLastState({ index, permission: item });
                  return { ...item, relation_id: null, isActive: false };
                }
                return item;
              },
            );
          return tempData;
        },
      );
    },
    onSuccess(resData, { add, delete: toDelete, role_id }) {
      add;
      queryClient.setQueryData(
        ['app', recruiter?.id, 'role-and-permissions'],
        (
          prevData: Awaited<
            ReturnType<typeof getRoleAndPermissionsWithUserCount>
          >,
        ) => {
          const tempData = structuredClone(prevData);
          tempData.rolesAndPermissions[role_id].permissions =
            tempData.rolesAndPermissions[role_id].permissions.map((item) => {
              if (resData.addedPermissions?.length) {
                const temp = resData.addedPermissions.find(
                  (added) => added.id == item.id,
                );
                if (temp) {
                  item = { ...item, ...temp, isActive: true };
                }
              }
              if (toDelete === item.relation_id) {
                item = { ...item, relation_id: null, isActive: false };
              }
              return item;
            });
          toast.success('Role updated successfully');
          setLastState(null);
          return tempData;
        },
      );
    },
    onError(error, { role_id }) {
      toast.error(String(error));
      if (lastState)
        queryClient.setQueryData(
          ['app', recruiter?.id, 'role-and-permissions'],
          (
            prevData: Awaited<
              ReturnType<typeof getRoleAndPermissionsWithUserCount>
            >,
          ) => {
            const tempData = structuredClone(prevData);
            tempData.rolesAndPermissions[role_id].permissions[lastState.index] =
              lastState.permission;
            setLastState(null);
            return tempData;
          },
        );
    },
  });

  const handelSelectRole = (role_id: string, addMode?: boolean) => {
    setSelectRole(role_id);
    const role = query.data?.rolesAndPermissions[role_id]?.name || null;
    setQueryParams({ role, add: addMode });
  };
  return {
    role,
    roleDetails,
    selectRole,
    setSelectRole: handelSelectRole,
    handelUpdateRole,
    ...query,
  };
};

const getRoleAndPermissionsWithUserCount = async () => {
  return axios.call<GetRoleAndPermissionsAPI>(
    'POST',
    '/api/getRoleAndPermissions',
    {},
  );
};

function RoleDetails({
  role,
  roleDetails,
  back,
  AllRoles,
  updateRoles,
}: {
  role: Awaited<
    ReturnType<typeof getRoleAndPermissionsWithUserCount>
  >['rolesAndPermissions'][string] & {
    name: string;
  };
  back: () => void;
  roleDetails: {
    [key: string]: {
      description: string;
      permissions: (typeof role)['permissions'];
    };
  };
  AllRoles: {
    role: string;
    id: string;
    count: { users: number; permissions: number };
    switchRole: () => void;
  }[];
  updateRoles: (
    // eslint-disable-next-line no-unused-vars
    x: Parameters<
      ReturnType<typeof useRoleAndPermissions>['handelUpdateRole']
    >[0],
  ) => void;
}) {
  const { checkPermissions } = useRolesAndPermissions();
  const { queryParams } = useSearchQuery<{ add: boolean }>();

  const [editUser, setEditUser] = useState(false);
  const { allMember: members, handleMemberUpdate } = useAuthDetails();
  const { refetch } = useRoleAndPermissions();
  const activePermissionCount = role.permissions.filter(
    (item) => item.isActive && allPermissions.includes(item.name),
  ).length;
  const editDisabled = !checkPermissions(['manage_roles']);
  useEffect(() => {
    if (queryParams?.add) {
      setEditUser(true);
    }
  }, [queryParams?.add]);
  const { ifAllowed } = useRolesAndPermissionsContext();
  return (
    <>
      <RolesAndPermissionsDetail
        slotAddButton={ifAllowed(
          <Stack direction={'row'} marginLeft={6}>
            <ButtonSolid
              onClickButton={{ onClick: () => setEditUser(true) }}
              textButton={'Add'}
              size={1}
              isLeftIcon={true}
              iconName={'add'}
            />
          </Stack>,
          ['manage_roles'],
        )}
        textRoleName={
          <RoleDropDown options={AllRoles} selectedItem={role.name} />
        }
        // textRoleName={capitalizeFirstLetter(role.name + ' Role')}
        textTotalEnabledPermissions={`${activePermissionCount} out of ${allPermissions.length} permissions enabled.`}
        slotBackButton={
          <ButtonGhost
            size={2}
            color={'neutral'}
            isLeftIcon={true}
            iconName={'arrow_back_ios'}
            textButton={'Back'}
            iconSize={3}
            onClickButton={{ onClick: back }}
          />
        }
        slotBanner={
          <>
            {role.name === 'admin' && (
              <GlobalBannerInline
                color={'info'}
                textContent={
                  'You cannot edit the primary admin role permissions.'
                }
                slotButton={<></>}
              />
            )}
          </>
        }
        slotPermissions={
          <>
            {Object.entries(roleDetails || {}).map(
              ([module, { description, permissions }]) => {
                return (
                  <Permissions
                    key={module}
                    textDescription={description.replace(
                      '[role_name]',
                      capitalizeFirstLetter(role.name),
                    )}
                    textTitle={capitalizeFirstLetter(module)}
                    slotToggleWithText={permissions?.map((permission) => {
                      if (!permission) return null;
                      return (
                        <ToggleWithText
                          isSubText={!!permission.description}
                          textSub={permission.description}
                          key={permission.id}
                          textToggleLight={permission.title}
                          slotToggle={
                            <AntSwitch
                              checked={permission.isActive}
                              disabled={editDisabled || !role.isEditable}
                              onClick={() => {
                                const data = {
                                  add: null,
                                  delete: null,
                                  role_id: role.id,
                                };

                                if (permission.isActive) {
                                  data.delete = permission.relation_id;
                                } else {
                                  data.add = permission.id;
                                }
                                updateRoles(data);
                              }}
                            />
                          }
                        />
                      );
                    })}
                  />
                );
              },
            )}
          </>
        }
        textUserCount={`Users (${role.assignedTo.length || 0})`}
        slotUserWithRole={<RoleUserWidget role={role} members={members} />}
      />
      {editUser && (
        <RoleEditMember
          close={() => setEditUser(false)}
          role={{ id: role.id, role: role.name }}
          handleMemberUpdate={async (x) => {
            const res = await handleMemberUpdate(x);
            toast.success('Role updated successfully');
            setEditUser(false);
            refetch();
            return res;
          }}
        />
      )}
    </>
  );
}

const updateRole = (data: SetRoleAndPermissionAPI['request']) => {
  return axios.call<SetRoleAndPermissionAPI>(
    'POST',
    '/api/setRoleAndPermission',
    data,
  );
};

const rolesOrder = {
  admin: 0,
  recruiter: 1,
  'recruiting coordinator': 2,
  'hiring manager': 2,
  sourcer: 3,
  interview: 4,
};

const RoleDropDown = ({
  options,
  selectedItem,
}: {
  options: {
    role: string;
    count: { users: number; permissions: number };
    switchRole: () => void;
  }[];
  selectedItem: string;
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? 'sort-Options' : undefined;
  function handleClose() {
    setAnchorEl(null);
  }
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <ButtonGhost
        size={2}
        color={'neutral'}
        isRightIcon={true}
        iconName={anchorEl ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
        textButton={capitalizeFirstLetter(selectedItem)}
        iconSize={3}
        onClickButton={{ onClick: handleClick }}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{ vertical: -10, horizontal: 0 }}
        sx={{
          '& .MuiPopover-paper': {
            borderRadius: 'var(--radius-2)',
            borderColor: 'var(--neutral-6)',
            minWidth: '176px',
          },
        }}
      >
        <List>{newFunction(options, handleClose)}</List>
      </Popover>
    </>
  );
};

function newFunction(
  itemList: {
    role: string;
    count: {
      users: number;
      permissions: number;
    };
    switchRole: () => void;
  }[],
  handleClose: () => void,
) {
  return itemList
    .sort((a, b) => rolesOrder[a.role] - rolesOrder[b.role])
    .map((item) => {
      return (
        <ListItemButton
          key={item.role}
          onClick={() => {
            item.switchRole();
            handleClose();
          }}
        >
          <Stack>
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              {`${capitalizeFirstLetter(item.role)} (${item.count.permissions})`}
            </Typography>
            <Typography
              sx={{
                fontSize: '14px',
              }}
            >
              {`Assigned to ${item.count.users} Users`}
            </Typography>
          </Stack>
        </ListItemButton>
      );
    });
}
