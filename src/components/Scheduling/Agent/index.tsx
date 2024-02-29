import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { SkeletalUnit } from '@/devlink2';
import {
  AgentLayout,
  AgentTask,
  ChatBlock,
  ChatNotification,
  ChatWindow,
  NewChat,
  NewChatButton,
  SuggetionPill,
} from '@/devlink3';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useSchedulingAgent } from '@/src/context/SchedulingAgent/SchedulingAgentProvider';
import { AgentActivityType } from '@/src/types/data.types';

import Activity from './Activity';
import ActivityDrawer from './ActivityDrawer';
import ChatBlockAssistant from './ChatBlockAssistant/ChatAssistant';
import ChatEditorScheduling from './ChatEditor';
import EditTask from './EditTask';
import IconActivity from './IconActivity';
import ScheduleIcon from './ScheduleIcon';
import {
  HistoryType,
  setActivityOpen,
  setEdit,
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
  const router = useRouter();
  const { recruiterUser } = useAuthDetails();
  const { userText, allChat, loading, selectedChat, activities, edit } =
    useSchedulingAgentStore();

  const { submitHandler, newChat, initialLoading, scrollToBottom } =
    useSchedulingAgent();

  useEffect(() => {
    if (router.isReady && router.query.id && !initialLoading) {
      const chat = allChat.find((chat) => chat.id == router.query.id);
      if (chat?.id) {
        setSelectedChat(chat);
        setTimeout(() => {
          scrollToBottom();
        }, 100);
      } else router.push('/scheduling/agent');
    }
  }, [router, initialLoading]);

  return (
    <>
      <AgentLayout
        onClickDeleteChat={{ onClick: {} }}
        isEditIcon={Boolean(selectedChat.id)}
        slotInlineEditField={
          initialLoading ? (
            <Stack width={'200px'} height={'16px'}>
              <SkeletalUnit />
            </Stack>
          ) : (
            <EditTask />
          )
        }
        onClickEdit={{
          onClick: () => {
            setEdit({
              isEdit: true,
              editValue: selectedChat.title,
            });
          },
        }}
        isEditTaskName={edit.isEdit}
        slotNewChatButton={
          <NewChatButton
            onClickChat={{
              onClick: () => {
                newChat();
              },
            }}
          />
        }
        slotAgentTask={
          <>
            {allChat.map((chat) => {
              return (
                <AgentTask
                  key={chat.id}
                  textTaskName={chat.title}
                  isActive={chat.id == selectedChat.id}
                  onClickCard={{
                    onClick: () => {
                      router.push(`/scheduling/agent?id=${chat.id}`);
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
        isSuggetionPills={activities.length !== 0}
        slotSuggetionPills={
          <>
            <SuggetionPill
              textSuggetion={`Resend confirmation email to candidate`}
            />
            <SuggetionPill textSuggetion={`Cancel interview schedule`} />
            <SuggetionPill
              textSuggetion={`Schedule new interview for a candidate`}
              onClickCard={{
                onClick: () => {
                  newChat();
                },
              }}
            />
          </>
        }
        slotSearchInput={<ChatEditorScheduling />}
        isSearch={activities.length === 0}
        textCurrentTaskName={selectedChat.title || 'New Task'}
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
