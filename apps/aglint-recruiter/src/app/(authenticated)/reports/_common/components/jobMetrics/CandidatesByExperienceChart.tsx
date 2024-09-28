import { type ChartConfig, ChartContainer } from '@components/ui/chart';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import UISectionCard from '@/components/Common/UISectionCard';

import { useCandidateExp } from '../../hook/job/jobMatrix';

const chartConfig = {
  // desktop: {
  //   label: 'Desktop',
  //   color: '#2563eb',
  // },
} satisfies ChartConfig;

export default function CandidatesByExperienceChart() {
  const [view, setView] = useState<'Experience' | 'Tenure'>('Experience');
  const { data, isFetching, isError } = useCandidateExp();

  return (
    <UISectionCard
      title={'Candidates By'}
      emptyStateMessage={
        !data?.[view] ? (
          <div className='flex h-[100px] items-center justify-center text-muted-foreground'>
            No data available
          </div>
        ) : isError ? (
          'Error fetching data'
        ) : (
          ''
        )
      }
      isLoading={isFetching}
      isHoverEffect={false}
      action={
        <Tabs
          value={view}
          onValueChange={(value) => setView(value as typeof view)}
        >
          <TabsList>
            <TabsTrigger value={'Experience'}>Experience</TabsTrigger>
            <TabsTrigger value={'Tenure'}>Tenure</TabsTrigger>
          </TabsList>
        </Tabs>
      }
    >
      <ChartContainer
        config={chartConfig}
        className='max-h-[500px] min-h-[300px] w-full'
      >
        <LineChart
          data={data?.[view] || []}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            dataKey={view === 'Experience' ? 'years' : 'months'}
            label={{
              value: view === 'Experience' ? 'Years' : 'Months',
              position: 'insideBottomRight',
              offset: -10,
            }}
          />
          <YAxis
            label={{
              value: 'Candidates',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip />
          <Line
            type='monotone'
            dataKey='candidates'
            stroke='#8884d8'
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ChartContainer>
    </UISectionCard>
  );
}
