import { useState } from 'react';
import { getFullName } from '@aglint/shared-utils';
import { Skeleton } from '@components/ui/skeleton';
import { Progress } from '@components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { LayoutList, Columns } from 'lucide-react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRequests } from '@/context/RequestsContext';
import { useRouterPro } from '@/hooks/useRouterPro';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import { RequestsBarChart } from './Components/RequestsBarChart';
import { useRequestCount } from './hooks';
import { requestTypes } from './utils';
import { RequestDashboard } from '@devlink2/RequestDashboard';
import CompletionProgress from './Components/CompletionProgress';
import { ReqUrgent } from '@devlink2/ReqUrgent';
import { RequestList } from '@devlink2/RequestList';
import CompletedRequestsBox from './Components/CompletedRequestsBox';
import Section from '../RequestSections/Section';
import { sectionDefaultsData } from '../RequestSections';

import FilterAndSorting from '../FiltersAndSorting';

function Dashboard() {
  const [view, setView] = useState<'list' | 'kanban'>('list');
  const {
    requests: { data, isFetched },
    filters,
  } = useRequests();
  const { setSections, initialSections } = useRequests();
  const { data: requestCount, status } = useRequestCount();
  const { setQueryParams, queryParams } = useRouterPro();
  const { recruiterUser } = useAuthDetails();

  // @ts-ignore
  const { requests, isLoading } = useRequests();

  const isFilterApplied = Object.values(filters).some(Boolean);

  function formatRequestCountText(
    urgentCount: number,
    standardCount: number,
    dateString: string,
  ) {
    const urgentText =
      urgentCount > 0
        ? `${urgentCount} urgent request${urgentCount > 1 ? 's' : ''}`
        : '';
    const standardText =
      standardCount > 0
        ? `${standardCount} standard request${standardCount > 1 ? 's' : ''}`
        : '';

    let finalText = '';

    if (urgentText && standardText) {
      finalText = `${urgentText} and ${standardText} ${dateString}.`;
    } else if (urgentText) {
      finalText = `${urgentText} ${dateString}.`;
    } else if (standardText) {
      finalText = `${standardText} ${dateString}.`;
    } else {
      finalText = `No requests ${dateString}.`;
    }

    return 'You have ' + finalText;
  }

  const lastCompletedRequestCount =
    requestCount?.chat.completedRequest[
      requestCount.chat.completedRequest.length - 1
    ]?.count || 0;
  const completedToday = lastCompletedRequestCount;
  const open_request = requestCount?.all_open_request || 0;
  const completed_percentage =
    Math.floor(
      (requestCount?.card.completed_request /
        (open_request + requestCount?.card.completed_request)) *
        100,
    ) || 0;

  const renderRequestSections = () => {
    return (
      <div
        className={
          view === 'kanban' ? 'flex space-x-4 overflow-x-auto' : 'space-y-4'
        }
      >
        {sectionDefaultsData.map(({ color, sectionIconName, sectionName }) => {
          const requests = data?.[sectionName] ?? [];
          if (isFilterApplied && isFetched && requests.length === 0)
            return null;

          return (
            <Section
              key={sectionName}
              requests={requests}
              sectionName={sectionName}
              sectionIconName={sectionIconName}
              color={color}
              isLoadingRequests={isLoading}
              isKanban={view === 'kanban'}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className='p-3'>
      {queryParams.olddashboard === 'true' && (
        <div>
          <RequestDashboard
            textGreetingTitle={`👋 Hey, ${getFullName(recruiterUser.first_name, recruiterUser.last_name)}!`}
            textGreetingDescription={formatRequestCountText(
              requestCount?.card.urgent_request ?? 0,
              requestCount?.card.standard_request ?? 0,
              'today',
            )}
            textProgressTitle={`${open_request} Open Requests (${completed_percentage}% complete)`}
            slotProgressBar={
              <CompletionProgress value={completed_percentage} />
            }
            slotGraph={
              status === 'pending' ? (
                <div className='relative w-[485px] h-[150px] rounded-[10px]'>
                  <Skeleton className='w-full h-full' />
                </div>
              ) : (
                requestCount?.chat && (
                  <RequestsBarChart
                    createdRequestData={requestCount?.chat.createdRequest}
                    completedRequestData={requestCount?.chat.completedRequest}
                    onGoingRequestData={requestCount?.chat.onGoingRequest}
                  />
                )
              )
            }
            slotRequestList={
              <>
                <ReqUrgent
                  textRequests={`${requestCount?.card.urgent_request || 0} Urgent Requests`}
                  onClickUrgentRequest={{
                    onClick: () => {
                      setSections({ ...initialSections, urgent_request: true });
                      setQueryParams({
                        tab: 'requests',
                        section: 'urgent_request',
                      });
                    },
                  }}
                />
                {requestTypes.map(({ title, iconName }) => (
                  <RequestList
                    iconName={iconName}
                    textTitle={capitalizeFirstLetter(title)}
                    key={title}
                    textCount={requestCount?.card?.[title] ?? 0}
                    onClickCard={{
                      onClick: () => {
                        setSections({ ...initialSections, [title]: true });
                        setQueryParams({ tab: 'requests', section: title });
                      },
                    }}
                  />
                ))}
                <CompletedRequestsBox
                  status={status}
                  completedRequest={completedToday || 0}
                />
              </>
            }
          />
        </div>
      )}
      <div className='mb-2 flex flex-row justify-between'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-md font-semibold'>
            👋 Hey,{' '}
            {getFullName(recruiterUser.first_name, recruiterUser.last_name)}!
          </h1>
          <p className='text-sm text-muted-foreground'>
            {formatRequestCountText(
              requestCount?.card.urgent_request ?? 0,
              requestCount?.card.standard_request ?? 0,
              'today',
            )}
          </p>
        </div>
        <div className='flex flex-col gap-1'>
          <h3 className='text-sm text-muted-foreground font-semibold'>
            {open_request} Open Requests ({completed_percentage}% complete)
          </h3>
          <Progress value={completed_percentage} className='w-full' />
        </div>
      </div>
      <div className='space-y-2'>
        <div className='flex justify-end'>
          <FilterAndSorting />
          <Tabs
            value={view}
            onValueChange={(value) => setView(value as 'list' | 'kanban')}
          >
            <TabsList>
              <TabsTrigger value='list'>
                <LayoutList className='h-4 w-4 mr-2' />
                List
              </TabsTrigger>
              <TabsTrigger value='kanban'>
                <Columns className='h-4 w-4 mr-2' />
                Kanban
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        {isLoading ? (
          <div>Loading requests...</div>
        ) : requests && Object.keys(requests).length > 0 ? (
          renderRequestSections()
        ) : (
          <div>No requests available</div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
