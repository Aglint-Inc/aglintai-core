import { getFullName } from '@aglint/shared-utils';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import { RequestDashboard } from '@/devlink2/RequestDashboard';
import { RequestList } from '@/devlink2/RequestList';
import { ReqUrgent } from '@/devlink2/ReqUrgent';
import { Skeleton } from '@/devlink2/Skeleton';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useRequests } from '@/src/context/RequestsContext';
import { useRouterPro } from '@/src/hooks/useRouterPro';
import dayjs from '@/src/utils/dayjs';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import { RequestCardSkeletons } from '../RequestSections/Section';
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
  // const totalRequestCount =
  //   selectedDateRequest?.date &&
  //   getSelectedDateRequestCount(selectedDateRequest.counts);

  useEffect(() => {
    if (status === 'success') {
      // requestList.data = dummyRequestData;
      setChartData(transformForChartData(requestList.data));
    }
  }, [status]);

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

  return (
    <>
      <RequestDashboard
        textGreetingTitle={`👋 Hey, ${getFullName(recruiterUser.first_name, recruiterUser.last_name)}!`}
        textGreetingDescription={
          selectedDateRequest?.date &&
          formatRequestCountText(
            getAllUrgentRequestCount(selectedDateRequest?.counts),
            getAllStandardRequestCount(selectedDateRequest?.counts),
            `on ${dateStringFormat(selectedDateRequest.date)}`,
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
            <Stack
              borderRadius={'10px'}
              position={'relative'}
              width={485}
              height={150}
            >
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
            <>
              <ReqUrgent
                textRequests={`${0} Urgent Requests`}
                onClickUrgentRequest={{
                  onClick: () => {
                    setQueryParams({ tab: 'requests', section: 'urgent' });
                  },
                }}
              />
              {requestCardData &&
                requestCardData.map(({ title, iconName, total }) => {
                  return (
                    <RequestList
                      iconName={iconName}
                      textTitle={capitalizeFirstLetter(title)}
                      key={title}
                      textCount={total}
                      onClickCard={{
                        onClick: () => {
                          setQueryParams({ tab: 'requests', section: title });
                        },
                      }}
                    />
                  );
                })}
              <CompletedRequestsBox completedRequest={completedRequest} />
            </>
          )
        }
      />
    </>
  );
}

export default Dashboard;
