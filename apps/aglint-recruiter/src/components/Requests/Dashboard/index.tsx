import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import { GlobalBadge } from '@/devlink2/GlobalBadge';
import { RequestDashboard } from '@/devlink2/RequestDashboard';
import { RequestList } from '@/devlink2/RequestList';
import { Skeleton } from '@/devlink2/Skeleton';
import { Text } from '@/devlink2/Text';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useRequests } from '@/src/context/RequestsContext';
import { useRouterPro } from '@/src/hooks/useRouterPro';
import dayjs from '@/src/utils/dayjs';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import { RequestCardSkeletons } from '../Section';
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

function Dashboard() {
  const { requests } = useRequests();
  const { status, data: requestList } = useAllScheduleList();
  const { setQueryParams } = useRouterPro();

  const { recruiterUser } = useAuthDetails();

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
              color={'neutral'}
              content={`Hello, ${capitalizeFirstLetter(recruiterUser.first_name)} 👋🏻.`}
            />
            <Text
              content={`${totalRequestCount || ''} Requests on ${dayjsLocal(selectedDateRequest?.date).format('DD MMMM, dddd')}`}
            />
          </>
        }
        textProgressTitle={
          progressData &&
          `${progressData?.open_request} Open Requests (${progressData?.completed_percentage}% complete)`
        }
        slotProgressBar={
          <CompletionProgress value={progressData?.completed_percentage} />
        }
        slotGraph={
          status === 'pending' ? (
            <Stack position={'relative'} width={510} height={150}>
              <Skeleton />
            </Stack>
          ) : (
            chartData && (
              <RequestsBarChart
                getSelectedBar={getSelectedBar}
                data={chartData}
              />
            )
          )
        }
        slotRequestList={
          status === 'pending' ? (
            <RequestCardSkeletons />
          ) : (
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
                        textBadge={`${urgent} Urgent Requests`}
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
          )
        }
        slotReqCompleted={
          <CompletedRequestsBox completedRequest={completedRequest} />
        }
      />
    </>
  );
}

export default Dashboard;
