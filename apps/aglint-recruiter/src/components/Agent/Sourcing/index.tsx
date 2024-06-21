/* eslint-disable security/detect-object-injection */
import {
  Avatar,
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
import { ReactNode, useEffect, useRef, useState } from 'react';
dayjs.extend(relativeTime);

// import { CdExperienceCard, CdTableAglint, SuggestedSkillPill } from '@/devlink';

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
import { SuggetionPill } from '@/devlink3/SuggetionPill';
import { Timeline } from '@/devlink3/Timeline';
import { TimelineBlock } from '@/devlink3/TimelineBlock';
import { TimelineDummyOne } from '@/devlink3/TimelineDummyOne';
import { TimelineDummyTwo } from '@/devlink3/TimelineDummyTwo';
import { TimelineEmpty } from '@/devlink3/TimelineEmpty';
import { WidgetGrid2X2 } from '@/devlink3/WidgetGrid2X2';
import { WidgetUserCardWithCompany } from '@/devlink3/WidgetUserCardWithCompany';
import * as AuthContext from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';
import toast from '@/src/utils/toast';

import { calculateTotalExperience } from '../../CandidateDatabase/AppoloSearch/utils';
import CompanyLogo from '../../Common/CompanyLogo';
import ChatMessageLoader from '../../Common/Lotties/ChatMessageLoader';
import LottieAnimations from '../../Common/Lotties/LottieIcons';
import MuiAvatar from '../../Common/MuiAvatar';
import { processing_sourcing } from './util';

export type messageType = {
  sender: string;
  message: string;
  component: ReactNode | null;
  date: string | null;
};

export type senderType = {
  sender: 'Aglint' | 'You';
};

// const Senders = {
//   Agent: 'Aglint',
//   User: 'You',
// };

function SourcingAgent() {
  const [agentChats, setAgentChats] = useState<
    {
      name: string;
      messages: messageType[];
      date: string;
      timeline?: (typeof Timeline)[];
      component: ReactNode;
      notifications?: ReactNode;
    }[]
  >([]);
  const [activeChat, setActiveChat] = useState<number | string>('demo_chat_1');
  const [timeLineDrawer, setTimeLineDrawer] = useState(false);
  const [candidate_ids, setCandidate_ids] = useState<
    { id: string; email: string }[]
  >([]);
  const [selectedCandidates, setSelectedCandidates] = useState<Set<string>>(
    new Set(),
  );
  const handleNewChat = () => {
    setAgentChats([
      {
        name: 'Talent search',
        messages: [
          {
            sender: 'Aglint',
            message: 'Hello there!, Ready to assist with sourcing.',
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
  // const [messages, setMessages] = useState<messageType[]>([]);
  const [loading, setLoading] = useState(false);
  // const [indexes, setIndexes] = useState([]);
  // eslint-disable-next-line no-console
  async function createThread() {
    const { data } = await axios.get('/api/assistant/createThread');
    localStorage.setItem('agent_thread_id', data.id);
  }

  async function sendMessage(message: string) {
    // let message = inputRef.current.value;

    inputRef.current.value = '';
    const today = dayjs(new Date()).fromNow();
    const tempChats = [...agentChats];
    // const tempActiveChat = agentChats[activeChat];
    if (message) {
      setLoading(true);
      const tempAgent = [...agentChats];
      (tempAgent[activeChat]?.messages as messageType[]).push({
        date: today,
        sender: 'you',
        message,
        component: null,
      });
      setAgentChats(tempAgent);
      const tempIds = candidate_ids
        .filter((item) => selectedCandidates.has(item.id))
        .map((item) => {
          return {
            id: item.id,
            email: item.email,
          };
        });
      const tempCandidate_ids = tempIds.length ? tempIds : candidate_ids;
      await processing_sourcing({
        message,
        candidate_ids: tempCandidate_ids,
      }).then((data) => {
        switch (data.type) {
          case 'process_query': {
            setCandidate_ids(
              data.candidates_ids.map((item: any) => {
                return {
                  id: item.id,
                  email: item.email,
                };
              }),
            );
            (tempAgent[activeChat].messages as messageType[]).push({
              date: today,
              sender: 'Aglint',
              message: data.message,
              component: data.candidates_ids,
              // (
              //   <WidgetGrid2X2
              //     slotWidget={
              //       <>
              //         {data.candidates_ids.map((item: any) => {
              //           const company = item.employment_history[0];
              //           return (
              //             <WidgetUserCardWithCompany
              //               key={item.id}
              //               onClickCard={{
              //                 onClick: () => {
              //                   setSelectedCandidates((pre) => {
              //                     const tempCandidates = new Set([...pre]);
              //                     if (selectedCandidates.has(item.id)) {
              //                       tempCandidates.delete(item.id);
              //                     } else {
              //                       tempCandidates.add(item.id);
              //                     }
              //                     return tempCandidates;
              //                   });
              //                 },
              //               }}
              //               isSelected={selectedCandidates.has(item.id)}
              //               slotUserAvatar={
              //                 <MuiAvatar
              //                   level={getFullName(
              //                     item.first_name,
              //                     item.last_name,
              //                   )}
              //                   src={
              //                     item.photo_url?.includes('static')
              //                       ? null
              //                       : item.photo_url
              //                   }
              //                   variant={'rounded'}
              //                   width={'80px'}
              //                   height={'80px'}
              //                   fontSize={'var(--space-6)'}
              //                 />
              //               }
              //               textName={getFullName(
              //                 item.first_name,
              //                 item.last_name,
              //               )}
              //               textJobTitle={
              //                 item.title +
              //                 (item.employment_history
              //                   ? ` (${calculateTotalExperience(item.employment_history)} years)`
              //                   : '')
              //               }
              //               textLocation={[item.city, item.state, item.country]
              //                 .filter(Boolean)
              //                 .join(', ')}
              //               slotCompanyLogo={
              //                 <Avatar
              //                   variant='rounded'
              //                   src={item?.organization?.logo_url}
              //                   sx={{ height: 40, width: 40 }}
              //                 >
              //                   <CompanyLogo
              //                     companyName={
              //                       company.organization_name
              //                         ? company.organization_name
              //                             .trim()
              //                             .toLowerCase()
              //                         : null
              //                     }
              //                   />
              //                 </Avatar>
              //               }
              //               textCompanyName={<>{company.organization_name}</>}
              //             />
              //           );
              //         })}
              //       </>
              //     }
              //   />
              // ),
            });
            break;
          }
          case 'email': {
            (tempAgent[activeChat].messages as messageType[]).push({
              date: today,
              sender: 'Aglint',
              message: data.message,
              component: <></>,
            });
            break;
          }
          case 'select_template': {
            (tempAgent[activeChat].messages as messageType[]).push({
              date: today,
              sender: 'Aglint',
              message: data.message,
              component: (
                <Stack direction={'row'} gap={2}>
                  <SuggetionPill
                    textSuggetion={'Recruitment Inquiry'}
                    onClickCard={{
                      onClick: () =>
                        sendMessage('send Recruitment Inquiry mail.'),
                    }}
                  />
                  <SuggetionPill
                    textSuggetion={'Networking Connection'}
                    onClickCard={{
                      onClick: () =>
                        sendMessage('send Networking Connection mail.'),
                    }}
                  />
                  <SuggetionPill
                    textSuggetion={'Research Study Invitation'}
                    onClickCard={{
                      onClick: () =>
                        sendMessage('send Research Study Invitation mail.'),
                    }}
                  />
                </Stack>
              ),
            });
            break;
          }
        }
        setAgentChats(tempChats);
      });
      setSelectedCandidates(new Set<string>());
      setLoading(false);
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
        // onClickSourcingAgent={{
        //   onClick: handleNewChat,
        // }}
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
        //   onClickNewTask={{ onClick: handleNewChat }}
        slotAgentTask={
          <>
            {agentChats.map((chat, i) => {
              // const tempTask =
              //   agentChats[i]?.timeline[agentChats[i]?.timeline.length - 1];
              return (
                <AgentTask
                  key={i}
                  isActive={i === activeChat}
                  textTaskName={chat.name}
                  // isTimeline={Boolean(tempTask)}
                  onClickCard={{
                    onClick: () => {
                      setActiveChat(i);
                      // setMessages(chat.messages);
                    },
                  }}
                  // slotTimeline={tempTask}
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
              // slotTimeline={
              //   <Timeline
              //     slotStatusIcon={<CheckMarkIcon />}
              //     textTitle={'Interview confirmed'}
              //     textTime={'1 day ago'}
              //   />
              // }
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
              // slotTimeline={
              //   <Timeline
              //     slotStatusIcon={<CheckMarkIcon />}
              //     textTitle={'Interview confirmed'}
              //     textTime={'1 day ago'}
              //   />
              // }
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
                              <>
                                {item.component && (
                                  <WidgetGrid2X2
                                    slotWidget={
                                      <>
                                        {item.component?.map((item: any) => {
                                          const company =
                                            item.employment_history[0];
                                          return (
                                            <WidgetUserCardWithCompany
                                              key={item.id}
                                              onClickCard={{
                                                onClick: () => {
                                                  setSelectedCandidates(
                                                    (pre) => {
                                                      const tempCandidates =
                                                        new Set([...pre]);
                                                      if (
                                                        selectedCandidates.has(
                                                          item.id,
                                                        )
                                                      ) {
                                                        tempCandidates.delete(
                                                          item.id,
                                                        );
                                                      } else {
                                                        tempCandidates.add(
                                                          item.id,
                                                        );
                                                      }
                                                      return tempCandidates;
                                                    },
                                                  );
                                                },
                                              }}
                                              isSelected={selectedCandidates.has(
                                                item.id,
                                              )}
                                              slotUserAvatar={
                                                <MuiAvatar
                                                  level={getFullName(
                                                    item.first_name,
                                                    item.last_name,
                                                  )}
                                                  src={
                                                    item.photo_url?.includes(
                                                      'static',
                                                    )
                                                      ? null
                                                      : item.photo_url
                                                  }
                                                  variant={'rounded-large'}
                                                />
                                              }
                                              textName={getFullName(
                                                item.first_name,
                                                item.last_name,
                                              )}
                                              textJobTitle={
                                                item.title +
                                                (item.employment_history
                                                  ? ` (${calculateTotalExperience(item.employment_history)} years)`
                                                  : '')
                                              }
                                              textLocation={[
                                                item.city,
                                                item.state,
                                                item.country,
                                              ]
                                                .filter(Boolean)
                                                .join(', ')}
                                              slotCompanyLogo={
                                                <Avatar
                                                  variant='rounded'
                                                  src={
                                                    item?.organization?.logo_url
                                                  }
                                                  sx={{
                                                    height: 40,
                                                    width: 40,
                                                  }}
                                                >
                                                  <CompanyLogo
                                                    companyName={
                                                      company.organization_name
                                                        ? company.organization_name
                                                            .trim()
                                                            .toLowerCase()
                                                        : null
                                                    }
                                                  />
                                                </Avatar>
                                              }
                                              textCompanyName={
                                                <>{company.organization_name}</>
                                              }
                                            />
                                          );
                                        })}
                                      </>
                                    }
                                  />
                                )}
                              </>
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
  //                 rowGap={'var(--space-5)'}
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
  //           <Stack direction={'row'} flexDirection={'column'} gap={'var(--space-2)'}>
  //             <AssistantTaskEmpty />
  //           </Stack>
  //         }
  //       />
  //     </>
  //   }
  // />
}

export default SourcingAgent;
// export const chatMessages2 = [
//   {
//     sender: 'You',
//     message: 'Hello!',
//     date: null,
//     component: null, // React component to explain how the chatbot works
//   },
//   {
//     sender: 'Aglint',
//     message:
//       'Hello there!, Ready to assist with scheduling your interviews today?',
//     date: null,
//     component: null, // React component to display the chatbot's name
//   },
//   {
//     sender: 'You',
//     message:
//       'Yes, I need to schedule interviews for the Software Developer role.',
//     date: null,
//     component: null,
//   },
//   {
//     sender: 'Aglint',
//     message: 'Understood. How many interviews are we scheduling?',
//     date: null,
//     component: null, // React component to explain how the chatbot works
//   },
//   {
//     sender: 'You',
//     message: `Let's go with the top 5 candidates.`,
//     date: null,
//     component: null,
//   },
//   {
//     sender: 'Aglint',
//     message: 'Do you have preferred dates and times?',
//     date: null,
//     component: null, // React component to explain how the chatbot works
//   },
//   {
//     sender: 'You',
//     message: `Next Monday and Tuesday, anytime in the afternoon.`,
//     date: null,
//     component: null,
//   },
//   {
//     sender: 'Aglint',
//     message: `Got it. I'll check the candidates' availability. Any specific duration for each interview?`,
//     date: null,
//     component: null, // React component to explain how the chatbot works
//   },
//   {
//     sender: 'You',
//     message: `Allocate 1 hour for each, with a 15-minute break in between.`,
//     date: null,
//     component: null,
//   },
//   {
//     sender: 'Aglint',
//     message: `Perfect. I'll arrange them and send confirmation emails. Do you want to include any specific interviewers from your team?`,
//     date: null,
//     component: null, // React component to explain how the chatbot works
//   },
//   {
//     sender: 'You',
//     message: `That's all for now, thank you!`,
//     date: null,
//     component: null,
//   },
//   {
//     sender: 'Aglint',
//     message: `You're welcome! I'll update you shortly on the schedule. Have a great day!`,
//     date: null,
//     component: null,
//   },
// ];
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
