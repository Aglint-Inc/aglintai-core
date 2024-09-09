import { RequestProvider } from '@/context/RequestContext';
import { useRouterPro } from '@/hooks/useRouterPro';
import { Request } from '@/queries/requests/types';
import dayjs from '@/utils/dayjs';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { RequestCard } from '../_common/Components/RequestCard';
import RequestHistoryFilter from '../_common/Components/RequestHistoryFilter';
import { useCompletedRequestsStore } from '../_common/Context/store';
import { useCompletedRequests } from '../_common/hooks';

function CompletedRequests() {
  const { completedFilters } = useCompletedRequestsStore();
  const { data: completedRequests } = useCompletedRequests({
    completedFilters,
  });
  const { replace } = useRouterPro();

  // Group completed requests by date
  const groupedRequests = groupRequestsByDate(completedRequests ?? []);
  return (
    <>
      <div className='px-4 py-8'>
        <div className='flex flex-row sticky top-0 justify-between items-center mb-8'>
          <div className='w-[600px]'>
            <Breadcrumb>
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
                <BreadcrumbLink>Completed Requests</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
          <RequestHistoryFilter />
        </div>
        <div className='w-[960px] mx-auto'>
          <h2 className='text-2xl font-bold mb-6'>
            {capitalizeFirstLetter('all_completed_requests')}
          </h2>
          {Object.entries(groupedRequests).map(([date, requests]) => (
            <div key={date} className='p-6'>
              <h3 className='text-xl font-semibold mb-4'>
                {dayjs(date).fromNow()}
              </h3>
              <div className='flex flex-col gap-4'>
                {requests.map((request, i) => (
                  <RequestProvider
                    key={request.id ?? i}
                    request_id={request.id}
                  >
                    <RequestCard {...request} />
                  </RequestProvider>
                ))}
              </div>
            </div>
          ))}
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
