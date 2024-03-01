import { Dialog, Stack } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Skeleton } from '@/devlink2';
import {
  AgentLayout,
  AgentTask,
  AgentTaskLoading,
  ChatBlock,
  ChatNotification,
  ChatWindow,
  DeletePopup,
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
import LoaderAgent from './Loader';
import ScheduleIcon from './ScheduleIcon';
import {
  HistoryType,
  setActivities,
  setActivityOpen,
  setDeletePopupOpen,
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
  const {
    userText,
    allChat,
    loading,
    selectedChat,
    activities,
    edit,
    isDeletePopupOpen,
  } = useSchedulingAgentStore();
  const [indLoading, setIndLoading] = useState(false);
  const {
    submitHandler,
    newChat,
    initialLoading,
    scrollToBottom,
    deleteHandler,
  } = useSchedulingAgent();

  useEffect(() => {
    if (router.isReady && router.query.id) {
      try {
        setActivities([]);
        const chat = allChat.find((chat) => chat.id == router.query.id);
        if (chat?.id) {
          setSelectedChat(chat);
          setTimeout(() => {
            scrollToBottom();
          }, 100);
        }
      } catch (e) {
        //
      } finally {
        setTimeout(() => {
          setIndLoading(false);
        }, 500);
      }
    }
  }, [router?.query?.id]);

  return (
    <>
      <Dialog
        sx={{
          '& .MuiDialog-paper': {
            background: 'transparent',
            border: 'none',
            borderRadius: '10px',
          },
        }}
        open={isDeletePopupOpen}
        onClose={() => {
          setDeletePopupOpen(false);
        }}
      >
        <DeletePopup
          textTitle={'Cancel Schedule'}
          textDescription={
            'Are you sure you want to delete this schedule? This action cannot be undone.'
          }
          isIcon={false}
          onClickCancel={{
            onClick: () => {
              setDeletePopupOpen(false);
            },
          }}
          onClickDelete={{
            onClick: () => {
              deleteHandler();
            },
          }}
          buttonText={'Cancel Schedule'}
        />
      </Dialog>
      <AgentLayout
        onClickDeleteChat={{ onClick: {} }}
        isEditIcon={Boolean(selectedChat.id)}
        slotInlineEditField={<EditTask />}
        isChatLoading={initialLoading}
        slotLottieLoader={<LoaderAgent />}
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
            {initialLoading && (
              <>
                <AgentTaskLoading slotSkeleton={<Skeleton />} />
                <AgentTaskLoading slotSkeleton={<Skeleton />} />
                <AgentTaskLoading slotSkeleton={<Skeleton />} />
                <AgentTaskLoading slotSkeleton={<Skeleton />} />
              </>
            )}
            {!initialLoading &&
              allChat.map((chat) => {
                return (
                  <AgentTask
                    key={chat.id}
                    textTaskName={chat.title}
                    isActive={chat.id == selectedChat.id}
                    onClickCard={{
                      onClick: () => {
                        setIndLoading(true);
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
          <Stack position={'relative'}>
            {indLoading && (
              <Stack
                position={'absolute'}
                bgcolor={'#fff'}
                zIndex={5}
                height={'100%'}
                width={'100%'}
              ></Stack>
            )}
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
          </Stack>
        }
        isSuggetionPills={activities.length !== 0 && !indLoading}
        slotSuggetionPills={
          !initialLoading && (
            <>
              <SuggetionPill
                textSuggetion={`Resend confirmation email to candidate`}
              />
              <SuggetionPill textSuggetion={`Cancel interview schedule`} />
              <SuggetionPill
                textSuggetion={`Reschedule interview`}
                onClickCard={{
                  onClick: () => {
                    newChat();
                  },
                }}
              />
            </>
          )
        }
        slotSearchInput={<ChatEditorScheduling />}
        isSearch={!indLoading && activities.length === 0}
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
