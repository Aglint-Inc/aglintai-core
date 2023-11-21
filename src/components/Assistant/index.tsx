import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Chip, IconButton, Stack, TextField } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { capitalize } from 'lodash';
import { useEffect, useRef, useState } from 'react';

import { AssistantChat, UserChat } from '@/devlink';
import {
  ChatboxBodyHeader,
  ChatboxCandidateListItem,
  ChatboxPage,
} from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabaseClient';

import ChatMessageLoader from '../AssistantChat/ChatMessageLoader';
import UITypography from '../Common/UITypography';
import Loader from '../SignUpComp/Loader/Index';

function Assistant() {
  const { recruiter } = useAuthDetails();
  useEffect(() => {
    if (recruiter.assistant_id) getAllThreads();
  }, [recruiter]);
  const inputSearch = useRef(null);
  const [viewSeach, setViewSearch] = useState(false);
  const [listOfThreads, setListOfThreads] = useState([]);
  const [selectedObj, setSelectedObj] = useState({
    name: '',
    email: '',
    time: '',
    messages: [],
    phone: '',
  });

  const [selectedName, setSelectedName] = useState(null);
  async function getAllThreads() {
    const { data: threads } = await supabase
      .from('threads')
      .select()
      .eq('assistant_id', recruiter?.assistant_id);
    if (threads.length) {
      setListOfThreads(threads);
      handleCardClick(threads[0]);
    }
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
      name: thread.user_name,
      email: thread.user_email,
      phone: thread.user_phone,
      time: dayjs(thread.created_at).format('DD MMM, YYYY'),
      messages: messages,
    });
  }
  return listOfThreads.length ? (
    <ChatboxPage
      slotChatHeader={
        <ChatboxBodyHeader
          date={selectedObj.time}
          email={selectedObj.email}
          phoneNumber={selectedObj.phone}
          name={capitalize(selectedObj.name)}
        />
      }
      slotSearch={
        <Stack p={'20px'}>
          {!viewSeach ? (
            <Stack direction={'row'} justifyContent={'space-between'}>
              <UITypography>Candidates</UITypography>
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
                if (inputSearch.current.value === '') setViewSearch(false);
              }}
              variant='outlined'
              onChange={(e) => {
                setSelectedName(e.target.value);
              }}
            />
          )}
        </Stack>
      }
      slotChatBody={<Conversation messages={selectedObj?.messages} />}
      slotCandidateList={listOfThreads
        .filter((ele) =>
          selectedName
            ? ele.user_name &&
              ele.user_name.toLowerCase().includes(selectedName.toLowerCase())
            : ele,
        )
        .map((thread, i) => {
          if (thread.user_email)
            return (
              <ChatboxCandidateListItem
                isSelected={selectedObj.email === thread.user_email}
                onclickProps={{
                  onClick: () => {
                    handleCardClick(thread);
                  },
                }}
                key={i}
                name={capitalize(thread.user_name)}
                email={thread.user_email}
                date={dayjs(thread.created_at).format('DD MMM, YYYY')}
              />
            );
        })}
    />
  ) : (
    <Stack
      height={'100vh'}
      width={'100%'}
      direction={'row'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      No candidates found
    </Stack>
  );
}

export default Assistant;

function Conversation({ messages }) {
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
                <Stack direction={'row'} justifyContent={'end'}>
                  <Chip
                    icon={<PictureAsPdfIcon />}
                    variant='filled'
                    label={message?.metadata?.file_name}
                  />
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
