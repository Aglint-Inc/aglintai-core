import { Button } from '@components/ui/button';
import { type ChartConfig, ChartContainer } from '@components/ui/chart';
import React, { useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import ReportCard from '@/components/Common/ReportBlocks/ReportCard';

import { useCandidateExp } from '../../hook/job/jobMatrix';

const chartConfig = {
  // desktop: {
  //   label: 'Desktop',
  //   color: '#2563eb',
  // },
} satisfies ChartConfig;

export default function CandidatesByExperienceChart() {
  const [view, setView] = useState<'Experience' | 'Tenure'>('Experience');
  const { data, isFetching } = useCandidateExp();

  return (
    <ReportCard
      title={'Candidates By'}
      isEmpty={!data?.[view]}
      isLoading={isFetching}
      headerSlot={
        <div className='flex space-x-2'>
          <Button
            variant={view === 'Experience' ? 'default' : 'outline'}
            onClick={() => setView('Experience')}
          >
            Experience
          </Button>
          <Button
            variant={view === 'Tenure' ? 'default' : 'outline'}
            onClick={() => setView('Tenure')}
          >
            Tenure
          </Button>
        </div>
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
    </ReportCard>
  );
}
