/* eslint-disable security/detect-object-injection */
import { Avatar, Skeleton, Stack } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { GlobalBadge } from '@/devlink/GlobalBadge';
import { Permissions } from '@/devlink/Permissions';
import { RolesAndPermissions } from '@/devlink/RolesAndPermissions';
import { RolesAndPermissionsDetail } from '@/devlink/RolesAndPermissionsDetail';
import { RolesRow } from '@/devlink/RolesRow';
import { UserWithRole } from '@/devlink/UserWithRole';
import { ToggleWithText } from '@/devlink3/ToggleWithText';
import axios from '@/src/client/axios';
import { AntSwitch } from '@/src/components/NewAssessment/AssessmentPage/editor';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { type getRoleAndPermissionsAPI } from '@/src/pages/api/getRoleAndPermissions/type';
import { type SetRoleAndPermissionAPI } from '@/src/pages/api/setRoleAndPermission/type';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';
import toast from '@/src/utils/toast';

function RolesAndPermissionsComponent() {
  const {
    data,
    isPending: loading,
    handelUpdateRole,
    role,
    roleDetails,
    setRole,
  } = useRoleAndPermissions();

  return role ? (
    // roleDetailsComponent
    <RoleDetails
      role={role}
      roleDetails={roleDetails}
      back={() => setRole(null)}
      // updateRole={setRole}
      updateRoles={handelUpdateRole}
    />
  ) : (
    <RolesAndPermissions
      slotRolesRow={
        <RoleTable
          roles={data?.rolesAndPermissions || {}}
          loading={loading}
          setRole={setRole}
        />
      }
    />
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
    x: Awaited<
      ReturnType<typeof getRoleAndPermissionsWithUserCount>
    >['rolesAndPermissions'][string] & {
      name: string;
    },
  ) => void;
}) => {
  const { members } = useAuthDetails();
  return loading
    ? [
        <RolesRow
          key={'x'}
          textRole={
            <Skeleton
              variant='rounded'
              animation='wave'
              sx={{ fontSize: '1rem' }}
            />
          }
          textDescription={
            <Skeleton
              variant='rounded'
              animation='wave'
              sx={{ fontSize: '1rem' }}
            />
          }
          slotAvatars={
            <Skeleton
              variant='rounded'
              animation='wave'
              sx={{ fontSize: '1rem' }}
            />
          }
        />,
        <RolesRow
          key={'y'}
          textRole={
            <Skeleton
              variant='rounded'
              animation='wave'
              sx={{ fontSize: '1rem' }}
            />
          }
          textDescription={
            <Skeleton
              variant='rounded'
              animation='wave'
              sx={{ fontSize: '1rem' }}
            />
          }
          slotAvatars={
            <Skeleton
              variant='rounded'
              animation='wave'
              sx={{ fontSize: '1rem' }}
            />
          }
        />,
      ]
    : Object.keys(roles || {})
        .sort((a, b) => rolesOrder[roles[a].name] - rolesOrder[roles[b].name])
        .map((item) => {
          const role = roles[item];
          const count = role.assignedTo.length;
          return (
            <RolesRow
              key={role.id}
              textRole={capitalizeFirstLetter(role.name)}
              textDescription={role.description}
              onClickRow={{
                onClick: () => {
                  setRole({ ...role });
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

  const [role, setRole] = useState<
    Awaited<
      ReturnType<typeof getRoleAndPermissionsWithUserCount>
    >['rolesAndPermissions'][string] & {
      name: string;
    }
  >(null);
  const roleDetails = app_modules.reduce(
    (acc, curr) => {
      acc[curr.name] = {
        description: curr.description,
        permissions: curr.permissions.map((permission) =>
          role?.permissions.find((pre) => pre.name == permission),
        ),
      };
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

          setRole((pre) => {
            return {
              ...pre,
              permissions: tempData.rolesAndPermissions[role_id].permissions,
            };
          });
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
          setRole((pre) => {
            return {
              ...pre,
              permissions: tempData.rolesAndPermissions[role_id].permissions,
            };
          });
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
            setRole((pre) => {
              return {
                ...pre,
                permissions: tempData.rolesAndPermissions[role_id].permissions,
              };
            });
            setLastState(null);
            return tempData;
          },
        );
    },
  });
  return {
    role,
    roleDetails,
    setRole,
    handelUpdateRole,
    ...useQuery({
      queryKey: ['app', recruiter?.id, 'role-and-permissions'],
      queryFn: getRoleAndPermissionsWithUserCount,
      enabled: Boolean(recruiter?.id),
    }),
  };
  // const updateRole;
};

const getRoleAndPermissionsWithUserCount = async () => {
  return axios.call<getRoleAndPermissionsAPI>(
    'POST',
    '/api/getRoleAndPermissions',
    {},
  );
};
function RoleDetails({
  role,
  roleDetails,
  back,
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
  updateRoles: (
    // eslint-disable-next-line no-unused-vars
    x: Parameters<
      ReturnType<typeof useRoleAndPermissions>['handelUpdateRole']
    >[0],
  ) => void;
}) {
  const { members } = useAuthDetails();
  return (
    <RolesAndPermissionsDetail
      textRoleName={capitalizeFirstLetter(role.name + ' Role')}
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
      slotPermissions={Object.entries(roleDetails || {}).map(
        ([module, { description, permissions }]) => {
          return (
            <Permissions
              key={module}
              textDescription={description}
              textTitle={capitalizeFirstLetter(module)}
              slotToggleWithText={permissions?.map((permission) => {
                console.log(module, permission);
                if (!permission) return null;
                return (
                  <ToggleWithText
                    key={permission.id}
                    textToggleLight={permission.title}
                    slotToggle={
                      <AntSwitch
                        checked={permission.isActive}
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
      slotUserWithRole={role.assignedTo.map((user_id) => {
        const user = members.find((member) => member.user_id === user_id);
        if (!user) return;
        return (
          <UserWithRole
            key={user_id}
            textName={`${user.first_name || ''} ${user.last_name || ''}`.trim()}
            textRole={user.position}
            slotBadge={
              <GlobalBadge
                color={user.is_suspended ? 'error' : 'success'}
                textBadge={user.is_suspended ? 'Suspended' : 'Active'}
              />
            }
            slotAvatar={
              <Avatar
                key={user_id}
                src={user.profile_image}
                variant='rounded'
                alt={user.first_name}
                sx={{ height: '100%', width: '100%' }}
              />
            }
          />
        );
      })}
    />
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
  permissions: string[];
}[] = [
  {
    name: 'enable disable Apps',
    description:
      'Here are the permissions enabled for the Recruiting Coordinator role to manage the Tasks module:',
    permissions: [
      'jobs_enabled',
      'assessment_enabled',
      'phone_screening_enabled',
      'integrations_enabled',
      'sourcing_enabled',
      'workflow_enabled',
      'company_setting_enabled',
      'team_enabled',
      'scheduler_enabled',
      'tasks_enabled',
      'settings_scheduler_enable',
    ],
  },
  {
    name: 'candidate permissions',
    description:
      'Here are the permissions enabled for the Recruiting Coordinator role to manage the Tasks module:',
    permissions: [
      'candidates_add',
      'candidates_read',
      'candidates_update',
      'candidates_delete',
      'candidates_moveStage',
    ],
  },
  {
    name: 'job permissions',
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
      'jobs_assignHiringManager',
      'jobs_assignRecruiter',
      'jobs_assignCoordinator',
      'jobs_assignSourcer',
    ],
  },
  {
    name: 'profile score permissions',
    description:
      'Here are the permissions enabled for the Recruiting Coordinator role to manage the Tasks module:',
    permissions: ['profileScore_view', 'profileScore_update'],
  },
  {
    name: 'interview permissions',
    description:
      'Here are the permissions enabled for the Recruiting Coordinator role to manage the Tasks module:',
    permissions: ['interviews_read', 'interviews_update', 'interviews_delete'],
  },
  {
    name: 'report permissions',
    description:
      'Here are the permissions enabled for the Recruiting Coordinator role to manage the Tasks module:',
    permissions: ['reports_view', 'reports_generate', 'reports_export'],
  },
  {
    name: 'settings permissions',
    description:
      'Here are the permissions enabled for the Recruiting Coordinator role to manage the Tasks module:',
    permissions: ['settings_view', 'settings_update'],
  },
  {
    name: 'task permissions',
    description:
      'Here are the permissions enabled for the Recruiting Coordinator role to manage the Tasks module:',
    permissions: ['tasks_create', 'tasks_read', 'tasks_update', 'tasks_delete'],
  },
  {
    name: 'Workflow permissions',
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
    description:
      'Here are the permissions enabled for the Recruiting Coordinator role to manage the Tasks module:',
    permissions: [
      'scheduler_read',
      'scheduler_create',
      'scheduler_update',
      'scheduler_delete',
      'scheduler_request_availability',
      'scheduler_send_scheduling',
      'scheduler_interview_types_create',
      'scheduler_interview_types_read',
      'scheduler_interview_types_update',
      'scheduler_interviewer_edit',
      'settings_scheduler_update',
    ],
  },
  {
    name: 'User Manage permissions',
    description:
      'Here are the permissions enabled for the Recruiting Coordinator role to manage the Tasks module:',
    permissions: ['team_read', 'team_create', 'team_update', 'team_delete'],
  },
  {
    name: 'Company permissions',
    description:
      'Here are the permissions enabled for the Recruiting Coordinator role to manage the Tasks module:',
    permissions: ['settings_company_enable', 'settings_company_update'],
  },
  {
    name: 'team permissions',
    description:
      'Here are the permissions enabled for the Recruiting Coordinator role to manage the Tasks module:',
    permissions: ['settings_team_enable', 'settings_team_update'],
  },
  {
    name: 'Roles permissions',
    description:
      'Here are the permissions enabled for the Recruiting Coordinator role to manage the Tasks module:',
    permissions: ['settings_roles_enable', 'settings_roles_update'],
  },
];

const temp_modules = app_modules.map((item) => item.name);
