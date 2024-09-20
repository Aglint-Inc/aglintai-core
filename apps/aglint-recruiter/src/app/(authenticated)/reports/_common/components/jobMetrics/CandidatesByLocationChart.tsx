import { Button } from '@components/ui/button';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@components/ui/chart';
import React from 'react';
import { Cell, Legend, Pie, PieChart } from 'recharts';

import ReportCard from '@/components/Common/ReportBlocks/ReportCard';

import { useJobLocations } from '../../hook/job/jobMatrix';

export default function CandidatesByLocationChart() {
  const { data, view, setView, isFetching, isError } = useJobLocations();

  return (
    <ReportCard
      title={'Candidates By'}
      isEmpty={!data?.length}
      isLoading={isFetching}
      error={isError ? 'Error fetching data' : undefined}
      headerSlot={
        <div className='flex items-center space-x-2'>
          <div className='flex space-x-2'>
            <Button
              variant={view === 'city' ? 'default' : 'outline'}
              onClick={() => setView('city')}
            >
              City
            </Button>
            <Button
              variant={view === 'state' ? 'default' : 'outline'}
              onClick={() => setView('state')}
            >
              State
            </Button>
            <Button
              variant={view === 'country' ? 'default' : 'outline'}
              onClick={() => setView('country')}
            >
              Country
            </Button>
          </div>
        </div>
      }
    >
      <div className='flex justify-center'>
        <ChartContainer config={{}} className='max-h-[350px] min-h-[300px]'>
          <PieChart>
            <Pie
              data={data}
              cx='50%'
              cy='50%'
              innerRadius={80}
              outerRadius={100}
              fill='text-blue-500'
              paddingAngle={5}
              dataKey='value'
            >
              {data?.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`hsl(var(--chart-${(index % 5) + 1}))`}
                />
              ))}
            </Pie>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Legend
              layout='vertical'
              align='right'
              verticalAlign='middle'
              formatter={(value, _entry, index) => (
                <span className='text-sm font-medium'>
                  {/*eslint-disable-next-line security/detect-object-injection*/}
                  {value} - {data[index].value}%
                </span>
              )}
            />
          </PieChart>
        </ChartContainer>
      </div>
    </ReportCard>
  );
}
