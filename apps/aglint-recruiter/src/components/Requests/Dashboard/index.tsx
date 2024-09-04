import { getFullName } from '@aglint/shared-utils';

import { Skeleton } from '@/components/ui/skeleton';
import { RequestDashboard } from '@/devlink2/RequestDashboard';
import { RequestList } from '@/devlink2/RequestList';
import { ReqUrgent } from '@/devlink2/ReqUrgent';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useRequests } from '@/src/context/RequestsContext';
import { useRouterPro } from '@/src/hooks/useRouterPro';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import CompletedRequestsBox from './Components/CompletedRequestsBox';
import CompletionProgress from './Components/CompletionProgress';
import { RequestsBarChart } from './Components/RequestsBarChart';
import { useRequestCount } from './hooks';
import { requestTypes } from './utils';

function Dashboard() {
  const { setSections, initialSections } = useRequests();
  const { data: requestCount, status } = useRequestCount();
  const { setQueryParams } = useRouterPro();

  const { recruiterUser } = useAuthDetails();

  function formatRequestCountText(urgentCount, standardCount, dateString) {
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

  const lastCompletedRequestCount =
    requestCount?.chat.completedRequest[
      requestCount.chat.completedRequest.length - 1
    ]?.count || 0;

  const completedToday = lastCompletedRequestCount;

  const open_request = requestCount?.all_open_request || 0;

  const completed_percentage =
    Math.floor(
      (requestCount?.card.completed_request /
        (open_request + requestCount?.card.completed_request)) *
        100,
    ) || 0;

  return (
    <div>
      <RequestDashboard
        textGreetingTitle={`👋 Hey, ${getFullName(recruiterUser.first_name, recruiterUser.last_name)}!`}
        textGreetingDescription={formatRequestCountText(
          requestCount?.card.urgent_request,
          requestCount?.card.standard_request,
          'today',
        )}
        textProgressTitle={`${open_request} Open Requests (${completed_percentage}% complete)`}
        slotProgressBar={<CompletionProgress value={completed_percentage} />}
        slotGraph={
          status === 'pending' ? (
            <div className='relative w-[485px] h-[150px] rounded-[10px]'>
              <Skeleton className='w-full h-full' />
            </div>
          ) : (
            requestCount?.chat && (
              <RequestsBarChart
                createdRequestData={requestCount?.chat.createdRequest}
                completedRequestData={requestCount?.chat.completedRequest}
                onGoingRequestData={requestCount?.chat.onGoingRequest}
              />
            )
          )
        }
        slotRequestList={
          <>
            <ReqUrgent
              textRequests={`${requestCount?.card.urgent_request || 0} Urgent Requests`}
              onClickUrgentRequest={{
                onClick: () => {
                  setSections({ ...initialSections, urgent_request: true });
                  setQueryParams({
                    tab: 'requests',
                    section: 'urgent_request',
                  });
                },
              }}
            />
            {requestTypes.map(({ title, iconName }) => (
              <RequestList
                iconName={iconName}
                textTitle={capitalizeFirstLetter(title)}
                key={title}
                textCount={requestCount?.card?.[title] ?? 0}
                onClickCard={{
                  onClick: () => {
                    setSections({ ...initialSections, [title]: true });
                    setQueryParams({ tab: 'requests', section: title });
                  },
                }}
              />
            ))}
            <CompletedRequestsBox
              status={status}
              completedRequest={completedToday || 0}
            />
          </>
        }
      />
    </div>
  );
}

export default Dashboard;
