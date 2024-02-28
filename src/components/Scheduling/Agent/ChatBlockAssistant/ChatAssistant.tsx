import { Stack } from '@mui/material';

import { ChatBlock } from '@/devlink3';

import WidgetComp from './Widget/Widget';
import ScheduleIcon from '../ScheduleIcon';
import { useSchedulingAgentStore } from '../store';
import { allFunctions, FunctionResponse } from '../types';

function ChatBlockAssistant({
  index,
  message,
  functionResp,
  textTime,
}: {
  index: number;
  message: string;
  functionResp: FunctionResponse[];
  textTime: string;
}) {
  const selectedChat = useSchedulingAgentStore((state) => state.selectedChat);
  const funct = functionResp[0];

  return (
    <ChatBlock
      textTime={textTime}
      testName={'Aglint'}
      textMessage={funct?.response?.message ? funct.response.message : message}
      slotAvatar={<ScheduleIcon />}
      slotWidget={
        <Stack
          sx={{
            pointerEvents:
              selectedChat.history.length == index + 1 ? 'all' : 'none',
          }}
        >
          <WidgetComp
            functionResp={functionResp}
            message={message}
            index={index}
          />
        </Stack>
      }
      isWidget={allFunctions.includes(funct?.name)}
    />
  );
}

export default ChatBlockAssistant;
