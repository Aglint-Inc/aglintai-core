/* eslint-disable security/detect-object-injection */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { GlobalEmptyState } from '@devlink/GlobalEmptyState';

import { useRequests } from '@/context/RequestsContext';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { RequestProvider } from '@/context/RequestContext';
import { getFullName } from '@aglint/shared-utils';
import { Progress } from '@components/ui/progress';
import { ScrollArea, ScrollBar } from '@components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { Columns, LayoutList } from 'lucide-react';
import { useState } from 'react';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';
import { RequestsSectionDefaultData } from '../_common/constant';
import { useRequestCount } from '../_common/hooks';
import { RequestCard } from '../_common/Components/RequestCard';
import RequestListFilter from '../_common/Components/RequestListFilter';

function RequestList() {
  const [view, setView] = useState<'list' | 'kanban'>('list');
  const {
    requests: { data, isFetched },
    filters,
  } = useRequests();
  const { recruiterUser } = useAuthDetails();
  const { data: requestCount } = useRequestCount();

  const defaults = RequestsSectionDefaultData.map(
    ({ sectionName, ...rest }) => ({
      ...rest,
      sectionName,
      requests: data?.[sectionName],
    }),
  );

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

    const renderScrollableSection = (section) => (
      <div key={section.sectionName}>
        <div>{capitalizeFirstLetter(section.sectionName)}</div>
        <ScrollArea className='w-full whitespace-nowrap rounded-md'>
          <div className='flex'>
            {section.requests.map((props, i) => (
              <div
                key={props.id ?? i}
                className='flex-shrink-0 max-w-[600px] mr-4'
              >
                <RequestProvider request_id={props.id}>
                  <RequestCard {...{ ...props, index: i, isExpanded: false }} />
                </RequestProvider>
              </div>
            ))}
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </div>
    );

    return (
      <div className='space-y-4'>
        {urgentRequests && renderScrollableSection(urgentRequests)}

        <div className={`${view === 'kanban' ? 'flex gap-4' : 'space-y-4'}`}>
          {otherSections.map(({ requests, sectionName }) => (
            <div
              key={sectionName}
              className={view === 'kanban' ? 'flex-1' : ''}
            >
              <div>{capitalizeFirstLetter(sectionName)}</div>
              <div className={view === 'kanban' ? 'space-y-4' : ''}>
                {requests.map((props, i) => (
                  <RequestProvider key={props.id ?? i} request_id={props.id}>
                    <RequestCard
                      {...{ ...props, index: i, isExpanded: false }}
                    />
                  </RequestProvider>
                ))}
              </div>
            </div>
          ))}
        </div>

        {completedRequests && renderScrollableSection(completedRequests)}
      </div>
    );
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
        <RequestListFilter />
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

export default RequestList;
