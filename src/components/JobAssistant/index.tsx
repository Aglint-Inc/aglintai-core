import {
  Divider,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { marked } from 'marked';
import { useEffect } from 'react';

import {
  AssistantCandidateDetails,
  ChatMessage,
  JobAssist,
  JobAssistCards,
  JobAssistCardSmall,
} from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobAssistantContext } from '@/src/context/JobAssistant';
import {
  chatusers,
  getResumeMatched,
  getSuggestedPrompts,
  suggestions,
} from '@/src/context/JobAssistant/utils';
import { ScrollList } from '@/src/utils/framer-motions/Animation';

import AUIButton from '../Common/AUIButton';
import { CalculatingResumeScore } from '../Common/Lotties/Calculating';
import MuiAvatar from '../Common/MuiAvatar';
let shiftEnabled = false;
function JobAssistant() {
  const { recruiter, recruiterUser } = useAuthDetails();
  const {
    handleChat,
    messages,
    textMessage,
    setTextMessage,
    inputRef,
    createNewChat,
    currentChat,
    resLoading,
    jobAssistantChats,
    switchChat,
  } = useJobAssistantContext();

  useEffect(() => {
    const TypoElement = document.getElementById('chat_scroll');
    if (TypoElement)
      TypoElement.scrollTop = TypoElement && TypoElement.scrollHeight;
  }, [messages]);

  let suggestionsPrompts = [];
  // let resetText: () => void;
  return (
    <Stack
      direction={'row'}
      // flexDirection={'column'}
      // justifyContent={'center'}
      // alignItems={'center'}
      height={'100vh'}
      width={'100%'}
      // mt={'20px'}
    >
      <Stack
        width={'20%'}
        border={'1px solid'}
        borderColor={'grey.200'}
        p={'10px'}
      >
        <Stack
          width={'100%'}
          // bgcolor={'grey.300'}
          // p={'5px'}
          // borderRadius={'5px'}
          // spacing={'10px'}
          mb={'10px'}
        >
          <AUIButton
            variant='outlined'
            onClick={() => {
              if (messages.length !== 0) createNewChat();
            }}
            startIcon={<PlusIcon />}
            disabled={resLoading}
          >
            Create New Chat
          </AUIButton>
        </Stack>

        <Stack
          spacing={'10px'}
          alignItems={'center'}
          width={'100%'}
          direction={'row'}
          mb={'10px'}
          justifyContent={'space-between'}
        >
          <Typography width={'70px'} variant='body2'>
            Chat List
          </Typography>

          <Divider
            sx={{
              width: '70%',
            }}
          />
        </Stack>
        <Stack spacing={'10px'} overflow={'auto'}>
          {jobAssistantChats.map((ele, i) => {
            const time = dayjs(ele.created_at).fromNow();

            return (
              <Stack
                key={i}
                bgcolor={currentChat.id === ele.id ? 'grey.200' : 'grey.100'}
                p={'10px'}
                borderRadius={'5px'}
                spacing={'10px'}
                sx={{
                  cursor: !resLoading && currentChat.id !== ele.id && 'pointer',
                  '&:hover': {
                    bgcolor:
                      !resLoading && currentChat.id !== ele.id && 'blue.100',
                  },
                }}
                onClick={() =>
                  (!resLoading || currentChat.id !== ele.id) &&
                  switchChat(ele.id)
                }
              >
                <Stack
                  // justifyContent={'space-around'}
                  direction={'row'}
                  alignItems={'center'}
                >
                  <Stack color={'red.300'} width={'40px'} height={'20px'}>
                    <ChatIcon />
                  </Stack>
                  <Typography
                    className='one-one-line-clamp'
                    width={'85%'}
                    variant='body1'
                  >
                    {ele.last_message || 'New assistant chat'}
                  </Typography>
                </Stack>

                <Stack width={'100%'} direction={'row'} justifyContent={'end'}>
                  <Typography
                    className='one-one-line-clamp'
                    // width={'100%'}
                    variant='body2'
                  >
                    {time}
                  </Typography>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
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
              messages &&
              messages.length &&
              messages.map((ele, i) => {
                const { sender, content } = ele;
                const { searchArguments, result_candidates, active, message } =
                  content;
                const candidates = result_candidates as any[];
                if (searchArguments) {
                  suggestionsPrompts = getSuggestedPrompts(
                    searchArguments,
                    candidates,
                  );
                }

                return (
                  <ScrollList key={i} uniqueKey={i}>
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
                              <Typography
                                variant='body2'
                                dangerouslySetInnerHTML={{
                                  __html: marked(
                                    message
                                      ? message?.replaceAll(
                                          /.*\b[Aa]pplication.[Ii][Dd].*\n/g,
                                          '',
                                        )
                                      : '',
                                  ),
                                }}
                              ></Typography>
                            )}
                          </>
                        )
                      }
                      textHeading={sender}
                      isMessageCardVisible={
                        sender === chatusers.assistant &&
                        candidates &&
                        candidates.length !== 0
                      }
                      slotMessageCard={
                        sender === chatusers.assistant &&
                        !active &&
                        candidates
                          .sort((a, b) => b.overall_score - a.overall_score)
                          .map((candidate, i) => {
                            const {
                              city,
                              state,
                              country,
                              experience_in_months,
                              first_name,
                              last_name,
                              overall_score,
                            } = candidate;
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
                                    color: resume_match.bgColor,
                                  },
                                }}
                                textMatchCount={`${resume_match.text}-${candidate.overall_score}%`}
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
                                isLocationVisible={city || state || country}
                                // isExperienceVisible={experience_in_months}
                                isRelevantSkillVisible={false}
                              />
                            );
                          })
                      }
                    />
                  </ScrollList>
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
                      setTextMessage(ele);
                      inputRef.current.focus();
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
              <SuggestedPrompts suggestionsPrompts={suggestionsPrompts} />
            }
            slotInput={
              <>
                {/* <TipTapAIEditor showWarnOnEdit={false} /> */}
                <Stack width={'100%'} direction={'row'} spacing={'10px'}>
                  <Paper
                    component='form'
                    sx={{
                      p: '2px 4px',
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <Stack px={'3px'}>
                      <AssistantLogo width={'20px'} height={'20px'} />
                    </Stack>
                    <InputBase
                      disabled={resLoading}
                      fullWidth
                      value={textMessage}
                      inputRef={inputRef}
                      onChange={(event) => {
                        const text = event?.target?.value as string;
                        setTextMessage(text);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Shift') {
                          shiftEnabled = true;
                        }

                        if (
                          !shiftEnabled &&
                          e.key === 'Enter' &&
                          textMessage.trim().length !== 0
                        ) {
                          handleChat();

                          if (!shiftEnabled) {
                            e.preventDefault();
                          }
                        }
                      }}
                      onKeyUp={(e) => {
                        if (e.key === 'Shift') {
                          shiftEnabled = false;
                        }
                      }}
                      placeholder='Chat with assistant'
                      multiline
                      maxRows={3}
                      autoComplete='off'
                      type='text'
                    />

                    <Divider
                      sx={{ height: 28, m: 0.5 }}
                      orientation='vertical'
                    />
                    <IconButton
                      type='button'
                      sx={{ p: '10px' }}
                      aria-label='search'
                      disabled={!textMessage.trim()}
                      onClick={handleChat}
                    >
                      <SendIcon />
                    </IconButton>
                  </Paper>
                </Stack>
              </>
            }
          />
        )}
      </Stack>
    </Stack>
  );
}

export default JobAssistant;

function SuggestedPrompts({ suggestionsPrompts }) {
  const { messages, textMessage, setTextMessage, inputRef, resLoading } =
    useJobAssistantContext();
  return (
    <>
      {!resLoading && messages.length && !textMessage
        ? [...suggestionsPrompts, ...suggestions.common].map((ele, i) => {
            return (
              <ScrollList key={i} uniqueKey={i}>
                <JobAssistCardSmall
                  key={i}
                  textSuggestion={ele}
                  onClickCard={{
                    onClick: () => {
                      setTextMessage(ele);
                      inputRef.current.focus();
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

function SendIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      role='img'
      className='iconify iconify--iconoir'
      width='25'
      height='25'
      preserveAspectRatio='xMidYMid meet'
      viewBox='0 0 24 24'
    >
      <path
        fill='none'
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='1.5'
        d='M22 12L3 20l3.563-8L3 4zM6.5 12H22'
      ></path>
    </svg>
  );
}

export function ChatIcon() {
  return (
    <svg
      width='43'
      height='43'
      viewBox='0 0 43 43'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M13.624 31.75C14.3896 31.75 15.0186 31.9961 15.5107 32.4883C16.0029 32.9805 16.249 33.6094 16.249 34.375V38.3125L24.2881 32.2422C24.7803 31.9141 25.2998 31.75 25.8467 31.75H37.249C38.0146 31.75 38.6436 31.5039 39.1357 31.0117C39.6279 30.5195 39.874 29.8906 39.874 29.125V5.5C39.874 4.73437 39.6279 4.10547 39.1357 3.61328C38.6436 3.12109 38.0146 2.875 37.249 2.875H5.74902C4.9834 2.875 4.35449 3.12109 3.8623 3.61328C3.37012 4.10547 3.12402 4.73437 3.12402 5.5V29.125C3.12402 29.8906 3.37012 30.5195 3.8623 31.0117C4.35449 31.5039 4.9834 31.75 5.74902 31.75H13.624ZM0.499022 5.5C0.553709 4.02343 1.07324 2.79297 2.05762 1.80859C3.04199 0.824215 4.27246 0.304684 5.74902 0.249997H37.249C38.7256 0.304684 39.9561 0.824215 40.9404 1.80859C41.9248 2.79297 42.4443 4.02343 42.499 5.5V29.125C42.4443 30.6016 41.9248 31.832 40.9404 32.8164C39.9561 33.8008 38.7256 34.3203 37.249 34.375H25.8467L15.7568 42.0039C15.3193 42.2773 14.8545 42.3047 14.3623 42.0859C13.8701 41.8672 13.624 41.4844 13.624 40.9375V37V34.375H10.999H5.74902C4.27246 34.3203 3.04199 33.8008 2.05762 32.8164C1.07324 31.832 0.553709 30.6016 0.499022 29.125V5.5Z'
        fill='black'
        // style='fill:#C2C8CC;fill:color(display-p3 0.7600 0.7827 0.8000);fill-opacity:1;'
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      role='img'
      className='iconify iconify--iconoir'
      width='16'
      height='16'
      preserveAspectRatio='xMidYMid meet'
      viewBox='0 0 24 24'
    >
      <path
        fill='none'
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='1.5'
        d='M6 12h6m6 0h-6m0 0V6m0 6v6'
      ></path>
    </svg>
  );
}
