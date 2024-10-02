import { dayjsLocal } from '@aglint/shared-utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { Button } from '@components/ui/button';
import { useCompletedRequestsStore } from '@requestHistory/contexts/completedRequeststore';
import { RequestCard } from '@requests/components/RequestCard';
import RequestHistoryFilter from '@requests/components/RequestHistoryFilter';
import { useCompletedRequests } from '@requests/hooks';
import { AlertCircle, Loader2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

import { Loader } from '@/components/Common/Loader';
import { RequestProvider } from '@/context/RequestContext';
import type { Request } from '@/queries/requests/types';

function CompletedRequests() {
  const { completedFilters } = useCompletedRequestsStore();
  const { data: completedRequests, isFetched } = useCompletedRequests({
    ...completedFilters,
  });
  const [allExpanded, setAllExpanded] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Assume there's more data initially
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Group completed requests by date
  const groupedRequests = groupRequestsByDate(
    (completedRequests || []) as Request[],
  );
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
        if (entries[0].isIntersecting && hasMore && isFetched) {
          loadMore();
        }
      },
      { threshold: 1.0 },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isFetched, page]);

  return (
    <div className='px-4'>
      <RequestHistoryFilter />
      {!isFetched && (
        <div className='flex items-center justify-center'>
          <Loader />
        </div>
      )}
      {isFetched && hasRequests ? (
        <>
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
                <AccordionTrigger className='text-md py-4 font-semibold'>
                  {dayjsLocal(date).fromNow()} ({requests.length} requests)
                </AccordionTrigger>
                <AccordionContent>
                  <div className='flex flex-col overflow-hidden rounded-lg border'>
                    {requests.map((request, i) => (
                      <React.Fragment key={request.id ?? i}>
                        <RequestProvider request_id={request.id}>
                          <RequestCard mode='compact-list' {...request} />
                        </RequestProvider>
                        {i !== requests.length - 1 && requests.length > 1 && (
                          <hr
                            className='my-0 border-t border-gray-200'
                            style={{ borderTopWidth: '0.5px' }}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
          {hasMore && (
            <>
              <div ref={loaderRef} className='py-4 text-center'>
                {isLoadingMore ? (
                  <Loader2 className='mx-auto h-6 w-6 animate-spin' />
                ) : (
                  <Button onClick={loadMore} disabled={isLoadingMore}>
                    Load More
                  </Button>
                )}
              </div>
              <p className='text-center text-sm text-muted-foreground'>
                {isLoadingMore
                  ? 'Loading more requests...'
                  : 'Scroll down or click to load more'}
              </p>
            </>
          )}
        </>
      ) : null}
      {isFetched && !hasRequests && (
        <Alert>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>No requests found</AlertTitle>
          <AlertDescription>
            There are no completed requests matching your current filters. Try
            adjusting your filters or check back later.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export interface GroupedRequests {
  [date: string]: Request[];
}

function groupRequestsByDate(requests: Request[]): GroupedRequests {
  return requests
    .filter((request) => request.completed_at !== null)
    .reduce((acc, request) => {
      const completedAt = request?.completed_at ?? '';
      const date = new Date(completedAt).toISOString(); // Ensure date is valid
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(request);
      return acc;
    }, {} as GroupedRequests);
}

export default CompletedRequests;
