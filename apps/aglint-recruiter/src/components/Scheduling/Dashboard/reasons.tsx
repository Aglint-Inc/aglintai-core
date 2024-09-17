import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  LinearScale,
  Tooltip,
} from 'chart.js/auto';
import { BarChart2, Loader2 } from 'lucide-react';
import { memo } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { useSchedulingAnalytics } from '@/context/SchedulingAnalytics';
import { getOrderedGraphValues } from '@/job/metrics/utils';

export const Reasons = memo(() => {
  const { reasonsType, setReasonsType } = useSchedulingAnalytics();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reasons</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          value={reasonsType}
          onValueChange={(value) =>
            setReasonsType(value as 'reschedule' | 'declined')
          }
        >
          <TabsList>
            <TabsTrigger value='reschedule'>Reschedule</TabsTrigger>
            <TabsTrigger value='declined'>Declined</TabsTrigger>
          </TabsList>
          <TabsContent value='reschedule'>
            <Container />
          </TabsContent>
          <TabsContent value='declined'>
            <Container />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
});
Reasons.displayName = 'Reasons';

const Container = memo(() => {
  const {
    reasons: { data, status },
  } = useSchedulingAnalytics();

  if (status === 'pending')
    return (
      <div className='h-[300px]'>
        <div className='flex h-[350px] items-center justify-center'>
          <Loader2 className='h-8 w-8 animate-spin text-gray-400' />
        </div>
      </div>
    );

  if (status === 'error') return <>Error</>;

  if (data.length === 0)
    return (
      <div className='h-[296px]'>
        <div className='flex h-full flex-col items-center justify-center'>
          <BarChart2 className='h-12 w-12 text-gray-400' />
          <p className='mt-2 text-sm text-gray-500'>No data available</p>
        </div>
      </div>
    );

  const safeData = getOrderedGraphValues(data);

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <DoughnutChart data={safeData} />
      <Meta data={safeData} />
    </div>
  );
});
Container.displayName = 'Container';

type Props = { data: ReturnType<typeof getOrderedGraphValues> };

ChartJs.register(BarElement, Tooltip, CategoryScale, LinearScale);

const DoughnutChart = memo(({ data }: Props) => {
  const { names, counts, colors } = data.reduce(
    (acc, { count, name, color }) => {
      acc.names.push(name);
      acc.counts.push(count);
      acc.colors.push(color);
      return acc;
    },
    { names: [], counts: [], colors: [] },
  );
  const dataBar = {
    labels: names,
    datasets: [
      {
        data: counts,
        backgroundColor: colors,
        borderColor: 'transparent',
        hoverBorderColor: 'transparent',
        spacing: 4,
        borderRadius: 4,
      },
    ],
  };
  const xl = useMediaQuery('(min-width:1900px)');
  const l = useMediaQuery('(min-width:1500px)');
  const m = useMediaQuery('(min-width:1300px)');
  const s = useMediaQuery('(min-width:1300px)');

  return (
    <div
      className={` ${s ? (m ? (l ? (xl ? '275px' : '250px') : '225px') : '200px') : '175px'} `}
      style={{ aspectRatio: 1 }}
    >
      <Doughnut
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              display: false,
            },
            y: {
              display: false,
            },
          },
        }}
        data={dataBar}
      />
    </div>
  );
});
DoughnutChart.displayName = 'DoughnutChart';

const Meta = memo(({ data }: Props) => {
  // const sum = (data ?? []).reduce((acc, { count }) => {
  //   acc += count;
  //   return acc;
  // }, 0);
  return (
    <div className='flex max-h-[48px] w-full flex-col gap-1 overflow-scroll'>
      {data.map(({ color, name }, i) => {
        return (
          <div className='flex flex-row items-center gap-1' key={i}>
            <div
              className='h-3 w-3 rounded'
              style={{ backgroundColor: color }}
            />
            <span className='text-sm'>{name}</span>
          </div>
        );
      })}
    </div>
  );
});
Meta.displayName = 'Meta';
