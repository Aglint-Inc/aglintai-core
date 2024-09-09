import { RequestAgentEmpty } from '@devlink2/RequestAgentEmpty';
import { useEffect, useState } from 'react';

import { useRequests } from '@/context/RequestsContext';
import { SafeObject } from '@/utils/safeObject';
// import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import { Button } from '@components/ui/button';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import AgentChats from './AgentChats';
import { AgentIEditorProvider } from './AgentChats/AgentEditorContext';
import RequestList from './RequestList';

const Requests = () => {
  const {
    requests: { data: requestList, isPlaceholderData },
    filters,
  } = useRequests();
  const isNotApplied =
    !filters.is_new &&
    filters.status.length === 0 &&
    filters.type.length === 0 &&
    !filters.title &&
    !filters.created_at &&
    filters.jobs.length === 0 &&
    filters.applications.length === 0 &&
    filters.assigneeList.length === 0 &&
    filters.assignerList.length === 0;

  const showEmptyPage =
    !isPlaceholderData &&
    Boolean(
      !(SafeObject.values(requestList) ?? []).flatMap((requests) => requests)
        .length,
    );

  const [openChat, setOpenChat] = useState(
    localStorage.getItem('openChat') === 'true' ? true : false,
  );

  useEffect(() => {
    setOpenChat(localStorage.getItem('openChat') === 'true' ? true : false);
  }, [localStorage.getItem('openChat')]);

  return (
    <div className='relative min-h-screen flex'>
      {/* Dock to Right Button */}
      <div className='fixed top-4 left-16 z-50'>
        <Button
          variant='ghost'
          size='sm'
          onClick={() => {
            const newOpenChat = !openChat;
            localStorage.setItem('openChat', newOpenChat.toString());
            setOpenChat(newOpenChat);
          }}
        >
          {openChat ? (
            <PanelLeftClose className='h-6 w-6' />
          ) : (
            <PanelLeftOpen className='h-6 w-6' />
          )}
        </Button>
      </div>

      {/* AgentIEditorProvider Section */}
      <AgentIEditorProvider>
        <div
          className={`
            transition-all duration-300 ease-in-out
            ${openChat ? 'w-[450px]' : 'w-0'}
            overflow-hidden h-screen
          `}
        >
          <div className='h-full sticky top-0 z-998'>
            <AgentChats />
          </div>
        </div>
      </AgentIEditorProvider>

      {/* Main Content */}
      <div
        className={`flex-1 p-4 z-999 ${
          openChat
            ? 'w-[calc(100%-450px)]'
            : 'container w-full max-w-[1200px] mx-auto'
        }`}
      >
        {showEmptyPage && isNotApplied ? (
          <RequestAgentEmpty />
        ) : (
          <RequestList />
        )}
      </div>
    </div>
  );
};

export default Requests;
