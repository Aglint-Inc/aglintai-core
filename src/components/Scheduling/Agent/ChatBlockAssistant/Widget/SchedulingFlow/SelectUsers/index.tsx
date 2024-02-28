import React from 'react';

import { WidgetGrid3X3, WidgetUserCard } from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useSchedulingAgent } from '@/src/context/SchedulingAgent/SchedulingAgentProvider';

function SelectUsers(users) {
  const { submitHandler } = useSchedulingAgent();
  return (
    <WidgetGrid3X3
      slotWidget={users?.map((user) => {
        return (
          <WidgetUserCard
            key={user.applications.id}
            textName={user.candidate.first_name}
            textEmail={user.candidate.email}
            slotUserAvatar={
              <MuiAvatar
                key={user.candidate.id}
                src={user.candidate?.avatar}
                level={user.candidate?.first_name}
                variant='circular'
                height='100%'
                width='100%'
                fontSize='12px'
              />
            }
            onClickUser={{
              onClick: () => {
                submitHandler({
                  input: `User is ${JSON.stringify(user)}`,
                  selectedItem: {
                    selectedUser: user,
                    message: `Candidate is ${JSON.stringify(user.candidate.first_name)}`,
                  },
                });
              },
            }}
          />
        );
      })}
    />
  );
}

export default SelectUsers;
