import { Stack } from '@mui/material';

import { MicPermissionModal } from '@/devlink';
import { useInterviewContext } from '@/src/context/InterviewContext';

import MuiPopup from '../Common/MuiPopup';
import SidePanelDrawer from '../Common/SidePanelDrawer';
import Interview_home from './Interview_home';
import InterviewInstructions from './InterviewInstructions';
function Interview() {
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

export default Interview;
