import { Stack } from '@mui/material';
import React from 'react';

import { ButtonPrimaryRegular } from '@/devlink';
import { WidgetGrid3X3, WidgetUserCard } from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useSchedulingAgent } from '@/src/context/SchedulingAgent/SchedulingAgentProvider';

import { useSchedulingAgentStore } from '../../../store';

function SelectMultipleUsers({
  users,
  index,
}: {
  users: {
    first_name: string;
    last_name: string;
    user_id: string;
    email: string;
    role: string;
    profile_image: string;
  }[];
  index: number;
}) {
  const { members } = useAuthDetails();
  const { selectedChat } = useSchedulingAgentStore();
  const { submitHandler } = useSchedulingAgent();
  const [selectedUsers, setSelectedUsers] = React.useState([]);

  return (
    <>
      <WidgetGrid3X3
        slotWidget={users?.map((user) => {
          return (
            <WidgetUserCard
              isSelected={selectedUsers.includes(user.user_id)}
              key={user.user_id}
              textName={user.first_name}
              textEmail={user.email}
              slotUserAvatar={
                <MuiAvatar
                  src={user.profile_image}
                  level={user.first_name}
                  variant='circular'
                  height='100%'
                  width='100%'
                  fontSize='12px'
                />
              }
              onClickUser={{
                onClick: () => {
                  if (selectedUsers.includes(user.user_id)) {
                    setSelectedUsers(
                      selectedUsers.filter((u) => u !== user.user_id),
                    );
                  } else {
                    setSelectedUsers([...selectedUsers, user.user_id]);
                  }
                },
              }}
            />
          );
        })}
      />
      {selectedChat.history.length == index + 1 && (
        <Stack direction={'row'} pt={2}>
          <ButtonPrimaryRegular
            isDisabled={selectedUsers.length === 0}
            textLabel={'Send Invite'}
            onClickButton={{
              onClick: () => {
                submitHandler({
                  input: `Users are ${JSON.stringify(selectedUsers)}`,
                  selectedItem: {
                    selectedUsers: { ...selectedUsers },
                    message: `Users are ${selectedUsers.map((u) => members.find((m) => m.user_id === u).first_name).join(' , ')}`,
                  },
                });
              },
            }}
          />
        </Stack>
      )}
    </>
  );
}

export default SelectMultipleUsers;
