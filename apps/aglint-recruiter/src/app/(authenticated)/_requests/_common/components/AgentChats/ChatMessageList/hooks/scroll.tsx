import { useEffect, useRef } from 'react';

import { useAgentChatStore } from '../store';

export const useScrollListenerAgentChat = ({ fetchNextPage }) => {
  const { isFetchingNextPage, hasNextPage, chatList, tempLoading } =
    useAgentChatStore((state) => ({
      isFetchingNextPage: state.isFetchingNextPage,
      hasNextPage: state.hasNextPage,
      chatList: state.chatList,
      tempLoading: state.tempLoading,
    }));
  const topRef = useRef(null);
  const chatContainerRef = useRef(null);
  const isFetching = useRef(false);

  useEffect(() => {
    if (!tempLoading) {
      if (chatList.length === 0 || !hasNextPage) return;

      const handleScroll = () => {
        if (!chatContainerRef.current || isFetching.current) return;

        const { scrollTop, scrollHeight, clientHeight } =
          chatContainerRef.current;
        if (scrollTop <= 100 && !isFetchingNextPage) {
          // Threshold at 100px
          isFetching.current = true;
          fetchNextPage().finally(() => {
            isFetching.current = false;
            chatContainerRef.current.scrollTop =
              scrollHeight - clientHeight - 50;
          });
        }
      };

      const currentChatContainer = chatContainerRef.current;
      if (currentChatContainer) {
        currentChatContainer.addEventListener('scroll', handleScroll);
      }

      return () => {
        if (currentChatContainer) {
          currentChatContainer.removeEventListener('scroll', handleScroll);
        }
      };
    }
  }, [isFetchingNextPage, hasNextPage, chatList.length, tempLoading]);

  return { topRef, chatContainerRef };
};

export const scrollToElementById = ({
  id,
  behavior = 'smooth',
}: {
  id: string;
  behavior?: 'auto' | 'smooth' | 'instant';
}) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior });
  }
};
