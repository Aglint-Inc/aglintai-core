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
  AvailabilitySlot,
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
              setLoading(false);
              clearInterval(timeInterval);
            } else {
              if (reRunMessage.status === 'completed') {
                clearInterval(timeInterval);
                setLoading(false);

                setMessages((pre) => [
                  ...pre,
                  {
                    component: null,
                    message: 'Request failed!',
                    sender: 'Aglint',
                    date: today,
                  },
                ]);
              }
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
    // const questions = chatMessages
    //   .filter((message) => message.sender === 'You')
    //   .map((question) => question.message);

    // console.log(questions);
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
            slotTask={<AvailabilitySlot />}
          />

          {/* <SeparatorChat />
          <AglintChatCard/> */}
        </>
      }
    />
  );
}

export default Agent;
const chatMessages = [
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
    message: `Yes, include John and Lisa in all interviews.`,
    date: null,
    component: null,
  },
  {
    sender: 'Aglint',
    message: `Noted.  I'll make sure John and Lisa are available and include them. Anything else you need?"`,
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
