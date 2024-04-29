import { Stack } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { capitalize } from 'lodash';
import { useMemo, useState } from 'react';

import { TeamListItem } from '@/devlink';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useInterviewerList } from '@/src/components/Scheduling/Interviewers';
import { palette } from '@/src/context/Theme/Theme';
import { API_reset_password } from '@/src/pages/api/reset_password/type';
import { RecruiterUserType } from '@/src/types/data.types';
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
  // eslint-disable-next-line no-unused-vars
  updateMember: (x: RecruiterUserType) => void;
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
  // if (member.join_status === 'joined') {
  //   const diffTime = Math.abs(
  //     (new Date() as unknown as number) -
  //       (new Date(member.last_login) as unknown as number),
  //   );
  //   const diffDays = diffTime / (1000 * 60 * 60 * 24);
  //   member.join_status = diffDays <= 1 ? 'Active' : 'Not Active';
  // }

  return (
    <>
      <DeleteMemberDialog
        name={`${member.first_name} ${member.last_name}`.trim()}
        action={handelRemove}
        openForDelete={openForDelete}
        openForCancel={openForCancel}
        warning={
          openForDelete && membersDetails[member.user_id].allModules.length
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
        isActiveVisible={canSuspend && member.is_suspended}
        isSuspendVisible={canSuspend && !member.is_suspended}
        textLocation={member.interview_location}
        isCancelInviteVisible={member.join_status === 'invited' ? true : false}
        isDeleteVisible={
          member.role === 'admin' || member.join_status === 'invited'
            ? false
            : true
        }
        isResetPasswordVisible={
          true
          // member.role === 'admin' || member.join_status !== 'invited'
        }
        onClickActive={{
          onClick: () => updateMember({ ...member, is_suspended: false }),
        }}
        onClickSuspend={{
          onClick: () => updateMember({ ...member, is_suspended: true }),
        }}
        onClickEditInvite={{ onClick: editMember }}
        onClickCancelInvite={{
          onClick: () => {
            setOpenForCancel(true);
          },
        }}
        onClickResetPassword={{
          onClick: () => {
            resetPassword(member.email)
              .then(() => toast.success('Password Reset mail Sent.'))
              .catch(() => toast.error('Password Reset Failed.'));
          },
        }}
        key={1}
        textLastActive={
          member.last_login ? dayjs(member.last_login).fromNow() : '--:--'
        }
        slotProfileImage={
          <MuiAvatar
            src={member.profile_image}
            level={getFullName(member.first_name, member.last_name)}
            variant='circular'
            height='100%'
            width='100%'
            fontSize='20px'
          />
        }
        userEmail={member.email}
        userName={
          member.role === 'admin'
            ? `${member.first_name || ''} ${member.last_name || ''} (You)`
            : `${member.first_name || ''} ${member.last_name || ''}`
        }
        textDepartment={member.department}
        textDesignation={member.position}
        slotUserRole={<Stack>{capitalizeAll(member.role)}</Stack>}
        userStatusProps={{
          style:
            member.join_status === 'invited'
              ? {
                  backgroundColor: palette.yellow[200],
                  color: palette.yellow[800],
                }
              : member.is_suspended === true
                ? {
                    backgroundColor: palette.red[200],
                    color: palette.red[800],
                  }
                : {
                    backgroundColor: palette.green[200],
                    color: palette.green[800],
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
        onClickRemove={{
          onClick: () => {
            setOpenForDelete(true);
          },
        }}
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
