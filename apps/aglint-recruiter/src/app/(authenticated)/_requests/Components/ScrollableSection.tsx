import { Button } from '@components/ui/button';
import { ScrollArea, ScrollBar } from '@components/ui/scroll-area';
import { Skeleton } from '@components/ui/skeleton';
import Link from 'next/link';

import { RequestProvider } from '@/context/RequestContext';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import { RequestCard } from '../_common/components/RequestCard';
function ScrollableSection({
  section,
  isFetched,
}: {
  section: any;
  isFetched: boolean;
}) {
  return (
    <div key={section.sectionName}>
      {isFetched ? (
        <div style={{ paddingLeft: '3rem', paddingRight: '3rem' }}>
          <div className='container-lg mx-auto w-full'>
            <div className='flex-center text-md mb-2 flex w-full items-center justify-between font-semibold'>
              <p>{capitalizeFirstLetter(section.sectionName)}</p>
              {section.sectionName === 'completed_request' && (
                <Button variant='ghost'>
                  <Link href={{ pathname: '/requests/history' }}>View all</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Skeleton className='mb-2 h-6 w-40' />
      )}
      <div className='mb-10 flex w-full items-start'>
        <ScrollArea style={{ width: 'calc(100vw - 65px)' }} className=''>
          <div style={{ paddingLeft: '3rem', paddingRight: '3rem' }}>
            <div className='container-lg'>
              <div className='flex'>
                {isFetched ? (
                  section.requests.length > 0 ? (
                    section.requests.map((props, i) => (
                      <div className='pr-6 mb-6' key={i}>
                        <div
                          style={{ width: '650px' }}
                          key={props.id ?? i}
                          className={`flex-shrink-0 ${i === section.requests.length - 1 ? 'mr-8' : ''}`}
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
                    <Skeleton className='mr-4 h-[200px] w-[300px]' />
                    <Skeleton className='mr-4 h-[200px] w-[300px]' />
                    <Skeleton className='mr-4 h-[200px] w-[300px]' />
                  </>
                )}
              </div>
            </div>
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </div>
    </div>
  );
}

export default ScrollableSection;
