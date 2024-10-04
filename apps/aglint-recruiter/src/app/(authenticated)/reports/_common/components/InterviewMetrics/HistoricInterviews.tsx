import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@components/ui/chart';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { useState } from 'react';
import { Bar, BarChart, Legend, XAxis, YAxis } from 'recharts';
import { useInterviewCount } from 'src/app/(authenticated)/reports/_common/hook/interview/interview.hook';

import UISectionCard from '@/common/UISectionCard';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';
export default function HistoricInterviews() {
  const [timeFrame, setTimeFrame] = useState<'day' | 'week' | 'month'>('day');
  const { groupedData, isFetching, isError } = useInterviewCount(timeFrame);
  return (
    <UISectionCard
      title={'Historic'}
      emptyStateMessage={
        !groupedData?.length ? (
          <div className='flex h-[100px] items-center justify-center text-muted-foreground'>
            No data available
          </div>
        ) : isError ? (
          'Error fetching data'
        ) : (
          ''
        )
      }
      isHoverEffect={false}
      isLoading={isFetching}
      action={
        <Tabs
          value={timeFrame}
          onValueChange={(value) =>
            value && setTimeFrame(value as typeof timeFrame)
          }
        >
          <TabsList>
            <TabsTrigger value='day'>Day</TabsTrigger>
            <TabsTrigger value='week'>Week</TabsTrigger>
            <TabsTrigger value='month'>Month</TabsTrigger>
          </TabsList>
        </Tabs>
      }
    >
      <ChartContainer
        config={{}}
        className='max-h-[500px] min-h-[300px] w-full'
      >
        <BarChart data={groupedData}>
          <XAxis dataKey='date' />
          <YAxis />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Legend />
          {Object.keys(groupedData[0] || {}).map((name, index) =>
            name != 'date' ? (
              <Bar
                key={index}
                dataKey={name}
                name={capitalizeFirstLetter(name)}
                stackId={'a'}
                fill={`hsl(var(--chart-${(index % 5) + 1}))`}
              />
            ) : null,
          )}
        </BarChart>
      </ChartContainer>
    </UISectionCard>
  );
}
