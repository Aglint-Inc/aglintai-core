import { RecruiterUserType } from '@aglint/shared-types';
import { Popover, Stack } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { capitalize } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import { FilterOption } from '@/devlink/FilterOption';
import { GlobalBadge } from '@/devlink/GlobalBadge';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { IconButtonGhost } from '@/devlink/IconButtonGhost';
import { TeamListItem } from '@/devlink/TeamListItem';
import { TeamOptionList } from '@/devlink/TeamOptionList';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useInterviewerList } from '@/src/components/Scheduling/Interviewers';
import {
  ContextValue,
  useAuthDetails,
} from '@/src/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import { API_reset_password } from '@/src/pages/api/reset_password/type';
import { getFullName } from '@/src/utils/jsonResume';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';
import {
  capitalizeAll,
  capitalizeFirstLetter,
} from '@/src/utils/text/textUtils';
import toast from '@/src/utils/toast';

import { reinviteUser } from '../utils';
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
    x: Parameters<ContextValue['handleMemberUpdate']>[number]['data'],
    // eslint-disable-next-line no-unused-vars
    updateDB?: boolean,
  ) => Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  editMember: (member: RecruiterUserType) => void;
  canSuspend: boolean;
}) => {
  const router = useRouter();
  const { checkPermissions } = useRolesAndPermissions();
  const handelRemove = (e) => {
    e.stopPropagation();
    removeMember();
  };

  const [dialogReason, setDialogReason] =
    useState<Parameters<typeof DeleteMemberDialog>['0']['reason']>(null);

  const { recruiterUser } = useAuthDetails();
  const { data: memDetails } = useInterviewerList();
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

  function ClosePopUp() {
    setDialogReason(null);
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

  const canManage = checkPermissions(['manage_users']);
  return (
    <>
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
                    updateMember(
                      {
                        user_id: member.user_id,
                        status: 'suspended',
                      },
                      false,
                    );
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

      <TeamListItem
        // isDeleteDisable={member.role !== 'admin' ? false : true}
        // isEditInviteVisible={member.join_status === 'invited'}
        slotBadge={
          member.status !== 'active' && (
            <GlobalBadge
              color={
                member.status === 'suspended'
                  ? 'error'
                  : member.status === 'invited'
                    ? 'warning'
                    : 'success'
              }
              textBadge={capitalize(member.status)}
            />
          )
        }
        slotThreeDot={
          canManage &&
          (member.role !== 'admin' ||
            member.status === 'invited' ||
            recruiterUser.primary) && (
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
                  isMarkActiveVisible={
                    canSuspend && member.status === 'suspended'
                  }
                  isSuspendVisible={canSuspend && member.status === 'active'}
                  isCancelInviteVisible={member.status === 'invited'}
                  isDeleteVisible={false}
                  isResetPasswordVisible={member.status !== 'invited'}
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
                              reinviteUser(
                                member.email,
                                recruiterUser.user_id,
                              ).then(({ error, emailSend }) => {
                                if (!error && emailSend) {
                                  return toast.success(
                                    'Invite sent successfully.',
                                  );
                                }
                                return toast.error(error);
                              });
                            },
                          }}
                        />
                      )}
                    </>
                  }
                  isFilterOptionVisible={true}
                  onClickMarkActive={{
                    onClick: () => {
                      updateMember({ status: 'active' }).then(() => {
                        toast.success(
                          `${member.first_name}'s account is activated successfully.`,
                        );
                        handleClose();
                      });
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
            </>
          )
        }
        key={1}
        textLastActive={
          member.last_login ? dayjs(member.last_login).fromNow() : '--:--'
        }
        slotProfileImage={
          <Stack
            sx={{
              cursor: 'pointer',
            }}
            onClick={(e) => {
              e.stopPropagation();
              router.push(
                ROUTES['/user/profile/[user_id]']({
                  user_id: member.user_id,
                }) + '?company=true',
              );
            }}
          >
            <MuiAvatar
              src={member.profile_image}
              level={getFullName(member.first_name, member.last_name)}
              variant='rounded-small'
            />
          </Stack>
        }
        userEmail={member.email}
        userName={
          <Link
            href={`/user/profile/${member.user_id}`}
          >{`${member.first_name || ''} ${member.last_name || ''} ${member.user_id === recruiterUser?.user_id ? '(You)' : ''}`}</Link>
        }
        textDepartment={member.department?.name}
        textDesignation={member.position}
        slotUserRole={<Stack>{capitalizeAll(member.role)}</Stack>}
      />
    </>
  );
};

export default Member;

const resetPassword = (email: string) => {
  const body: API_reset_password['request'] = { email };
  return axios
    .post<API_reset_password['response']>('/api/reset_password', body)
    .then(({ data }) => {
      if (data.error) throw new Error(data.error);
      return data.passwordReset;
    });
};
