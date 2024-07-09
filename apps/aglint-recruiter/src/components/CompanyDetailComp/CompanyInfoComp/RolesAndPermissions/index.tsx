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
    <Stack width={'100%'} padding={3}>
      <RolesAndPermissions
        slotRolesRow={
          <RoleTable
            roles={data?.rolesAndPermissions || {}}
            loading={loading}
            setRole={setRole}
          />
        }
      />
    </Stack>
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
    : Object.keys(roles || {}).map((item) => {
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
  const roleDetails =
    role?.permissions.reduce(
      (acc, curr) => {
        const temp = temp_modules.find((name) =>
          app_modules
            .find((mod) => mod.name == name)
            ?.permissions.includes(curr.name),
        );
        if (temp) {
          acc[temp] = acc[temp] || ({} as (typeof acc)[string]);
          acc[temp].description =
            app_modules.find((mod) => mod.name == temp)?.description || '';
          acc[temp].permissions = [...(acc[temp]?.permissions || []), curr];
        }
        return acc;
      },
      {} as {
        [key: string]: {
          description: string;
          permissions: (typeof role)['permissions'];
        };
      },
    ) || {};
  const handelUpdateRole = async (data: Parameters<typeof updateRole>['0']) => {
    return mutateAsync(data);
    // .then((resData) => {
    //   setRole((pre) => {
    //     const permissions = pre.permissions.map((pre) => {
    //       if (data.add === pre.id) {
    //         return { ...pre, ...resData.addedPermissions, isActive: true };
    //       }
    //       // console.log(
    //       //   data.delete,
    //       //   pre.relation_id,
    //       //   data.delete === pre.relation_id,
    //       // );

    //       if (data.delete === pre.relation_id) {
    //         return { ...pre, relation_id: null, isActive: false };
    //       }
    //       return pre;
    //     });

    //     return { ...pre, permissions };
    //   });
    //   toast.success('Role updated successfully');
    // })
    // .catch((error) => {
    //   toast.error(String(error));
    // });
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
            // const permissions = pre.permissions.map((pre) => {
            //   if (add === pre.id) {
            //     return {
            //       ...pre,
            //       isActive: true,
            //     };
            //   }
            //   if (toDelete === pre.relation_id) {
            //     return { ...pre, relation_id: null, isActive: false };
            //   }
            //   return pre;
            // });

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

const app_modules: {
  name: string;
  description: string;
  permissions: string[];
}[] = [
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
      'jobs_create',
      'jobs_read',
      'jobs_update',
      'jobs_delete',
      'jobs_publish',
      'jobs_unpublish',
      'jobs_archive',
      'jobs_restore',
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
    permissions: [
      'interviews_schedule',
      'interviews_read',
      'interviews_update',
      'interviews_delete',
    ],
  },
  {
    name: 'report permissions',
    description:
      'Here are the permissions enabled for the Recruiting Coordinator role to manage the Tasks module:',
    permissions: ['reports_generate', 'reports_view', 'reports_export'],
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
    permissions: [
      'tasks_enabled',
      'tasks_create',
      'tasks_read',
      'tasks_update',
      'tasks_delete',
    ],
  },
  {
    name: 'scheduler permissions',
    description:
      'Here are the permissions enabled for the Recruiting Coordinator role to manage the Tasks module:',
    permissions: [
      'scheduler_enabled',
      'scheduler_create',
      'scheduler_read',
      'scheduler_update',
      'scheduler_delete',
      'scheduler_request_availability',
      'scheduler_send_scheduling',
      'scheduler_interview_types_create',
      'scheduler_interview_types_read',
      'scheduler_interview_types_update',
      'scheduler_interviewer_edit',
    ],
  },
  {
    name: 'miscellaneous permissions',
    description:
      'Here are the permissions enabled for the Recruiting Coordinator role to manage the Tasks module:',
    permissions: [
      'jobs_enabled',
      'sourcing_enabled',
      'phone_screening_enabled',
      'assessment_enabled',
      'integrations_enabled',
      'company_setting_enabled',
      'workflow_enabled',
      'workflow_create',
      'workflow_read',
      'workflow_update',
      'workflow_delete',
      'team_enabled',
      'team_create',
      'team_read',
      'team_update',
      'team_delete',
      'settings_scheduler_enable',
      'settings_scheduler_update',
      'settings_company_enable',
      'settings_company_update',
      'settings_team_enable',
      'settings_team_update',
      'settings_roles_enable',
      'settings_roles_update',
    ],
  },
];

const temp_modules = app_modules.map((item) => item.name);
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
        ([module, { description, permissions }]) => (
          <Permissions
            key={module}
            textDescription={description}
            textTitle={capitalizeFirstLetter(module)}
            slotToggleWithText={permissions?.map((permission) => {
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
        ),
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
