import { type ChartConfig, ChartContainer } from '@components/ui/chart';
import { ArrowDownIcon, DownloadIcon } from 'lucide-react';
import React from 'react';
import {
  CartesianGrid,
  Scatter,
  ScatterChart,
  Tooltip,
  // Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useDeclineCount } from 'src/app/(authenticated)/reports/_common/hook/interview/interview.hook';

import ReportCard from '@/components/Common/ReportBlocks/ReportCard';

const chartConfig = {
  // desktop: {
  //   label: 'Desktop',
  //   color: '#2563eb',
  // },
} satisfies ChartConfig;

export default function DeclineLeadTimeChart() {
  const { average, scatterData, isFetching, isError } = useDeclineCount();
  const averageLeadTime = average || 0;
  return (
    <ReportCard
      title={'Decline lead time'}
      isEmpty={!scatterData.filter((item) => item.cancelled).length}
      error={isError ? 'Error fetching data' : undefined}
      isLoading={isFetching}
      headerSlot={
        <div className='flex flex-row items-center justify-between gap-2 space-y-0 pb-2'>
          <div>
            <p className='text-sm text-muted-foreground'>
              Time between decline received & interview starts
            </p>
          </div>
          <DownloadIcon className='h-5 w-5 text-gray-400' />
        </div>
      }
    >
      <div className='mb-4 flex items-center space-x-2'>
        <div className='flex items-center rounded-full bg-green-100 px-3 py-1 text-green-700'>
          <span className='text-xl font-bold'>{averageLeadTime} days</span>
          <ArrowDownIcon className='ml-1 h-5 w-5' />
        </div>
        <span className='text-muted-foreground'>on average</span>
      </div>
      <ChartContainer
        config={chartConfig}
        className='max-h-[400px] min-h-[300px] w-full'
      >
        <ScatterChart
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis type='number' dataKey='cancelled' />
          <Tooltip />
          <Scatter data={scatterData} fill='#22c55e' />
        </ScatterChart>
      </ChartContainer>
    </ReportCard>
  );
}
