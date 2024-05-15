import { Stack } from '@mui/material';

import { MicPermissionModal } from '@/devlink';
import MuiPopup from '@/src/components/Common/MuiPopup';
import SidePanelDrawer from '@/src/components/Common/SidePanelDrawer';
import { useInterviewContext } from '@/src/context/InterviewContext';

import Interview_home from './Interview_home';
import InterviewInstructions from './InterviewInstructions';

function VerbalMode() {
  const { openSidePanelDrawer, setOpenSidePanelDrawer, allowMic } =
    useInterviewContext();
  return (
    <>
      <MuiPopup
        props={{
          open: allowMic,
          fullWidth: true,
          maxWidth: 'md',
        }}
      >
        <Stack alignSelf={'center'}>
          <MicPermissionModal />
        </Stack>
      </MuiPopup>
      <SidePanelDrawer
        setOpenPanelDrawer={setOpenSidePanelDrawer}
        dir='bottom'
        openSidePanelDrawer={openSidePanelDrawer}
      >
        <Interview_home />
      </SidePanelDrawer>
      <InterviewInstructions />
    </>
  );
}

export default VerbalMode;
