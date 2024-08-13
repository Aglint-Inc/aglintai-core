import { useState } from 'react';

import { AglintAiChat } from '@/devlink2/AglintAiChat';

import AgentInputBox from './AgentInputBox';
import ChatMessageList from './ChatMessageList';
import {
  setChatList,
  setViewHistory,
  setViewList,
} from './ChatMessageList/store';
import SettingsPopup from './SettingsPopup';

function AgentChats() {
  const [openSetting, setOpenSettings] = useState(false);

  return (
    <>
      <SettingsPopup open={openSetting} setOpen={setOpenSettings} />
      <AglintAiChat
        onClickMemory={{
          onClick: () => {
            setOpenSettings(!openSetting);
          },
        }}
        onClickClear={{
          onClick: () => {
            setChatList([]);
            setViewList(false);
            setViewHistory(false);
          },
        }}
        slotAiInput={<AgentInputBox />}
        slotAiBody={<ChatMessageList />}
      />
    </>
  );
}

export default AgentChats;
