// import { capitalizeFirstLetter } from '@/utils/text/textUtils';
import { Button } from '@components/ui/button';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useRequests } from '@/context/RequestsContext';
import { SafeObject } from '@/utils/safeObject';

import { RequestEmpty } from './_common/Components/RequestEmpty';
import { checkFiltersApplied } from './_common/utils/checkFiltersApplied';
import AgentChats from './AgentChats';
import { AgentIEditorProvider } from './AgentChats/AgentEditorContext';
import RequestList from './RequestList';

const Requests = () => {
  const {
    requests: { data: requestList, isPlaceholderData },
    filters,
  } = useRequests();

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
    <div className='h-screen flex bg-gray-50 overflow-hidden'>
      {/* Dock to Right Button */}
      <div className='fixed top-4 left-[80px] z-50'>
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
            <PanelLeftClose className='h-6 w-6 text-gray-500' />
          ) : (
            <PanelLeftOpen className='h-6 w-6 text-gray-500' />
          )}
        </Button>
      </div>

      {/* AgentIEditorProvider Section */}
      <AgentIEditorProvider>
        <div
          className={`
            transition-all duration-300 ease-in-out
            ${openChat ? 'w-[450px]' : 'w-0'}
            overflow-hidden h-screen sticky top-0 left-0
          `}
        >
          <div className='h-full'>
            <AgentChats />
          </div>
        </div>
      </AgentIEditorProvider>

      {/* Main Content */}
      <div
        className={`flex-1 pt-0 z-10 overflow-scroll overflow-x-hidden h-screen ${
          openChat ? 'w-[calc(100%-450px)]' : ''
        }`}
      >
        
        {showEmptyPage && !checkFiltersApplied({ filters }) ? (
          <RequestEmpty />
        ) : (
          <div className=''>
            <RequestList />
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;
