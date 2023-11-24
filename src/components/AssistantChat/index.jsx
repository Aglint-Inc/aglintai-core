import { Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

import {
  AssistantChat,
  ChatBox,
  ChatIcon,
  ChatInput,
  ChatWelcome,
  PdfSelected,
  UserChat,
  UserChatIcon,
} from '@/devlink';
import { useJobAssistantContext } from '@/src/context/JobAssistant';

import ChatMessageLoader from './ChatMessageLoader';
import MuiAvatar from '../Common/MuiAvatar';
const totalCharacter = 250;
function ChatMessages() {
  const {
    companyDetails,
    messages,
    createNewMessage,
    inputRef,
    selectedFile,
    setSelectedFile,
    closeChat,
  } = useJobAssistantContext();
  const [openChat, setOpenChat] = useState(false);

  const handleFileRemove = () => {
    setSelectedFile(null);
  };
  useEffect(() => {
    const TypoElement = document.getElementById('chat_scroll');
    TypoElement.scrollTop = TypoElement.scrollHeight;
  }, [messages]);
  return (
    <Stack
      sx={{
        background:
          'linear-gradient(0deg, rgba(1,0,14,1) 0%, rgba(14,9,83,1) 86%)',
      }}
      position={'relative'}
      width={'100%'}
      height={'100vh'}
    >
      <FileUpload />

      <Stack position={'absolute'} bottom={10} right={10}>
        <Stack
          sx={{
            transform: !openChat ? 'translateY(50px)' : 'none',
            height: openChat ? '100%' : 0,
            opacity: openChat ? 1 : 0,
            transition: `transform ${openChat ? '0.4s' : '0.2s'},  opacity ${
              openChat ? '0.4s' : '0.2s'
            }`,
          }}
          pr={'30px'}
        >
          <ChatBox
            onClickScroll={{
              id: 'chat_scroll',
            }}
            textCompanyName={companyDetails?.name}
            slotLogo={
              <MuiAvatar
                height='40px'
                width='40px'
                src={companyDetails?.logo}
              />
            }
            slotChat={<ChatConversation />}
            slotChatInput={
              <>
                {closeChat.chat_end ? (
                  <>
                    {/* <Alert severity={closeChat.applied ? 'success' : ''}>
                      {closeChat.applied
                        ? 'Application submitted successfully!'
                        : 'Thanks or your time'}
                    </Alert> */}
                  </>
                ) : (
                  <ChatInput
                    isSlotTypingVisible={messages.length}
                    onClickAttach={{
                      onClick: () => {
                        document.getElementById('chat-file').click();
                      },
                    }}
                    onClickSend={{
                      onClick: () => {
                        createNewMessage();
                      },
                    }}
                    slotTypeInput={
                      <Stack>
                        <Stack alignItems={'center'} direction={'row'}>
                          <TextField
                            variant='standard'
                            onKeyDownCapture={(e) => {
                              if (e.ctrlKey && e.key === 'Enter') {
                                createNewMessage();
                              }
                            }}
                            inputProps={{ maxLength: totalCharacter }}
                            inputRef={inputRef}
                            fullWidth
                            multiline
                            minRows={1}
                            maxRows={8}
                            placeholder='Enter your message here (cmd+enter)'
                            margin={'none'}
                          />
                        </Stack>

                        {selectedFile && (
                          <Stack
                            height={'40px'}
                            alignItems={'center'}
                            direction={'row'}
                          >
                            <PdfSelected
                              textName={selectedFile.name}
                              onClickClose={{ onClick: handleFileRemove }}
                            />
                          </Stack>
                        )}
                      </Stack>
                    }
                  />
                )}
              </>
            }
          />
        </Stack>
        <Stack alignItems={'end'}>
          <ChatIcon
            onClickChat={{
              onClick: () => {
                setOpenChat((pre) => !pre);
              },
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ChatMessages;

export function ChatConversation() {
  const { companyDetails, messages, setMessages, createNewMessage } =
    useJobAssistantContext();

  function startNewChat() {
    setMessages((pre) => [
      {
        role: 'user',
        value: 'Yes, please',
        metadata: {},
      },
      {
        role: 'assistant',
        value: `Hi there! I'm the AI assistant for ${companyDetails.name}. Can I assist you in finding a suitable job opportunity today?`,
        metadata: {},
      },
      ...pre,
    ]);
    createNewMessage();
  }
  return (
    <>
      {messages.length ? (
        <>
          {messages.map((message, i) => {
            return (
              <>
                {message.role === 'assistant' && (
                  <AssistantChat
                    isLoadingChatVisible={
                      message.value === 'loading' || message.value === ''
                    }
                    isMessageVisible={
                      message.value !== 'loading' && message.value
                    }
                    slotLottieLoadingChat={<ChatMessageLoader />}
                    textMessage={message.value}
                    slotLogo={
                      <MuiAvatar
                        height='30px'
                        width='30px'
                        src={companyDetails?.logo}
                      />
                    }
                    key={i}
                  />
                )}
                {message.role === 'user' && message?.metadata?.file_name && (
                  <Stack mt={'10px'} direction={'row'} justifyContent={'end'}>
                    <UserChatIcon textChat={message?.metadata?.file_name} />
                  </Stack>
                )}
                {message.role === 'user' && (
                  <UserChat textMessage={message.value} key={i} />
                )}
              </>
            );
          })}
        </>
      ) : (
        <ChatWelcome
          textCompanyName={companyDetails?.name}
          onClickYesPlease={{ onClick: startNewChat }}
        />
      )}
    </>
  );
}

const FileUpload = () => {
  const { setSelectedFile } = useJobAssistantContext();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div style={{ display: 'none' }}>
      <input
        accept='.pdf,.csv'
        id='chat-file'
        type='file'
        onChange={handleFileChange}
      />
    </div>
  );
};
