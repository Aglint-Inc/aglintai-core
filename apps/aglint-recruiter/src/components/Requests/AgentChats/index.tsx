/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import { AglintAiChat } from '@/devlink2/AglintAiChat';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useUserChat } from '@/src/queries/userchat';

import AgentInputBox from './AgentInputBox';
import ChatMessageList from './ChatMessageList';

function AgentChats() {
  const { recruiterUser } = useAuthDetails();
  const { clearChat } = useUserChat({
    user_id: recruiterUser.user_id,
  });

  return (
    <>
      <AglintAiChat
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
