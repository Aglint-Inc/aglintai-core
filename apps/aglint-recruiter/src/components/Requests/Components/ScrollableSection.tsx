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
          <div className='container'>
            <div className='flex flex-center items-center text-md w-full justify-between font-semibold mb-2'>
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
        <Skeleton className='h-6 w-40 mb-2' />
      )}
      <div className='flex items-start w-full mb-10'>
        <ScrollArea style={{ width: 'calc(100vw - 65px)' }} className=''>
          <div style={{ paddingLeft: '3rem', paddingRight: '3rem' }}>
            <div className='container'>
              <div className='flex'>
                {isFetched ? (
                  section.requests.length > 0 ? (
                    section.requests.map((props, i) => (
                      <div className='pr-6' key={i}>
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
  );
}

export default ScrollableSection;
