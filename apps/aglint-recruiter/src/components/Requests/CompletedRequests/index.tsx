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
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

function CompletedRequests() {
  const { completedFilters } = useCompletedRequestsStore();
  const { data: completedRequests, isLoading } = useCompletedRequests({
    completedFilters,
  });
  const { replace } = useRouterPro();
  const [allExpanded, setAllExpanded] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Assume there's more data initially
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Group completed requests by date
  const groupedRequests = groupRequestsByDate(completedRequests ?? []);
  const hasRequests = Object.keys(groupedRequests).length > 0;

  // Simulated function to load more data
  const loadMore = () => {
    setIsLoadingMore(true);
    // TODO: Dheeraj, implement actual data fetching logic here
    // This should update the completedRequests with new data
    // and update the 'hasMore' state based on whether there's more data to load
    // console.log('Loading more data for page:', page + 1);
    setPage((prev) => prev + 1);
    // Simulating end of data after 3 pages
    if (page >= 3) {
      setHasMore(false);
    }
    // Simulate API call delay
    setTimeout(() => {
      setIsLoadingMore(false);
    }, 1000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 1.0 },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, page]);

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
            {hasRequests ? (
              <>
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
                {Object.entries(groupedRequests).map(
                  ([date, requests], index) => (
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
                  ),
                )}
                {hasMore && (
                  <>
                    <div ref={loaderRef} className='text-center py-4'>
                      {isLoadingMore ? (
                        <Loader2 className='h-6 w-6 animate-spin mx-auto' />
                      ) : (
                        <Button onClick={loadMore} disabled={isLoadingMore}>
                          Load More
                        </Button>
                      )}
                    </div>
                    <p className='text-center text-sm text-gray-500'>
                      {isLoadingMore
                        ? 'Loading more requests...'
                        : 'Scroll down or click to load more'}
                    </p>
                  </>
                )}
              </>
            ) : (
              <Alert>
                <AlertCircle className='h-4 w-4' />
                <AlertTitle>No requests found</AlertTitle>
                <AlertDescription>
                  There are no completed requests matching your current filters.
                  Try adjusting your filters or check back later.
                </AlertDescription>
              </Alert>
            )}
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
