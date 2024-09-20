import { Alert, AlertDescription } from '@components/ui/alert';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { Button } from '@components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { ScrollArea } from '@components/ui/scroll-area';
import { Switch } from '@components/ui/switch';
import { CirclePlus, Info } from 'lucide-react';
import { useEffect, useState } from 'react';

import { allPermissions } from '@/constant/role_and_permissions';
import { useRolesAndPermissions as useRolesAndPermissionsContext } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useSearchQuery } from '@/hooks/useSearchQuery';
import { type GetRoleAndPermissionsAPI } from '@/pages/api/getRoleAndPermissions/type';
import { useAllMembers } from '@/queries/members';
import { type useRoleAndPermissionsHook } from '@/queries/RolesSettings';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import RoleEditMember from './RoleEditMember';
import { RoleUserWidget } from './RoleUserWidget';

function RoleDetails({
  role,
  roleDetails,
  AllRoles,
  updateRoles,
}: {
  role: GetRoleAndPermissionsAPI['response']['rolesAndPermissions'][string] & {
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
      ReturnType<typeof useRoleAndPermissionsHook>['handelUpdateRole']
    >[0],
  ) => void;
}) {
  const { checkPermissions } = useRolesAndPermissionsContext();
  const { queryParams } = useSearchQuery<{ add: boolean }>();

  const [editUser, setEditUser] = useState(false);
  const { members } = useAllMembers();
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
  const roleUsers = members.filter((mem) =>
    role.assignedTo.includes(mem.user_id),
  );
  const userLength = roleUsers.length;
  return (
    <div className='container mx-auto py-6'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/roles'>Roles</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className='flex items-center gap-1'>
                <span>{capitalizeFirstLetter(role.name)}</span>
                {/* <ChevronDownCircle size={12}> */}
                <BreadcrumbEllipsis className='h-4 w-4' />
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start'>
                {AllRoles.map((item) => (
                  <DropdownMenuItem key={item.id} onClick={item.switchRole}>
                    {capitalizeFirstLetter(item.role)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='mb-6 flex items-center justify-between'>
        <h1 className='text-lg font-bold'>
          {capitalizeFirstLetter(role.name)} Role
        </h1>
        {/* <RoleDropDown options={AllRoles} selectedItem={role.name} /> */}
      </div>

      <div className='mb-6'>
        <p className='text-sm text-muted-foreground'>
          {activePermissionCount} out of {allPermissions.length} permissions
          enabled.
        </p>
        {/* <Button size='sm' variant='outline' onClick={back} className='mt-2'>
              <ArrowLeft size={16} className='mr-1' /> Back
            </Button> */}
      </div>

      {role.name === 'admin' && (
        <Alert className='mb-6'>
          <Info size={16} />
          <AlertDescription>
            You cannot edit the primary admin role permissions.
          </AlertDescription>
        </Alert>
      )}
      <div className='mt-6 flex'>
        <div className='w-2/3 pr-6'>
          <div className='space-y-6'>
            {Object.entries(roleDetails || {}).map(
              ([module, { description, permissions }]) => (
                <Card key={module}>
                  <CardHeader>
                    <CardTitle className='text-lg'>
                      {capitalizeFirstLetter(module)}
                    </CardTitle>
                    <CardDescription>
                      {description.replace(
                        '[role_name]',
                        capitalizeFirstLetter(role.name),
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {permissions?.map((permission) => {
                      if (!permission) return null;
                      return (
                        <div
                          key={permission.id}
                          className='flex items-center justify-between py-2'
                        >
                          <div className='flex flex-col'>
                            <span className='text-sm font-medium'>
                              {permission.title}
                            </span>
                            {permission.description && (
                              <span className='text-sm text-gray-500'>
                                {permission.description}
                              </span>
                            )}
                          </div>
                          <Switch
                            checked={permission.isActive}
                            disabled={editDisabled || !role.isEditable}
                            onCheckedChange={(checked) => {
                              const data = {
                                add: null,
                                delete: null,
                                role_id: role.id,
                              };

                              if (!checked) {
                                data.delete = permission.relation_id;
                              } else {
                                data.add = permission.id;
                              }
                              updateRoles(data);
                            }}
                          />
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        </div>
        <div className='w-1/3'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center justify-between text-lg'>
                Users ({userLength || 0})
                {ifAllowed(
                  <Button
                    onClick={() => setEditUser(true)}
                    size='sm'
                    variant='outline'
                    className='flex items-center'
                  >
                    <CirclePlus className='mr-1 h-3 w-3' />
                    Add
                  </Button>,
                  ['manage_roles'],
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className='h-[calc(100vh-300px)]'>
                <RoleUserWidget role={role} members={roleUsers} />
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {editUser && (
        <RoleEditMember
          close={() => setEditUser(false)}
          role={{ id: role.id, role: role.name, assignedTo: role.assignedTo }}
        />
      )}
    </div>
  );
}

export default RoleDetails;
