import Lottie from 'lottie-react';
import { useRef } from 'react';

import { chat_message_loader } from '@/public/lottie/AssistantChat_chat_message_loader';

function ChatMessageLoader() {
  const lottieRef = useRef();
  return (
    <div className="relative h-full left-0 w-[60px]">
      <div className="w-[50px] h-full absolute -top-[27px] left-0">
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
