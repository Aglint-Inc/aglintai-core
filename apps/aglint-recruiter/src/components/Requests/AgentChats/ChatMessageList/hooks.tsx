import { useEffect, useRef, useState } from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useUserChat } from '@/src/queries/userchat';

export const useScrollListenerAgentChat = () => {
  const topRef = useRef(null);
  const chatContainerRef = useRef(null);
  const isFetching = useRef(false);
  const { recruiterUser } = useAuthDetails();
  const [initialLoad, setInitialLoad] = useState(true);

  const { isFetchingNextPage, fetchNextPage, hasNextPage, data } = useUserChat({
    user_id: recruiterUser.user_id,
  });

  const list =
    data?.pages
      ?.flatMap((d) => d)
      ?.flatMap((m) => m.list)
      .reverse() || [];

  useEffect(() => {
    if (!initialLoad) {
      if (list.length === 0 || !hasNextPage) return;

      const handleScroll = () => {
        if (!chatContainerRef.current || isFetching.current) return;

        const { scrollTop } = chatContainerRef.current;
        if (scrollTop <= 100 && !isFetchingNextPage) {
          // Threshold at 100px
          isFetching.current = true;
          fetchNextPage().finally(() => {
            isFetching.current = false;
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
  }, [
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    list.length,
    initialLoad,
  ]);

  useEffect(() => {
    if (initialLoad) {
      setTimeout(() => {
        scrollToElementById('bottomRef');
      }, 1000);
      setTimeout(() => {
        setInitialLoad(false);
      }, 2000);
    }
  }, []);

  const scrollToElementById = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return { topRef, chatContainerRef };
};
