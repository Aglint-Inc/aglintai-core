import Stack from '@mui/material/Stack';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  LinearScale,
  Tooltip,
} from 'chart.js/auto';
import { memo, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';

import {
  type SchedulingAnalyticsContextType,
  useSchedulingAnalytics,
} from '@/src/context/SchedulingAnalytics';
import { CompletedInterviews as CompletedInterviewsDev } from '@/devlink3/CompletedInterviews';

import { Empty } from './common';
import Loader from '../../Common/Loader';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

export const CompletedInterviews = memo(() => {
  const { completedInterviewType, setCompletedInterviewType } =
    useSchedulingAnalytics();
  return (
    <CompletedInterviewsDev
      isLastDaysActive={completedInterviewType === 'day'}
      isLastMonthsActive={completedInterviewType === 'month'}
      onClickLastDays={{ onClick: () => setCompletedInterviewType('day') }}
      onClickLastMonth={{ onClick: () => setCompletedInterviewType('month') }}
      textLastDays={'Last month'}
      textMonth={'Last year'}
      slotGraph={<Container />}
    />
  );
});
CompletedInterviews.displayName = 'CompletedInterviews';

const Container = memo(() => {
  const {
    completedInterviewType,
    completed_interviews: { data, status },
  } = useSchedulingAnalytics();

  if (status === 'pending')
    return (
      <Stack height={'350px'}>
        <Loader />
      </Stack>
    );

  if (status === 'error') return <>Error</>;

  if (data.length === 0) return <Empty />;

  return (
    <Stack height={'350px'}>
      <BarChart data={data} completedInterviewType={completedInterviewType} />
    </Stack>
  );
});
Container.displayName = 'Container';

type Props = Pick<
  SchedulingAnalyticsContextType['completed_interviews'],
  'data'
> &
  Pick<SchedulingAnalyticsContextType, 'completedInterviewType'>;

ChartJs.register(BarElement, Tooltip, CategoryScale, LinearScale);

const BarChart = memo(({ data, completedInterviewType }: Props) => {
  const getLabel = useCallback(
    (label: string) => {
      if (completedInterviewType === 'day')
        return dayjsLocal(label ?? '').format('DD MMM');
      return dayjsLocal(label ?? '').format('MMM YY');
    },
    [completedInterviewType],
  );
  const { labels, counts } = (data ?? []).reduce(
    (acc, curr) => {
      acc.labels.push(getLabel(curr.date));
      acc.counts.push(curr.count);
      return acc;
    },
    { labels: [], counts: [] } satisfies { labels: string[]; counts: number[] },
  );
  const bars = {
    labels: labels,
    datasets: [
      {
        label: 'Interviews',
        data: counts,
        backgroundColor: '#5eae91',
        borderRadius: 8,
        borderSkipped: false,
        grouped: true,
        barThickness: 30,
      },
    ],
  };
  return (
    <Bar
      options={{
        elements: {
          bar: {
            borderRadius: 20,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              title: (values) => labels[values[0].dataIndex],
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
              text: 'Interviews',
            },
            border: {
              color: 'transparent',
            },
            grid: {
              display: false,
              color: 'rgba(0, 0, 0, 0.05)',
            },
          },
        },
      }}
      data={bars}
    />
  );
});
BarChart.displayName = 'BarChart';
