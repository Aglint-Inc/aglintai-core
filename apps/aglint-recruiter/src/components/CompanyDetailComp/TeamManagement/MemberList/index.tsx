import { RecruiterUserType } from '@aglint/shared-types';
import { Popover, Stack } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { capitalize } from 'lodash';
import { useMemo, useState } from 'react';

import { IconButtonGhost } from '@/devlink/IconButtonGhost';
import { TeamListItem } from '@/devlink/TeamListItem';
import { TeamOptionList } from '@/devlink/TeamOptionList';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useInterviewerList } from '@/src/components/Scheduling/Interviewers';
import {
  ContextValue,
  useAuthDetails,
} from '@/src/context/AuthContext/AuthContext';
import { API_reset_password } from '@/src/pages/api/reset_password/type';
import { getFullName } from '@/src/utils/jsonResume';
import { capitalizeAll } from '@/src/utils/text/textUtils';
import toast from '@/src/utils/toast';

import DeleteMemberDialog from './DeleteMemberDialog';
dayjs.extend(relativeTime);

const Member = ({
  member,
  removeMember,
  updateMember,
  editMember,
  canSuspend,
}: {
  member: RecruiterUserType;
  removeMember: () => void;
  updateMember: (
    // eslint-disable-next-line no-unused-vars
    x: Parameters<ContextValue['handelMemberUpdate']>[number]['data'],
  ) => void;
  // eslint-disable-next-line no-unused-vars
  editMember: (member: RecruiterUserType) => void;
  canSuspend: boolean;
}) => {
  const handelRemove = (e) => {
    e.stopPropagation();
    removeMember();
  };
  const [openForDelete, setOpenForDelete] = useState(false);
  const [openForCancel, setOpenForCancel] = useState(false);
  const { userDetails } = useAuthDetails();
  const { data: memDetails } = useInterviewerList();
  const membersDetails = useMemo(() => {
    const temp: {
      [key: string]: (typeof memDetails)[number] & { allModules: string[] };
    } = {};
    memDetails?.forEach((element) => {
      temp[element.rec_user.user_id] = {
        ...element,
        allModules: [
          ...element.qualified_module_names,
          ...element.training_module_names,
        ].filter((item) => Boolean(item)),
      };
    });
    return temp;
  }, [memDetails]);

  function ClosePopUp() {
    setOpenForDelete(false);
    setOpenForCancel(false);
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <DeleteMemberDialog
        name={`${member.first_name} ${member.last_name}`.trim()}
        action={handelRemove}
        openForDelete={openForDelete}
        openForCancel={openForCancel}
        warning={
          openForDelete && membersDetails[member.user_id]?.allModules.length
            ? `User is part of scheduling Module- ${membersDetails[member.user_id].allModules}.`.replaceAll(
                ',',
                ', ',
              )
            : undefined
        }
        close={ClosePopUp}
      />
      <TeamListItem
        // isDeleteDisable={member.role !== 'admin' ? false : true}
        // isEditInviteVisible={member.join_status === 'invited'}
        slotThreeDot={
          <>
            <Stack onClick={handleClick}>
              <IconButtonGhost
                iconName='more_vert'
                size={2}
                iconSize={6}
                color={'neutral'}
              />
            </Stack>

            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <TeamOptionList
                isMarkActiveVisible={canSuspend && member.is_suspended}
                isSuspendVisible={canSuspend && !member.is_suspended}
                isCancelInviteVisible={
                  member.join_status === 'invited' ? true : false
                }
                isDeleteVisible={
                  member.role === 'admin' || member.join_status === 'invited'
                    ? false
                    : true
                }
                isResetPasswordVisible={
                  member.role !== 'admin' && member.join_status !== 'invited'
                }
                onClickMarkActive={{
                  onClick: () => {
                    updateMember({ is_suspended: false });
                    handleClose();
                  },
                }}
                onClickSuspend={{
                  onClick: () => {
                    updateMember({
                      is_suspended: true,
                    }),
                      handleClose();
                  },
                }}
                onClickEdit={{
                  onClick: (e) => {
                    editMember(e);
                    handleClose();
                  },
                }}
                onClickCancelInvite={{
                  onClick: () => {
                    setOpenForCancel(true);
                    handleClose();
                  },
                }}
                onClickDelete={{
                  onClick: () => {
                    setOpenForDelete(true);
                    handleClose();
                  },
                }}
                onClickResetPassword={{
                  onClick: () => {
                    resetPassword(member.email)
                      .then(() => toast.success('Password reset email sent.'))
                      .catch(() => toast.error('Password reset failed.'));
                    handleClose();
                  },
                }}
              />
            </Popover>
          </>
        }
        key={1}
        textLastActive={
          member.last_login ? dayjs(member.last_login).fromNow() : '--:--'
        }
        slotProfileImage={
          <MuiAvatar
            src={member.profile_image}
            level={getFullName(member.first_name, member.last_name)}
            variant='rounded-small'
          />
        }
        userEmail={member.email}
        userName={`${member.first_name || ''} ${member.last_name || ''} ${member.user_id === userDetails?.user?.id ? '(You)' : ''}`}
        textDepartment={member.department}
        textDesignation={member.position}
        slotUserRole={<Stack>{capitalizeAll(member.role)}</Stack>}
        userStatusProps={{
          style:
            member.join_status === 'invited'
              ? {
                  backgroundColor: 'var(--warning-a2)',
                  border: '1px solid var(--warning-6)',
                  color: 'var(--warning-a11)',
                  padding: 'var(--space-1) var(--space-2)',
                  fontWeight: '500',
                }
              : member.is_suspended === true
                ? {
                    backgroundColor: 'var(--error-a2)',
                    border: '1px solid var(--error-6)',
                    color: 'var(--error-a11)',
                    padding: 'var(--space-1) var(--space-2)',
                    fontWeight: '500',
                  }
                : {
                    backgroundColor: 'var(--success-a2)',
                    border: '1px solid var(--success-a6)',
                    color: 'var(--success-a11)',
                    padding: 'var(--space-1) var(--space-2)',
                    fontWeight: '500',
                  },
        }}
        userStatusText={
          <Stack>
            {capitalize(
              member.is_suspended
                ? 'Suspended'
                : member.join_status === 'joined'
                  ? 'Active'
                  : member.join_status,
            )}
          </Stack>
        }
      />
    </>
  );
};

export default Member;

// const setStatus = (id: string, is_suspended: boolean) => {
//   return supabase
//     .from('recruiter_user')
//     .update({ is_suspended })
//     .eq('user_id', id)
//     .select()
//     .then(({ data, error }) => {
//       if (error) throw new Error(error.message);
//       return data;
//     });
// };

const resetPassword = (email: string) => {
  const body: API_reset_password['request'] = { email };
  return axios
    .post<API_reset_password['response']>('/api/reset_password', body)
    .then(({ data }) => {
      if (data.error) throw new Error(data.error);
      return data.passwordReset;
    });
};
