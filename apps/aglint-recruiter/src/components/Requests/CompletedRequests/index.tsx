import { RequestProvider } from '@/context/RequestContext';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';
import RequestHistoryFilter from '../_common/Components/RequestHistoryFilter';
import { useCompletedRequestsStore } from '../_common/Context/store';
import { useCompletedRequests } from '../_common/hooks';
import { useRouterPro } from '@/hooks/useRouterPro';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import dayjs from '@/utils/dayjs';
import { RequestCard } from '../_common/Components/RequestCard';

function CompletedRequests() {
  const { completedFilters } = useCompletedRequestsStore();
  const { data: completedRequests } = useCompletedRequests({
    completedFilters,
  });
  const { replace } = useRouterPro();

  // Group completed requests by date
  const groupedRequests = groupRequestsByDate(completedRequests ?? []);
  console.log(groupedRequests, completedRequests);
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
          {Object.entries(groupedRequests).map(([date, requests]: any) => (
            <div key={date} className='p-6'>
              <h3 className='text-xl font-semibold mb-4'>
                {dayjs(date).fromNow()}
              </h3>
              <div className='flex flex-col gap-4'>
                {requests.map((props, i) => (
                  <RequestProvider key={props.id ?? i} request_id={props.id}>
                    <RequestCard {...props} />
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

function groupRequestsByDate(requests) {
  return requests.reduce((acc, request) => {
    const date = new Date(request.completed_at).toISOString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(request);
    return acc;
  }, {});
}

export default CompletedRequests;
