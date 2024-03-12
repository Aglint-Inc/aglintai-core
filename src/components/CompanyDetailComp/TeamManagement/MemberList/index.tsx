import { Avatar, Stack } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';

import { TeamListItem } from '@/devlink';
import { palette } from '@/src/context/Theme/Theme';
import { RecruiterUserType } from '@/src/types/data.types';
import { capitalizeAll } from '@/src/utils/text/textUtils';
dayjs.extend(relativeTime);

const Member = ({
  member,
  removeMember
}: {
  member: RecruiterUserType;
  removeMember: () => void;
}) => {
  const handelRemove = (e) => {
    e.stopPropagation();
    removeMember();
  };
  return (
    <TeamListItem
      isDeleteDisable={member.role !== 'admin' ? false : true}
      isDeleteVisible={
        member.role === 'admin' || member.join_status === 'invited'
          ? false
          : true
      }
      onClickCancelInvite={{
        onClick: handelRemove
      }}
      isCancelInviteVisible={member.join_status === 'invited' ? true : false}
      key={1}
      dateText={dayjs(member.joined_at).fromNow()}
      slotProfileImage={
        <Avatar
          variant='circular'
          src={member.profile_image}
          alt={member.first_name}
          sx={{
            width: '100%',
            height: '100%'
          }}
        />
      }
      userEmail={member.email}
      userName={
        member.role === 'admin'
          ? `${member.first_name || ''} ${member.last_name || ''} (You)`
          : `${member.first_name || ''} ${member.last_name || ''}`
      }
      slotUserRole={<Stack>{capitalizeAll(member.role)}</Stack>}
      userStatusProps={{
        style:
          member.join_status === 'invited'
            ? {
                backgroundColor: palette.yellow[200],
                color: palette.yellow[800]
              }
            : {
                backgroundColor: palette.green[200],
                color: palette.green[800]
              }
      }}
      userStatusText={<Stack>{capitalizeAll(member.join_status)}</Stack>}
      onClickRemove={{
        onClick: handelRemove
      }}
    />
  );
};

export default Member;
