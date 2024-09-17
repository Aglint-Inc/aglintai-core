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
import { memo } from 'react';
import { Bar } from 'react-chartjs-2';

import {
  type SchedulingAnalyticsContextType,
  useSchedulingAnalytics,
} from '@/context/SchedulingAnalytics';
import { SafeObject } from '@/utils/safeObject';
import { capitalizeAll } from '@/utils/text/textUtils';

export const Interviewes = memo(() => (
  <NewInterviewDetail
    textHeading={'Interviews'}
    slotDropdownButton={<></>}
    slotInterviewDetailPill={<Container />}
  />
));
Interviewes.displayName = 'Interviewes';

const Container = memo(() => {
  const {
    tabs: { data, status },
  } = useSchedulingAnalytics();

  if (status === 'pending')
    return (
      <Stack width={'400px'} height={'500px'}>
        <div className='flex h-[350px] items-center justify-center'>
          <Loader2 className='h-8 w-8 animate-spin text-gray-400' />
        </div>
      </Stack>
    );

  if (status === 'error') return <>Error</>;

  return (
    <Stack width={'400px'} height={'500px'}>
      <BarChart data={data} />
    </Stack>
  );
});
Container.displayName = 'Container';

type Props = Pick<SchedulingAnalyticsContextType['tabs'], 'data'>;

ChartJs.register(BarElement, Tooltip, CategoryScale, LinearScale);

const BarChart = memo(({ data }: Props) => {
  const dataa: Omit<Props['data'], 'not_scheduled'> = {
    cancelled: data.cancelled,
    completed: data.completed,
    confirmed: data.completed,
    waiting: data.waiting,
  };
  const { labels, counts } = SafeObject.entries(dataa ?? {}).reduce(
    (acc, [key, value]) => {
      acc.labels.push(capitalizeAll(key ?? '--'));
      acc.counts.push(value);
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
        backgroundColor: '#bcbbb5',
        borderRadius: 8,
        borderSkipped: false,
        grouped: true,
        barThickness: 40,
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
