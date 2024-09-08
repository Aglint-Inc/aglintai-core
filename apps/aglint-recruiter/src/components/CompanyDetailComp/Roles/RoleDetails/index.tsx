import { Switch } from '@components/ui/switch';

import { RolesAndPermissionsDetail } from '@devlink/RolesAndPermissionsDetail';

import { type MouseEvent, useEffect, useState } from 'react';

import { allPermissions, rolesOrder } from '@/constant/role_and_permissions';
import { useRolesAndPermissions as useRolesAndPermissionsContext } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useSearchQuery } from '@/hooks/useSearchQuery';
import { type GetRoleAndPermissionsAPI } from '@/pages/api/getRoleAndPermissions/type';
import { useAllMembers } from '@/queries/members';
import { type useRoleAndPermissionsHook } from '@/queries/RolesSettings';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import RoleEditMember from './RoleEditMember';
import { RoleUserWidget } from './RoleUserWidget';
import { Button } from '@components/ui/button';
import { ArrowLeft, Check, ChevronDown, CirclePlus, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@components/ui/command';
import { cn } from '@lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';

function RoleDetails({
  role,
  roleDetails,
  back,
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
    <>
      <RolesAndPermissionsDetail
        slotAddButton={ifAllowed(
          <div className='flex flex-row'>
            <Button
              onClick={() => setEditUser(true)}
              size='sm'
              variant='outline'
              className='flex items-center'
            >
              <CirclePlus className='w-3 h-3 mr-1' />
              Add
            </Button>
          </div>,
          ['manage_roles'],
        )}
        textRoleName={
          <RoleDropDown options={AllRoles} selectedItem={role.name} />
        }
        slotText={`These users have the ${capitalizeFirstLetter(role.name)} Role`}
        textTotalEnabledPermissions={`${activePermissionCount} out of ${allPermissions.length} permissions enabled.`}
        slotBackButton={
          <Button size='sm' variant='outline' onClick={back}>
            <ArrowLeft size={16} className='mr-1' /> Back
          </Button>
        }
        slotBanner={
          <>
            {role.name === 'admin' && (
              <Alert>
                <Info size={16} />
                <AlertDescription>
                  You cannot edit the primary admin role permissions.
                </AlertDescription>
              </Alert>
            )}
          </>
        }
        slotPermissions={
          <>
            {Object.entries(roleDetails || {}).map(
              ([module, { description, permissions }]) => {
                return (
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
                                <span className='text-xs text-gray-500'>
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
                );
              },
            )}
          </>
        }
        textUserCount={`Users (${userLength || 0})`}
        // textRoleName={role.name}
        slotUserWithRole={<RoleUserWidget role={role} members={roleUsers} />}
      />
      {editUser && (
        <RoleEditMember
          close={() => setEditUser(false)}
          role={{ id: role.id, role: role.name, assignedTo: role.assignedTo }}
        />
      )}
    </>
  );
}

const RoleDropDown = ({
  options,
  selectedItem: initialSelectedItem,
}: {
  options: {
    role: string;
    count: { users: number; permissions: number };
    switchRole: () => void;
  }[];
  selectedItem: string;
}) => {
  const [selectedItem, setSelectedItem] = useState(initialSelectedItem);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? 'sort-Options' : undefined;
  function handleClose() {
    setAnchorEl(null);
  }
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            size='sm'
            className='w-[200px] justify-between'
          >
            {capitalizeFirstLetter(selectedItem)}
            <ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0'>
          <Command>
            <CommandInput placeholder='Search role...' />
            <CommandEmpty>No role found.</CommandEmpty>
            <CommandGroup>
              {options
                .sort((a, b) => rolesOrder[a.role] - rolesOrder[b.role])
                .map((item) => (
                  <CommandItem
                    key={item.role}
                    onSelect={() => {
                      item.switchRole();
                      setSelectedItem(item.role);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        selectedItem === item.role
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                    {capitalizeFirstLetter(item.role)} ({item.count.permissions}
                    )
                    <span className='ml-auto text-sm text-muted-foreground'>
                      Assigned to {item.count.users} Users
                    </span>
                  </CommandItem>
                ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
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
        <Button
          key={item.role}
          variant='ghost'
          className='w-full justify-start'
          onClick={() => {
            item.switchRole();
            handleClose();
          }}
        >
          <div className='flex flex-col items-start'>
            <span className='text-sm font-semibold'>
              {`${capitalizeFirstLetter(item.role)} (${item.count.permissions})`}
            </span>
            <span className='text-sm text-muted-foreground'>
              {`Assigned to ${item.count.users} Users`}
            </span>
          </div>
        </Button>
      );
    });
}

export default RoleDetails;
