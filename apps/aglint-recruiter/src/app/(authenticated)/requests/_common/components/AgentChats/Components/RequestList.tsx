import { type DatabaseTable } from '@aglint/shared-types';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export type RequestListProps = {
  type: DatabaseTable['request']['type'];
  title: string;
  status: DatabaseTable['request']['status'];
  color: 'info' | 'warning' | 'success' | 'error' | 'neutral' | 'purple';
  link: string;
};

const RequestList = ({ requests }: { requests: RequestListProps[] }) => {
  const groupedRequests = requests?.reduce((acc, request) => {
    if (!acc[request.type as keyof typeof acc]) {
      (acc as Record<string, RequestListProps[]>)[
        request.type as keyof typeof acc
      ] = [];
    }
    (acc as Record<string, RequestListProps[]>)[
      request.type as keyof typeof acc
    ].push(request);
    return acc;
  }, {}) as Record<string, RequestListProps[]>;

  const [viewMore, setViewMore] = useState(false);

  useEffect(() => {
    if (requests.length > 5) {
      setViewMore(true);
    }
  }, [requests]);

  return (
    <div className='space-y-1'>
      {requests.length === 0 ? (
        <div className='space-y-1 text-neutral-500'>
          <p className='text-sm text-muted-foreground'>No requests found.</p>
        </div>
      ) : (
        <>
          <div className='text-neutral-500'>
            <p className='text-base font-normal text-muted-foreground'>
              Here are the list of requests :
            </p>
          </div>
          {Object.keys(groupedRequests)?.map((type: string) => {
            const allRequests = groupedRequests[String(type)];
            return (
              <div key={type} className='space-y-1 pb-2'>
                <p className='text-lg font-medium'>{transformString(type)}</p>
                {(viewMore ? allRequests.slice(0, 5) : allRequests)?.map(
                  (request, ind) => (
                    <CardIndividual request={request} key={ind} />
                  ),
                )}
                {allRequests?.length > 5 && (
                  <div className='flex flex-row'>
                    <Button
                      variant='outline'
                      onClick={() => setViewMore((prev) => !prev)}
                    >
                      {viewMore ? 'View more' : 'View less'}
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default RequestList;

function transformString(input: string) {
  return input
    ?.split('_')
    ?.map(
      (word: string) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join(' ');
}

const CardIndividual = ({ request }: { request: RequestListProps }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <>
      <Link
        href={request.link}
        key={request.link}
        onMouseEnter={() => setHovered(request.link)}
        onMouseLeave={() => setHovered(null)}
        className='block text-inherit no-underline'
      >
        <div className='relative flex items-center space-x-1 text-neutral-800'>
          <div className='flex-1'>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className='overflow-hidden'>
                  <p className='line-clamp-1 text-sm'>{request.title}</p>
                </div>
              </TooltipTrigger>
              <TooltipContent>{request.title}</TooltipContent>
            </Tooltip>
          </div>
          <div className='ml-3'>
            <Badge
              variant='secondary'
              className={`bg-${request.color}-100 text-${request.color}-800`}
            >
              {transformString(request.status)}
            </Badge>
          </div>
          {hovered === request.link && (
            <div className='absolute bottom-0 right-0 top-0 flex items-center'>
              <Button variant='outline' size='sm' className='flex items-center'>
                View Details
                <ArrowUpRight className='ml-2 h-4 w-4' />
              </Button>
            </div>
          )}
        </div>
      </Link>
    </>
  );
};
