import { RecruiterUserType } from '@aglint/shared-types';
import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  Popover,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import { GlobalBadge } from '@/devlink/GlobalBadge';
import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { IconButtonGhost } from '@/devlink/IconButtonGhost';
import { UserWithRole } from '@/devlink/UserWithRole';
import SearchField from '@/src/components/Common/SearchField/SearchField';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import { GetRoleAndPermissionsAPI } from '@/src/pages/api/getRoleAndPermissions/type';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

export const RoleUserWidget = ({
  role,
  members,
  setEditUser,
}: {
  role: Awaited<
    GetRoleAndPermissionsAPI['response']
  >['rolesAndPermissions'][string] & {
    name: string;
  };
  members: RecruiterUserType[];
  // eslint-disable-next-line no-unused-vars
  setEditUser: (x: RecruiterUserType) => void;
}) => {
  const { ifAllowed } = useRolesAndPermissions();
  return (
    <>
      {ifAllowed(<UserSearch members={members} setEditUser={setEditUser} />, [
        'manage_roles',
      ])}
      {role.assignedTo.length ? (
        role.assignedTo.map((user_id) => (
          <UserCard
            members={members}
            setEditUser={setEditUser}
            user_id={user_id}
            key={user_id}
          />
        ))
      ) : (
        <GlobalEmptyState
          styleEmpty={{
            style: {
              backgroundColor: 'var(--neutral-3)',
            },
          }}
          iconName={'group'}
          textDesc={'No Users Assigned'}
        />
      )}
    </>
  );
};

const UserSearch = ({
  members,
  setEditUser,
}: {
  members: RecruiterUserType[]; // eslint-disable-next-line no-unused-vars
  setEditUser: (x: RecruiterUserType) => void;
}) => {
  const [txt, setTxt] = useState('');
  const [anchorEl, setAnchorEl] = useState<
    HTMLInputElement | HTMLTextAreaElement
  >(null);
  const open = Boolean(anchorEl);
  const id = open ? 'role-setting-search' : undefined;
  function handleClose() {
    setAnchorEl(null);
  }
  const filteredMembers = txt?.trim().length
    ? members.filter(
        (member) =>
          `${member.first_name || ''} ${member.last_name || ''}`
            .toLowerCase()
            .includes(txt?.toLowerCase()) ||
          member.role.toLowerCase().includes(txt?.toLowerCase()),
      )
    : null;

  return (
    <>
      <SearchField
        key={'search-role'}
        value={txt}
        isFullWidth
        placeholder='Search users to Add'
        onClear={() => {
          setTxt(null);
        }}
        onChange={({ target, currentTarget }) => {
          setAnchorEl(currentTarget);
          setTxt(target.value);
        }}
      />
      {Boolean(filteredMembers) && (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          disableAutoFocus
          disableEnforceFocus
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{ vertical: -10, horizontal: 0 }}
          sx={{
            '& .MuiPopover-paper': {
              borderRadius: 'var(--radius-2)',
              borderColor: 'var(--neutral-6)',
              width: (anchorEl?.clientWidth || 200) + 20 + 'px',
            },
          }}
        >
          <List>
            {filteredMembers.length ? (
              filteredMembers.map((item) => {
                return (
                  <ListItemButton
                    key={item.role}
                    onClick={() => {
                      setEditUser(item);
                      handleClose();
                    }}
                  >
                    <Stack direction={'row'} alignItems={'center'} spacing={2}>
                      <Avatar variant='rounded' src={item.profile_image} />
                      <Stack>
                        <Typography
                          sx={{
                            fontSize: '14px',
                            fontWeight: 600,
                          }}
                        >
                          {capitalizeFirstLetter(
                            `${item.first_name || ''} ${item.last_name || ''} (${capitalizeFirstLetter(item.role)})`,
                          )}
                        </Typography>
                        <Typography>
                          {capitalizeFirstLetter(item.department)}
                        </Typography>
                      </Stack>
                    </Stack>
                  </ListItemButton>
                );
              })
            ) : (
              <ListItem key={'1o1'}>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  No Match Found
                </Typography>
              </ListItem>
            )}
          </List>
        </Popover>
      )}
    </>
  );
};

const UserCard = ({ members, user_id, setEditUser }) => {
  const { checkPermissions } = useRolesAndPermissions();
  const [isEdit, setEdit] = useState(false);

  const user = members.find((member) => member.user_id === user_id);
  if (!user) return;
  return (
    <Stack
      key={user_id}
      onMouseEnter={() => setEdit(true)}
      onMouseLeave={() => setEdit(false)}
    >
      <UserWithRole
        textName={`${user.first_name || ''} ${user.last_name || ''}`.trim()}
        textRole={user.position}
        slotButton={
          isEdit && checkPermissions(['manage_roles']) ? (
            <IconButtonGhost
              iconName={'edit'}
              color={'neutral'}
              onClickButton={{ onClick: () => setEditUser(user) }}
            />
          ) : (
            <></>
          )
        }
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
    </Stack>
  );
};
