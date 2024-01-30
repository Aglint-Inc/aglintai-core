import {
  Divider,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { Editor } from '@tiptap/react';
import { marked } from 'marked';
import { useEffect, useState } from 'react';

import {
  AssistantCandidateDetails,
  ChatMessage,
  JobAssist,
  JobAssistCards,
  JobAssistCardSmall,
} from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobAssistantContext } from '@/src/context/JobAssistant';
import { CandidateDetailsInterface } from '@/src/context/JobAssistant/type';
import {
  chatusers,
  getResumeMatched,
  getSuggestedPrompts,
  suggestions,
} from '@/src/context/JobAssistant/utils';
import { ScrollList } from '@/src/utils/framer-motions/Animation';

import ChatEditor, { SendIcon } from './ChatEditor';
import LeftPanel from './LeftPannel';
import { CalculatingResumeScore } from '../Common/Lotties/Calculating';
import MuiAvatar from '../Common/MuiAvatar';
function JobAssistant() {
  const { recruiter, recruiterUser } = useAuthDetails();
  const {
    handleChat,
    messages,
    textMessage,
    setTextMessage,
    setBackEndText,
    currentChat,
    resLoading,
    candidates,
  } = useJobAssistantContext();

  let [candidatesList, setCandidateList] = useState<
    CandidateDetailsInterface[]
  >([]);
  let suggestionsPrompts = [];

  let getEditorRef: () => Editor = null;

  useEffect(() => {
    const TypoElement = document.getElementById('chat_scroll');
    if (TypoElement)
      TypoElement.scrollTop = TypoElement && TypoElement.scrollHeight;
  }, [messages]);

  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    });
  }, [candidatesList]);

  useEffect(() => {
    const tempList = [];
    messages.map((message) => {
      if (message.content.result_candidates)
        tempList.push(...message.content.result_candidates);
    });
    const filtered = [...new Set(tempList.map((ele) => ele.id))];
    const finalUser = candidates.filter((ele) => filtered.includes(ele.id));
    setCandidateList(finalUser);
  }, [candidates, messages]);
  return (
    <Stack direction={'row'} height={'100vh'} width={'100%'}>
      <LeftPanel />
      <Stack width={'80%'} spacing={'10px'}>
        {currentChat && (
          <JobAssist
            isMinimizeIconVisible={false}
            isViewMoreVisible={false}
            isStartingScreenVisible={!messages.length}
            isChatBody={!!messages.length}
            slotLogo={
              <MuiAvatar
                variant='rounded'
                src={recruiter.logo}
                level={recruiter.name}
              />
            }
            slotChat={
              !loading &&
              messages.length &&
              messages.map((ele, i) => {
                const { sender, content } = ele;
                const { searchArguments, active, message, result_candidates } =
                  content;
                const tempCandidates = result_candidates;
                if (searchArguments) {
                  suggestionsPrompts = getSuggestedPrompts(
                    searchArguments,
                    tempCandidates,
                  );
                }
                return (
                  <ChatMessage
                    key={i}
                    slotProfile={
                      sender == chatusers.recruiter ? (
                        <MuiAvatar
                          variant='rounded'
                          src={recruiterUser.profile_image}
                          level={recruiterUser.first_name}
                          fontSize='20px'
                        />
                      ) : (
                        <AssistantLogo width={40} height={40} />
                      )
                    }
                    slotMessages={
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
                            message && (
                              <Typography
                                variant='body2'
                                dangerouslySetInnerHTML={{
                                  __html: marked(
                                    message.html?.replaceAll(
                                      /.*\b[Aa]pplication.[Ii][Dd].*\n/g,
                                      '',
                                    ),
                                  ),
                                }}
                              ></Typography>
                            )
                          )}
                        </>
                      )
                    }
                    textHeading={sender}
                    isMessageCardVisible={
                      sender === chatusers.assistant &&
                      tempCandidates &&
                      tempCandidates.length !== 0
                    }
                    slotMessageCard={
                      sender === chatusers.assistant &&
                      !active &&
                      tempCandidates
                        .sort(
                          (a, b) =>
                            b.application?.overall_score -
                            a.application?.overall_score,
                        )
                        .map((candidate, i) => {
                          const {
                            city,
                            state,
                            country,
                            experience_in_months,
                            first_name,
                            last_name,
                            application,
                          } = candidate;

                          const overall_score = application?.overall_score;
                          const resume_match = getResumeMatched(
                            overall_score,
                          ) as any;

                          return (
                            <AssistantCandidateDetails
                              key={i}
                              slotProfile={
                                <MuiAvatar
                                  variant='rounded'
                                  fontSize='10px'
                                  width='16px'
                                  height='16px'
                                  src={'/recruiter.logo'}
                                  level={'name'}
                                />
                              }
                              colorPropsMatch={{
                                style: {
                                  color: resume_match?.bgColor,
                                },
                              }}
                              textMatchCount={`${resume_match?.text}-${overall_score}%`}
                              textName={`${first_name} ${last_name || ''}`}
                              textLocation={`${city || ''},${state || ''},${
                                country || ''
                              }`}
                              textExperience={
                                (experience_in_months
                                  ? (experience_in_months / 12).toFixed(1)
                                  : 0) +
                                (Number(
                                  (experience_in_months / 12).toFixed(1),
                                ) > 1
                                  ? ' years'
                                  : ' year')
                              }
                              isTopMatchVisible={overall_score > 0}
                              isOverviewVisible={false}
                              isLocationVisible={!!city || !!state || !!country}
                              // isExperienceVisible={experience_in_months}
                              isRelevantSkillVisible={false}
                            />
                          );
                        })
                    }
                  />
                );
              })
            }
            slotAssistCards={
              messages &&
              messages.length === 0 &&
              suggestions.common.map((ele, i) => {
                return (
                  <Stack
                    onClick={() => {
                      setTextMessage({
                        text: ele,
                        html: '',
                        wordCount: ele.length,
                      });
                      getEditorRef().commands.setContent(ele);
                      getEditorRef().commands.focus(ele.length + 1);
                      const firstBacktickPos = ele.indexOf('`');
                      const secondBacktickPos = ele.indexOf(
                        '`',
                        firstBacktickPos + 1,
                      );

                      if (firstBacktickPos > 0 && secondBacktickPos > 0)
                        getEditorRef().commands.setTextSelection({
                          from: firstBacktickPos + 2,
                          to: secondBacktickPos + 1,
                        });
                    }}
                    key={i}
                  >
                    <JobAssistCards textDesc={ele} />
                  </Stack>
                );
              })
            }
            isSuggestionVisible={true}
            slotSuggestion={
              !loading && (
                <SuggestedPrompts
                  getEditorRef={() => getEditorRef()}
                  suggestionsPrompts={suggestionsPrompts}
                />
              )
            }
            slotInput={
              <>
                {!loading && !resLoading ? (
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
                    value={textMessage.text}
                    dataList={candidatesList}
                  />
                ) : (
                  <FakeInput />
                )}
              </>
            }
          />
        )}
      </Stack>
    </Stack>
  );
}

export default JobAssistant;

function SuggestedPrompts({ suggestionsPrompts, getEditorRef }) {
  const { messages, textMessage, setTextMessage, resLoading } =
    useJobAssistantContext();
  return (
    <>
      {!resLoading && messages.length && !textMessage.text
        ? [...suggestionsPrompts].map((ele, i) => {
            return (
              <ScrollList key={i} uniqueKey={i}>
                <JobAssistCardSmall
                  key={i}
                  textSuggestion={ele}
                  onClickCard={{
                    onClick: () => {
                      setTextMessage({
                        html: '',
                        text: ele,
                        wordCount: ele.length,
                      });

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
              </ScrollList>
            );
          })
        : null}
    </>
  );
}

function AssistantLogo({ width, height }) {
  return (
    <Stack>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={width || 40}
        height={height || 40}
        viewBox='0 0 21 20'
        fill='none'
      >
        <path
          d='M17.3493 9.16316C15.0809 8.59474 13.944 8.31579 13.1598 7.53158C12.3756 6.74211 12.0967 5.61053 11.5282 3.34211L10.6914 0L9.85456 3.34211C9.28614 5.61053 9.0072 6.74737 8.22299 7.53158C7.43351 8.31579 6.30193 8.59474 4.03351 9.16316L0.691406 10L4.03351 10.8368C6.30193 11.4053 7.43877 11.6842 8.22299 12.4684C9.0072 13.2579 9.28614 14.3895 9.85456 16.6579L10.6914 20L11.5282 16.6579C12.0967 14.3895 12.3756 13.2526 13.1598 12.4684C13.9493 11.6842 15.0809 11.4053 17.3493 10.8368L20.6914 10L17.3493 9.16316Z'
          fill='#FF6224'
        />
      </svg>
    </Stack>
  );
}

function FakeInput() {
  return (
    <Stack width={'100%'} direction={'row'} spacing={'10px'}>
      <Paper
        component='form'
        sx={{
          p: '0px 15px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          borderRadius: '8px',
        }}
      >
        <InputBase
          disabled={true}
          fullWidth
          placeholder='Chat with assistant'
          multiline
          maxRows={3}
          autoComplete='off'
          type='text'
          sx={{
            height: '58px',
            // padding: '0px 11px',
          }}
        />

        <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
        <IconButton
          type='button'
          sx={{ p: '10px' }}
          aria-label='search'
          disabled={true}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
}
