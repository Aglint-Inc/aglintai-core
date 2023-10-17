import React from 'react';

import FileUpload from './FileUpload';
import SidePanelDrawer from '../../Common/SidePanelDrawer';

const ImportDrawer = ({ openSidePanel, setOpenSidePanel }) => {
  return (
    <SidePanelDrawer
      openSidePanelDrawer={openSidePanel}
      setOpenPanelDrawer={setOpenSidePanel}
    >
      <FileUpload setOpenSidePanel={setOpenSidePanel} />
    </SidePanelDrawer>
  );
};

export default ImportDrawer;
