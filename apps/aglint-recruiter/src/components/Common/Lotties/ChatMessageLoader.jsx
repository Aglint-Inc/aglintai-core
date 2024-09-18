import Lottie from 'lottie-react';
import { useRef } from 'react';

import { chat_message_loader } from '@/public/lottie/AssistantChat_chat_message_loader';

function ChatMessageLoader() {
  const lottieRef = useRef();
  return (
    <div className='relative left-0 h-full w-[60px]'>
      <div className='absolute -top-[27px] left-0 h-full w-[50px]'>
        <Lottie
          lottieRef={lottieRef}
          animationData={chat_message_loader}
          loop={true}
          autoplay={true}
        />
      </div>
    </div>
  );
}

export default ChatMessageLoader;
