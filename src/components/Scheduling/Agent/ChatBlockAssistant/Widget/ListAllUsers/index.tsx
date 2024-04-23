import { Stack } from '@mui/material';
import React from 'react';

import { WidgetGrid3X3, WidgetUserCard } from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';

function AllUsersNotClickable({
  users,
}: {
  users: {
    first_name: string;
    last_name: string;
    user_id: string;
    email: string;
    role: string;
    profile_image: string;
  }[];
}) {
  return (
    <Stack sx={{ pointerEvents: 'none' }}>
      <WidgetGrid3X3
        slotWidget={users?.map((user) => {
          return (
            <WidgetUserCard
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
            />
          );
        })}
      />
    </Stack>
  );
}

export default AllUsersNotClickable;
