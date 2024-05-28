import { Stack } from '@mui/material';
import Lottie from 'lottie-react';
import { useRef } from 'react';

import { chat_message_loader } from '@/public/lottie/AssistantChat/chat_message_loader';

function ChatMessageLoader() {
  const lottieRef = useRef();
  return (
    <Stack position={'relative'} height={'100%'} left={'0px'} width={'60px'}>
      <Stack
        width={'50px'}
        height={'100%'}
        position={'absolute'}
        top={'-27px'}
        left={'0px'}
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={chat_message_loader}
          loop={true}
          autoplay={true}
        />
      </Stack>
    </Stack>
  );
}

export default ChatMessageLoader;
