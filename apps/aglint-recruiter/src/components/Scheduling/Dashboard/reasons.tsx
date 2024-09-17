import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
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
      <Stack height={'300px'}>
        <div className='flex h-[350px] items-center justify-center'>
          <Loader2 className='h-8 w-8 animate-spin text-gray-400' />
        </div>
      </Stack>
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
    <Stack alignItems={'center'} justifyContent={'center'} gap={4}>
      <DoughnutChart data={safeData} />
      <Meta data={safeData} />
    </Stack>
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
    <Stack
      width={
        s ? (m ? (l ? (xl ? '275px' : '250px') : '225px') : '200px') : '175px'
      }
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
    </Stack>
  );
});
DoughnutChart.displayName = 'DoughnutChart';

const Meta = memo(({ data }: Props) => {
  const sum = (data ?? []).reduce((acc, { count }) => {
    acc += count;
    return acc;
  }, 0);
  return (
    <Stack gap={1} width={'100%'} maxHeight={'48px'} overflow={'scroll'}>
      {data.map(({ count, color, name }, i) => {
        return (
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            gap={2}
            key={i}
          >
            <Stack direction={'row'} gap={1} alignItems={'center'}>
              <Stack
                sx={{
                  bgcolor: color,
                  width: '10px',
                  aspectRatio: 1,
                  borderRadius: 'var(--radius-full)',
                }}
              />

              <Typography
                variant='body1'
                sx={{
                  textWrap: 'nowrap',
                  // textTransform: 'capitalize',
                }}
              >
                {name}
              </Typography>
            </Stack>
            <Typography variant='body1'>
              {((count / sum) * 100).toFixed(0)}%
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
});
Meta.displayName = 'Meta';
