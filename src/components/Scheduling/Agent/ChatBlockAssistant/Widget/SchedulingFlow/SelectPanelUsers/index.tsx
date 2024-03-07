import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { ButtonPrimaryRegular, InterviewpanelPill } from '@/devlink';
import { WidgetGrid3X3 } from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useSchedulingAgent } from '@/src/context/SchedulingAgent/SchedulingAgentProvider';

import { useSchedulingAgentStore } from '../../../../store';

function SelectPanelUsers({
  panel,
  index
}: {
  panel: {
    relations: {
      id: string;
      panel_id: string;
      user_id: string;
    }[];
    created_at: string;
    duration_available: JSON;
    id: string;
    name: string;
    recruiter_id: string;
  };
  index: number;
}) {
  const { members } = useAuthDetails();
  const [selectedUsers, setSelectedUsers] = useState<any>([]);
  const { submitHandler } = useSchedulingAgent();
  const selectedChat = useSchedulingAgentStore((state) => state.selectedChat);

  useEffect(() => {
    setSelectedUsers(
      panel.relations.map((user) => {
        return {
          user_id: user.user_id,
          must: 'selected'
        };
      })
    );

    return () => {
      setSelectedUsers([]);
    };
  }, [panel]);

  return (
    <>
      <WidgetGrid3X3
        slotWidget={selectedUsers?.map((user) => {
          const member = members.find((u) => u.user_id === user.user_id);
          return (
            <InterviewpanelPill
              key={user.user_id}
              textName={member?.first_name}
              isOptional={user.must === 'optional'}
              isSelected={user.must === 'selected'}
              isNotSelected={user.must === 'not selected'}
              onClickPill={{
                onClick: () => {
                  if (user.must === 'not selected') {
                    selectedUsers.filter(
                      (u) => u.user_id == user.user_id
                    )[0].must = 'selected';
                  } else if (user.must === 'selected') {
                    selectedUsers.filter(
                      (u) => u.user_id == user.user_id
                    )[0].must = 'optional';
                  } else {
                    selectedUsers.filter(
                      (u) => u.user_id == user.user_id
                    )[0].must = 'not selected';
                  }

                  setSelectedUsers([...selectedUsers]);
                }
              }}
              slotProfileImage={
                <MuiAvatar
                  src={member?.profile_image}
                  level={member?.first_name}
                  variant='circular'
                  height='24px'
                  width='24px'
                  fontSize='12px'
                />
              }
            />
          );
        })}
      />
      <Stack spacing={1}>
        <Typography
          variant='caption'
          className='one-line-clamp'
        >{`${selectedUsers.filter((u) => u.must == 'selected').length} Must and ${selectedUsers.filter((u) => u.must == 'optional').length} Optional`}</Typography>
        {selectedChat.history.length == index + 1 && (
          <Stack direction={'row'}>
            <ButtonPrimaryRegular
              isDisabled={
                selectedUsers.filter((u) => u.must !== 'not selected').length ==
                0
              }
              textLabel={'Continue'}
              onClickButton={{
                onClick: () => {
                  const input = `${JSON.stringify(
                    selectedUsers
                  )} are the panel members for the interview`;

                  submitHandler({
                    input: input,
                    selectedItem: {
                      selUsers: selectedUsers,
                      message: `${selectedUsers.map((u) => members.find((user) => u.user_id == user.user_id).first_name).join(' , ')} are the panel members for the interview`
                    }
                  });
                }
              }}
            />
          </Stack>
        )}
      </Stack>
    </>
  );
}

export default SelectPanelUsers;
