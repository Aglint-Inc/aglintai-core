/* eslint-disable security/detect-object-injection */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { getFullName } from '@aglint/shared-utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@components/ui/collapsible';
import { Progress } from '@components/ui/progress';
import { ScrollArea, ScrollBar } from '@components/ui/scroll-area';
import { Skeleton } from '@components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { GlobalEmptyState } from '@devlink/GlobalEmptyState';
import { cn } from '@lib/utils';
import { ChevronDown, ChevronUp, Columns, LayoutList } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { RequestProvider } from '@/context/RequestContext';
import { useRequests } from '@/context/RequestsContext';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import { RequestCard } from '../_common/ComponentsNew/RequestCard';
import RequestListFilter from '../_common/ComponentsNew/RequestListFilter';
import { REQUEST_SESSIONS_DEFAULT_DATA } from '../_common/constant';
import { useRequestCount } from '../_common/hooks';
import { checkFiltersApplied } from '../_common/utils/checkFiltersApplied';
import { formatRequestHeadingText } from '../_common/utils/formatRequestHeadingText';
import RequestListFilter from '../_common/Components/RequestListFilter';
import { RequestCard } from '../_common/Components/RequestCard';

function RequestList() {
  const [view, setView] = useState<'list' | 'kanban'>('list');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const {
    requests: { data, isFetched },
    filters,
  } = useRequests();
  const defaults = REQUEST_SESSIONS_DEFAULT_DATA.map(
    ({ sectionName, ...rest }) => ({
      ...rest,
      sectionName,
      requests: data?.[sectionName],
    }),
  );
  const isRequestListEmpty =
    checkFiltersApplied({ filters }) &&
    isFetched &&
    defaults.flatMap((d) => d.requests).length === 0;
  const { recruiterUser } = useAuthDetails();
  const { data: requestCount } = useRequestCount();

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

    const renderScrollableSection = (
      section: (typeof REQUEST_SESSIONS_DEFAULT_DATA)[number],
    ) => (
      <div key={section.sectionName}>
        {isFetched ? (
          <div style={{ paddingLeft: '3rem', paddingRight: '3rem'}}>
          <div className='container'>
          <div className='flex flex-center items-center text-md w-full justify-between font-semibold mb-2'>
            <p>{capitalizeFirstLetter(section.sectionName)}</p>
            {section.sectionName === 'completed_request' && (
              <Button variant='ghost'>
                <Link
                  href={{
                    pathname: '/requests/history',
                  }}
                >
                  View all
                </Link>
              </Button>
            )}
          </div>
          </div>
          </div>
        ) : (
          <Skeleton className='h-6 w-40 mb-2' />
        )}
        <div
        className='flex items-start w-full mb-10'>
        <div className=''>
        <ScrollArea style={{ width: 'calc(100vw - 65px)' }} className=''>
          <div style={{ paddingLeft: '3rem', paddingRight: '3rem'}}>
          <div className='container'>
          <div className='flex'>
            {isFetched ? (
              section.requests.length > 0 ? (
                section.requests.map((props, i) => (
                  <div className='pr-6'>
                  <div
                    style={{width:'650px'}}
                    key={props.id ?? i}
                    className={`flex-shrink-0  ${i === section.requests.length - 1 ? 'mr-8' : ''}`}
                  >
                    <RequestProvider request_id={props.id}>
                      <RequestCard {...{ ...props, isExpanded: false }} />
                    </RequestProvider>
                  </div>
                  </div>
                ))
              ) : (
                <div className='w-full text-center text-muted-foreground'>
                  No requests in this section
                </div>
              )
            ) : (
              <>
                <Skeleton className='h-[200px] w-[300px] mr-4' />
                <Skeleton className='h-[200px] w-[300px] mr-4' />
                <Skeleton className='h-[200px] w-[300px] mr-4' />
              </>
            )}
          </div>
          </div>
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
        </div>
        </div>
      </div>
    );

    const renderListSection = (sectionName: string, requests: any[]) => {
      const isExpanded = expandedSections.includes(sectionName);
      // const _visibleRequests = isExpanded ? requests : requests.slice(0, 5);

      return (
        <Accordion
          type='single'
          collapsible
          className='w-full'
          value={
            requests.length > 0 ? (isExpanded ? sectionName : '') : undefined
          }
          onValueChange={(value) => {
            if (requests.length === 0) return;
            if (value === sectionName) {
              setExpandedSections([...expandedSections, sectionName]);
            } else {
              setExpandedSections(
                expandedSections.filter((s) => s !== sectionName),
              );
            }
          }}
        >
          <AccordionItem
            value={sectionName}
            className={cn(
              'border rounded-lg px-4 bg-white',
              isExpanded && 'bg-gray-100',
            )}
          >
            <AccordionTrigger
              className={cn(
                'text-md font-semibold hover:no-underline',
                requests.length === 0 && 'cursor-default',
              )}
              disabled={requests.length === 0}
            >
              <div className='flex items-center justify-between w-full mr-2'>
                <div className='flex items-center'>
                  {capitalizeFirstLetter(sectionName)}
                  <Badge variant='outline' className='ml-2'>
                    {requests.length}
                  </Badge>
                </div>
                {requests.length === 0 && (
                  <Badge variant='outline' className='ml-2'>
                    No {sectionName.replace('_', ' ')} found
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {requests.length > 0 ? (
                <div className='flex flex-col gap-4'>
                  {requests.slice(0, 5).map((props, i) => (
                    <RequestProvider key={props.id ?? i} request_id={props.id}>
                      <RequestCard {...{ ...props, isExpanded: false }} />
                    </RequestProvider>
                  ))}
                  {requests.length > 5 && (
                    <Collapsible>
                      <CollapsibleContent>
                        <div className='flex flex-col gap-4'>
                          {requests.slice(5).map((props, i) => (
                            <RequestProvider
                              key={props.id ?? i}
                              request_id={props.id}
                            >
                              <RequestCard
                                {...{
                                  ...props,
                                  isExpanded: false,
                                }}
                              />
                            </RequestProvider>
                          ))}
                        </div>
                      </CollapsibleContent>
                      <CollapsibleTrigger asChild className='mt-4 w-full'>
                        <Button
                          variant='outline'
                          className='w-full'
                          onClick={() => {
                            if (isExpanded) {
                              setExpandedSections(
                                expandedSections.filter(
                                  (s) => s !== sectionName,
                                ),
                              );
                            }
                          }}
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className='h-4 w-4 mr-2' />
                              Show Less
                            </>
                          ) : (
                            <>
                              <ChevronDown className='h-4 w-4 mr-2' />
                              Show More ({requests.length - 5} more)
                            </>
                          )}
                        </Button>
                      </CollapsibleTrigger>
                    </Collapsible>
                  )}
                </div>
              ) : (
                <div className='text-center text-muted-foreground p-4 border rounded-md'>
                  No requests in this section
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    };

    return (
      <div className='space-y-6 mt-8'>
        {urgentRequests &&
          urgentRequests.requests.length > 0 &&
          renderScrollableSection(urgentRequests)}
          <div style={{paddingLeft:"3rem" , paddingRight:"3rem"}}>
          {/* <div   className={`${view === 'kanban' ? 'px-[5rem]' : 'px-[5rem]'}`} > */}
        <div   className={`${view === 'kanban' ? 'container' : 'container'}`} >
        <div
          className={`${view === 'kanban' ? 'grid grid-cols-4 gap-4' : 'space-y-4'}`}
        >
          {otherSections.map(({ requests, sectionName }) => (
            <div
              key={sectionName}
              className={
                view === 'kanban'
                  ? `flex-shrink-0 ${requests.length === 0 ? 'w-full' : 'w-full'}`
                  : ''
              }
            >
              {isFetched ? (
                view === 'list' ? (
                  renderListSection(sectionName, requests)
                ) : (
                  <>
                    <div className='text-md font-semibold mb-2'>
                      {capitalizeFirstLetter(sectionName)}
                      <Badge variant='outline' className='ml-2'>
                        {requests.length}
                      </Badge>
                    </div>
                    {requests.length > 0 ? (
                      <div className='flex flex-col gap-4'>
                        {requests.map((props, i) => (
                          <RequestProvider
                            key={props.id ?? i}
                            request_id={props.id}
                          >
                            <RequestCard
                              {...{ ...props, isExpanded: false }}
                              mode='column-view'
                            />
                          </RequestProvider>
                        ))}
                      </div>
                    ) : (
                      <div className='text-center text-muted-foreground p-4 border rounded-md'>
                        No requests in this section
                      </div>
                    )}
                  </>
                )
              ) : (
                <>
                  <Skeleton className='h-6 w-40 mb-2' />
                  <Skeleton className='h-[200px] w-full mb-4' />
                  <Skeleton className='h-[200px] w-full mb-4' />
                </>
              )}
            </div>
          ))}
        </div>
        </div>
        </div>

        {completedRequests &&
          completedRequests.requests.length > 0 &&
          renderScrollableSection(completedRequests)}
      </div>
    );
  };

  const open_request = requestCount?.all_open_request || 0;
  const completed_percentage =
    Math.floor(
      (requestCount?.card.completed_request /
        (open_request + requestCount?.card.completed_request)) *
        100,
    ) || 0;

  return (
    <>
      <div
        style={{ paddingLeft: '3rem', paddingRight: '3rem', marginTop: '1rem' }}
        className='flex justify-center items-center w-full'
      >
        {' '}
        {/* Changed padding from 20 to 40 */}
        <div className='container'>
          <div className='flex flex-col gap-4'>
            <div className='flex items-end justify-between'>
              <div className='flex flex-col gap-1'>
                <h1 className='text-lg font-semibold'>
                  👋 Hey,{' '}
                  {getFullName(
                    recruiterUser.first_name,
                    recruiterUser.last_name,
                  )}
                  !
                </h1>
                <p className='text-sm text-muted-foreground'>
                  {formatRequestHeadingText(
                    requestCount?.card.urgent_request ?? 0,
                    requestCount?.card.standard_request ?? 0,
                    'today',
                  )}
                </p>
              </div>
              <div className='flex flex-col gap-1'>
                <h3 className='text-sm text-muted-foreground font-semibold'>
                  {open_request + 1} Open Requests ({completed_percentage}%
                  complete)
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
                <TabsList className='h-8'>
                  <TabsTrigger value='list'>
                    <LayoutList className='h-4 w-4' />
                  </TabsTrigger>
                  <TabsTrigger value='kanban'>
                    <Columns className='h-4 w-4' />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {isRequestListEmpty ? (
        <GlobalEmptyState textDesc='No requests found' iconName='check' />
      ) : (
        renderContent()
      )}
    </>
  );
}

export default RequestList;
