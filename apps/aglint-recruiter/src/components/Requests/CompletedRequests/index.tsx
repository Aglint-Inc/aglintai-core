import { RequestProvider } from '@/context/RequestContext';
import { useRouterPro } from '@/hooks/useRouterPro';
import { Request } from '@/queries/requests/types';
import dayjs from '@/utils/dayjs';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { RequestCard } from '../_common/Components/RequestCard';
import RequestHistoryFilter from '../_common/Components/RequestHistoryFilter';
import { useCompletedRequestsStore } from '../_common/Context/store';
import { useCompletedRequests } from '../_common/hooks';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
import { Button } from '@components/ui/button';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

function CompletedRequests() {
  const { completedFilters } = useCompletedRequestsStore();
  const { data: completedRequests } = useCompletedRequests({
    completedFilters,
  });
  const { replace } = useRouterPro();
  const [allExpanded, setAllExpanded] = useState(false);

  // Group completed requests by date
  const groupedRequests = groupRequestsByDate(completedRequests ?? []);
  return (
    <>
      <div className='bg-gray-50 min-h-screen'>
        <div className='py-8 w-[960px] mx-auto'>
          <div className='sticky top-0 z-10 mb-8'>
            <h2 className='text-2xl font-bold mb-6'>
              {capitalizeFirstLetter('all_completed_requests')}
            </h2>
            <div className='my-4'>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href='/requests'
                      onClick={() => replace('/requests')}
                    >
                      Requests
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Completed Requests</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
          <div className='w-[960px] mx-auto'>
            <div className='my-8'>
              <h3>Filters:</h3>
              <RequestHistoryFilter />
            </div>
            <div className='flex justify-end mb-4'>
              <Button
                variant='ghost'
                onClick={() => setAllExpanded(true)}
                className='mr-2'
              >
                <ChevronDown className='mr-2 h-4 w-4' />
                Expand All
              </Button>
              <Button variant='ghost' onClick={() => setAllExpanded(false)}>
                <ChevronUp className='mr-2 h-4 w-4' />
                Collapse All
              </Button>
            </div>
            {Object.entries(groupedRequests).map(([date, requests], index) => (
              <Accordion
                key={date}
                type='single'
                collapsible
                className='w-full'
                defaultValue={index === 0 ? date : undefined}
                value={allExpanded ? date : undefined}
                onValueChange={(value) => {
                  if (!value && index === 0) {
                    setAllExpanded(false);
                  }
                }}
              >
                <AccordionItem value={date}>
                  <AccordionTrigger className='text-md font-semibold py-4'>
                    {dayjs(date).fromNow()} ({requests.length} requests)
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className='flex flex-col'>
                      {requests.map((request, i) => (
                        <RequestProvider
                          key={request.id ?? i}
                          request_id={request.id}
                        >
                          <RequestCard mode='compact' {...request} />
                        </RequestProvider>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export interface GroupedRequests {
  [date: string]: Request[];
}
function groupRequestsByDate(requests: Request[]): GroupedRequests {
  return requests.reduce((acc, request) => {
    const date = new Date(request.completed_at).toISOString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(request);
    return acc;
  }, {} as GroupedRequests);
}

export default CompletedRequests;
