import { Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ReactDOM, useEffect, useRef, useState } from 'react';
dayjs.extend(relativeTime);

import {
  AglintChatCard,
  AssistantHelp,
  AssistantLanding,
  AssistantTaskEmpty,
  PageLayout,
} from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { ScrollList } from '@/src/utils/framer-motions/Animation';
import toast from '@/src/utils/toast';

import ChatMessageLoader from '../AssistantChat/ChatMessageLoader';
import MuiAvatar from '../Common/MuiAvatar';
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
  const { recruiterUser } = useAuthDetails();
  const inputRef = useRef(null);
  const [messages, setMessages] = useState<messageType[]>([]);
  const [loading, setLoading] = useState(false);
  const [indexes, setIndexes] = useState([]);
  // eslint-disable-next-line no-console
  console.log(indexes);
  async function createThread() {
    const { data } = await axios.get('/api/assistant/createThread');
    localStorage.setItem('agent_thread_id', data.id);
  }

  async function sendMessage() {
    let message = inputRef.current.value;
    inputRef.current.value = '';
    const today = dayjs(new Date()).fromNow();
    if (message) {
      setLoading(true);
      setMessages((pre) => [
        ...pre,
        { sender: senders.User, message, date: today } as messageType,
      ]);

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
              setMessages((pre) => [
                ...pre,
                { ...chatMessages[Number(index) * 2 + 1], date: today },
              ]);
              if (index === 2) {
                setTimeout(() => {
                  setLoading(true);
                });
                setTimeout(() => {
                  setLoading(false);

                  setMessages((pre) => [
                    ...pre,
                    { ...extraMessage[0], date: today },
                  ]);
                }, 5000);
              } else if (index === 4) {
                setTimeout(() => {
                  setLoading(true);
                });
                setTimeout(() => {
                  setLoading(false);

                  setMessages((pre) => [
                    ...pre,
                    { ...extraMessage[1], date: today },
                  ]);
                }, 5000);
              } else if (index === 7) {
                setTimeout(() => {
                  setLoading(true);
                });
                setTimeout(() => {
                  setLoading(false);

                  setMessages((pre) => [
                    ...pre,
                    { ...extraMessage[2], date: today },
                  ]);
                }, 5000);
              } else {
                setLoading(false);
              }
              setIndexes((pre) => [...pre, Number(index)]);
              clearInterval(timeInterval);
            }
          }
        }, 1000);
      }
      inputRef.current.focus();
    } else {
      toast.warning('Please enter your message!');
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('agent_thread_id')) createThread();
  }, []);

  useEffect(() => {
    const TypoElement = document.getElementById('chat_scroll');
    if (TypoElement)
      TypoElement.scrollTop = TypoElement && TypoElement.scrollHeight;
  }, [messages]);
  return (
    <PageLayout
      slotTopbarLeft={<Typography variant='h3'>Aglint</Typography>}
      slotBody={
        <>
          <AssistantLanding
            slotChat={
              <AssistantHelp
                onClickSchedulerAgent={{
                  onClick: () => {
                    setMessages((pre) => [
                      ...pre,
                      {
                        sender: 'Aglint',
                        message:
                          'Hello there!, Ready to assist with scheduling your interviews today?',
                        date: null,
                        component: null, // React component to display the chatbot's name
                      },
                    ]);
                  },
                }}
                isSlotChatVisible={messages.length !== 0}
                isChatDashVisible={messages.length === 0}
                slotMessage={
                  <Stack
                    direction={'row'}
                    rowGap={'20px'}
                    flexDirection={'column'}
                    overflow={'auto'}
                    height={'calc(100%)'}
                    py={5}
                    id='chat_scroll'
                  >
                    {messages.map((item, i) => {
                      return (
                        <ScrollList key={i} uniqueKey={i}>
                          <AglintChatCard
                            key={i}
                            textName={item.sender}
                            textMessage={item.message}
                            textTime={item.date}
                            slotUserImage={
                              <>
                                <MuiAvatar
                                  variant='rounded'
                                  level={item.sender}
                                  src={recruiterUser.profile_image}
                                />
                              </>
                            }
                            isAglintLogoVisible={item.sender == 'Aglint'}
                            isUserLogoVisible={item.sender !== 'Aglint'}
                          />
                        </ScrollList>
                      );
                    })}
                    {loading && <ChatMessageLoader />}
                  </Stack>
                }
                slotChatInput={
                  <TextField
                    autoComplete='new-password'
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: 50,
                        fontSize: 15,
                      },
                    }}
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
              />
            }
            isFilterVisible={true}
            slotTask={
              <Stack direction={'row'} flexDirection={'column'} gap={'10px'}>
                <AssistantTaskEmpty />
              </Stack>
            }
          />
        </>
      }
    />
  );
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
      'Hey, schedule an interview with John for the Software Engineer role with the SW Eng Panel OR Sarah, Cindy, Joe, Brian.',
    date: null,
    component: null,
  },
  {
    sender: 'Aglint',
    message: 'Sounds good, do you have a day or time-frame in mind?',
    date: null,
    component: null,
  },
  {
    sender: 'You',
    message: 'Schedule in the next two weeks.',
    date: null,
    component: null,
  },
  {
    sender: 'Aglint',
    message:
      "Got it, I'll reach out to the John and get the process started. Unless you want me to check with the interviewing team first.",
    date: null,
    component: null,
  },
  {
    sender: 'You',
    message: 'Please check with the candidate first and set it up.',
    date: null,
    component: null,
  },
  {
    sender: 'Aglint',
    message: 'Got it.',
    date: null,
    component: null,
  },

  {
    sender: 'You',
    message:
      'Awesome, thanks. I forgot to ask, can you add Henry and Denise to {shadow} the interview.',
    date: null,
    component: null,
  },
  {
    sender: 'Aglint',
    message:
      'Got it, no problem. I will add add Henry and Denise to {shadow} the interview once confirmed. I will prioritize the SW Eng Panel and add them as optional. Let me know if they are required to shadow.',
    date: null,
    component: null,
  },
  {
    sender: 'You',
    message: 'No, optional is fine.',
    date: null,
    component: null,
  },
  {
    sender: 'Aglint',
    message: 'Got it.',
    date: null,
    component: null,
  },

  {
    sender: 'You',
    message: 'Yes, confirm it. Did the shadows confirm?',
    date: null,
    component: null,
  },
  {
    sender: 'Aglint',
    message: `Sorry, I did'nt understand.`,
    component: null,
    date: null,
  },
  {
    sender: 'You',
    message: 'Did Henry and Denise confirm to {shadow} the interview',
    date: null,
    component: null,
  },

  {
    sender: 'Aglint',
    message: 'Got it. Yes, they have confirmed.',
    date: null,
    component: null,
  },
  {
    sender: 'You',
    message: 'Awesome.',
    date: null,
    component: null,
  },
  {
    sender: 'Aglint',
    message: 'Great, sending confirmed schedules now.',
    date: null,
    component: null,
  },

  {
    sender: 'You',
    message: 'Yes, please reschedule',
    date: null,
    component: null,
  },
  {
    sender: 'Aglint',
    message: 'Got it, will do.',
    date: null,
    component: null,
  },
];

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
