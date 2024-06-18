import { Divider, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import { ButtonOutlined } from '@/devlink/ButtonOutlined';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { useJobAssistantContext } from '@/src/context/JobAssistant';

function LeftPanel() {
  const {
    messages,

    createNewChat,
    currentChat,
    resLoading,
    jobAssistantChats,
    fetching,
    switchChat,
  } = useJobAssistantContext();

  useEffect(() => {
    const TypoElement = document.getElementById('chat_scroll');
    if (TypoElement)
      TypoElement.scrollTop = TypoElement && TypoElement.scrollHeight;
  }, [messages]);
  return (
    <Stack
      width={'20%'}
      border={'1px solid'}
      borderColor='var(--neutral-6)'
      p={'var(--space-2)'}
    >
      <Stack width={'100%'} mb={'var(--space-2)'}>
        <ButtonOutlined
          isDisabled={resLoading || fetching}
          iconName='Add'
          textButton='Create New Chat'
          size={2}
          isLeftIcon
          onClickButton={{
            onClick: () => {
              if (jobAssistantChats[0]?.last_message) {
                createNewChat();
              } else {
                switchChat(jobAssistantChats[0]?.id);
              }
            },
          }}
        />
      </Stack>

      <Stack
        spacing={'var(--space-2)'}
        alignItems={'center'}
        width={'100%'}
        direction={'row'}
        mb={'var(--space-2)'}
        justifyContent={'space-between'}
      >
        <Typography width={'70px'} variant='body1'>
          Chat List
        </Typography>

        <Divider
          sx={{
            width: '70%',
          }}
        />
      </Stack>
      <Stack spacing={'var(--space-2)'} overflow={'auto'}>
        {jobAssistantChats.map((ele, i) => {
          const time = dayjs(ele.created_at).fromNow();

          return (
            <Stack
              key={i}
              bgcolor={
                currentChat.id === ele.id
                  ? 'var(--neutral-2)'
                  : 'var(--neutral-1)'
              }
              p={'var(--space-2)'}
              borderRadius={'var(--space-1)'}
              spacing={'var(--space-2)'}
              sx={{
                cursor: !resLoading && currentChat.id !== ele.id && 'pointer',
                '&:hover': {
                  bgcolor:
                    !resLoading &&
                    currentChat.id !== ele.id &&
                    'var(--neutral-1)',
                },
              }}
              onClick={() => {
                if (!resLoading && currentChat.id !== ele.id) {
                  switchChat(ele.id);
                }
              }}
            >
              <Stack
                // justifyContent={'space-around'}
                direction={'row'}
                alignItems={'center'}
              >
                <Stack
                  color={'var(--error-11)'}
                  width={'var(--space-7)'}
                  height={'var(--space-5)'}
                >
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
                  variant='body1'
                >
                  {time}
                </Typography>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}

export default LeftPanel;

// function PlusIcon() {
//   return (
//     <GlobalIcon iconName='add' />
// <svg
//   xmlns='http://www.w3.org/2000/svg'
//   aria-hidden='true'
//   role='img'
//   className='iconify iconify--iconoir'
//   width='16'
//   height='16'
//   preserveAspectRatio='xMidYMid meet'
//   viewBox='0 0 24 24'
// >
//   <path
//     fill='none'
//     stroke='currentColor'
//     stroke-linecap='round'
//     stroke-linejoin='round'
//     stroke-width='1.5'
//     d='M6 12h6m6 0h-6m0 0V6m0 6v6'
//   ></path>
// </svg>
//   );
// }

function ChatIcon() {
  return (
    <GlobalIcon iconName='chat_bubble' />
    // <svg
    //   width='43'
    //   height='43'
    //   viewBox='0 0 43 43'
    //   fill='none'
    //   xmlns='http://www.w3.org/2000/svg'
    // >
    //   <path
    //     d='M13.624 31.75C14.3896 31.75 15.0186 31.9961 15.5107 32.4883C16.0029 32.9805 16.249 33.6094 16.249 34.375V38.3125L24.2881 32.2422C24.7803 31.9141 25.2998 31.75 25.8467 31.75H37.249C38.0146 31.75 38.6436 31.5039 39.1357 31.0117C39.6279 30.5195 39.874 29.8906 39.874 29.125V5.5C39.874 4.73437 39.6279 4.10547 39.1357 3.61328C38.6436 3.12109 38.0146 2.875 37.249 2.875H5.74902C4.9834 2.875 4.35449 3.12109 3.8623 3.61328C3.37012 4.10547 3.12402 4.73437 3.12402 5.5V29.125C3.12402 29.8906 3.37012 30.5195 3.8623 31.0117C4.35449 31.5039 4.9834 31.75 5.74902 31.75H13.624ZM0.499022 5.5C0.553709 4.02343 1.07324 2.79297 2.05762 1.80859C3.04199 0.824215 4.27246 0.304684 5.74902 0.249997H37.249C38.7256 0.304684 39.9561 0.824215 40.9404 1.80859C41.9248 2.79297 42.4443 4.02343 42.499 5.5V29.125C42.4443 30.6016 41.9248 31.832 40.9404 32.8164C39.9561 33.8008 38.7256 34.3203 37.249 34.375H25.8467L15.7568 42.0039C15.3193 42.2773 14.8545 42.3047 14.3623 42.0859C13.8701 41.8672 13.624 41.4844 13.624 40.9375V37V34.375H10.999H5.74902C4.27246 34.3203 3.04199 33.8008 2.05762 32.8164C1.07324 31.832 0.553709 30.6016 0.499022 29.125V5.5Z'
    //     fill='black'
    //   />
    // </svg>
  );
}
