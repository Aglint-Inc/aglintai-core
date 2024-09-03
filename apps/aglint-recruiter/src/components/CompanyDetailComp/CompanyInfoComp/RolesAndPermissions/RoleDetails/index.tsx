import {
  List,
  ListItemButton,
  Popover,
  Stack,
  Typography,
} from '@mui/material';
import { type MouseEvent, useEffect, useState } from 'react';

import { Switch } from '@/components/ui/switch';
import { ButtonGhost } from '@/devlink/ButtonGhost';
import { Permissions } from '@/devlink/Permissions';
import { RolesAndPermissionsDetail } from '@/devlink/RolesAndPermissionsDetail';
import { ButtonSoft } from '@/devlink2/ButtonSoft';
import { GlobalBannerInline } from '@/devlink2/GlobalBannerInline';
import { ToggleWithText } from '@/devlink3/ToggleWithText';
import {
  allPermissions,
  rolesOrder,
} from '@/src/constant/role_and_permissions';
import { useRolesAndPermissions as useRolesAndPermissionsContext } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useSearchQuery } from '@/src/hooks/useSearchQuery';
import { type GetRoleAndPermissionsAPI } from '@/src/pages/api/getRoleAndPermissions/type';
import { useAllMembers } from '@/src/queries/members';
import { type useRoleAndPermissionsHook } from '@/src/queries/RolesSettings';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import RoleEditMember from './RoleEditMember';
import { RoleUserWidget } from './RoleUserWidget';

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
          <Stack direction={'row'}>
            <ButtonSoft
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
        slotText={`These users have the ${capitalizeFirstLetter(role.name)} Role`}
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
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
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

export default RoleDetails;
