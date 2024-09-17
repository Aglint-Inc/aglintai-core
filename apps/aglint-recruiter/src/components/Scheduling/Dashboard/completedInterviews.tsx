import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
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

ChartJs.register(BarElement, Tooltip, CategoryScale, LinearScale);

export const CompletedInterviews = memo(() => {
  const {
    completedInterviewType,
    setCompletedInterviewType,
    completed_interviews: { data, status },
  } = useSchedulingAnalytics();

  const value =
    completedInterviewType === 'year'
      ? 'month'
      : completedInterviewType === 'month'
        ? 'day'
        : 'quarter';

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle>Completed Interviews</CardTitle>
        <Tabs value={value} className='h-[30px]'>
          <TabsList>
            <TabsTrigger
              value='month'
              onClick={() => setCompletedInterviewType('year')}
              className='p-0 px-2 text-[12px]'
            >
              Last Year
            </TabsTrigger>
            <TabsTrigger
              value='quarter'
              onClick={() => setCompletedInterviewType('quarter')}
            >
              Last Quarter
            </TabsTrigger>
            <TabsTrigger
              value='day'
              onClick={() => setCompletedInterviewType('month')}
            >
              Last Month
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <GraphContainer
          status={status}
          data={data}
          completedInterviewType={completedInterviewType}
        />
      </CardContent>
    </Card>
  );
});

CompletedInterviews.displayName = 'CompletedInterviews';

interface GraphContainerProps {
  status: string;
  data: any[];
  completedInterviewType: string;
}

const GraphContainer = memo(
  ({ status, data, completedInterviewType }: GraphContainerProps) => {
    if (status === 'pending' || data.length === 0) {
      return (
        <div className='flex h-[350px] items-center justify-center'>
          <Loader2 className='h-8 w-8 animate-spin text-gray-400' />
        </div>
      );
    }

    if (status === 'error') return <div className='h-[350px]'>Error</div>;

    return (
      <div className='h-[350px]'>
        <BarChart data={data} completedInterviewType={completedInterviewType} />
      </div>
    );
  },
);

GraphContainer.displayName = 'GraphContainer';

type BarChartProps = Pick<
  SchedulingAnalyticsContextType['completed_interviews'],
  'data'
> &
  Pick<SchedulingAnalyticsContextType, 'completedInterviewType'>;

const BarChart = memo(({ data, completedInterviewType }: BarChartProps) => {
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
    { labels: [], counts: [] } as { labels: string[]; counts: number[] },
  );

  const chartData = {
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
        elements: { bar: { borderRadius: 20 } },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: { title: (values) => labels[values[0].dataIndex] },
          },
          legend: { display: false },
        },
        scales: {
          x: {
            title: { display: false, font: { weight: 'bold' }, text: 'Dates' },
            border: { color: 'transparent' },
            grid: { display: false },
          },
          y: {
            title: {
              display: false,
              font: { weight: 'bold' },
              text: 'Interviews',
            },
            border: { color: 'transparent' },
            grid: { display: false, color: 'rgba(0, 0, 0, 0.05)' },
          },
        },
      }}
      data={chartData}
    />
  );
});

BarChart.displayName = 'BarChart';
