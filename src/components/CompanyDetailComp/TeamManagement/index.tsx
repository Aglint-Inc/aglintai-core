import {
  Autocomplete,
  AutocompleteProps,
  Avatar,
  Chip,
  Drawer,
  Stack,
  Switch,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';

import { TeamAddRole } from '@/devlink/TeamAddRole';
import { TeamInvite } from '@/devlink/TeamInvite';
import { TeamInvitesBlock } from '@/devlink/TeamInvitesBlock';
import { TeamListItem } from '@/devlink/TeamListItem';
import { TeamPendingInvites } from '@/devlink/TeamPendingInvites';
import { TeamPermissionBlock } from '@/devlink/TeamPermissionBlock';
import { TeamUsersList } from '@/devlink/TeamUsersList';
import { UserRoleAddBlock } from '@/devlink/UserRoleAddBlock';
import { UserRoleAdminBlock } from '@/devlink/UserRoleAdminBlock';
import { UserRoleBlock } from '@/devlink/UserRoleBlock';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { palette } from '@/src/context/Theme/Theme';
import { RecruiterUserType } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabaseClient';
import { capitalizeAll } from '@/src/utils/text/textUtils';
import toast from '@/src/utils/toast';

import AUIButton from '../../Common/AUIButton';

export type UserRoleManagementType = {
  send_interview_link: boolean;
  edit_workflow: boolean;
  screening: boolean;
  sourcing: boolean;
  view_candidates_profile: boolean;
  job_posting: boolean;
  manage_users:
    | {
        admin: boolean;
      }
    | { [key: string]: boolean };
  manage_roles: boolean;
};

const TeamManagement = () => {
  const { recruiter, userDetails, role } = useAuthDetails();
  const [members, setMembers] = useState<RecruiterUserType[]>([]);
  // const [pendingCount, setPendingCount] = useState<Number>(0);
  const [openDrawer, setOpenDrawer] = useState<{
    open: boolean;
    window: 'addMember' | 'pendingMember' | null;
  }>({
    open: false,
    window: null,
  });
  const pendingList = members.filter(
    (member) => member.join_status?.toLocaleLowerCase() === 'invited',
  );
  const inviteUser = pendingList.length;
  const [allRoles, setAllRoles] = useState<string[]>();
  useEffect(() => {
    if (role) {
      const tempRoles = Object.keys(recruiter.roles).filter(
        (key) => role.manage_users[String(key)],
      );
      getMembersFromDB(recruiter.id, tempRoles).then((data) => {
        Boolean(data.length) && setMembers(data);
        // setPendingCount(
        //   data.reduce((count, item) => {
        //     if (item.join_status === 'invited') {
        //       return count + 1;
        //     } else return count;
        //   }, 0),
        // );}
      });
      setAllRoles(tempRoles.map((role) => capitalizeAll(role)));
    }
  }, [role]);
  return (
    <>
      <TeamUsersList
        slotTeamList={
          <>
            {members?.map((member) => (
              <TeamListItem
                key={1}
                dateText={new Date(member.joined_at).toLocaleDateString()}
                slotProfileImage={
                  <Avatar
                    variant='circular'
                    src={member.profile_image}
                    alt={member.first_name}
                    sx={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                }
                userEmail={member.email}
                userName={`${member.first_name || ''} ${
                  member.last_name || ''
                }`}
                slotUserRole={capitalizeAll(member.role)}
                userStatusProps={{
                  style:
                    member.join_status === 'invited'
                      ? {
                          backgroundColor: palette.yellow[200],
                          color: palette.yellow[800],
                        }
                      : {
                          backgroundColor: palette.green[200],
                          color: palette.green[800],
                        },
                }}
                userStatusText={capitalizeAll(member.join_status)}
                onClickRemove={() => {}}
              />
            ))}
          </>
        }
        slotUsersRoleList={
          <>
            {role.manage_roles && (
              <UserRoleManagement
                roles={recruiter.roles as UserRoleManagementType}
              />
            )}
          </>
        }
        slotInviteBtn={
          <AUIButton
            variant='outlined'
            size='medium'
            onClick={() => {
              setOpenDrawer({ open: true, window: 'addMember' });
            }}
          >
            Invite Member
          </AUIButton>
        }
        pendInvitesVisibility={Boolean(inviteUser)}
        slotPendingInviteBtn={
          <AUIButton
            variant='outlined'
            onClick={() => {
              setOpenDrawer({ open: true, window: 'pendingMember' });
            }}
          >
            View Pending Invites
          </AUIButton>
        }
      />
      {role.manage_users && (
        <AddMember
          id={userDetails.user.id}
          allRoles={allRoles}
          open={openDrawer.open}
          menu={openDrawer.window}
          pendingList={pendingList}
          onClose={() => {
            setOpenDrawer({ open: false, window: null });
          }}
          addMembers={(users) => setMembers([...users, ...members])}
        />
      )}
    </>
  );
};

export default TeamManagement;

const AddMember = ({
  id,
  open,
  menu,
  allRoles,
  pendingList,
  onClose,
  addMembers,
}: {
  id: string;
  open: boolean;
  menu: 'addMember' | 'pendingMember';
  allRoles: string[];
  pendingList: RecruiterUserType[];
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  addMembers: (x: RecruiterUserType[]) => void;
}) => {
  const [form, setForm] = useState<{
    name: string;
    email: string;
    role: string;
  }>({ name: null, email: null, role: null });

  const [formError, setFormError] = useState<{
    name: boolean;
    email: boolean;
    role: boolean;
  }>({ name: null, email: null, role: null });

  const checkValidation = () => {
    if (!form.name || form.name.trim() === '') {
      setFormError({ ...formError, name: true });
      return false;
    } else if (!form.email || form.email.trim() === '') {
      setFormError({ ...formError, email: true });
      return false;
    } else if (!form.role || form.role.trim() === '') {
      setFormError({ ...formError, role: true });
      return false;
    }
    return true;
  };
  return (
    <Drawer open={open} onClose={onClose} anchor='right'>
      <Stack sx={{ width: '500px' }}>
        {menu === 'addMember' ? (
          <TeamInvite
            slotForm={
              <Stack gap={2}>
                <CustomTextField
                  value={form.name}
                  placeholder='Name'
                  error={formError.name}
                  onFocus={() => {
                    setFormError({ ...formError, name: false });
                  }}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                  }}
                />
                <CustomTextField
                  value={form.email}
                  placeholder='Email ID'
                  error={formError.email}
                  onFocus={() => {
                    setFormError({ ...formError, email: false });
                  }}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                  }}
                />
                <CustomAutocomplete
                  values={form.role}
                  placeholder='User Role'
                  options={allRoles}
                  error={formError.role}
                  onFocus={() => {
                    setFormError({ ...formError, role: false });
                  }}
                  onChange={(_, newValue) => {
                    setForm({ ...form, role: newValue });
                  }}
                />
              </Stack>
            }
            slotButtons={
              <Stack direction={'row'} justifyContent={'end'} width={'100%'}>
                {/* <AUIButton variant='text' size='medium'>
                + Add Another
              </AUIButton> */}
                <AUIButton
                  variant='outlined'
                  size='medium'
                  onClick={() => {
                    if (checkValidation()) {
                      inviteUser(form, id).then(({ error, users }) => {
                        if (!error && users) {
                          addMembers(users);
                          toast.success('Invite send');
                          return onClose();
                        }
                        // @ts-ignore
                        return toast.error(error?.message || error);
                      });
                    }
                  }}
                >
                  Invite
                </AUIButton>
              </Stack>
            }
          />
        ) : menu === 'pendingMember' ? (
          <TeamPendingInvites
            slotList={pendingList.map((member) => (
              <TeamInvitesBlock
                key={member.user_id}
                email={member.email}
                name={member.first_name}
                slotImage={
                  <Avatar
                    variant='circular'
                    src={member.profile_image}
                    alt={member.first_name}
                    sx={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                }
                slotButton={
                  <AUIButton
                    variant='outlined'
                    onClick={() => {
                      reinviteUser(member.email, id).then(
                        ({ error, emailSend }) => {
                          if (!error && emailSend) {
                            return toast.success('Invite send');
                          }
                          // @ts-ignore
                          return toast.error(error || error?.message);
                        },
                      );
                    }}
                  >
                    Resend
                  </AUIButton>
                }
              />
            ))}
            onClickClose={() => {
              onClose();
            }}
          />
        ) : (
          <></>
        )}
      </Stack>
    </Drawer>
  );
};

const getMembersFromDB = async (id: string, roles: string[]) => {
  if (roles.length === 0) return [];
  const { data, error } = await supabase
    .from('recruiter_user')
    .select()
    .eq('recruiter_id', id)
    .in('role', roles);
  if (!error && data.length) {
    return data;
  }
  return [];
};

const inviteUser = (
  form: {
    name: string;
    email: string;
    role: string;
  },
  id: string,
) => {
  return axios
    .post('/api/invite_user', {
      users: [form],
      id: id,
    })
    .then(
      ({ data }) =>
        data as {
          error: string;
          users: RecruiterUserType[];
        },
    );
};

const reinviteUser = (email: string, id: string) => {
  return axios
    .post('/api/invite_user/resend', {
      email,
      id,
    })
    .then(
      ({ data }) =>
        data as {
          error: string;
          emailSend: boolean;
        },
    );
};

function UserRoleManagement({ roles }: { roles: UserRoleManagementType }) {
  const [menu, setMenu] = useState({ open: false, edit: false });
  const { recruiter, updateRecruiter } = useAuthDetails();
  const [selectedRole, setSelectedRole] = useState<{
    role: UserRoleManagementType;
    name: string;
  }>();

  const updateRoles = (name: string, role: UserRoleManagementType) => {
    name = name.toLocaleLowerCase();
    const roles = {
      ...(recruiter.roles as { [key: string]: UserRoleManagementType }),
      [name]: role,
    };

    if (!menu?.edit) {
      Object.keys(roles).forEach((key) => {
        roles[String(key)].manage_users[String(name)] = key === 'admin';
      });
    }
    updateRecruiter({ roles }).then((data) => {
      if (data) {
        toast.success('Role saved');
        setMenu({ edit: false, open: false });
      } else {
        toast.error('Role save failed');
      }
    });
  };
  return (
    <>
      <Stack direction={'row'} gap={2} width={'100%'} flexWrap={'wrap'}>
        {Object.keys(roles).map((item, index) => {
          let permission = 0;
          let totalPermissions = 1;
          for (let x in roles[String(item)]) {
            let temp = roles[String(item)][String(x)];
            if (temp === true || temp === false) {
              permission += temp ? 1 : 0;
              totalPermissions++;
            } else {
              permission += Object.values(temp).reduce((x, y) => x || y, false)
                ? 1
                : 0;
            }
          }
          return item === 'admin' ? (
            <Stack width={'300px'}>
              <UserRoleAdminBlock />
            </Stack>
          ) : (
            <Stack
              key={index}
              width={'300px'}
              onClick={() => {
                setSelectedRole({ role: roles[String(item)], name: item });
                setMenu({ edit: true, open: true });
              }}
            >
              <UserRoleBlock
                roleName={capitalizeAll(item)}
                permissionsNumber={`${totalPermissions}/${permission}`}
              />
            </Stack>
          );
        })}
        <Stack
          width={'300px'}
          onClick={() => {
            setMenu({ open: true, edit: false });
          }}
        >
          <UserRoleAddBlock />
        </Stack>
      </Stack>
      <TeamMenu
        role={selectedRole?.role}
        roleName={capitalizeAll(selectedRole?.name || '')}
        allRoles={Object.keys(roles)}
        // roles={roles}
        open={menu.open}
        updateRoles={updateRoles}
        onClose={() => {
          setMenu({ ...menu, open: false });
          setSelectedRole(null);
        }}
        edit={menu.edit}
      />
    </>
  );
}

const TeamMenu = ({
  allRoles,
  role,
  roleName,
  open,
  onClose,
  edit,
  updateRoles,
}: {
  allRoles: string[];
  role?: UserRoleManagementType;
  roleName?: string;
  open: boolean;
  onClose: () => void;
  edit: boolean;
  // eslint-disable-next-line no-unused-vars
  updateRoles: (name: string, role: UserRoleManagementType) => void;
}) => {
  const [editRole, setEditRole] = useState([]);
  const [manageUsers, setManageUsers] = useState(false);
  const [name, setName] = useState<string>();
  const [permissions, manage_member] = useMemo(() => {
    const permissions: {
      key: string;
      value: boolean;
      text: string;
    }[] = [];
    const manage_member = [];

    if (editRole) {
      Object.keys(editRole).map((item) => {
        const temp = editRole[String(item)] as unknown as
          | {
              text: string;
              value: boolean;
            }
          | {
              [key: string]: {
                text: string;
                value: boolean;
              };
            };
        if (temp.value === true || temp.value === false) {
          permissions.push(
            // @ts-ignore
            { key: item, value: Boolean(temp.value), text: temp.text },
          );
        } else if ('admin' in editRole[String(item)]) {
          // manage_member.push[{key: item, value:temp.value, text: temp.text}]
          const tempX = editRole[String(item)];
          Object.keys(tempX).map((itemX) => {
            const per = tempX[String(itemX)];
            manage_member.push(
              // @ts-ignore
              { key: itemX, value: Boolean(per.value), text: per.text },
            );
          });
        }
      });
    }
    return [permissions, manage_member];
  }, [editRole]);

  useEffect(() => {
    const tempRole = getPermissions(allRoles, role);
    // @ts-ignore
    setEditRole(tempRole);
    if (role) {
      setName(roleName);
      setManageUsers(
        allRoles
          .map((key) => role.manage_users[String(key)])
          .reduce(
            (x: boolean, y: boolean): boolean => x || y,
            false,
          ) as boolean,
      );
    }
  }, [role, open]);
  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={() => {
        setEditRole(null);
        setName(null);
        setManageUsers(false);
        onClose();
      }}
    >
      <Stack maxWidth={'500px'}>
        <TeamAddRole
          slotPermissions={
            <>
              {permissions.map((item) => {
                return (
                  <TeamPermissionBlock
                    key={item.key}
                    description={item.text}
                    isEnabled={item.value}
                    slotToggle={
                      <Switch
                        defaultChecked
                        color='secondary'
                        checked={editRole[String(item.key)].value}
                        onChange={() =>
                          setEditRole({
                            ...editRole,
                            [String(item.key)]: {
                              ...editRole[String(item.key)],
                              value: !editRole[String(item.key)].value,
                            },
                          })
                        }
                      />
                    }
                  />
                );
              })}
              <TeamPermissionBlock
                description={
                  <Typography fontSize={'14px'} fontWeight={700}>
                    Manage Other Users
                  </Typography>
                }
                isEnabled={manageUsers}
                slotToggle={
                  <Switch
                    defaultChecked
                    color='secondary'
                    checked={manageUsers}
                    onChange={() => {
                      if (manageUsers) {
                        // @ts-ignore
                        const manage_users = editRole.manage_users;
                        Object.keys(manage_users).forEach((key) => {
                          manage_users[String(key)].value = false;
                        });

                        setEditRole({
                          ...editRole,
                          // @ts-ignore
                          manage_users,
                        });
                      }
                      setManageUsers(!manageUsers);
                    }}
                  />
                }
              />
              {manageUsers &&
                manage_member.map((item) => {
                  return (
                    <TeamPermissionBlock
                      key={item.key}
                      description={item.text}
                      isEnabled={item.value}
                      slotToggle={
                        <Switch
                          defaultChecked
                          color='secondary'
                          checked={item.value}
                          onChange={() => {
                            // @ts-ignore
                            const manage_users = editRole.manage_users;
                            manage_users[String(item.key)].value =
                              !manage_users[String(item.key)].value;
                            setEditRole({
                              ...editRole,
                              // @ts-ignore
                              manage_users,
                            });
                          }}
                        />
                      }
                    />
                  );
                })}
            </>
          }
          slotNameInput={
            // edit ? (
            //   <>{roleName}</>
            // ) : (
            <TextField
              fullWidth
              disabled={edit}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              sx={{
                minWidth: '150px',
                '& .MuiAutocomplete-root': { height: '30px' },
                '& .MuiFormControl-root ': { margin: 0 },

                '& input': { padding: '0px!important', fontSize: '14px' },
                '& .MuiInputBase-root': {
                  padding: '4px 26px 4px 4px !important',
                },
                '& .MuiAutocomplete-endAdornment': {
                  right: '4px!important',
                },
              }}
            />
            // )
          }
          slotButton={
            <Stack gap={1}>
              <AUIButton
                variant='outlined'
                size='medium'
                onClick={() => {
                  name &&
                    name.trim() !== '' &&
                    updateRoles(
                      name,
                      // @ts-ignore
                      parsePermissions(editRole),
                    );
                }}
              >
                {edit ? 'Save Change' : 'Add'}
              </AUIButton>
              {edit && (
                <AUIButton
                  variant='error'
                  size='medium'
                  onClick={() => {
                    //
                  }}
                >
                  {'delete'}
                </AUIButton>
              )}
            </Stack>
          }
        />
      </Stack>
    </Drawer>
  );
};

const getPermissions = (allRoles: string[], roles?: UserRoleManagementType) => {
  const tempRole = {
    send_interview_link: {
      text: 'Can send interview links to candidates.',
      value: roles?.send_interview_link || false,
    },
    edit_workflow: {
      text: 'Can edit workflows.',
      value: roles?.edit_workflow || false,
    },
    screening: {
      text: 'Enable/disable screening.',
      value: roles?.screening || false,
    },
    sourcing: {
      text: 'Enable/disable sourcing.',
      value: roles?.sourcing || false,
    },
    view_candidates_profile: {
      text: 'Can view candidates full profile via link.',
      value: roles?.view_candidates_profile || false,
    },
    job_posting: {
      text: 'Posting job for company.',
      value: roles?.job_posting || false,
    },
    manage_roles: {
      text: 'Can Manage user Roles.',
      value: roles?.manage_roles || false,
    },
    manage_users: {},
  };
  allRoles.forEach((key) => {
    tempRole.manage_users[String(key)] = {
      text: key,
      value: roles?.manage_users ? roles.manage_users[String(key)] : false,
    };
  });
  return tempRole;
};

const parsePermissions = (roles: ReturnType<typeof getPermissions>) => {
  const temp = {
    send_interview_link: roles.send_interview_link.value || false,
    edit_workflow: roles.edit_workflow.value || false,
    screening: roles.screening.value || false,
    sourcing: roles.sourcing.value || false,
    view_candidates_profile: roles.view_candidates_profile.value || false,
    job_posting: roles.job_posting.value || false,
    manage_roles: roles.manage_roles.value || false,
    manage_users: {},
  };
  Object.entries(roles.manage_users).forEach(([key, value]) => {
    // @ts-ignore
    temp.manage_users[String(key)] = value.value || false;
  });
  return temp;
};

const CustomTextField = (rest: TextFieldProps) => {
  const { label, required, sx, ...props } = rest;
  return (
    <Stack gap={1}>
      <Typography fontFamily={'inherit'}>
        {label}
        {required && '*'}
        {/* {rest?.label && ':'} */}
      </Typography>
      {/* @ts-ignore */}
      <TextField
        {...props}
        sx={{
          ...sx,
          padding: '0px',
          '& .MuiInputBase-root': { padding: '8px' },
          '& input': { padding: '0px' },
        }}
      />
    </Stack>
  );
};
// @ts-ignore
const CustomAutocomplete = (props: AutocompleteProps) => {
  const { label, required, ...rest } = props;
  return (
    <Stack gap={1}>
      <Typography fontFamily={'inherit'}>
        {label}
        {required && '*'}
        {/* {rest?.label && ':'} */}
      </Typography>
      <Autocomplete
        {...rest}
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip
              key={index}
              variant='outlined'
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps,
            }}
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
            }}
            variant='filled'
            placeholder={rest.placeholder}
            sx={{
              '& input': { padding: '0px!important' },
              '& .MuiInputBase-root': {
                padding: '8px 39px 8px 8px !important',
              },
            }}
          />
        )}
      />
    </Stack>
  );
};
