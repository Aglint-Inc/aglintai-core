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
import { memo } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { Reason } from '@/devlink3/Reason';
import { useSchedulingAnalytics } from '@/src/context/SchedulingAnalytics';

import Loader from '../../Common/Loader';
import { getOrderedGraphValues } from '../../Jobs/Job/Dashboard/utils';
import { Empty } from './common';
import { FilterDropDownDash } from './FilterDropDownDash';

export const Reasons = memo(() => {
  const { reasonsType, setReasonsType } = useSchedulingAnalytics();
  return (
    <Reason
      slotReasonDropdown={
        <FilterDropDownDash
          itemList={[
            { label: 'Reschedule', value: 'reschedule' },
            { label: 'Declined', value: 'declined' },
          ]}
          value={reasonsType}
          onChange={setReasonsType}
        />
      }
      slotReasonGraph={<Container />}
    />
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
        <Loader />
      </Stack>
    );

  if (status === 'error') return <>Error</>;

  if (data.length === 0)
    return (
      <Stack>
        <Empty />
      </Stack>
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
