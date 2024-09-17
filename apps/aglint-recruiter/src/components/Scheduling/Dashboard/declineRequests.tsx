import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { NewInterviewDetail } from '@devlink3/NewInterviewDetail';
import Stack from '@mui/material/Stack';
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

export const DeclineRequests = memo(() => (
  <NewInterviewDetail
    textHeading={'Decline Requests'}
    slotDropdownButton={<></>}
    slotInterviewDetailPill={<Container />}
  />
));
DeclineRequests.displayName = 'DeclineRequests';

const Container = memo(() => {
  const {
    decline_requests: { data, status },
  } = useSchedulingAnalytics();

  if (status === 'pending')
    return (
      <div className='flex h-[350px] items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-gray-400' />
      </div>
    );

  if (status === 'error') return <>Error</>;

  if (data.length === 0)
    return (
      <div className='flex h-[350px] items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-gray-400' />
      </div>
    );

  return (
    <Stack height={'200px'}>
      <BarChart data={data} />
    </Stack>
  );
});
Container.displayName = 'Container';

type Props = Pick<SchedulingAnalyticsContextType['decline_requests'], 'data'>;

ChartJs.register(BarElement, Tooltip, CategoryScale, LinearScale);

const BarChart = memo(({ data }: Props) => {
  const getLabel = useCallback(
    (label: string) => dayjsLocal(label ?? '').format('MMM'),
    [],
  );
  const { labels, counts } = (data ?? []).reduce(
    (acc, curr) => {
      acc.labels.push(getLabel(curr.completed_at));
      acc.counts.push(curr.count);
      return acc;
    },
    { labels: [], counts: [] } satisfies { labels: string[]; counts: number[] },
  );
  const bars = {
    labels: labels,
    datasets: [
      {
        label: 'Decline requests',
        data: counts,
        backgroundColor: '#8d8d86',
        borderRadius: {
          topRight: 100,
          bottomRight: 100,
        },
        borderSkipped: false,
        grouped: true,
        barThickness: 20,
      },
    ],
  };
  return (
    <Bar
      options={{
        indexAxis: 'y',
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
              text: 'Decline Requests',
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
