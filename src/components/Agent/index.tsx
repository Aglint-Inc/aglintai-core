/* eslint-disable security/detect-object-injection */
import {
  Drawer,
  Stack,
  // Input,
  // OutlinedInput,
  // Stack,
  TextField,
  // Typography,
} from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ReactDOM, useEffect, useRef, useState } from 'react';
dayjs.extend(relativeTime);

// import { set } from 'lodash';

// import {
//   AglintChatCard,
//   AssistantHelp,
//   AssistantLanding,
//   AssistantTaskEmpty,
//   PageLayout,
// } from '@/devlink2';
import {
  AgentLayout,
  AgentTask,
  ChatBlockAglint,
  ChatBlockUser,
  ChatNotification,
  ChatWindow,
  DummyChatOne,
  DummyChatTwo,
  NewChat,
  SamplePanel,
  Timeline,
  TimelineBlock,
  TimelineDummyOne,
  TimelineDummyTwo,
  TimelineEmpty,
  WidgetFlexRow,
  WidgetPanelCard,
} from '@/devlink3';
import * as AuthContext from '@/src/context/AuthContext/AuthContext';
import toast from '@/src/utils/toast';

import ChatMessageLoader from '../AssistantChat/ChatMessageLoader';
import MuiAvatar from '../Common/MuiAvatar';
import LottieAnimations from '../lottie/LottieIcons';
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

function Agent() {
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
        messages: [],
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
  // const [messages, setMessages] = useState<messageType[]>([]);
  const [loading, setLoading] = useState(false);
  // const [indexes, setIndexes] = useState([]);
  // eslint-disable-next-line no-console
  async function createThread() {
    const { data } = await axios.get('/api/assistant/createThread');
    localStorage.setItem('agent_thread_id', data.id);
  }

  async function sendMessage() {
    let message = inputRef.current.value;
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

              // if (index === 2) {
              //   setTimeout(() => {
              //     setLoading(true);
              //   });
              //   setTimeout(() => {
              //     setLoading(false);

              //     tempActiveChat.messages.push({
              //       ...extraMessage[0],
              //       date: today,
              //     });
              //   }, 5000);
              // } else if (index === 4) {
              //   setTimeout(() => {
              //     setLoading(true);
              //   });
              //   setTimeout(() => {
              //     setLoading(false);

              //     tempActiveChat.messages.push({
              //       ...extraMessage[1],
              //       date: today,
              //     });
              //   }, 5000);
              // } else if (index === 7) {
              //   setTimeout(() => {
              //     setLoading(true);
              //   });
              //   setTimeout(() => {
              //     setLoading(false);

              //     tempActiveChat.messages.push({
              //       ...extraMessage[2],
              //       date: today,
              //     });
              //   }, 5000);
              // } else {
              setLoading(false);
              // }
              // setIndexes((pre) => [...pre, Number(index)]);
              tempChats[activeChat] = tempActiveChat;
              setAgentChats(tempChats);
              clearInterval(timeInterval);
            }
          }
        }, 1000);
      }
      // inputRef.current.focus();
    } else {
      toast.warning('Please enter your message!');
    }
  }
  console.log('agentChats', agentChats[activeChat]?.messages);
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
        onClickTaskActivity={{ onClick: () => setTimeLineDrawer(true) }}
        textCurrentTaskName={
          activeChat === 'demo_chat_1'
            ? 'Rescheduled interview'
            : activeChat === 'demo_chat_2'
              ? 'Monday interview'
              : agentChats[activeChat]?.name
        }
        onClickNewTask={{ onClick: handleNewChat }}
        slotAgentTask={
          <>
            {agentChats.map((chat, i) => {
              const tempTask =
                agentChats[i]?.timeline[agentChats[i]?.timeline.length - 1];
              return (
                <AgentTask
                  key={i}
                  isActive={i === activeChat}
                  textTaskName={chat.name}
                  isTimeline={Boolean(tempTask)}
                  onClickCard={{
                    onClick: () => {
                      setActiveChat(i);
                      // setMessages(chat.messages);
                    },
                  }}
                  slotTimeline={tempTask}
                />
              );
            })}
            {/* <AgentTask
              isActive={'demo_chat_2' === activeChat}
              textTaskName={'Monday interview'}
              onClickCard={{
                onClick: () => {
                  setActiveChat('demo_chat_2');
                },
              }}
            /> */}
            <AgentTask
              isActive={'demo_chat_1' === activeChat}
              textTaskName={
                'John Abraham, Staff DevOps Engineer Candidate: Interview Scheduling'
              }
              slotTimeline={
                <Timeline
                  slotStatusIcon={<CheckMarkIcon />}
                  textTitle={'Interview confirmed'}
                  textTime={'1 day ago'}
                />
              }
              onClickCard={{
                onClick: () => {
                  setActiveChat('demo_chat_1');
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
                            textMessage={item.message}
                            isWidgetVisible={item.component}
                            slotWidget={item.component}
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
                            textMessage={item.message}
                          />
                        )}
                        <>{item.notifications}</>
                      </>
                    );
                    // return (
                    //   <ScrollList key={i} uniqueKey={i}>
                    //     <AglintChatCard
                    //       key={i}
                    //       textName={item.sender}
                    //       textMessage={item.message}
                    //       textTime={item.date}
                    //       slotUserImage={
                    //         <>
                    //           <MuiAvatar
                    //             variant='rounded'
                    //             level={item.sender}
                    //             src={recruiterUser.profile_image}
                    //           />
                    //         </>
                    //       }
                    //       isAglintLogoVisible={item.sender == 'Aglint'}
                    //       isUserLogoVisible={item.sender !== 'Aglint'}
                    //     />
                    //   </ScrollList>
                    // );
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
                    component: null, // React component to display the chatbot's name
                  });
                  setAgentChats(tempChats);
                },
              }}
            />
          )
          // <Stack
          //   direction={'row'}
          //   rowGap={'20px'}
          //   flexDirection={'column'}
          //   overflow={'auto'}
          //   height={'calc(100%)'}
          //   py={5}
          //   id='chat_scroll'
          // >
          //   {messages.map((item, i) => {
          //     return (
          //       <ScrollList key={i} uniqueKey={i}>
          //         <AglintChatCard
          //           key={i}
          //           textName={item.sender}
          //           textMessage={item.message}
          //           textTime={item.date}
          //           slotUserImage={
          //             <>
          //               <MuiAvatar
          //                 variant='rounded'
          //                 level={item.sender}
          //                 src={recruiterUser.profile_image}
          //               />
          //             </>
          //           }
          //           isAglintLogoVisible={item.sender == 'Aglint'}
          //           isUserLogoVisible={item.sender !== 'Aglint'}
          //         />
          //       </ScrollList>
          //     );
          //   })}
          //   {loading && <ChatMessageLoader />}
          // </Stack>
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
                borderRadius: '10px',
              },
            }}
            placeholder='Type a message...'
            inputRef={inputRef}
            fullWidth
            variant='outlined'
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
          />
        }
        onClickSend={{
          onClick: () => {
            sendMessage();
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
  // <PageLayout
  //   slotTopbarLeft={<Typography variant='h3'>Aglint</Typography>}
  //   slotBody={
  //     <>
  //       <AssistantLanding
  //         slotChat={
  //           <AssistantHelp
  //             onClickSchedulerAgent={{
  //               onClick: () => {
  //                 setMessages((pre) => [
  //                   ...pre,
  //                   {
  //                     sender: 'Aglint',
  //                     message:
  //                       'Hello there!, Ready to assist with scheduling your interviews today?',
  //                     date: null,
  //                     component: null, // React component to display the chatbot's name
  //                   },
  //                 ]);
  //               },
  //             }}
  //             isSlotChatVisible={messages.length !== 0}
  //             isChatDashVisible={messages.length === 0}
  //             slotMessage={
  //               <Stack
  //                 direction={'row'}
  //                 rowGap={'20px'}
  //                 flexDirection={'column'}
  //                 overflow={'auto'}
  //                 height={'calc(100%)'}
  //                 py={5}
  //                 id='chat_scroll'
  //               >
  //                 {messages.map((item, i) => {
  //                   return (
  //                     <ScrollList key={i} uniqueKey={i}>
  //                       <AglintChatCard
  //                         key={i}
  //                         textName={item.sender}
  //                         textMessage={item.message}
  //                         textTime={item.date}
  //                         slotUserImage={
  //                           <>
  //                             <MuiAvatar
  //                               variant='rounded'
  //                               level={item.sender}
  //                               src={recruiterUser.profile_image}
  //                             />
  //                           </>
  //                         }
  //                         isAglintLogoVisible={item.sender == 'Aglint'}
  //                         isUserLogoVisible={item.sender !== 'Aglint'}
  //                       />
  //                     </ScrollList>
  //                   );
  //                 })}
  //                 {loading && <ChatMessageLoader />}
  //               </Stack>
  //             }
  //             slotChatInput={
  //               <TextField
  //                 autoComplete='new-password'
  //                 sx={{
  //                   '& .MuiOutlinedInput-root': {
  //                     height: 50,
  //                     fontSize: 15,
  //                   },
  //                 }}
  //                 inputRef={inputRef}
  //                 fullWidth
  //                 variant='outlined'
  //                 onKeyDown={(e) => {
  //                   if (e.key === 'Enter') {
  //                     sendMessage();
  //                   }
  //                 }}
  //               />
  //             }
  //             onClickSend={{
  //               onClick: () => {
  //                 sendMessage();
  //               },
  //             }}
  //           />
  //         }
  //         isFilterVisible={true}
  //         slotTask={
  //           <Stack direction={'row'} flexDirection={'column'} gap={'10px'}>
  //             <AssistantTaskEmpty />
  //           </Stack>
  //         }
  //       />
  //     </>
  //   }
  // />
}

export default Agent;
export const chatMessages2 = [
  {
    sender: 'You',
    message: 'Hello!',
    date: null,
    component: null, // React component to explain how the chatbot works
  },
  {
    sender: 'Aglint',
    message:
      'Hello there!, Ready to assist with scheduling your interviews today?',
    date: null,
    component: null, // React component to display the chatbot's name
  },
  {
    sender: 'You',
    message:
      'Yes, I need to schedule interviews for the Software Developer role.',
    date: null,
    component: null,
  },
  {
    sender: 'Aglint',
    message: 'Understood. How many interviews are we scheduling?',
    date: null,
    component: null, // React component to explain how the chatbot works
  },
  {
    sender: 'You',
    message: `Let's go with the top 5 candidates.`,
    date: null,
    component: null,
  },
  {
    sender: 'Aglint',
    message: 'Do you have preferred dates and times?',
    date: null,
    component: null, // React component to explain how the chatbot works
  },
  {
    sender: 'You',
    message: `Next Monday and Tuesday, anytime in the afternoon.`,
    date: null,
    component: null,
  },
  {
    sender: 'Aglint',
    message: `Got it. I'll check the candidates' availability. Any specific duration for each interview?`,
    date: null,
    component: null, // React component to explain how the chatbot works
  },
  {
    sender: 'You',
    message: `Allocate 1 hour for each, with a 15-minute break in between.`,
    date: null,
    component: null,
  },
  {
    sender: 'Aglint',
    message: `Perfect. I'll arrange them and send confirmation emails. Do you want to include any specific interviewers from your team?`,
    date: null,
    component: null, // React component to explain how the chatbot works
  },
  {
    sender: 'You',
    message: `That's all for now, thank you!`,
    date: null,
    component: null,
  },
  {
    sender: 'Aglint',
    message: `You're welcome! I'll update you shortly on the schedule. Have a great day!`,
    date: null,
    component: null,
  },
];
export const questions = [
  'Hey, Schedule an interview with John for the Software Engineer role with the SW Eng Panel OR Sarah, Cindy, Joe, Brian.',
  'Schedule in the next two weeks.',
  'Please check with the candidate first and set it up.',
  'Awesome, thanks. I forgot to ask, can you add Henry and Denise to {shadow} the interview.',
  'No, optional is fine.',
  'Yes, confirm it. Did the shadows confirm?',
  'Did Henry and Denise confirm to {shadow} the interview',
  'Awesome.',
  'Yes, please reschedule',
];

export const chatMessages = [
  {
    sender: 'You',
    message:
      'Hi, I need to schedule an interview for the Senior Machine Learning Engineer position. Can you help with that?',
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
          slotIcon={<LottieAnimations animation='loader_dotted' />}
        />
      </>
    ),
    task: 'Email sent to Abhishek Tomar',
  },
];

// export const chatMessages = [
//   {
//     sender: 'You',
//     message:
//       'Hey, schedule an interview with John for the Software Engineer role with the SW Eng Panel OR Sarah, Cindy, Joe, Brian.',
//     date: null,
//     component: null,
//   },
//   {
//     sender: 'Aglint',
//     message: 'Sounds good, do you have a day or time-frame in mind?',
//     date: null,
//     component: null,
//   },
//   {
//     sender: 'You',
//     message: 'Schedule in the next two weeks.',
//     date: null,
//     component: null,
//   },
//   {
//     sender: 'Aglint',
//     message:
//       "Got it, I'll reach out to the John and get the process started. Unless you want me to check with the interviewing team first.",
//     date: null,
//     component: null,
//   },
//   {
//     sender: 'You',
//     message: 'Please check with the candidate first and set it up.',
//     date: null,
//     component: (
//       <WidgetFlexRow
//         slorWidgetIndividual={
//           <>
//             <WidgetPanelCard
//               textMemberCount={'11 Members'}
//               textPanelName={'something'}
//             />
//           </>
//         }
//       />
//     ),
//   },
//   {
//     sender: 'Aglint',
//     message: 'Got it.',
//     date: null,
//     component: null,
//   },

//   {
//     sender: 'You',
//     message:
//       'Awesome, thanks. I forgot to ask, can you add Henry and Denise to {shadow} the interview.',
//     date: null,
//     component: null,
//   },
//   {
//     sender: 'Aglint',
//     message:
//       'Got it, no problem. I will add add Henry and Denise to {shadow} the interview once confirmed. I will prioritize the SW Eng Panel and add them as optional. Let me know if they are required to shadow.',
//     date: null,
//     component: null,
//   },
//   {
//     sender: 'You',
//     message: 'No, optional is fine.',
//     date: null,
//     component: null,
//   },
//   {
//     sender: 'Aglint',
//     message: 'Got it.',
//     date: null,
//     component: null,
//   },

//   {
//     sender: 'You',
//     message: 'Yes, confirm it. Did the shadows confirm?',
//     date: null,
//     component: null,
//   },
//   {
//     sender: 'Aglint',
//     message: `Sorry, I did'nt understand.`,
//     component: null,
//     date: null,
//   },
//   {
//     sender: 'You',
//     message: 'Did Henry and Denise confirm to {shadow} the interview',
//     date: null,
//     component: null,
//   },

//   {
//     sender: 'Aglint',
//     message: 'Got it. Yes, they have confirmed.',
//     date: null,
//     component: null,
//   },
//   {
//     sender: 'You',
//     message: 'Awesome.',
//     date: null,
//     component: null,
//   },
//   {
//     sender: 'Aglint',
//     message: 'Great, sending confirmed schedules now.',
//     date: null,
//     component: null,
//   },

//   {
//     sender: 'You',
//     message: 'Yes, please reschedule',
//     date: null,
//     component: null,
//   },
//   {
//     sender: 'Aglint',
//     message: 'Got it, will do.',
//     date: null,
//     component: null,
//   },
// ];

// 3  5 8
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
