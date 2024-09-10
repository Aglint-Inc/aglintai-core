import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { CompletedInterviews as CompletedInterviewsDev } from '@devlink3/CompletedInterviews';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  LinearScale,
  Tooltip,
} from 'chart.js/auto';
import { Loader2 } from 'lucide-react';
import { memo, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';

import {
  type SchedulingAnalyticsContextType,
  useSchedulingAnalytics,
} from '@/context/SchedulingAnalytics';

export const CompletedInterviews = memo(() => {
  const { completedInterviewType, setCompletedInterviewType } =
    useSchedulingAnalytics();
  return (
    <CompletedInterviewsDev
      isLastDaysActive={completedInterviewType === 'month'}
      isLastQuarterActive={completedInterviewType === 'quarter'}
      isLastMonthsActive={completedInterviewType === 'year'}
      onClickLastDays={{ onClick: () => setCompletedInterviewType('month') }}
      onClickLastQuarter={{
        onClick: () => setCompletedInterviewType('quarter'),
      }}
      onClickLastMonth={{ onClick: () => setCompletedInterviewType('year') }}
      textLastDays={'Last Month'}
      textLastQuarter={'Last Quarter'}
      textMonth={'Last Year'}
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
      <div className='flex items-center justify-center h-[350px]'>
        <Loader2 className='w-8 h-8 animate-spin text-gray-400' />
      </div>
    );

  if (status === 'error') return <>Error</>;

  if (data.length === 0)
    return (
      <div className='flex items-center justify-center h-[350px]'>
        <Loader2 className='w-8 h-8 animate-spin text-gray-400' />
      </div>
    );

  return (
    <div className='h-[350px]'>
      <BarChart data={data} completedInterviewType={completedInterviewType} />
    </div>
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
      if (completedInterviewType === 'month')
        return dayjsLocal(label ?? '').format('DD MMM');
      if (completedInterviewType === 'quarter')
        return `Week ${dayjsLocal(label ?? '').week()}`;
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
