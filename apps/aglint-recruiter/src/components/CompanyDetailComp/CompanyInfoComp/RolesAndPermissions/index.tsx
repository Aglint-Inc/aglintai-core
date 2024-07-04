/* eslint-disable security/detect-object-injection */
import { DatabaseEnums } from '@aglint/shared-types';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

import { Breadcrum } from '@/devlink2/Breadcrum';
import { PageLayout } from '@/devlink2/PageLayout';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { palette } from '@/src/context/Theme/Theme';
import { supabase } from '@/src/utils/supabase/client';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

function RolesAndPermissions() {
  const { data, isPending: loading } = useRoleAndPermissions();

  const [role, setRole] = useState<
    (typeof data)['rolesAndPermissions'][number] & { name: string }
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

  return role ? (
    <PageLayout
      isBackButton={true}
      onClickBack={{ onClick: () => setRole(null) }}
      slotTopbarLeft={
        <Breadcrum textName={capitalizeFirstLetter(role.name + ' Role')} />
      }
      slotBody={
        <Stack p={3}>
          {Object.entries(roleDetails).map(
            ([module, { description, permissions }]) => (
              <Stack key={module}>
                <Typography variant='h4'>
                  {capitalizeFirstLetter(module)}
                </Typography>
                <Typography>{description}</Typography>
                <Stack>
                  <FormGroup>
                    {permissions?.map((permission) => {
                      return (
                        <Stack key={permission.id}>
                          <FormControlLabel
                            checked={permission.isActive}
                            control={<Checkbox />}
                            label={permission.name}
                            sx={{
                              marginLeft: '8px',
                              gap: '8px',
                            }}
                          />
                          <Typography>
                            {permission.description || ''}
                          </Typography>
                        </Stack>
                      );
                    })}
                  </FormGroup>
                </Stack>
              </Stack>
            ),
          )}
        </Stack>
      }
    />
  ) : (
    <Stack width={'100%'} padding={3}>
      <Stack>
        <Typography variant='h5'>Roles</Typography>
      </Stack>
      <Stack paddingY={'20px'}>
        <RoleTable
          headers={[
            { header: 'Role', width: '200px' },
            { header: 'Users', width: '70px' },
            { header: 'Description', width: null },
          ]}
          roles={data?.rolesAndPermissions || {}}
          loading={loading}
          setRole={setRole}
        />
      </Stack>
    </Stack>
  );
}

export default RolesAndPermissions;
const RoleTable = ({
  loading,
  headers,
  roles,
  setRole,
}: {
  loading: boolean;
  headers: { header: string; width: string }[];
  roles: Awaited<
    ReturnType<typeof getRoleAndPermissions>
  >['rolesAndPermissions'];
  setRole: (
    // eslint-disable-next-line no-unused-vars
    x: Awaited<
      ReturnType<typeof getRoleAndPermissions>
    >['rolesAndPermissions'][string] & {
      name: string;
    },
  ) => void;
}) => {
  return (
    <TableContainer
      variant='outlined'
      component={Paper}
      sx={{ background: '#FFF' }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((item) => (
              <TableCell
                key={item.header}
                variant='head'
                align={'left'}
                style={{ width: item.width }}
                sx={{
                  backgroundColor: 'background.paper',
                }}
              >
                {item.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow
              sx={{
                backgroundColor: palette.white[100],
              }}
            >
              <TableCell key={1} variant='head' align={'left'}>
                <Skeleton
                  variant='rounded'
                  animation='wave'
                  sx={{ fontSize: '1rem' }}
                />
              </TableCell>
              <TableCell key={1} variant='head' align={'left'}>
                <Skeleton
                  variant='rounded'
                  animation='wave'
                  sx={{ fontSize: '1rem' }}
                />
              </TableCell>
              <TableCell key={1} variant='head' align={'left'}>
                <Skeleton
                  variant='rounded'
                  animation='wave'
                  sx={{ fontSize: '1rem' }}
                />
              </TableCell>
            </TableRow>
          ) : (
            Object.keys(roles || {}).map((item) => {
              const role = roles[item];
              return (
                <TableRow
                  hover
                  key={role.id}
                  onClick={() => {
                    setRole({ ...role, name: item });
                  }}
                  sx={{
                    '&:hover': { cursor: 'pointer' },
                    '&:hover .MuiTableCell-root': { background: '#e4e4e4' },
                  }}
                >
                  <TableCell key={1} variant='head' align={'left'}>
                    {capitalizeFirstLetter(item)}
                  </TableCell>
                  <TableCell key={1} variant='head' align={'left'}>
                    {role.assignedTo}
                  </TableCell>
                  <TableCell key={1} variant='head' align={'left'}>
                    {role.description}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const useRoleAndPermissions = () => {
  const { recruiter } = useAuthDetails();
  return useQuery({
    queryKey: ['role-and-permissions'],
    queryFn: () => getRoleAndPermissionsWithUserCount(recruiter.id),
    enabled: Boolean(recruiter?.id),
  });
};
const getRoleAndPermissions = async (recruiter_id: string) => {
  return supabase
    .from('role_permissions')
    .select('role_id, permission_id, roles(name, description)')
    .eq('recruiter_id', recruiter_id)
    .throwOnError()
    .then(({ data }) => {
      return data.reduce(
        (acc, curr) => {
          acc[curr.roles.name] = {
            ...acc[curr.roles.name],
            id: curr.role_id,
            assignedTo: 0,
            description: curr.roles.description,
            permissions: [
              ...(acc[curr.roles.name]?.permissions || []),
              {
                id: curr.permission_id,
                name: null,
                description: null,
                isActive: true,
              },
            ],
          };
          return acc;
        },
        {} as {
          [roles: string]: {
            id: string;
            assignedTo: number;
            description: string;
            permissions: {
              id: number;
              name: DatabaseEnums['permissions_type'];
              description: string;
              isActive: boolean;
            }[];
          };
        },
      );
    })
    .then(async (rolesAndPermissions) => {
      const permission = await supabase
        .from('permissions')
        .select('id,name, description')
        .eq('is_enable', true)
        .throwOnError()
        .then(({ data }) => {
          const permission = data.reduce(
            (acc, curr) => {
              acc[curr.id] = {
                id: curr.id,
                name: curr.name,
                description: curr.description,
              };
              return acc;
            },
            {} as {
              [permission: number]: {
                id: number;
                name: DatabaseEnums['permissions_type'];
                description: string;
              };
            },
          );
          Object.keys(rolesAndPermissions).forEach((item) => {
            rolesAndPermissions[item].permissions = rolesAndPermissions[
              item
            ].permissions.map((item) => ({
              ...item,
              ...permission[item.id],
            }));
          });
          return permission;
        });

      return { rolesAndPermissions, all_permission: permission };
    });
};

const getRoleAndPermissionsWithUserCount = async (recruiter_id: string) => {
  let RolesAndPermissions = await getRoleAndPermissions(recruiter_id);

  return supabase
    .from('recruiter_relation')
    .select('role_id')
    .eq('recruiter_id', recruiter_id)
    .throwOnError()
    .then(({ data }) => {
      const count = data.reduce(
        (acc, curr) => {
          acc[curr.role_id] = (acc[curr.role_id] || 0) + 1;
          return acc;
        },
        {} as { [key: string]: number },
      );
      Object.keys(RolesAndPermissions).map((item) => {
        RolesAndPermissions[item].assignedTo =
          count[RolesAndPermissions[item].id] || 0;
      });
      return RolesAndPermissions;
    });
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
