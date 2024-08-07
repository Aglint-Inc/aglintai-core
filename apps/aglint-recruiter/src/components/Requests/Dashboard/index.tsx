import { useMediaQuery } from '@mui/material';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  LinearScale,
  Tooltip,
} from 'chart.js/auto';
import { capitalize } from 'lodash';
import { FC, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
ChartJs.register(BarElement, Tooltip, CategoryScale, LinearScale);

import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

import { ReqCompleted } from '@/devlink2/ReqCompleted';
import { RequestDashboard } from '@/devlink2/RequestDashboard';
import { RequestList } from '@/devlink2/RequestList';
import { TextWithIcon } from '@/devlink2/TextWithIcon';
import { useRequests } from '@/src/context/RequestsContext';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import { getOrderedGraphValues } from '../../Jobs/Job/Dashboard/utils';
import CompletionProgress from './Components/CompletionProgress';
import {
  transFormCardData,
  transformForChartData,
  transformProgressData,
  useAllScheduleList,
} from './hooks';
import { dummyRequestData } from './utils';
type barChartDataType = {
  name: string;
  count: number;
  color: string;
};
type requestCardDataType = {
  title: string;
  count: number;
  iconName: string;
};
type progressDataType = {
  completed_request: number;
  open_request: number;
  completed_percentage: number;
};
function Dashboard() {
  const { requests } = useRequests();
  const { status } = useAllScheduleList();
  const [chartData, setChartData] = useState<barChartDataType[]>(null);
  const [requestCardData, setRequestCardData] =
    useState<requestCardDataType[]>(null);
  const [progressData, setProgressData] = useState<progressDataType>();
  const [openCompleted, setOpenCompleted] = useState(false);
  useEffect(() => {
    if (status === 'success') {
      setChartData(transformForChartData(dummyRequestData));
      setRequestCardData(transFormCardData(dummyRequestData));
      setProgressData(transformProgressData(dummyRequestData));
    }
  }, [status]);

  const completedRequest =
    requests.status === 'success'
      ? requests.data.filter((ele) => ele.status === 'completed')
      : [];

  const totalRequestCount =
    chartData &&
    chartData.map((ele) => ele.count).reduce((acc, val) => acc + val, 0);
  return (
    <>
      <RequestDashboard
        textGraphTitle={`${totalRequestCount} Requests on ${dayjsLocal().format('DD MMMM YYYY, dddd')}`}
        textProgressTitle={
          progressData &&
          `${progressData?.open_request} Open Requests (${progressData.completed_percentage}% complete)`
        }
        slotProgressBar={<CompletionProgress />}
        slotGraph={chartData && <BarChart skills={chartData} />}
        slotRequestList={
          requestCardData &&
          requestCardData.map(({ title, count, iconName }) => {
            return (
              <RequestList
                iconName={iconName}
                textTitle={capitalizeFirstLetter(title)}
                key={title}
                textCount={count}
              />
            );
          })
        }
        slotReqCompleted={
          completedRequest.length ? (
            <ReqCompleted
              isDetailListVisible={openCompleted}
              onClickArrow={{
                onClick: () => setOpenCompleted(!openCompleted),
              }}
              textTitle={`${progressData?.completed_request} Requests completed`}
              textDesc={`View detailed list of completed requests`}
              slotTextwithIcon={completedRequest.map((ele, i) => {
                return (
                  <TextWithIcon
                    key={i}
                    textContent={ele.title}
                    color={'neutral'}
                    iconSize={4}
                    iconName={'event_available'}
                  />
                );
              })}
            />
          ) : (
            <></>
          )
        }
      />
    </>
  );
}

export default Dashboard;

const BarChart: FC<{
  skills: ReturnType<typeof getOrderedGraphValues>;
}> = ({ skills }) => {
  const matches = useMediaQuery('(min-width:1920px)');
  const { labels, tooltips, counts, colors } = skills.reduce(
    (acc, { color, name, count }) => {
      const safeName = capitalize((name ?? '').trim());
      acc.labels.push(
        safeName.length > 12 ? `${safeName.slice(0, 12)}..` : safeName,
      );
      acc.tooltips.push(safeName);
      acc.counts.push(count);
      acc.colors.push(color);
      return acc;
    },
    { labels: [], tooltips: [], counts: [], colors: [] },
  );
  const dataBar = {
    labels: labels,
    datasets: [
      {
        label: 'requests',
        data: counts,
        backgroundColor: colors,
        borderRadius: 0,
        borderSkipped: false,
        grouped: true,
        barThickness: 20,
      },
    ],
  };

  return (
    <Bar
      options={{
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: matches ? 4 : 3,
        plugins: {
          tooltip: {
            callbacks: {
              title: (values) => tooltips[values[0].dataIndex],
            },
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            title: {
              display: false,
              font: { weight: 'bold' },
              text: 'Dates',
            },
            border: {
              color: 'transparent',
            },
            grid: {
              display: false,
            },
          },
          y: {
            title: {
              display: false,
              font: { weight: 'bold' },
              text: 'Request',
            },
            border: {
              color: 'transparent',
            },
            grid: {
              display: false,
              color: 'rgba(0, 0, 0, 0.05)',
            },
            display: false,
          },
        },
      }}
      data={dataBar}
    />
  );
};
