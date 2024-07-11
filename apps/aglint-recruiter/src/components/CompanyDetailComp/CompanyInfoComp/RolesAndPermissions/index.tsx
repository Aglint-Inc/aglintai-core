/* eslint-disable security/detect-object-injection */
import { RecruiterUserType } from '@aglint/shared-types';
import {
  Avatar,
  List,
  ListItemButton,
  Popover,
  Stack,
  Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';
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
import Seo from '@/src/components/Common/Seo';
import { AntSwitch } from '@/src/components/NewAssessment/AssessmentPage/editor';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
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
      <Seo title='Roles & Permissions' />
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
  setRole: (
    // eslint-disable-next-line no-unused-vars
    x: string,
  ) => void;
}) => {
  const { members } = useAuthDetails();
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
              }
            />
          );
        });
};

const useRoleAndPermissions = () => {
  const { recruiter } = useAuthDetails();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['app', recruiter?.id, 'role-and-permissions'],
    queryFn: getRoleAndPermissionsWithUserCount,
    enabled: Boolean(recruiter?.id),
  });

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
              if (add === item.id) {
                const temp = resData.addedPermissions;
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

  return {
    role,
    roleDetails,
    selectRole,
    setSelectRole,
    handelUpdateRole,
    ...query,
  };
  // const updateRole;
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
  const [editUser, setEditUser] = useState<{
    user: RecruiterUserType;
    role: string;
  }>(null);
  const { recruiterUser, members, handelMemberUpdate } = useAuthDetails();
  const { refetch } = useRoleAndPermissions();
  return (
    <>
      <RolesAndPermissionsDetail
        textRoleName={
          <RoleDropDown options={AllRoles} selectedItem={role.name} />
        }
        // textRoleName={capitalizeFirstLetter(role.name + ' Role')}
        textTotalEnabledPermissions={`${role.permissions.filter((item) => item.isActive).length} out of ${role.permissions.length} permissions enabled.`}
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
        slotPermissions={
          <>
            {role.name === 'admin' && (
              <GlobalBannerInline
                color={'warning'}
                textContent={'Admin role can not be Edited.'}
                slotButton={<></>}
              />
            )}
            {Object.entries(roleDetails || {}).map(
              ([module, { description, permissions }]) => {
                return (
                  <Permissions
                    key={module}
                    textDescription={description}
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
                              disabled={!role.isEditable}
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
        slotUserWithRole={
          <RoleUserWidget
            role={role}
            members={members}
            setEditUser={(x) => setEditUser({ user: x, role: role.id })}
          />
        }
      />
      {editUser && (
        <RoleEditMember
          close={() => setEditUser(null)}
          user={editUser.user}
          defaultRole={editUser.role}
          options={AllRoles.map((role) => ({ role: role.role, id: role.id }))}
          errorMessage={
            recruiterUser.user_id === editUser.user.user_id &&
            'You can not edit your own role'
          }
          handelMemberUpdate={async (x) => {
            const res = await handelMemberUpdate(x);
            toast.success('Role updated successfully');
            setEditUser(null);
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

const app_modules: {
  name: string;
  description: string;
  dependency: string;
  permissions: string[];
}[] = [
  {
    name: 'enable disable Apps',
    dependency: null,
    description:
      'Here are the permissions enabled for the Recruiting Coordinator role to manage the Tasks module:',
    permissions: [
      'jobs_enabled',
      // 'assessment_enabled',
      // 'phone_screening_enabled',
      'integrations_enabled',
      // 'sourcing_enabled',
      'workflow_enabled',
      'company_setting_enabled',
      'scheduler_enabled',
      'tasks_enabled',
      'settings_scheduler_enable',
    ],
  },
  {
    name: 'job permissions',
    dependency: 'jobs_enabled',
    description:
      'Here are the permissions enabled for the Recruiting Coordinator role to manage the Jobs module:',
    permissions: [
      'jobs_read',
      'jobs_create',
      'jobs_update',
      'jobs_publish',
      'jobs_unpublish',
      'jobs_archive',
      'jobs_restore',
      'jobs_delete',
      'profileScore_view',
      'profileScore_update',
      'jobs_assignHiringManager',
      'jobs_assignRecruiter',
      'jobs_assignCoordinator',
      'jobs_assignSourcer',
      'candidates_add',
      'candidates_read',
      'candidates_update',
      'candidates_delete',
      'candidates_moveStage',
    ],
  },
  // {
  // name: 'profile score permissions',
  // dependency: null,
  // description:
  //   'Here are the permissions enabled for the Recruiting Coordinator role to manage the Tasks module:',
  // permissions: ['profileScore_view', 'profileScore_update'],
  // },
  // {
  //   name: 'interview permissions',
  //   dependency: null,
  //   description:
  //     'Here are the permissions enabled for the Recruiting Coordinator role to manage the Tasks module:',
  //   permissions: ['interviews_read', 'interviews_update', 'interviews_delete'],
  // },
  // {
  //   name: 'report permissions',
  //   dependency: null,
  //   description:
  //     'Here are the permissions enabled for the Recruiting Coordinator role to manage the Tasks module:',
  //   permissions: ['reports_view', 'reports_generate', 'reports_export'],
  // },
  {
    name: 'task permissions',
    dependency: 'tasks_enabled',
    description:
      'Here are the permissions enabled for the Recruiting Coordinator role to manage the Tasks module:',
    permissions: ['tasks_create', 'tasks_read', 'tasks_update', 'tasks_delete'],
  },
  {
    name: 'Workflow permissions',
    dependency: 'workflow_enabled',
    description:
      'Here are the permissions enabled for the Recruiting Coordinator role to manage the Tasks module:',
    permissions: [
      'workflow_create',
      'workflow_read',
      'workflow_update',
      'workflow_delete',
    ],
  },
  {
    name: 'scheduler permissions',
    dependency: 'scheduler_enabled',
    description:
      'Here are the permissions enabled for the Recruiting Coordinator role to manage the Tasks module:',
    permissions: [
      'scheduler_read',
      'scheduler_create',
      'scheduler_update',
      'scheduler_delete',
      'scheduler_request_availability',
      'scheduler_send_scheduling',
      'interviews_read',
      'interviews_update',
      'interviews_delete',
      'scheduler_interview_types_create',
      'scheduler_interview_types_read',
      'scheduler_interview_types_update',
      'scheduler_interviewer_edit',
      'settings_scheduler_update',
    ],
  },
  // {
  //   name: 'User permissions',
  //   dependency: null,
  //   description:
  //     'Here are the permissions enabled for the Recruiting Coordinator role to manage the Tasks module:',
  //   permissions: [
  //     'team_read',
  //     'team_create',
  //     'team_update',
  //     'team_delete',
  //     'settings_team_enable',
  //     'settings_team_update',
  //   ],
  // },
  {
    name: 'Company permissions',
    dependency: 'company_setting_enabled',
    description:
      'Here are the permissions enabled for the Recruiting Coordinator role to manage the Tasks module:',
    permissions: [
      'settings_view',
      'settings_update',
      'settings_company_enable',
      'settings_company_update',
      'settings_roles_enable',
      'settings_roles_update',
      'team_enabled',
      'team_read',
      'team_create',
      'team_update',
      'team_delete',
      'settings_team_enable',
      'settings_team_update',
    ],
  },
];

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
        iconName={'keyboard_arrow_down'}
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
