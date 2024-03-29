import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { capitalize } from 'lodash';
import { useState } from 'react';

import { TeamListItem } from '@/devlink';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { palette } from '@/src/context/Theme/Theme';
import { RecruiterUserType } from '@/src/types/data.types';
import { getFullName } from '@/src/utils/jsonResume';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import DeleteMemberDialog from './DeleteMemberDialog';
dayjs.extend(relativeTime);

const Member = ({
  member,
  removeMember,
  editMember,
}: {
  member: RecruiterUserType;
  removeMember: () => void;
  // eslint-disable-next-line no-unused-vars
  editMember: (member: RecruiterUserType) => void;
}) => {
  const handelRemove = (e) => {
    e.stopPropagation();
    removeMember();
  };
  const [openForDelete, setOpenForDelete] = useState(false);
  const [openForCancel, setOpenForCancel] = useState(false);

  function ClosePopUp() {
    setOpenForDelete(false);
    setOpenForCancel(false);
  }
  if (member.join_status !== 'invited') {
    const diffTime = Math.abs(
      (new Date() as unknown as number) -
        (new Date(member.last_login) as unknown as number),
    );
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    member.join_status = diffDays <= 1 ? 'Active' : 'Not Active';
  }

  return (
    <>
      <DeleteMemberDialog
        action={handelRemove}
        openForDelete={openForDelete}
        openForCancel={openForCancel}
        close={ClosePopUp}
      />
      <TeamListItem
        // isDeleteDisable={member.role !== 'admin' ? false : true}
        // isEditInviteVisible={member.join_status === 'invited'}
        textLocation={member.interview_location}
        onClickEditInvite={{ onClick: editMember }}
        isDeleteVisible={
          member.role === 'admin' || member.join_status === 'invited'
            ? false
            : true
        }
        onClickCancelInvite={{
          onClick: () => {
            setOpenForCancel(true);
          },
        }}
        isCancelInviteVisible={member.join_status === 'invited' ? true : false}
        key={1}
        dateText={dayjs(member.joined_at).fromNow()}
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
              : {
                  backgroundColor: palette.green[200],
                  color: palette.green[800],
                },
        }}
        userStatusText={<Stack>{capitalize(member.join_status)}</Stack>}
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
