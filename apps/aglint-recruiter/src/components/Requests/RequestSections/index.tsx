/* eslint-disable security/detect-object-injection */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { GlobalEmptyState } from '@devlink/GlobalEmptyState';

import { useRequests } from '@/context/RequestsContext';
import { type Request, type RequestResponse } from '@/queries/requests/types';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { RequestProvider } from '@/context/RequestContext';
import { getFullName } from '@aglint/shared-utils';
import { Progress } from '@components/ui/progress';
import { ScrollArea, ScrollBar } from '@components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { Columns, LayoutList } from 'lucide-react';
import { useState } from 'react';
import { useRequestCount } from '../Dashboard/hooks';
import FilterAndSorting from '../FiltersAndSorting';
import { RequestCard } from './RequestCard';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

function RequestSections() {
  const [view, setView] = useState<'list' | 'kanban'>('list');
  const {
    requests: { data, isPlaceholderData, isFetched },
    filters,
  } = useRequests();
  const { recruiterUser } = useAuthDetails();
  const { data: requestCount } = useRequestCount();

  const defaults = sectionDefaultsData.map(({ sectionName, ...rest }) => ({
    ...rest,
    sectionName,
    requests: data?.[sectionName],
  }));

  const isFilterApplied =
    filters.status.length > 0 ||
    filters.type.length > 0 ||
    !!filters.title ||
    filters.jobs.length > 0 ||
    filters.applications.length > 0 ||
    filters.assigneeList.length > 0 ||
    filters.assignerList.length > 0;

  if (
    isFilterApplied &&
    isFetched &&
    defaults.flatMap((d) => d.requests).length === 0
  )
    return <GlobalEmptyState iconName='task_alt' textDesc='No results found' />;

  const renderContent = () => {
    if (view === 'kanban') {
      return (
        <ScrollArea className='w-full whitespace-nowrap rounded-md'>
          <div className='flex w-max space-x-4 p-4'>
            {defaults
              .filter((section) => section.sectionName !== 'urgent_request')
              .map(({ color, requests, sectionIconName, sectionName }) => (
                <div key={sectionName} className='w-[400px] mr-4'>
                  <h2 className='text-md font-semibold mb-4'>
                    {sectionName.replace('_', ' ')}
                  </h2>
                  <>
                    <div>{capitalizeFirstLetter(sectionName)}</div>
                    <div>
                      {requests.map((props, i) => (
                        <RequestProvider
                          key={props.id ?? i}
                          request_id={props.id}
                        >
                          <RequestCard
                            {...{
                              ...props,
                              index: i,
                              isExpanded: false,
                            }}
                          />
                        </RequestProvider>
                      ))}
                    </div>
                  </>
                </div>
              ))}
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      );
    } else {
      return (
        <div className='space-y-4'>
          {defaults.map(({ color, requests, sectionIconName, sectionName }) => {
            if (isFilterApplied && isFetched && (requests ?? []).length === 0)
              return null;
            return (
              <>
                <div>{capitalizeFirstLetter(sectionName)}</div>
                <div>
                  {requests.map((props, i) => (
                    <RequestProvider key={props.id ?? i} request_id={props.id}>
                      <RequestCard
                        {...{
                          ...props,
                          index: i,
                          isExpanded: false,
                        }}
                      />
                    </RequestProvider>
                  ))}
                </div>
              </>
            );
          })}
        </div>
      );
    }
  };
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
  const open_request = requestCount?.all_open_request || 0;
  const completed_percentage =
    Math.floor(
      (requestCount?.card.completed_request /
        (open_request + requestCount?.card.completed_request)) *
        100,
    ) || 0;

  return (
    <div className='space-y-2'>
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
      <div className='flex justify-end'>
        <FilterAndSorting />
        <Tabs
          value={view}
          onValueChange={(value) => setView(value as 'list' | 'kanban')}
        >
          <TabsList>
            <TabsTrigger value='list'>
              <LayoutList className='h-4 w-4 mr-2' />
            </TabsTrigger>
            <TabsTrigger value='kanban'>
              <Columns className='h-4 w-4 mr-2' />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {renderContent()}
    </div>
  );
}

export default RequestSections;

export const sectionDefaultsData = [
  {
    requests: [],
    sectionName: 'urgent_request',
    sectionIconName: 'flag_2',
    color: 'warning',
  },
  {
    requests: [],
    sectionName: 'schedule_request',

    sectionIconName: 'calendar_add_on',
    color: 'neutral',
  },
  {
    requests: [],
    sectionName: 'reschedule_request',

    sectionIconName: 'event_repeat',
    color: 'neutral',
  },
  {
    requests: [],
    sectionName: 'cancel_schedule_request',

    sectionIconName: 'event_busy',
    color: 'neutral',
  },
  {
    requests: [],
    sectionName: 'decline_request',

    sectionIconName: 'free_cancellation',
    color: 'neutral',
  },
  {
    requests: [],
    sectionName: 'completed_request',

    sectionIconName: 'check_circle',
    color: 'success',
  },
] as readonly {
  requests: Request[];
  sectionName: keyof RequestResponse;
  sectionIconName: string;
  color: string;
}[];
