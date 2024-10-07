'use client';
import { EmptyState } from '@components/empty-state';
import { Button } from '@components/ui/button';
import { REQUEST_SESSIONS_DEFAULT_DATA } from '@requests/constant';
import { useRequestCount } from '@requests/hooks';
import { useRequests } from '@requests/hooks';
import { checkFiltersApplied } from '@requests/utils/checkFiltersApplied';
import { LayoutList, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Loader } from '@/common/Loader';
import { useTenant } from '@/company/hooks';
import { useFlags } from '@/company/hooks/useFlags';
import { useOnboarding } from '@/components/Navigation/OnboardPending/context/onboarding';
import { SafeObject } from '@/utils/safeObject';

import { CreateRequestWidget } from './createRequestWidget';
import RequestListContent from './RequestListContent';
import Header from './ui/Header';

const MainBody = () => {
  const {
    requests: { data: requestList, isPlaceholderData, isFetched, isLoading },
    filters,
  } = useRequests();
  const { isRequestSetupPending, isLoading: isLoadingCompanySetup } =
    useOnboarding();
  const { recruiter_user } = useTenant();
  const { isShowFeature } = useFlags();
  const [openChat, setOpenChat] = useState(false);
  const [view, setView] = useState<'list' | 'kanban'>('list');

  const { data: requestCount } = useRequestCount();

  const defaults = REQUEST_SESSIONS_DEFAULT_DATA.map(
    ({ sectionName, color, sectionIconName }) => ({
      sectionName,
      color,
      sectionIconName,
      requests: requestList?.[sectionName] ?? [],
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
    if (isShowFeature) {
      setOpenChat(
        localStorage.getItem('openChat') === 'true' && isShowFeature('AGENT')
          ? true
          : false,
      );
    }
  }, [isShowFeature]);

  if (isLoading || !isFetched || isLoadingCompanySetup) return <Loader />;

  if (showEmptyPage)
    return (
      <div className='mt-40'>
        <EmptyState
          header={'No requests found'}
          description='Requests are created when a interview process starts for candidates.'
          icon={LayoutList}
          primarySlot={!isRequestSetupPending && <CreateRequestWidget />}
        />
      </div>
    );
  return (
    <div className='flex w-full overflow-hidden'>
      {/* Dock to Right Button */}
      {localStorage.getItem('openChat') === 'true' && isShowFeature('AGENT') ? (
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
              <PanelLeftClose className='h-6 w-6 text-muted-foreground' />
            ) : (
              <PanelLeftOpen className='h-6 w-6 text-muted-foreground' />
            )}
          </Button>
        </div>
      ) : (
        <></>
      )}

      {/* Main Content */}

      <div className='w-full'>
        <Header
          completed_percentage={completed_percentage}
          open_request={open_request}
          recruiterUser={recruiter_user}
          requestCount={requestCount}
          setView={setView}
          view={view}
        />
        {!isRequestListEmpty ? (
          <RequestListContent
            view={view}
            defaults={[...defaults]}
            isFetched={isFetched}
          />
        ) : (
          <div className='mt-40 w-full'>
            <EmptyState
              header={'No requests found'}
              description='Requests are created when a interview process starts for candidates.'
              icon={LayoutList}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainBody;
