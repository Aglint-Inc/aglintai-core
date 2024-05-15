import { Dialog, IconButton, Stack, TextField } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { capitalize } from 'lodash';
import { useEffect, useRef, useState } from 'react';

import { AssistantChat, UserChat, UserChatIcon } from '@/devlink';
import {
  ChatboxBodyHeader,
  ChatboxCandidateListItem,
  ChatboxPage,
  WelcomeMatAssistant,
} from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';

import ChatMessageLoader from '../AssistantChat/ChatMessageLoader';
import UITypography from '../Common/UITypography';
import ResumePreviewer from '../JobApplicationsDashboard/ApplicationCard/ApplicationDetails/ResumePreviewer';
import { formatTimeStamp } from '../JobApplicationsDashboard/utils';
import Loader from '../SignUpComp/Loader/Index';

function Assistant() {
  const { recruiter } = useAuthDetails();
  useEffect(() => {
    if (recruiter.assistant_id) getAllThreads();
  }, [recruiter]);
  const inputSearch = useRef(null);
  const [viewSeach, setViewSearch] = useState(false);
  const [listOfThreads, setListOfThreads] = useState([]);
  const [status, setStatus] = useState('all');
  const [selectedObj, setSelectedObj] = useState({
    name: '',
    email: '',
    time: '',
    messages: [],
    phone: '',
  });

  const [loading, setLoading] = useState(false);
  const [selectedName, setSelectedName] = useState(null);
  async function getAllThreads() {
    setLoading(true);
    const { data: threads } = await supabase
      .from('threads')
      .select()
      .eq('assistant_id', recruiter?.assistant_id);
    if (threads.length) {
      setListOfThreads(
        threads.filter((ele) => ele.candidate_name && ele.candidate_email),
      );
      // setListOfThreads([]);
      handleCardClick(
        threads.filter((ele) => ele.candidate_name && ele.candidate_email)[0],
      );
    }
    setLoading(false);
  }

  async function handleCardClick(thread) {
    const { data } = await axios.post('/api/assistant/listMessages', {
      thread_id: thread.thread_id,
    });

    const messages = data.map((item) => ({
      role: item.role || '',
      value:
        (item.content &&
          item.content[0] &&
          item.content[0].text &&
          item.content[0].text.value) ||
        '',
      metadata: item.metadata,
    }));
    setSelectedObj({
      name: thread.candidate_name,
      email: thread.candidate_email,
      phone: thread.candidate_phone,
      time: dayjs(thread.created_at).format('DD MMM, YYYY'),
      messages: messages,
    });
  }

  let filteredCandidates = listOfThreads
    .filter((ele) => {
      if (status === 'applied' && ele.applied) {
        return ele;
      }
      if (status === 'all') return ele;
    })
    .filter((ele) =>
      selectedName
        ? ele.candidate_name &&
          ele.candidate_name.toLowerCase().includes(selectedName.toLowerCase())
        : ele,
    );
  if (loading) {
    return (
      <Stack
        width={'100%'}
        height={'100vh'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Loader />
      </Stack>
    );
  } else
    return (
      <>
        {listOfThreads.length > 0 ? (
          <ChatboxPage
            slotChatHeader={
              listOfThreads.length ? (
                <ChatboxBodyHeader
                  date={selectedObj.time}
                  email={selectedObj.email}
                  phoneNumber={selectedObj.phone}
                  name={capitalize(selectedObj.name)}
                />
              ) : (
                <></>
              )
            }
            slotSearch={
              <Stack p={'20px'}>
                <Stack spacing={'20px'}>
                  <UITypography>Candidates</UITypography>
                  {!viewSeach ? (
                    <Stack
                      direction={'row'}
                      alignItems={'center'}
                      justifyContent={'space-between'}
                    >
                      <FilterButtons status={status} setStatus={setStatus} />
                      <IconButton
                        onClick={() => {
                          setViewSearch(true);
                          setTimeout(() => {
                            inputSearch.current.focus();
                          }, 100);
                        }}
                      >
                        <SearchIcon />
                      </IconButton>
                    </Stack>
                  ) : (
                    <TextField
                      inputRef={inputSearch}
                      onBlur={() => {
                        if (inputSearch.current.value === '')
                          setViewSearch(false);
                      }}
                      variant='outlined'
                      onChange={(e) => {
                        setSelectedName(e.target.value);
                      }}
                    />
                  )}
                </Stack>
              </Stack>
            }
            slotChatBody={
              listOfThreads.length ? (
                <Conversation messages={selectedObj?.messages} />
              ) : (
                <Stack
                  height={'80vh'}
                  width={'100%'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  flexDirection={'column'}
                  spacing={'10px'}
                >
                  <ChatIcon />

                  <UITypography color={'grey.600'}>
                    No messages found
                  </UITypography>
                </Stack>
              )
            }
            slotCandidateList={
              listOfThreads.length ? (
                filteredCandidates.map((thread, i) => {
                  return (
                    <ChatboxCandidateListItem
                      isApplied={thread.applied}
                      isSelected={selectedObj.email === thread.candidate_email}
                      onclickProps={{
                        onClick: () => {
                          handleCardClick(thread);
                        },
                      }}
                      key={i}
                      name={capitalize(thread.candidate_name)}
                      email={thread.candidate_email}
                      date={formatTimeStamp(thread.created_at)}
                    />
                  );
                })
              ) : (
                <Stack
                  height={'80vh'}
                  width={'100%'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  flexDirection={'column'}
                  spacing={'10px'}
                >
                  <ChatIcon />
                  <UITypography color={'grey.600'}>
                    No candidates found
                  </UITypography>
                </Stack>
              )
            }
          />
        ) : (
          <WelcomeMatAssistant />
        )}
      </>
    );
}

export default Assistant;

function FilterButtons({ status, setStatus }) {
  return (
    <>
      <Stack
        direction={'row'}
        spacing={'10px'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Stack
          border={'1px solid'}
          borderColor={'grey.300'}
          borderRadius={'100px'}
          color={'grey.800'}
          py={'8px'}
          px={'19px'}
          bgcolor={status !== 'applied' && 'grey.200'}
          sx={{
            cursor: 'pointer',
          }}
          onClick={() => {
            setStatus('all');
          }}
        >
          All
        </Stack>
        <Stack
          bgcolor={status === 'applied' && 'grey.200'}
          border={'1px solid'}
          borderColor={'grey.300'}
          borderRadius={'100px'}
          color={'grey.800'}
          py={'8px'}
          px={'19px'}
          sx={{
            cursor: 'pointer',
          }}
          onClick={() => {
            setStatus('applied');
          }}
        >
          Applied
        </Stack>
      </Stack>
    </>
  );
}

function Conversation({ messages }) {
  const [resume, setResume] = useState(false);
  return (
    <>
      {messages.length ? (
        messages.map((message, i) => {
          return (
            <>
              {message.role === 'assistant' && (
                <AssistantChat
                  isLogoVisible={false}
                  isMessageVisible={
                    message.value !== 'loading' && message.value
                  }
                  slotLottieLoadingChat={<ChatMessageLoader />}
                  textMessage={message.value}
                  key={i}
                  slotLogo={<></>}
                />
              )}
              {message.role === 'user' && message?.metadata?.file_name && (
                <Stack mt={'10px'} direction={'row'} justifyContent={'end'}>
                  <UserChatIcon
                    isViewResumeVisible={true}
                    onClickViewResume={{
                      onClick: () => {
                        setResume(true);
                      },
                    }}
                    textChat={message?.metadata?.file_name}
                  />
                  <Dialog
                    sx={{
                      '& .MuiDialog-paper': {
                        borderRadius: '0px !important',
                        border: 'none !important',
                        height: '90vh',
                      },
                      '.MuiDialog-container': {
                        height: 'auto',
                      },
                    }}
                    fullWidth
                    maxWidth={'lg'}
                    open={resume}
                    onClose={() => setResume(false)}
                  >
                    <ResumePreviewer url={message?.metadata?.file_path} />
                  </Dialog>
                </Stack>
              )}
              {message.role === 'user' && (
                <UserChat textMessage={message.value} key={i} />
              )}
            </>
          );
        })
      ) : (
        <Stack
          mt={10}
          height={'100vh'}
          width={'100%'}
          direction={'row'}
          justifyContent={'center'}
        >
          <Loader />
        </Stack>
      )}
    </>
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
        fill='#C2C8CC'
        // style='fill:#C2C8CC;fill:color(display-p3 0.7600 0.7827 0.8000);fill-opacity:1;'
      />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M0 6C0 9.31371 2.68629 12 6 12C7.47685 12 8.82908 11.4664 9.87442 10.5815L14.6464 15.3536C14.8417 15.5488 15.1583 15.5488 15.3536 15.3536C15.5488 15.1583 15.5488 14.8417 15.3536 14.6464L10.5815 9.87442C11.4664 8.82908 12 7.47685 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6ZM6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z'
        fill='#68737D'
        // style='fill:#68737D;fill:color(display-p3 0.4078 0.4510 0.4902);fill-opacity:1;'
      />
    </svg>
  );
}
