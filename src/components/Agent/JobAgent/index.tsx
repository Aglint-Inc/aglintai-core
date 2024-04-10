/* eslint-disable security/detect-object-injection */
import { Drawer, Skeleton, Stack, Typography } from '@mui/material';
import { Editor } from '@tiptap/react';
import dayjs from 'dayjs';
import { marked } from 'marked';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { AssistantLogo } from '@/devlink2';
import {
  AgentLayout,
  ChatBlock,
  ChatWindow,
  NewChat,
  NewChatButton,
  SuggetionPill,
  WidgetGrid3X3,
} from '@/devlink3';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { JobApplication } from '@/src/context/JobApplicationsContext/types';
import { useJobAssistantContext } from '@/src/context/JobAssistant';
import {
  chatusers,
  getSuggestedPrompts,
  suggestions,
} from '@/src/context/JobAssistant/utils';
import { ScrollList, YTransform } from '@/src/utils/framer-motions/Animation';

import Loader from '../../Common/Loader';
import { CalculatingResumeScore } from '../../Common/Lotties/Calculating';
import MuiAvatar from '../../Common/MuiAvatar';
import ApplicationDetails from '../../JobApplicationsDashboard/ApplicationCard/ApplicationDetails';
import CandidateCard from './CandidateCard';
import ChatEditor from './ChatEditor';
import DynamicSuggestion from './DynanicSuggetions';
import LeftPanel from './LeftPannel';
import LogoIcon from './LogoIcon';
function JobAgent() {
  const { recruiterUser } = useAuthDetails();

  const {
    handleChat,
    messages,
    textMessage,
    setTextMessage,
    setBackEndText,
    currentChat,
    resLoading,
    candidates,
    fetching,
    companyDetails,
    applicationDetails,
    setApplicationDetails,
    createNewChat,
    jobAssistantChats,
    switchChat,
  } = useJobAssistantContext();
  const { pathname } = useRouter();
  const [open, setOpen] = useState(false);
  //@ts-ignore
  const skills = companyDetails?.jd_json?.skills
    .filter((item) => !item.isMustHave)
    .map((ele) => ele.field);
  let suggestionsPrompts = [];
  let applicationList = [] as JobApplication[];

  let getEditorRef: () => Editor = null;

  useEffect(() => {
    const TypoElement = document.getElementById('chat_scroll');
    if (TypoElement)
      TypoElement.scrollTop = TypoElement && TypoElement.scrollHeight;
  }, [messages]);

  const loadingMessages = [
    'Please wait, job assistant is creating!',
    'Job assistant created!',
    'Passing the job descriptions to assistant',
    'Plase wait we are almost done!',
  ];
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    let i = 0;
    if (fetching) {
      const timeint = setInterval(() => {
        if (i === loadingMessages.length - 1) {
          setLoadingMessage(
            loadingMessages[Number(loadingMessages.length - 1)],
          );
          clearInterval(timeint);
        }
        setLoadingMessage(loadingMessages[Number(i)]);
        i = i + 1;
      }, 3000);
    }
  }, [fetching]);

  return (
    <>
      <AgentLayout
        moduleName={pathname === '/jobs/[id]/agent' ? 'jobs' : null}
        isActivity={false}
        slotNewChatButton={
          <NewChatButton
            onClickChat={{
              onClick: () => {
                if (jobAssistantChats[0]?.last_message) {
                  createNewChat();
                } else {
                  switchChat(jobAssistantChats[0]?.id);
                }
              },
            }}
          />
        }
        slotAgentTask={<LeftPanel />}
        textCurrentTaskName={currentChat?.last_message || 'Untitled'}
        isSearch={true}
        slotChat={
          <>
            <ChatWindow
              slotChatBlocks={
                fetching ? (
                  <>
                    <Stack gap={'20px'} alignItems={'center'} mt={'40px'}>
                      <Loader />
                      <YTransform uniqueKey={loadingMessage}>
                        <Typography>{loadingMessage}</Typography>
                      </YTransform>
                    </Stack>
                  </>
                ) : messages.length ? (
                  messages.map((ele, i) => {
                    const { sender, content, created_at } = ele;
                    const {
                      searchArguments,
                      active,
                      message,
                      result_applications,
                    } = content;
                    applicationList = result_applications;
                    if (searchArguments) {
                      suggestionsPrompts = getSuggestedPrompts(
                        searchArguments,
                        applicationList,
                        companyDetails.location,
                        skills,
                      );
                    }

                    return (
                      <>
                        <ScrollList uniqueKey={i} key={i}>
                          <ChatBlock
                            slotAvatar={
                              sender == chatusers.recruiter ? (
                                <MuiAvatar
                                  variant='rounded'
                                  src={recruiterUser.profile_image}
                                  level={recruiterUser.first_name}
                                  fontSize='20px'
                                />
                              ) : (
                                <AssistantLogo />
                              )
                            }
                            testName={sender}
                            textMessage={
                              active && (
                                <>
                                  {sender === chatusers.assistant &&
                                  resLoading &&
                                  i === messages.length - 1 ? (
                                    <Stack
                                      position={'relative'}
                                      height={'100px'}
                                      width={'30px'}
                                    >
                                      <Stack
                                        top={'-32px'}
                                        left={'-35px'}
                                        width={'110px'}
                                        position={'absolute'}
                                      >
                                        <CalculatingResumeScore />
                                      </Stack>
                                    </Stack>
                                  ) : (
                                    message.html && (
                                      <>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: marked(
                                              message.html
                                                ?.replaceAll('<p></p>', '')
                                                ?.replaceAll('```', '')
                                                .replaceAll(
                                                  /.*\b[Aa]pplication.[Ii][Dd].*\n/g,
                                                  '',
                                                ),
                                            ),
                                          }}
                                        />
                                      </>
                                    )
                                  )}
                                </>
                              )
                            }
                            textTime={dayjs(created_at).fromNow()}
                            isWidget={
                              sender === chatusers.assistant &&
                              applicationList &&
                              applicationList.length !== 0
                            }
                            slotWidget={
                              <WidgetGrid3X3
                                slotWidget={
                                  sender === chatusers.assistant &&
                                  !active &&
                                  applicationList
                                    ?.sort(
                                      (a, b) =>
                                        b?.overall_score - a?.overall_score,
                                    )
                                    .filter((application) =>
                                      Boolean(application?.id),
                                    )
                                    .map((application) => {
                                      return (
                                        <>
                                          <CandidateCard
                                            application={
                                              application as JobApplication
                                            }
                                            setOpen={setOpen}
                                          />
                                        </>
                                      );
                                    })
                                }
                              />
                            }
                          />
                        </ScrollList>
                      </>
                    );
                  })
                ) : (
                  <NewChat
                    slotIcon={<LogoIcon />}
                    slotSuggetionCard={
                      <DynamicSuggestion
                        getEditorRef={() => getEditorRef()}
                        skills={skills}
                      />
                    }
                  />
                )
              }
            />
          </>
        }
        isSuggetionPills={true}
        slotSuggetionPills={
          <SuggestedPrompts
            getEditorRef={() => getEditorRef()}
            suggestionsPrompts={suggestionsPrompts}
          />
        }
        slotSearchInput={
          <Stack
            sx={{
              display: 'flex',
              width: '100%',
              height: '58px',
            }}
          >
            {!fetching ? (
              <ChatEditor
                onChange={(event) => {
                  const div = document.createElement('div');
                  div.innerHTML = event.html;
                  div
                    .querySelectorAll('span')
                    .forEach(
                      (node) =>
                        (node.textContent =
                          '```' + node.getAttribute('data-id') + '```'),
                    );
                  setBackEndText(div.textContent);
                  setTextMessage(event);
                }}
                getEditorRef={(func) => (getEditorRef = func)}
                onClick={handleChat}
                value={textMessage?.text?.trim()}
                dataList={candidates}
              />
            ) : (
              <Skeleton
                sx={{
                  transform: 'none',
                }}
                height={'58px'}
              />
            )}
          </Stack>
        }
        onClickSend={{
          onClick: () => {
            if (textMessage?.text?.trim()) {
              handleChat();
            }
          },
        }}
      />
      <Stack>
        <Drawer
          anchor={'right'}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <ApplicationDetails
            open={true}
            onClose={() => {
              setOpen(false);
              setApplicationDetails(null);
            }}
            application={applicationDetails}
            hideNextPrev={true}
          />
        </Drawer>
      </Stack>
    </>
  );
}

export default JobAgent;

function SuggestedPrompts({ suggestionsPrompts, getEditorRef }) {
  const { messages, textMessage, setTextMessage, resLoading, setBackEndText } =
    useJobAssistantContext();
  const init = suggestions().initialPrompts;
  return (
    <>
      {!resLoading && messages.length && !textMessage?.text
        ? [...suggestionsPrompts, ...init].map((ele, i) => {
            if (ele)
              return (
                <SuggetionPill
                  key={i}
                  textSuggetion={ele}
                  onClickCard={{
                    onClick: () => {
                      setTextMessage({
                        html: `<p>${ele}</p>`,
                        text: ele,
                        wordCount: ele.length,
                      });
                      setBackEndText(`<p>${ele}</p>`);

                      getEditorRef().commands.setContent(ele);
                      getEditorRef().commands.focus(ele.length + 1);
                      const firstBacktickPos = ele.indexOf('`');

                      const secondBacktickPos = ele.indexOf(
                        '`',
                        firstBacktickPos + 1,
                      );
                      if (firstBacktickPos > 0 && secondBacktickPos > 0) {
                        getEditorRef().commands.setTextSelection({
                          from: firstBacktickPos + 2,
                          to: secondBacktickPos + 1,
                        });
                      }
                    },
                  }}
                />
              );
          })
        : null}
    </>
  );
}
