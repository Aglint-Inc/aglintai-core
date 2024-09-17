import { Button } from '@components/ui/button';
import { Skeleton } from '@components/ui/skeleton';
import { Info, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRequests } from '@/context/RequestsContext';
import { SafeObject } from '@/utils/safeObject';

import GlobalEmpty from '../Common/GlobalEmpty';
import { RequestEmpty } from './_common/components/RequestEmpty';
import { REQUEST_SESSIONS_DEFAULT_DATA } from './_common/constant';
import { useRequestCount } from './_common/hooks';
import { checkFiltersApplied } from './_common/utils/checkFiltersApplied';
import AgentChats from './AgentChats';
import { AgentIEditorProvider } from './AgentChats/AgentEditorContext';
import Header from './Components/Header';
import KanbanSection from './Components/KanbanSection';
import ListSection from './Components/ListSection';
import ScrollableSection from './Components/ScrollableSection';

const Requests = () => {
  const {
    requests: { data: requestList, isPlaceholderData, isFetched },
    filters,
  } = useRequests();
  const [openChat, setOpenChat] = useState(
    localStorage.getItem('openChat') === 'true' ? true : false,
  );
  const [view, setView] = useState<'list' | 'kanban'>('list');

  const { recruiterUser } = useAuthDetails();
  const { data: requestCount } = useRequestCount();

  const defaults = REQUEST_SESSIONS_DEFAULT_DATA.map(
    ({ sectionName, ...rest }) => ({
      ...rest,
      sectionName,
      requests: requestList?.[sectionName],
    }),
  );

  const showEmptyPage =
    !isPlaceholderData &&
    !checkFiltersApplied({ filters }) &&
    Boolean(
      !(SafeObject.values(requestList) ?? []).flatMap((requests) => requests)
        .length,
    );

  const isRequestListEmpty =
    checkFiltersApplied({ filters }) &&
    isFetched &&
    defaults.flatMap((d) => d.requests).length === 0;

  const open_request = requestCount?.all_open_request || 0;
  const completed_percentage =
    Math.floor(
      (requestCount?.card.completed_request /
        (open_request + requestCount?.card.completed_request)) *
        100,
    ) || 0;

  useEffect(() => {
    setOpenChat(localStorage.getItem('openChat') === 'true' ? true : false);
  }, [localStorage.getItem('openChat')]);

  return (
    <div className='flex h-screen overflow-hidden bg-gray-50'>
      {/* Dock to Right Button */}
      <div className='fixed left-[80px] top-4 z-50'>
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
          className={`transition-all duration-300 ease-in-out ${openChat ? 'w-[450px]' : 'w-0'} sticky left-0 top-0 h-screen overflow-hidden`}
        >
          <div className='h-full'>
            <AgentChats />
          </div>
        </div>
      </AgentIEditorProvider>

      {/* Main Content */}
      <div
        className={`z-10 h-screen flex-1 overflow-scroll overflow-x-hidden pt-0 ${
          openChat ? 'w-[calc(100%-450px)]' : ''
        }`}
      >
        {showEmptyPage ? (
          <RequestEmpty />
        ) : (
          <>
            <Header
              completed_percentage={completed_percentage}
              open_request={open_request}
              recruiterUser={recruiterUser}
              requestCount={requestCount}
              setView={setView}
              view={view}
            />

            {isRequestListEmpty ? (
              <GlobalEmpty
                text={'No requests found'}
                iconSlot={<Info className='text-gray-500' />}
              />
            ) : (
              <RequestListContent
                view={view}
                defaults={defaults}
                isFetched={isFetched}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Requests;

function RequestListContent({
  view,
  defaults,
  isFetched,
}: {
  view: 'list' | 'kanban';
  defaults: any[];
  isFetched: boolean;
}) {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const urgentRequests = defaults.find(
    ({ sectionName }) => sectionName === 'urgent_request',
  );
  const completedRequests = defaults.find(
    ({ sectionName }) => sectionName === 'completed_request',
  );
  const otherSections = defaults.filter(
    ({ sectionName }) =>
      sectionName !== 'urgent_request' && sectionName !== 'completed_request',
  );

  return (
    <div className='mt-8 space-y-6'>
      {/******** Urgent sections ******* */}
      {urgentRequests && urgentRequests.requests.length > 0 && (
        <ScrollableSection section={urgentRequests} isFetched={isFetched} />
      )}

      <div className='container mx-auto px-6'>
        <div
          className={`${view === 'kanban' ? 'grid grid-cols-4 gap-4' : 'space-y-4'}`}
        >
          {otherSections.map(({ requests, sectionName }) => (
            <div
              key={sectionName}
              className={view === 'kanban' ? 'w-full flex-shrink-0' : ''}
            >
              {isFetched ? (
                view === 'list' ? (
                  <ListSection
                    sectionName={sectionName}
                    requests={requests}
                    expandedSections={expandedSections}
                    setExpandedSections={setExpandedSections}
                  />
                ) : (
                  <KanbanSection
                    sectionName={sectionName}
                    requests={requests}
                  />
                )
              ) : (
                <>
                  <Skeleton className='mb-2 h-6 w-40' />
                  <Skeleton className='mb-4 h-[200px] w-full' />
                  <Skeleton className='mb-4 h-[200px] w-full' />
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/******** Completed sections ******* */}
      {completedRequests && completedRequests.requests.length > 0 && (
        <ScrollableSection section={completedRequests} isFetched={isFetched} />
      )}
    </div>
  );
}
