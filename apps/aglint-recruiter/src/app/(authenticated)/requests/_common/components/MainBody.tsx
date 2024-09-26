import { Button } from '@components/ui/button';
import { Skeleton } from '@components/ui/skeleton';
import AgentChats from '@requests/components/AgentChats';
import { AgentIEditorProvider } from '@requests/components/AgentChats/AgentEditorContext';
import { REQUEST_SESSIONS_DEFAULT_DATA } from '@requests/constant';
import { useRequestCount } from '@requests/hooks';
import { checkFiltersApplied } from '@requests/utils/checkFiltersApplied';
import { Info, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useCompanySetup } from '@/authenticated/hooks/useCompanySetup';
import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRequests } from '@/context/RequestsContext';
import { SafeObject } from '@/utils/safeObject';

import LandingProgress from './LandingProgress';
import RequestListContent from './RequestListContent';
import Header from './ui/Header';
import { RequestEmpty } from './ui/RequestEmpty';
const MainBody = () => {
  const {
    requests: { data: requestList, isPlaceholderData, isFetched },
    filters,
  } = useRequests();
  const { recruiterUser, isShowFeature } = useAuthDetails();
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

  const { isLoading, isRequestSetupPending } = useCompanySetup();

  if (isLoading) {
    return <Skeleton className='mx-auto h-[380px] w-full max-w-3xl' />;
  }

  if (isRequestSetupPending) {
    return (
      <div className='flex w-full items-center justify-center'>
        <LandingProgress />
      </div>
    );
  }

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
        {showEmptyPage ? (
          <RequestEmpty />
        ) : (
          <div>
            <Header
              completed_percentage={completed_percentage}
              open_request={open_request}
              recruiterUser={recruiterUser}
              requestCount={requestCount}
              setView={setView}
              view={view}
            />

            {isRequestListEmpty ? (
              <div className='container-lg mx-auto w-full px-12 py-8'>
                <GlobalEmpty
                  height='300px'
                  text={'No requests found'}
                  iconSlot={<Info className='text-gray-500' />}
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
        )}
      </div>
    </div>
  );
};

export default MainBody;
