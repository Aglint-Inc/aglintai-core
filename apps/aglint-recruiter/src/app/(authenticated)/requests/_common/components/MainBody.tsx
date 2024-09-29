import { Button } from '@components/ui/button';
import AgentChats from '@requests/components/AgentChats';
import { AgentIEditorProvider } from '@requests/components/AgentChats/AgentEditorContext';
import { REQUEST_SESSIONS_DEFAULT_DATA } from '@requests/constant';
import { useRequestCount } from '@requests/hooks';
import { checkFiltersApplied } from '@requests/utils/checkFiltersApplied';
import { LayoutList, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useTenant } from '@/company/hooks';
import { useFlags } from '@/company/hooks/useFlags';
import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { useRequests } from '@/context/RequestsContext';
import { SafeObject } from '@/utils/safeObject';

import RequestListContent from './RequestListContent';
import Header from './ui/Header';

const MainBody = () => {
  const {
    requests: { data: requestList, isPlaceholderData, isFetched },
    filters,
  } = useRequests();
  const { recruiter_user } = useTenant();
  const { isShowFeature } = useFlags();
  const [openChat, setOpenChat] = useState(
    localStorage.getItem('openChat') === 'true' && isShowFeature('AGENT')
      ? true
      : false,
  );
  const [view, setView] = useState<'list' | 'kanban'>('list');

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
      !(SafeObject.values(requestList ?? []) ?? []).flatMap(
        (requests) => requests,
      ).length,
    );

  const isRequestListEmpty =
    checkFiltersApplied({ filters }) &&
    isFetched &&
    defaults.flatMap((d) => d.requests).length === 0;

  const open_request = requestCount?.all_open_request || 0;
  const completed_request = requestCount?.card.completed_request || 0;
  const completed_percentage =
    Math.floor(
      (completed_request / (open_request + completed_request)) * 100,
    ) || 0;

  useEffect(() => {
    setOpenChat(
      localStorage.getItem('openChat') === 'true' && isShowFeature('AGENT')
        ? true
        : false,
    );
  }, [localStorage.getItem('openChat')]);

  return (
    <div className='flex w-full overflow-hidden'>
      {/* Dock to Right Button */}
      {isShowFeature('AGENT') ? (
        <div className='fixed left-[20] top-4 z-50'>
          <Button
            variant='link'
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
      ) : (
        <></>
      )}

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
        className={`z-10 flex-1 overflow-x-hidden pt-0 ${
          openChat ? 'w-[calc(100%-450px)]' : ''
        }`}
      >
        <div>
          <Header
            completed_percentage={completed_percentage}
            open_request={open_request}
            recruiterUser={recruiter_user}
            requestCount={requestCount}
            setView={setView}
            view={view}
          />

          {isRequestListEmpty || showEmptyPage ? (
            <div className='container-lg mx-auto w-full px-12 py-8'>
              <GlobalEmpty
                header={'No requests found'}
                description='Requests are created when a interview process starts for candidates.'
                icon={
                  <LayoutList
                    strokeWidth={2}
                    className='h-6 w-6 text-muted-foreground'
                  />
                }
              />
            </div>
          ) : (
            <RequestListContent
              view={view}
              defaults={defaults}
              isFetched={isFetched}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainBody;
