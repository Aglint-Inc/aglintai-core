import { Popover, Stack } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import { FilterOption } from '@/devlink/FilterOption';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { IconButtonGhost } from '@/devlink/IconButtonGhost';
import { TeamOptionList } from '@/devlink/TeamOptionList';
import { useInterviewerList } from '@/src/components/Scheduling/Interviewers';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { updateMember } from '@/src/context/AuthContext/utils';
import { API_reset_password } from '@/src/pages/api/reset_password/type';
import { supabase } from '@/src/utils/supabase/client';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';
import toast from '@/src/utils/toast';

import { reinviteUser } from '../utils';
import DeleteMemberDialog from './DeleteMemberDialog';

export const UserListThreeDot = ({ member }) => {
  const [dialogReason, setDialogReason] =
    useState<Parameters<typeof DeleteMemberDialog>['0']['reason']>(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { data: memDetails } = useInterviewerList();
  const { recruiterUser } = useAuthDetails();

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();
  function ClosePopUp() {
    setDialogReason(null);
  }

  const membersDetails = useMemo(() => {
    const temp: {
      [key: string]: (typeof memDetails)[number] & { allModules: string[] };
    } = {};
    memDetails?.forEach((element) => {
      temp[element.user_id] = {
        ...element,
        allModules: [
          ...element.qualified_module_names,
          ...element.training_module_names,
        ].filter((item) => Boolean(item)),
      };
    });
    return temp;
  }, [memDetails]);

  const handelRemove = (e) => {
    e.stopPropagation();
    removeMember();
  };

  const removeMember = async () => {
    if (recruiterUser?.user_id === member.user_id) {
      toast.error("Can't remove admin account; it's the primary one.");
    } else {
      try {
        await axios.post('/api/supabase/deleteuser', {
          user_id: member.user_id,
        });
      } catch (error) {
        toast.error(
          "This member is tied to an active schedule, so removal is unavailable until it's finished.",
        );
        return null;
      }
    }
  };

  const canSuspend = member.role !== 'admin';

  return (
    <>
      <Stack
        onClick={(e) => {
          e.stopPropagation();
          handleClick(e);
        }}
      >
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
          isMarkActiveVisible={canSuspend && member.status === 'suspended'}
          isSuspendVisible={
            canSuspend &&
            member.status === 'active' &&
            recruiterUser.user_id !== member.user_id
          }
          isCancelInviteVisible={member.status === 'invited'}
          isDeleteVisible={false}
          isResetPasswordVisible={
            member.status !== 'invited' &&
            recruiterUser.user_id !== member.user_id
          }
          isEditVisible={member.status !== 'invited'}
          slotFilterOption={
            <>
              {member.status === 'invited' && (
                <FilterOption
                  slotIcon={<GlobalIcon iconName={'mail'} size={4} />}
                  text={'Resend Invitation'}
                  color={{
                    style: {
                      color: 'transparent',
                    },
                  }}
                  onClickCancelInvite={{
                    onClick: () => {
                      reinviteUser(member.email, recruiterUser.user_id).then(
                        ({ error, emailSend }) => {
                          if (!error && emailSend) {
                            return toast.success('Invite sent successfully.');
                          }
                          return toast.error(error);
                        },
                      );
                    },
                  }}
                />
              )}
            </>
          }
          isFilterOptionVisible={true}
          onClickMarkActive={{
            onClick: () => {
              updateMember({
                data: { user_id: member.user_id, status: 'active' },
              }).then(() => {
                toast.success(
                  `${member.first_name}'s account is activated successfully.`,
                );
                handleClose();
              });
            },
          }}
          onClickEdit={{
            onClick: () => {
              // editMember(e);
              router.push(`/user/profile/${member.user_id}?edit_enable=true`);
              handleClose();
            },
          }}
          onClickCancelInvite={{
            onClick: () => {
              setDialogReason('cancel_invite');
              handleClose();
            },
          }}
          onClickSuspend={{
            onClick: () => {
              setDialogReason('suspend');
              handleClose();
            },
          }}
          onClickDelete={{
            onClick: () => {
              setDialogReason('delete');
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
      <DeleteMemberDialog
        name={capitalizeFirstLetter(
          `${member.first_name} ${member.last_name}`.trim(),
        )}
        action={
          dialogReason === 'suspend'
            ? ({
                interviewTypes,
                task,
              }: {
                interviewTypes: string;
                task: string;
              }) => {
                supabase
                  .rpc('transfer_user_responsibilities', {
                    suspended_user: member.user_id,
                    hiring_manager: interviewTypes,
                    recruiter: interviewTypes,
                    recruiting_coordinator: interviewTypes,
                    sourcer: interviewTypes,
                    task_owner: task,
                  })
                  .then(() => {
                    updateMember({
                      data: {
                        user_id: member.user_id,
                        status: 'suspended',
                      },
                    });
                    toast.success(
                      `${member.first_name}'s account is suspended successfully.`,
                    );
                    ClosePopUp();
                  });
              }
            : handelRemove
        }
        role={member.role}
        reason={dialogReason}
        warning={
          dialogReason !== 'cancel_invite' &&
          membersDetails[member.user_id]?.allModules.length
            ? `User is part of scheduling Module- ${membersDetails[member.user_id].allModules}.`.replaceAll(
                ',',
                ', ',
              )
            : undefined
        }
        close={ClosePopUp}
      />
    </>
  );
};

const resetPassword = (email: string) => {
  const body: API_reset_password['request'] = { email };
  return axios
    .post<API_reset_password['response']>('/api/reset_password', body)
    .then(({ data }) => {
      if (data.error) throw new Error(data.error);
      return data.passwordReset;
    });
};
