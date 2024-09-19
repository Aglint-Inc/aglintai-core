import { Button } from '@components/ui/button';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@components/ui/chart';
import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import ReportCard from '@/components/Common/ReportBlocks/ReportCard';

import { useCandidateSkills } from '../../hook/job/jobMatrix';

export default function CandidatesBySkillsChart() {
  const { data, view, setView, isFetching, isError } = useCandidateSkills();
  return (
    <ReportCard
      title={'Candidates By'}
      isEmpty={!data?.length}
      isLoading={isFetching}
      error={isError ? 'Error fetching data' : undefined}
      headerSlot={
        <div className='flex space-x-2'>
          <Button
            variant={view === 'Top skills' ? 'default' : 'outline'}
            onClick={() => setView('Top skills')}
          >
            Top skills
          </Button>
          <Button
            variant={view === 'JD Skills' ? 'default' : 'outline'}
            onClick={() => setView('JD Skills')}
          >
            Skills mentioned in JD
          </Button>
        </div>
      }
    >
      <ChartContainer
        config={{}}
        className='max-h-[500px] min-h-[300px] w-full'
      >
        <BarChart
          accessibilityLayer
          data={data}
          layout='vertical'
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' horizontal={false} />
          <XAxis dataKey='frequency' type='number' />
          <YAxis dataKey='skill' type='category' width={100} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar dataKey='frequency' radius={[0, 5, 5, 0]} />
        </BarChart>
      </ChartContainer>
    </ReportCard>
  );
}
