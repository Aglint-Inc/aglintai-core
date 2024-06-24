/* eslint-disable security/detect-object-injection */
import { Drawer, Stack, TextField } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ReactDOM, useEffect, useRef, useState } from 'react';
dayjs.extend(relativeTime);

import { AgentLayout } from '@/devlink3/AgentLayout';
import { AgentTask } from '@/devlink3/AgentTask';
import { ChatBlockAglint } from '@/devlink3/ChatBlockAglint';
import { ChatBlockUser } from '@/devlink3/ChatBlockUser';
import { ChatNotification } from '@/devlink3/ChatNotification';
import { ChatWindow } from '@/devlink3/ChatWindow';
import { DummyChatFour } from '@/devlink3/DummyChatFour';
import { DummyChatOne } from '@/devlink3/DummyChatOne';
import { DummyChatThree } from '@/devlink3/DummyChatThree';
import { DummyChatTwo } from '@/devlink3/DummyChatTwo';
import { NewChat } from '@/devlink3/NewChat';
import { NewChatButton } from '@/devlink3/NewChatButton';
import { SamplePanel } from '@/devlink3/SamplePanel';
import { Timeline } from '@/devlink3/Timeline';
import { TimelineBlock } from '@/devlink3/TimelineBlock';
import { TimelineDummyOne } from '@/devlink3/TimelineDummyOne';
import { TimelineDummyTwo } from '@/devlink3/TimelineDummyTwo';
import { TimelineEmpty } from '@/devlink3/TimelineEmpty';
import * as AuthContext from '@/src/context/AuthContext/AuthContext';
import toast from '@/src/utils/toast';

import ChatMessageLoader from '../../Common/Lotties/ChatMessageLoader';
import LottieAnimations from '../../Common/Lotties/LottieIcons';
import MuiAvatar from '../../Common/MuiAvatar';

export type messageType = {
  sender: string;
  message: string;
  component: ReactDOM | null;
  date: string | null;
};

export type senderType = {
  sender: 'Aglint' | 'You';
};

const senders = {
  Agent: 'Aglint',
  User: 'You',
};

function SchedulerAgent() {
  const [agentChats, setAgentChats] = useState<
    {
      name: string;
      messages: messageType[];
      date: string;
      timeline?: (typeof Timeline)[];
      component: ReactDOM | null;
      notifications?: ReactDOM;
    }[]
  >([]);
  const [activeChat, setActiveChat] = useState<number | string>('demo_chat_1');
  const [timeLineDrawer, setTimeLineDrawer] = useState(false);
  const handleNewChat = () => {
    setAgentChats([
      {
        name: 'Untitled Task',
        messages: [
          {
            sender: 'Aglint',
            message:
              'Hello there!, Ready to assist with scheduling your interviews today?',
            date: null,
            component: null, // React component to display the chatbot's name
          },
        ],
        date: new Date().toISOString(),
        timeline: [],
        component: null,
      },
      ...agentChats,
    ]);
    setActiveChat(0);
  };
  const { recruiterUser } = AuthContext.useAuthDetails();
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  async function createThread() {
    const { data } = await axios.get('/api/assistant/createThread');
    localStorage.setItem('agent_thread_id', data.id);
  }

  async function sendMessage(message: string) {
    inputRef.current.value = '';
    const today = dayjs(new Date()).fromNow();
    const tempChats = [...agentChats];
    const tempActiveChat = agentChats[activeChat];
    if (message) {
      setLoading(true);
      tempActiveChat.messages.push({
        sender: senders.User,
        message,
        date: today,
      });
      tempChats[activeChat] = tempActiveChat;
      setAgentChats(tempChats);
      const { data: threadMessage } = await axios.post(
        '/api/assistant/createMessage',
        {
          thread_id: localStorage.getItem('agent_thread_id'),
          message: message,
        },
      );
      if (threadMessage) {
        const { data: runMessage } = await axios.post(
          '/api/assistant/createRun',
          {
            thread_id: localStorage.getItem('agent_thread_id'),
            assistant_id: 'asst_m7rMcexKhUSVR5dfTzn82KHP',
          },
        );

        const timeInterval = setInterval(async () => {
          if (runMessage) {
            const { data: reRunMessage } = await axios.post(
              '/api/assistant/getRun',
              {
                thread_id: localStorage.getItem('agent_thread_id'),
                run_id: runMessage.id,
              },
            );
            // queued, in_progress, required_action,
            if (
              !['queued', 'in_progress', 'requires_action'].includes(
                reRunMessage.status,
              )
            ) {
              toast.error('Network error, please try again.');
              clearInterval(timeInterval);
              setLoading(false);
              tempActiveChat.messages.pop();
              tempChats[activeChat] = tempActiveChat;
            }
            if (reRunMessage?.required_action?.type) {
              await axios.post('/api/assistant/submitRun', {
                thread_id: localStorage.getItem('agent_thread_id'),
                run_id: reRunMessage.id,
                call_id:
                  reRunMessage?.required_action.submit_tool_outputs
                    .tool_calls[0].id,
                output: 'Ok thanks',
              });

              let index = JSON.parse(
                reRunMessage?.required_action.submit_tool_outputs.tool_calls[0]
                  .function.arguments,
              ).index_number;
              const tempMessage = chatMessages[Number(index) * 2 + 1];
              if (tempMessage?.name) {
                tempActiveChat.name = tempMessage?.name;
              }
              if (tempMessage?.task) {
                tempActiveChat.timeline.push(
                  <Timeline
                    textTime={today}
                    textTitle={tempMessage?.task}
                    slotStatusIcon={<CheckMarkIcon />}
                  />,
                );
              }
              tempActiveChat.messages.push({
                ...tempMessage,
                date: today,
              });
              setLoading(false);
              tempChats[activeChat] = tempActiveChat;
              setAgentChats(tempChats);
              clearInterval(timeInterval);
            }
          }
        }, 1700);
      }
    } else {
      toast.warning('Please enter your request.');
    }
  }
  useEffect(() => {
    if (!localStorage.getItem('agent_thread_id')) createThread();
  }, []);

  useEffect(() => {
    const TypoElement = document.getElementById('chat_scroll');
    if (TypoElement)
      TypoElement.scrollTop = TypoElement && TypoElement.scrollHeight;
  }, [agentChats[activeChat]?.messages]);
  return (
    <>
      <AgentLayout
        slotNewChatButton={
          <NewChatButton
            onClickChat={{
              onClick: handleNewChat,
            }}
          />
        }
        onClickTaskActivity={{ onClick: () => setTimeLineDrawer(true) }}
        textCurrentTaskName={
          activeChat === 'demo_chat_1'
            ? 'John Abraham, Staff DevOps Engineer Candidate: Interview Scheduling'
            : activeChat === 'demo_chat_2'
              ? 'Monday interview'
              : activeChat === 'demo_chat_3'
                ? 'Project Manager in the construction industry located in Chicago'
                : activeChat === 'demo_chat_4'
                  ? 'Data Scientist with expertise in machine learning for our Boston office'
                  : agentChats[activeChat]?.name
        }
        slotAgentTask={
          <>
            {agentChats.map((chat, i) => {
              return (
                <AgentTask
                  key={i}
                  isActive={i === activeChat}
                  textTaskName={chat.name}
                  onClickCard={{
                    onClick: () => {
                      setActiveChat(i);
                    },
                  }}
                />
              );
            })}
            <AgentTask
              isActive={'demo_chat_1' === activeChat}
              textTaskName={
                'John Abraham, Staff DevOps Engineer Candidate: Interview Scheduling'
              }
              onClickCard={{
                onClick: () => {
                  setActiveChat('demo_chat_1');
                },
              }}
            />
            <AgentTask
              isActive={'demo_chat_3' === activeChat}
              textTaskName={
                'Project Manager in the construction industry located in Chicago'
              }
              // slotTimeline={
              //   <Timeline
              //     slotStatusIcon={<CheckMarkIcon />}
              //     textTitle={'Interview confirmed'}
              //     textTime={'1 day ago'}
              //   />
              // }
              onClickCard={{
                onClick: () => {
                  setActiveChat('demo_chat_3');
                },
              }}
              slotTaskIcon={
                <svg
                  width='22'
                  height='24'
                  viewBox='0 0 22 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M20 3.75C20 3.71875 19.9062 3.60938 19.7188 3.42188C19.375 3.14062 18.7812 2.84375 17.9375 2.53125C16.1562 1.875 13.8438 1.53125 11 1.5C8.15625 1.53125 5.84375 1.875 4.0625 2.53125C3.21875 2.84375 2.625 3.14062 2.28125 3.42188C2.09375 3.60938 2 3.71875 2 3.75V8.53125C2.6875 9.03125 3.76562 9.46875 5.23438 9.84375C6.89062 10.2812 8.8125 10.5 11 10.5C13.1875 10.5 15.1094 10.2812 16.7656 9.84375C18.2344 9.46875 19.3125 9.03125 20 8.53125V3.75ZM20 10.3125C19.1875 10.7188 18.2344 11.0625 17.1406 11.3438C15.3281 11.7812 13.2812 12 11 12C8.71875 12 6.67188 11.7656 4.85938 11.2969C3.76562 11.0469 2.8125 10.7188 2 10.3125V14.5312C2.6875 15.0625 3.76562 15.5 5.23438 15.8438C6.89062 16.2812 8.8125 16.5 11 16.5C13.1875 16.5 15.1094 16.2812 16.7656 15.8438C18.2344 15.4688 19.3125 15.0312 20 14.5312V10.3125ZM2 20.25C2 20.2812 2.09375 20.3906 2.28125 20.5781C2.625 20.8594 3.21875 21.1562 4.0625 21.4688C5.84375 22.125 8.15625 22.4688 11 22.5C13.8438 22.4688 16.1562 22.125 17.9375 21.4688C18.7812 21.1562 19.375 20.8594 19.7188 20.5781C19.9062 20.3906 20 20.2812 20 20.25V16.3125C19.1875 16.7188 18.2344 17.0625 17.1406 17.3438C15.3281 17.7812 13.2812 18 11 18C8.71875 18 6.67188 17.7812 4.85938 17.3438C3.76562 17.0625 2.8125 16.7188 2 16.3125V20.25ZM2 3.79688C2 3.76562 2 3.76562 2 3.79688V3.79688ZM21.5 20.25C21.4375 21.3125 20.4062 22.2031 18.4062 22.9219C16.4375 23.6094 13.9688 23.9688 11 24C8.03125 23.9688 5.5625 23.6094 3.59375 22.9219C1.59375 22.2031 0.5625 21.3125 0.5 20.25V3.75C0.5625 2.6875 1.59375 1.79687 3.59375 1.07812C5.5625 0.390625 8.03125 0.03125 11 0C13.9688 0.03125 16.4375 0.390625 18.4062 1.07812C20.4062 1.79687 21.4375 2.6875 21.5 3.75V20.25Z'
                    fill='#FF6224'
                  />
                </svg>
              }
            />
            <AgentTask
              isActive={'demo_chat_4' === activeChat}
              textTaskName={
                'Data Scientist with expertise in machine learning for our Boston office'
              }
              slotTaskIcon={
                <svg
                  width='22'
                  height='24'
                  viewBox='0 0 22 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M20 3.75C20 3.71875 19.9062 3.60938 19.7188 3.42188C19.375 3.14062 18.7812 2.84375 17.9375 2.53125C16.1562 1.875 13.8438 1.53125 11 1.5C8.15625 1.53125 5.84375 1.875 4.0625 2.53125C3.21875 2.84375 2.625 3.14062 2.28125 3.42188C2.09375 3.60938 2 3.71875 2 3.75V8.53125C2.6875 9.03125 3.76562 9.46875 5.23438 9.84375C6.89062 10.2812 8.8125 10.5 11 10.5C13.1875 10.5 15.1094 10.2812 16.7656 9.84375C18.2344 9.46875 19.3125 9.03125 20 8.53125V3.75ZM20 10.3125C19.1875 10.7188 18.2344 11.0625 17.1406 11.3438C15.3281 11.7812 13.2812 12 11 12C8.71875 12 6.67188 11.7656 4.85938 11.2969C3.76562 11.0469 2.8125 10.7188 2 10.3125V14.5312C2.6875 15.0625 3.76562 15.5 5.23438 15.8438C6.89062 16.2812 8.8125 16.5 11 16.5C13.1875 16.5 15.1094 16.2812 16.7656 15.8438C18.2344 15.4688 19.3125 15.0312 20 14.5312V10.3125ZM2 20.25C2 20.2812 2.09375 20.3906 2.28125 20.5781C2.625 20.8594 3.21875 21.1562 4.0625 21.4688C5.84375 22.125 8.15625 22.4688 11 22.5C13.8438 22.4688 16.1562 22.125 17.9375 21.4688C18.7812 21.1562 19.375 20.8594 19.7188 20.5781C19.9062 20.3906 20 20.2812 20 20.25V16.3125C19.1875 16.7188 18.2344 17.0625 17.1406 17.3438C15.3281 17.7812 13.2812 18 11 18C8.71875 18 6.67188 17.7812 4.85938 17.3438C3.76562 17.0625 2.8125 16.7188 2 16.3125V20.25ZM2 3.79688C2 3.76562 2 3.76562 2 3.79688V3.79688ZM21.5 20.25C21.4375 21.3125 20.4062 22.2031 18.4062 22.9219C16.4375 23.6094 13.9688 23.9688 11 24C8.03125 23.9688 5.5625 23.6094 3.59375 22.9219C1.59375 22.2031 0.5625 21.3125 0.5 20.25V3.75C0.5625 2.6875 1.59375 1.79687 3.59375 1.07812C5.5625 0.390625 8.03125 0.03125 11 0C13.9688 0.03125 16.4375 0.390625 18.4062 1.07812C20.4062 1.79687 21.4375 2.6875 21.5 3.75V20.25Z'
                    fill='#FF6224'
                  />
                </svg>
              }
              onClickCard={{
                onClick: () => {
                  setActiveChat('demo_chat_4');
                },
              }}
            />
          </>
        }
        slotChat={
          activeChat === 'demo_chat_1' ? (
            <DummyChatOne />
          ) : activeChat === 'demo_chat_2' ? (
            <DummyChatTwo />
          ) : activeChat === 'demo_chat_3' ? (
            <DummyChatThree />
          ) : activeChat === 'demo_chat_4' ? (
            <DummyChatFour />
          ) : agentChats[activeChat].messages.length ? (
            <ChatWindow
              slotChatBlocks={
                <>
                  {agentChats[activeChat].messages.map((item) => {
                    return (
                      <>
                        {item.sender === 'Aglint' ? (
                          <ChatBlockAglint
                            textTime={item.date}
                            textMessage={
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item.message.replace(
                                    // eslint-disable-next-line security/detect-unsafe-regex
                                    /[Aa]bhishek(?:\s+[Tt]omar)?/g,
                                    '<span class="DummyChatOne_link">@Abhishek Tomar</span>',
                                  ),
                                }}
                              />
                            }
                            isWidgetVisible={item.component}
                            slotWidget={
                              // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                              <div
                                onClick={() => {
                                  sendMessage(
                                    'Select the Software Engineering Panel',
                                  );
                                }}
                              >
                                {item.component}
                              </div>
                            }
                          />
                        ) : (
                          <ChatBlockUser
                            textTime={item.date}
                            slotUserAvatar={
                              <MuiAvatar
                                variant='rounded'
                                level={item.sender}
                                src={recruiterUser.profile_image}
                              />
                            }
                            textMessage={
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item.message.replace(
                                    // eslint-disable-next-line security/detect-unsafe-regex
                                    /[Aa]bhishek(?:\s+[Tt]omar)?/g,
                                    '<span class="DummyChatOne_link">@Abhishek Tomar</span>',
                                  ),
                                }}
                              />
                            }
                          />
                        )}
                        <>{item.notifications}</>
                      </>
                    );
                  })}
                  {loading && (
                    <ChatBlockAglint
                      isTextVisible={false}
                      isWidgetVisible={true}
                      slotWidget={<ChatMessageLoader />}
                    />
                  )}
                </>
              }
            />
          ) : (
            <NewChat
              onClickSchedulerAgent={{
                onClick: () => {
                  const tempChats = [...agentChats];
                  tempChats[activeChat].messages.push({
                    sender: 'Aglint',
                    message:
                      'Hello there!, Ready to assist with scheduling your interviews today?',
                    date: null,
                    component: null,
                  });
                  setAgentChats(tempChats);
                },
              }}
            />
          )
        }
        slotTimelineBlock={
          <>
            {activeChat === 'demo_chat_1' ? (
              <TimelineDummyOne />
            ) : activeChat === 'demo_chat_2' ? (
              <TimelineDummyTwo />
            ) : (
              <TimelineBlock
                slotTimeline={
                  agentChats[activeChat]?.timeline.length ? (
                    agentChats[activeChat].timeline
                  ) : (
                    <TimelineEmpty />
                  )
                }
              />
            )}
          </>
        }
        slotSearchInput={
          <TextField
            // autoComplete='new-password'
            sx={{
              margin: '0px',
              '& .MuiOutlinedInput-root': {
                height: 55,
                fontSize: 15,
                borderRadius: 'var(--radius-4)',
              },
            }}
            placeholder='Type a message...'
            inputRef={inputRef}
            fullWidth
            variant='outlined'
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage(inputRef.current.value);
              }
            }}
          />
        }
        onClickSend={{
          onClick: () => {
            sendMessage(inputRef.current.value);
          },
        }}
        isSearch={
          !(
            typeof activeChat === 'number' &&
            !agentChats[activeChat]?.messages.length
          )
        }
        // isSearch={true}
      />
      <Drawer
        anchor={'right'}
        open={timeLineDrawer}
        onClose={() => setTimeLineDrawer(false)}
      >
        <>
          {activeChat === 'demo_chat_1' ? (
            <TimelineDummyOne />
          ) : activeChat === 'demo_chat_2' ? (
            <TimelineDummyTwo />
          ) : (
            <TimelineBlock
              slotTimeline={
                agentChats[activeChat]?.timeline.length ? (
                  agentChats[activeChat].timeline
                ) : (
                  <TimelineEmpty />
                )
              }
            />
          )}
        </>
      </Drawer>
    </>
  );
}

export default SchedulerAgent;

export const questions = [
  'Hi, I need to schedule an interview for the Senior Machine Learning Engineer position. Can you help with that?',
  "Let's go with the Software Engineering Panel",
  'Please arrange it within the next two weeks.',
  'Yes, please check with both the candidate and the interviewers before finalizing.',
  'Thanks! Can you also add Cindy and Chris to shadow the interview?',
  'Let me know once Cindy and Chris confirm.',
];

export const chatMessages = [
  {
    sender: 'You',
    message:
      'Hi, I need to Schedule an interview for the Senior Machine Learning Engineer position. Can you help with that?',
    date: null,
    component: null,
  },
  {
    sender: 'Aglint',
    message:
      'Of course! Which interview panel would you like to use for this position?',
    date: null,
    component: <SamplePanel />,
  },
  {
    sender: 'You',
    message: "Let's go with the Software Engineering Panel",
    date: null,
    component: null,
  },
  {
    sender: 'Aglint',
    message:
      'Great choice! Do you have a specific date or time frame in mind for the interview?',
    date: null,
    component: null,
    task: 'Selected Software Engineer Panel for the interview.',
  },
  {
    sender: 'You',
    message: 'Please arrange it within the next two weeks.',
    date: null,
    component: null,
  },
  {
    sender: 'Aglint',
    message:
      "Understood. I'll reach out to Abhishek Tomar to check their availability. Do you want me to confirm with the interviewers as well?",
    date: null,
    component: null,
  },
  {
    sender: 'you',
    message:
      'Yes, please check with both the candidate and the interviewers before finalizing.',
    date: null,
    component: null,
  },
  {
    sender: 'Aglint',
    message:
      "Noted. I'll get in touch with Abhishek Tomar and the Software Engineering Panel members. I'll keep you updated on the progress.",
    date: null,
    component: null,
    name: 'Abhishek Tomar, Senior Machine Learning Engineer Candidate: Interview Scheduling',
    notifications: (
      <>
        <ChatNotification
          isSubtextVisible={true}
          textMain={'Task Created'}
          textSub={
            'Abhishek Tomar, Senior Machine Learning Engineer Candidate: Interview Scheduling'
          }
        />
        <ChatNotification textMain={'Email sent to candidate.'} />
        <ChatNotification
          textMain={'Awaiting candidate response.'}
          slotIcon={<LottieAnimations animation='loader_dotted' size={1.5} />}
        />
      </>
    ),
    task: 'Email sent to Abhishek Tomar',
  },
  {
    sender: 'you',
    message:
      'Thanks! Can you also add Cindy and Chris to shadow the interview?',
    date: null,
    component: null,
  },
  {
    sender: 'Aglint',
    message: "Sure thing! I'll add Cindy and Chris as optional shadows.",
    date: null,
    component: null,
  },
  {
    sender: 'you',
    message: 'Let me know once Cindy and Chris confirm.',
    date: null,
    component: null,
  },
  {
    sender: 'Aglint',
    message:
      "Will do! I'm sending out the interview invitations now. I'll update you as soon as Cindy and Chris respond.",
    date: null,
    component: null,
    notifications: (
      <>
        <ChatNotification
          isSubtextVisible={true}
          textMain={'Task Created'}
          textSub={
            'Cindy, Senior Machine Learning Engineer Candidate: Interview Scheduling'
          }
        />
        <ChatNotification
          isSubtextVisible={true}
          textMain={'Task Created'}
          textSub={
            'Chris, Senior Machine Learning Engineer Candidate: Interview Scheduling'
          }
        />
        <ChatNotification textMain={'Email sent to candidates.'} />
        <ChatNotification
          textMain={'Awaiting candidate response.'}
          slotIcon={<LottieAnimations animation='loader_dotted' size={1.5} />}
        />
      </>
    ),
    task: 'Email sent to Cindy and Chris.',
  },
];

export const extraMessage = [
  {
    sender: 'Aglint',
    message:
      "Hey RC, Interviewer 1 & 3 have confirmed but it's been 48 hours and Interview 2 has not responded. I have pinged on Slack too. Shall I confirm?",
    date: null,
    component: null,
  },
  {
    sender: 'Aglint',
    message:
      'Hey RC, just a quick update; for the interview with John for the Software Engineer role, I have availability for John. I am checking with the SW Eng Panel now.',
    date: null,
    component: null,
  },
  {
    sender: 'Aglint',
    message:
      'Hey RC, John is requesting a reschedule for the Software Engineer role with the SW Eng Panel. Shall I reschedule?',
    date: null,
    component: null,
  },
];

const CheckMarkIcon = () => {
  return (
    <Stack height={'100%'} alignItems={'center'}>
      <svg
        width='16'
        height='17'
        viewBox='0 0 16 17'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M8 16.25C6.54167 16.2292 5.20833 15.875 4 15.1875C2.79167 14.4792 1.8125 13.5 1.0625 12.25C0.354167 10.9792 0 9.64583 0 8.25C0 6.85417 0.354167 5.52083 1.0625 4.25C1.8125 3 2.79167 2.02083 4 1.3125C5.20833 0.625 6.54167 0.270833 8 0.25C9.45833 0.270833 10.7917 0.625 12 1.3125C13.2083 2.02083 14.1875 3 14.9375 4.25C15.6458 5.52083 16 6.85417 16 8.25C16 9.64583 15.6458 10.9792 14.9375 12.25C14.1875 13.5 13.2083 14.4792 12 15.1875C10.7917 15.875 9.45833 16.2292 8 16.25ZM11.5312 6.78125C11.8229 6.42708 11.8229 6.07292 11.5312 5.71875C11.1771 5.42708 10.8229 5.42708 10.4688 5.71875L7 9.1875L5.53125 7.71875C5.17708 7.42708 4.82292 7.42708 4.46875 7.71875C4.17708 8.07292 4.17708 8.42708 4.46875 8.78125L6.46875 10.7812C6.82292 11.0729 7.17708 11.0729 7.53125 10.7812L11.5312 6.78125Z'
          fill='#228F67'
        />
      </svg>
    </Stack>
  );
};
