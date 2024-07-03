/* eslint-disable security/detect-object-injection */
import { DatabaseEnums } from '@aglint/shared-types';
import {
  List,
  ListItem,
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
  const [role, setRole] = useState<(typeof data)[number] & { name: string }>(
    null,
  );
  const roleDetails =
    role?.permissions.reduce(
      (acc, curr) => {
        const curr_key = curr.name.split('_')[0];
        const temp = app_modules[curr_key]
          ? curr_key
          : temp_modules.find((item) =>
              app_modules[item].extra_permissions.includes(curr.name),
            ) || 'other';

        if (temp) {
          acc[temp] = acc[temp] || ({} as (typeof acc)[string]);
          acc[temp].description = app_modules[temp]?.description || '';
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
                  <List>
                    {permissions.map((permission) => {
                      return (
                        <ListItem key={permission.id} sx={{ paddingY: '4px' }}>
                          {permission.name}
                        </ListItem>
                      );
                    })}
                  </List>
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
          roles={data}
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
  roles: Awaited<ReturnType<typeof getRoleAndPermissions>>;
  setRole: (
    // eslint-disable-next-line no-unused-vars
    x: Awaited<ReturnType<typeof getRoleAndPermissions>>[string] & {
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
    .select('role_id, permission_id, roles(name), permissions(name)')
    .eq('recruiter_id', recruiter_id)
    .eq('permissions.is_enable', true)
    .throwOnError()
    .then(({ data }) => {
      return data.reduce(
        (acc, curr) => {
          acc[curr.roles.name] = {
            ...acc[curr.roles.name],
            id: curr.role_id,
            assignedTo: 0,
            description: 'Role description',
            permissions: [
              ...(acc[curr.roles.name]?.permissions || []),
              {
                id: curr.permission_id,
                name: curr.permissions.name,
                description: 'permission description',
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
            }[];
          };
        },
      );
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
  [key: string]: {
    name: string;
    description: string;
    extra_permissions: string[];
  };
} = {
  jobs: {
    name: 'Jobs',
    description: 'Jobs description',
    extra_permissions: [
      'assessment_enabled',
      'integrations_enabled',
      'phone_screening_enabled',
      'sourcing_enabled',
      'candidates_add',
      'candidates_read',
      'candidates_update',
      'candidates_delete',
      'candidates_moveStage',
      'profileScore_view',
      'profileScore_update',
      'interviews_schedule',
      'interviews_read',
      'interviews_update',
      'interviews_delete',
      'reports_generate',
      'reports_view',
      'reports_export',
    ],
  },
  tasks: {
    name: 'Tasks',
    description: 'tasks description',
    extra_permissions: [],
  },
  scheduler: {
    name: 'Scheduler',
    description: 'scheduler description',
    extra_permissions: [],
  },
  workflow: {
    name: 'Workflow',
    description: 'workflow description',
    extra_permissions: [],
  },
  settings: {
    name: 'Company',
    description: 'settings description',
    extra_permissions: [
      'company_setting_enabled',
      'team_delete',
      'team_enabled',
      'team_create',
      'team_read',
      'team_update',
    ],
  },
};

const temp_modules = Object.keys(app_modules);
