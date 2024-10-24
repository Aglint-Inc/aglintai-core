import { EmptyState } from '@components/empty-state';
import {
  Section,
  SectionActions,
  SectionDescription,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import { Button } from '@components/ui/button';
import { type ChartConfig, ChartContainer } from '@components/ui/chart';
import { UIAlert } from '@components/ui-alert';
import { ArrowDownIcon, ChartNoAxesColumn, DownloadIcon } from 'lucide-react';
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

import { Loader } from '@/common/Loader';

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
    <Section>
      <SectionHeader>
        <SectionHeaderText>
          <SectionTitle>Decline lead time</SectionTitle>
          <SectionDescription>
            Time between decline received & interview starts
          </SectionDescription>
        </SectionHeaderText>
        <SectionActions>
          <Button variant='outline'>
            <DownloadIcon className='h-5 w-5 text-gray-400' />
          </Button>
        </SectionActions>
      </SectionHeader>
      {isFetching ? (
        <Loader />
      ) : !scatterData.filter((item) => item.cancelled).length ? (
        <EmptyState
          icon={ChartNoAxesColumn}
          header='No data available'
          description='No data available for the selected time frame.'
        />
      ) : isError ? (
        <UIAlert type='error' title='Error fetching data' />
      ) : (
        <>
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
              width={500}
              height={300}
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
        </>
      )}
    </Section>
  );
}
