import { getFullName } from '@aglint/shared-utils';
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
  dateStringFormat,
  getAllStandardRequestCount,
  getAllUrgentRequestCount,
  getRequestsList,
  transFormCardData,
  transformForChartData,
  transformProgressData,
  useAllScheduleList,
} from './hooks';
import { barChartDataType } from './utils';

function Dashboard() {
  const { requests, setFilters } = useRequests();
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
  // const totalRequestCount =
  //   selectedDateRequest?.date &&
  //   getSelectedDateRequestCount(selectedDateRequest.counts);

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
          selectedDateRequest?.date && (
            <>
              <Text
                size={3}
                content={` 👋 Hey, ${getFullName(recruiterUser.first_name, recruiterUser.last_name)}!`} 
                styleProps={{
                  style: {
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginBottom:'4px',
                    color: 'var(--neutral-11)'
                  },
                }}
              ></Text>
              <Text
                size={2}
                content={`You have ${getAllUrgentRequestCount(selectedDateRequest?.counts)} urgent requests and ${getAllStandardRequestCount(selectedDateRequest?.counts)} standard requests ${dateStringFormat(selectedDateRequest.date)}.`}
                styleProps={{
                  style: {
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginLeft:'20px',
                    marginBottom:'16px',
                  },
                }}
              ></Text>
            </>
          )
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
                      setFilters((pre) => {
                        return {
                          ...pre,
                          created_at: dayjs(
                            selectedDateRequest.date,
                          ).toString(),
                        };
                      });
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
