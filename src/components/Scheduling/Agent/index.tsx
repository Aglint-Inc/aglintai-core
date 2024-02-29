import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';

import {
  AgentLayout,
  AgentTask,
  ChatBlock,
  ChatNotification,
  ChatWindow,
  NewChat,
  NewChatButton,
} from '@/devlink3';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useSchedulingAgent } from '@/src/context/SchedulingAgent/SchedulingAgentProvider';
import { AgentActivityType } from '@/src/types/data.types';

import Activity from './Activity';
import ActivityDrawer from './ActivityDrawer';
import ChatBlockAssistant from './ChatBlockAssistant/ChatAssistant';
import ChatEditorScheduling from './ChatEditor';
import IconActivity from './IconActivity';
import ScheduleIcon from './ScheduleIcon';
import {
  HistoryType,
  setActivityOpen,
  setLoading,
  setSelectedChat,
  useSchedulingAgentStore,
} from './store';
import SuggetionCards from './SuggestionCards';
import ChatMessageLoader from '../../AssistantChat/ChatMessageLoader';

dayjs.extend(relativeTime);
export type AisubmitHandlerParams = {
  input: string;
  payload?: any;
  selectedItem?: {
    message: string;
    [key: string]: any;
  };
  activity?: AgentActivityType[];
};

function SchedulingAgent() {
  const { recruiterUser } = useAuthDetails();
  const { userText, allChat, loading, selectedChat } =
    useSchedulingAgentStore();

  const { submitHandler } = useSchedulingAgent();

  return (
    <>
      <AgentLayout
        slotNewChatButton={
          <NewChatButton
            onClickChat={{
              onClick: () => {
                setSelectedChat({ history: [], id: null, title: null } as any);
              },
            }}
          />
        }
        slotAgentTask={
          <>
            {/* <button
              onClick={() => {
                setSelectedChat({ history: [] });
              }}
            >
              clear
            </button> */}
            {allChat.map((chat) => {
              return (
                <AgentTask
                  key={chat.id}
                  textTaskName={chat.title}
                  isActive={chat.id == selectedChat.id}
                  onClickCard={{
                    onClick: () => {
                      setSelectedChat(chat);
                      setLoading(false);
                    },
                  }}
                  slotTaskIcon={<ScheduleIcon />}
                />
              );
            })}
          </>
        }
        onClickSend={{
          onClick: () => {
            submitHandler({ input: userText });
          },
        }}
        slotChat={
          <>
            {selectedChat && selectedChat.history.length == 0 ? (
              <NewChat
                slotIcon={<ScheduleIcon />}
                slotSuggetionCard={<SuggetionCards />}
              />
            ) : (
              <ChatWindow
                slotChatBlocks={
                  <>
                    {selectedChat.history.map((his: HistoryType, ind) => {
                      return his.type == 'user' ? (
                        <ChatBlock
                          key={ind}
                          testName={'You'}
                          textMessage={
                            his?.selectedItem?.message
                              ? his.selectedItem.message
                              : his.value
                          }
                          textTime={dayjs(his.created_at).fromNow()}
                          slotAvatar={
                            <Image
                              alt=''
                              src={recruiterUser.profile_image}
                              width={40}
                              height={40}
                            />
                          }
                        />
                      ) : his.type == 'assistant' ? (
                        <ChatBlockAssistant
                          index={ind}
                          textTime={dayjs(his.created_at).fromNow()}
                          functionResp={his.funcRes}
                          message={his.value}
                        />
                      ) : (
                        <ChatNotification
                          textMain={his.value}
                          slotIcon={<IconActivity his={his} />}
                        />
                      );
                    })}
                    {loading && (
                      <ChatBlock
                        testName={'Aglint'}
                        slotAvatar={<ScheduleIcon />}
                        textTime={''}
                        slotWidget={<ChatMessageLoader />}
                        isWidget={true}
                        istext={false}
                      />
                    )}
                  </>
                }
              />
            )}
          </>
        }
        slotSearchInput={<ChatEditorScheduling />}
        isSearch={true}
        textCurrentTaskName={selectedChat.title}
        onClickTaskActivity={{
          onClick: () => {
            setActivityOpen(true);
          },
        }}
        isActivity={true}
        slotTimelineBlock={<Activity />}
      />
      <ActivityDrawer />
    </>
  );
}

export default SchedulingAgent;
