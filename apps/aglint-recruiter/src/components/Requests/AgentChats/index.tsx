import { useState } from 'react';

import { AglintAiChat } from '@/devlink2/AglintAiChat';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useUserChat } from '@/src/queries/userchat';

import AgentInputBox from './AgentInputBox';
import ChatMessageList from './ChatMessageList';
import SettingsPopup from './SettingsPopup';

function AgentChats() {
  const { recruiterUser } = useAuthDetails();
  const { clearChat } = useUserChat({
    user_id: recruiterUser.user_id,
  });
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
          onClick: () => clearChat(),
        }}
        slotAiInput={<AgentInputBox />}
        slotAiBody={<ChatMessageList />}
      />
    </>
  );
}

export default AgentChats;
