import { getFullName } from '@aglint/shared-utils';
import { Stack } from '@mui/material';

import { RequestDashboard } from '@/devlink2/RequestDashboard';
import { RequestList } from '@/devlink2/RequestList';
import { ReqUrgent } from '@/devlink2/ReqUrgent';
import { Skeleton } from '@/devlink2/Skeleton';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useRouterPro } from '@/src/hooks/useRouterPro';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import CompletedRequestsBox from './Components/CompletedRequestsBox';
import CompletionProgress from './Components/CompletionProgress';
import { RequestsBarChart } from './Components/RequestsBarChart';
import { useRequestCount } from './hooks';
import { requestTypes } from './utils';

function Dashboard() {
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
  const lastCreatedRequestCount =
    requestCount?.chat.createdRequest[
      requestCount.chat.createdRequest.length - 1
    ]?.count || 0;
  const lastCompletedRequestCount =
    requestCount?.chat.completedRequest[
      requestCount.chat.completedRequest.length - 1
    ]?.count || 0;
  const lastOngoingRequestCount =
    requestCount?.chat.onGoingRequest[
      requestCount.chat.onGoingRequest.length - 1
    ]?.count || 0;

  const total_requests =
    lastCreatedRequestCount +
    lastCompletedRequestCount +
    lastOngoingRequestCount;

  const open_request = total_requests - lastCompletedRequestCount || 0;

  const completed_percentage =
    Math.floor((lastCompletedRequestCount / total_requests) * 100) || 0;

  return (
    <>
      <RequestDashboard
        textGreetingTitle={`👋 Hey, ${getFullName(recruiterUser.first_name, recruiterUser.last_name)}!`}
        textGreetingDescription={formatRequestCountText(
          requestCount?.card.urgentRequest,
          requestCount?.card.standardRequest,
          'today',
        )}
        textProgressTitle={`${open_request} Open Requests (${completed_percentage}% complete)`}
        slotProgressBar={<CompletionProgress value={completed_percentage} />}
        slotGraph={
          status === 'pending' ? (
            <Stack
              borderRadius={'10px'}
              position={'relative'}
              width={485}
              height={150}
            >
              <Skeleton />
            </Stack>
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
              textRequests={`${requestCount?.card.urgentRequest || 0} Urgent Requests`}
              onClickUrgentRequest={{
                onClick: () => {
                  setQueryParams({ tab: 'requests', section: 'urgent' });
                },
              }}
            />
            {requestTypes.map(({ title, iconName }) => {
              return (
                <RequestList
                  iconName={iconName}
                  textTitle={capitalizeFirstLetter(title)}
                  key={title}
                  textCount={requestCount?.card[String(title)] || 0}
                  onClickCard={{
                    onClick: () => {
                      setQueryParams({ tab: 'requests', section: title });
                    },
                  }}
                />
              );
            })}
            <CompletedRequestsBox
              status={status}
              completedRequest={requestCount?.card.completedRequests || 0}
            />
          </>
        }
      />
    </>
  );
}

export default Dashboard;
