import { Drawer, Stack } from '@mui/material';
import React from 'react';

import Activity from '../Activity';
import { setActivityOpen, useSchedulingAgentStore } from '../store';

function ActivityDrawer() {
  const { activityOpen } = useSchedulingAgentStore();
  return (
    <Drawer
      anchor={'right'}
      open={activityOpen}
      onClose={() => {
        setActivityOpen(false);
      }}
    >
      <Stack width={'300px'} overflow={'auto'}>
        <Activity />
      </Stack>
    </Drawer>
  );
}

export default ActivityDrawer;
