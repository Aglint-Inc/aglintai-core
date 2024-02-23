import axios from 'axios';

import {
  AgentLayout,
  AgentTask,
  ChatBlock,
  ChatWindow,
  Timeline,
  TimelineBlock,
  TimelineEmpty,
  WidgetFlexRow,
  WidgetPanelCard
} from '@/devlink3';
import toast from '@/src/utils/toast';

import { setUserText, useSchedulingAgentStore } from './store';
import ChatMessageLoader from '../../AssistantChat/ChatMessageLoader';
import UITextField from '../../Common/UITextField';

function SchedulingAgent() {
  const userText = useSchedulingAgentStore((state) => state.userText);
  const submitHandler = async () => {
    const res = await axios.post('http://localhost:3001/api/scheduling', {
      input: userText,
      history: [],
    });

    // eslint-disable-next-line no-console
    console.log(res.data);
  };
  return (
    <>
      <AgentLayout
        onClickSchedulerAgent={{
          onClick: () => {
            toast.warning('Fuck u raimon');
          },
        }}
        slotAgentTask={
          <>
            <AgentTask /> <AgentTask /> <AgentTask /> <AgentTask />
          </>
        }
        onClickSend={{
          onClick: () => {
            submitHandler();
          },
        }}
        slotChat={
          <>
            {/* <NewChat
              slotSuggetionCard={
                <>
                  <SuggetionCard />
                  <SuggetionCard />
                  <SuggetionCard />
                </>
              }
            /> */}
            <ChatWindow
              slotChatBlocks={
                <>
                  <ChatBlock slotWidget={'Widget'} isWidget={true} />
                  <ChatBlock
                    slotWidget={<ChatMessageLoader />}
                    isWidget={true}
                    istext={false}
                  />
                  <ChatBlock
                    slotWidget={
                      <WidgetFlexRow
                        slorWidgetIndividual={
                          <>
                            <WidgetPanelCard />
                            <WidgetPanelCard />
                            <WidgetPanelCard />
                          </>
                        }
                      />
                    }
                    isWidget
                  />
                  <ChatBlock slotWidget={'Widget'} />
                  <ChatBlock slotWidget={'Widget'} />
                  <ChatBlock slotWidget={'Widget'} />
                </>
              }
            />
          </>
        }
        slotSearchInput={
          <UITextField
            borderRadius={10}
            height={56}
            value={userText}
            onChange={(e) => {
              setUserText(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                submitHandler();
              }
            }}
          />
        }
        isSearch={true}
        isActivity={true}
        textCurrentTaskName={'Task name'}
        onClickTaskActivity={{
          onClick: () => {
            toast.warning('Raimon is gay');
          },
        }}
        slotTimelineBlock={
          <TimelineBlock
            slotTimeline={
              <>
                <TimelineEmpty />
                <Timeline isConnecterVisible />
                <Timeline isConnecterVisible />
                <Timeline isConnecterVisible />
                <Timeline />
              </>
            }
          />
        }
      />
    </>
  );
}

export default SchedulingAgent;
