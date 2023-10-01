import { Stack, Switch } from '@mui/material';
import { useState } from 'react';

import { JobStatus } from '@/devlink2';

import SidePanelDrawer from '../../Common/SidePanelDrawer';

const JobApplicationStatus = () => {
  const [openSidePanel, setOpenSidePanel] = useState(false);
  return (
    <>
      <SidePanelDrawer
        openSidePanelDrawer={openSidePanel}
        setOpenPanelDrawer={setOpenSidePanel}
        onClose={() => setOpenSidePanel(false)}
      >
        <SideDrawer />
      </SidePanelDrawer>
      <JobStatus
        onClickStatus={{ onClick: () => setOpenSidePanel(true) }}
      ></JobStatus>
      ;
    </>
  );
};

const SideDrawer = () => {
  return (
    <Stack>
      <Stack flexDirection={'row'}>
        <Stack>Sourcing</Stack>
        <Switch />
      </Stack>
      <Stack></Stack>
    </Stack>
  );
};

export default JobApplicationStatus;
