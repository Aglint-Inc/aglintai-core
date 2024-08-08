import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { useEffect, useState } from 'react';

import { GlobalBadge } from '@/devlink2/GlobalBadge';
import { RequestDashboard } from '@/devlink2/RequestDashboard';
import { RequestList } from '@/devlink2/RequestList';
import { useRequests } from '@/src/context/RequestsContext';
import { useRouterPro } from '@/src/hooks/useRouterPro';
import dayjs from '@/src/utils/dayjs';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import CompletedRequestsBox from './Components/CompletedRequestsBox';
import CompletionProgress from './Components/CompletionProgress';
import { RequestsBarChart } from './Components/RequestsBarChart';
import {
  getRequestsList,
  getSelectedDateRequestCount,
  transFormCardData,
  transformForChartData,
  transformProgressData,
  useAllScheduleList,
} from './hooks';
import { barChartDataType } from './utils';
import { Text } from '@/devlink/Text';

function Dashboard() {
  
  const { requests } = useRequests();
  const { status, data: requestList } = useAllScheduleList();
  const { setQueryParams } = useRouterPro();

  const [chartData, setChartData] = useState<barChartDataType[]>(null);

  const [selectedDateRequest, setSelectedDateRequest] =
    useState<Awaited<ReturnType<typeof getRequestsList>>['data'][number]>(null);

  const completedRequest =
    requests.status === 'success'
      ? requests.data.filter((ele) => ele.status === 'completed')
      : [];

  const getSelectedBar = ({ label }) => {
    const selectedRequest = requestList.data.find(
      (ele) => dayjs(ele.date).format('MMM DD') === label,
    );
    setSelectedDateRequest(selectedRequest);
  };

  const progressData =
    selectedDateRequest?.date && transformProgressData([selectedDateRequest]);
  const requestCardData =
    selectedDateRequest?.date && transFormCardData([selectedDateRequest]);
  const totalRequestCount =
    selectedDateRequest?.date &&
    getSelectedDateRequestCount(selectedDateRequest.counts);
  const formattedDate = dayjs(selectedDateRequest?.date).format('DD MMMM, dddd');

  useEffect(() => {
    if (status === 'success') {
      // requestList.data = dummyRequestData;
      setChartData(transformForChartData(requestList.data));
    }
  }, [status]);
  return (
    <>
      <RequestDashboard
        slotHeaderText={
          <>
          <Text
            size={1}
            content={`Hello, ${'John Doe'}!`}
            styleProps={{
              style: {
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
            }}
          ></Text><Text
            size={3}
            content={`You have 32 urgent requests and 34 standard requests today.`}
            styleProps={{
              style: {
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
            }}
          ></Text>
          </>
        }
        // ${totalRequestCount} Requests on ${formattedDate}
        textProgressTitle={
          progressData &&
          `${progressData?.open_request} Open Requests (${progressData?.completed_percentage}% complete)`
        }
        slotProgressBar={
          <CompletionProgress value={progressData?.completed_percentage} />
        }
        slotGraph={
          chartData && (
            <RequestsBarChart
              getSelectedBar={getSelectedBar}
              data={chartData}
            />
          )
        }
        slotRequestList={
          requestCardData &&
          requestCardData.map(({ title, iconName, total, urgent }) => {
            return (
              <RequestList
                iconName={iconName}
                textTitle={capitalizeFirstLetter(title)}
                key={title}
                textCount={total}
                slotBadge={
                  Boolean(urgent) && (
                    <GlobalBadge
                      size={1}
                      variant={'outline'}
                      textBadge={`${urgent} Urgent`}
                    />
                  )
                }
                onClickCard={{
                  onClick: () => {
                    setQueryParams({ tab: 'requests' });
                  },
                }}
              />
            );
          })
        }
        slotReqCompleted={
          <CompletedRequestsBox completedRequest={completedRequest} />
        }
      />
    </>
  );
}

export default Dashboard;
