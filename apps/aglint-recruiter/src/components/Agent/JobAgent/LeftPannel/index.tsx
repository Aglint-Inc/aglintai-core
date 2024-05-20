import dayjs from 'dayjs';
import { useEffect } from 'react';

import { AgentTask } from '@/devlink3/AgentTask';
import { useJobAssistantContext } from '@/src/context/JobAssistant';

import LogoIcon from '../LogoIcon';

function LeftPanel() {
  const { messages, currentChat, resLoading, jobAssistantChats, switchChat } =
    useJobAssistantContext();

  useEffect(() => {
    const TypoElement = document.getElementById('chat_scroll');
    if (TypoElement)
      TypoElement.scrollTop = TypoElement && TypoElement.scrollHeight;
  }, [messages]);
  return (
    <>
      {jobAssistantChats.map((ele, i) => {
        // eslint-disable-next-line no-unused-vars
        const time = dayjs(ele.created_at).fromNow();

        return (
          <AgentTask
            key={i}
            onClickCard={{
              onClick: () => {
                if (!resLoading && currentChat.id !== ele.id) {
                  switchChat(ele.id);
                }
              },
            }}
            isActive={ele.id === currentChat.id}
            slotTaskIcon={<LogoIcon />}
            textTaskName={ele.last_message || 'Untitled'}
          />
        );
      })}
    </>
  );
}

export default LeftPanel;
