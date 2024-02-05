import {
  // Autocomplete,
  // AutocompleteProps,
  Avatar,
  // Chip,
  Drawer,
  Stack,
  Switch,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import converter from 'number-to-words';
import { useEffect, useMemo, useState } from 'react';

import { TeamAddRole } from '@/devlink/TeamAddRole';
import { TeamListItem } from '@/devlink/TeamListItem';
import { TeamPermissionBlock } from '@/devlink/TeamPermissionBlock';
import { TeamUsersList } from '@/devlink/TeamUsersList';
import { UserRoleAddBlock } from '@/devlink/UserRoleAddBlock';
import { UserRoleAdminBlock } from '@/devlink/UserRoleAdminBlock';
import { UserRoleBlock } from '@/devlink/UserRoleBlock';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { palette } from '@/src/context/Theme/Theme';
import { RecruiterUserType } from '@/src/types/data.types';
import { capitalizeAll } from '@/src/utils/text/textUtils';
import toast from '@/src/utils/toast';

import AddMember from './AddMemberDialog';
import { UserRoleManagementType } from './types';
import { getMembersFromDB } from './utils';
import AUIButton from '../../Common/AUIButton';
dayjs.extend(relativeTime);

const TeamManagement = () => {
  const { recruiter, recruiterUser, role, userDetails } = useAuthDetails();
  const [members, setMembers] = useState<RecruiterUserType[]>([]);
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

  useEffect(() => {
    if (role) {
      getMembersFromDB(recruiter.id, userDetails.user.id).then((data) => {
        Boolean(data.length) && setMembers(data);
      });
    }
  }, [role]);

  return (
    <>
      <TeamUsersList
        slotTeamList={
          <>
            {members?.map((member) => (
              <Member
                key={member.user_id}
                member={member}
                removeMember={async () => {
                  if (recruiterUser?.user_id === member.user_id) {
                    toast.error('Cannot remove admin account');
                  } else {
                    await axios.post('/api/supabase/deleteuser', {
                      user_id: member.user_id,
                    });
                    setMembers((members) =>
                      members.filter((mem) => mem.user_id !== member.user_id),
                    );
                  }
                }}
              />
            ))}
          </>
        }
        slotUsersRoleList={
          <>
            {role?.manage_roles && (
              <UserRoleManagement
                roles={recruiter.roles as UserRoleManagementType}
              />
            )}
          </>
        }
        slotInviteBtn={
          <AUIButton
            size='small'
            onClick={() => {
              setOpenDrawer({ open: true, window: 'addMember' });
            }}
          >
            Invite Member
          </AUIButton>
        }
        pendInvitesVisibility={Boolean(inviteUser)}
        onClickViewPendingInvites={{
          onClick: () => {
            setOpenDrawer({ open: true, window: 'pendingMember' });
          },
        }}
        textPending={`You currently have ${converter.toWords(
          pendingList?.length,
        )} pending invites awaiting your response.`}
      />

      {role?.manage_users && (
        <AddMember
          open={openDrawer.open}
          menu={openDrawer.window}
          pendingList={pendingList}
          onClose={() => {
            setOpenDrawer({ open: false, window: null });
          }}
          updateMemberList={() => {
            getMembersFromDB(recruiter.id, userDetails.user.id).then((data) => {
              data?.length && setMembers(data);
            });
          }}
        />
      )}
    </>
  );
};

export default TeamManagement;

const Member = ({
  member,
  // allRoles,
  // canUpdate,
  // memberRoleUpdate,
  removeMember,
}: {
  member: RecruiterUserType;
  // allRoles: string[];
  // canUpdate: boolean;
  // eslint-disable-next-line no-unused-vars
  // memberRoleUpdate: (x: string) => void;
  removeMember: () => void;
}) => {
  // const [editRole, setEditRole] = useState(false);
  return (
    <TeamListItem
      isDeleteDisable={member.role === 'admin' ? true : false}
      isDeleteVisible={member.role === 'admin' ? false : true}
      key={1}
      dateText={dayjs(member.joined_at).fromNow()}
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
      userName={
        member.role === 'admin'
          ? `${member.first_name || ''} ${member.last_name || ''} (You)`
          : `${member.first_name || ''} ${member.last_name || ''}`
      }
      slotUserRole={
        // canUpdate && editRole ? (
        //   <CustomAutocomplete
        //     fullWidth
        //     open={true}
        //     clearIcon={false}
        //     value={capitalizeAll(member.role)}
        //     options={allRoles}
        //     sx={{
        //       width: '100%',
        //     }}
        //     onBlur={() => {
        //       setEditRole(false);
        //     }}
        //     onChange={(_, newValue) => {
        //       newValue && memberRoleUpdate(newValue.toLowerCase());
        //       setEditRole(false);
        //     }}
        //     InputProps={{
        //       fontSize: '14px',
        //     }}
        //   />
        // ) : (
        <Stack
          // onClick={() => {
          //   setEditRole(true);
          // }}
          sx={
            {
              // cursor: canUpdate ? 'pointer' : 'not-allowed',
            }
          }
        >
          {capitalizeAll(member.role)}
        </Stack>
        // )
      }
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
      userStatusText={<Stack>{capitalizeAll(member.join_status)}</Stack>}
      onClickRemove={{
        onClick: removeMember,
      }}
    />
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
  const deleteRole = (name: string) => {
    const roles = {
      ...(recruiter.roles as { [key: string]: UserRoleManagementType }),
    };
    delete roles[String(name).toLocaleLowerCase()];
    updateRecruiter({ roles }).then((data) => {
      if (data) {
        toast.success('Role deleted');
        setMenu({ edit: false, open: false });
      } else {
        toast.error('Role delete failed');
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
        deleteRole={deleteRole}
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
  deleteRole,
}: {
  allRoles: string[];
  role?: UserRoleManagementType;
  roleName?: string;
  open: boolean;
  onClose: () => void;
  edit: boolean;
  // eslint-disable-next-line no-unused-vars
  updateRoles: (name: string, role: UserRoleManagementType) => void;
  // eslint-disable-next-line no-unused-vars
  deleteRole: (name: string) => void;
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
                        sx={{
                          filter: `drop-shadow(0px 0.8333333134651184px 1.6666666269302368px rgba(0, 0, 0, 0.20)) drop-shadow(0px 0.0833333358168602px 0.25px rgba(0, 0, 0, 0.10))`,
                        }}
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
                    sx={{
                      filter: `drop-shadow(0px 0.8333333134651184px 1.6666666269302368px rgba(0, 0, 0, 0.20)) drop-shadow(0px 0.0833333358168602px 0.25px rgba(0, 0, 0, 0.10))`,
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
                          sx={{
                            filter: `drop-shadow(0px 0.8333333134651184px 1.6666666269302368px rgba(0, 0, 0, 0.20)) drop-shadow(0px 0.0833333358168602px 0.25px rgba(0, 0, 0, 0.10))`,
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
          // slotButton={
          //   <Stack gap={1}>
          //     <AUIButton
          //       variant='outlined'
          //       size='medium'
          //       onClick={() => {
          //         name &&
          //           name.trim() !== '' &&
          //           updateRoles(
          //             name,
          //             // @ts-ignore
          //             parsePermissions(editRole),
          //           );
          //       }}
          //     >
          //       {edit ? 'Save Change' : 'Add'}
          //     </AUIButton>
          //     {edit && (
          //       <AUIButton
          //         variant='error'
          //         size='medium'
          //         onClick={() => {
          //           //
          //         }}
          //       >
          //         {'delete'}
          //       </AUIButton>
          //     )}
          //   </Stack>
          // }
          isDeleteButtonVisible={edit}
          isTextDescVisible={!edit}
          onClickClose={{
            onClick: () => onClose(),
          }}
          onClickDelete={{
            onClick: () => {
              name && deleteRole(name);
            },
          }}
          onClickSaveChanges={{
            onClick: () => {
              name &&
                name.trim() !== '' &&
                updateRoles(
                  name,
                  // @ts-ignore
                  parsePermissions(editRole),
                );
            },
          }}
          textButtonSaveChanges={edit ? 'Save Change' : 'Add User Role'}
          textEditAddUser={edit ? 'Edit User Role' : 'Add User Role'}
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

export const CustomTextField = (rest: TextFieldProps) => {
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
// const CustomAutocomplete = (props: AutocompleteProps) => {
//   const { label, required, clearIcon, fullWidth, ...rest } = props;
//   return (
//     <Stack width={'100%'}>
//       <Typography fontFamily={'inherit'}>
//         {label}
//         {required && '*'}
//         {/* {rest?.label && ':'} */}
//       </Typography>
//       <Autocomplete
//         {...rest}
//         clearIcon={clearIcon}
//         fullWidth={fullWidth}
//         renderTags={(value: readonly string[], getTagProps) =>
//           value.map((option: string, index: number) => (
//             <Chip
//               key={index}
//               variant='outlined'
//               label={option}
//               {...getTagProps({ index })}
//             />
//           ))
//         }
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             inputProps={{
//               ...params.inputProps,
//             }}
//             InputProps={{
//               ...params.InputProps,
//               disableUnderline: true,
//             }}
//             variant='filled'
//             placeholder={rest.placeholder}
//             sx={{
//               '& input': { padding: '0px!important' },
//               '& .MuiInputBase-root': {
//                 padding: '8px 39px 8px 8px !important',
//               },
//             }}
//           />
//         )}
//       />
//     </Stack>
//   );
// };
