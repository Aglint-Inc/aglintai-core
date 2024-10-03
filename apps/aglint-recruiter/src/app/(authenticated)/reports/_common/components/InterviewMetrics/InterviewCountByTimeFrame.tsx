import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@components/ui/chart';
import { TabsList, TabsTrigger } from '@components/ui/tabs';
import { Tabs } from '@radix-ui/react-tabs';
import { useState } from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import { useInterviewCount } from 'src/app/(authenticated)/reports/_common/hook/interview/interview.hook';

import UISectionCard from '@/components/Common/UISectionCard';

export default function InterviewCountByTimeFrame() {
  const [timeFrame, setTimeFrame] = useState<
    'today' | 'day' | 'week' | 'month'
  >('day');
  const { average, isFetching, isError } = useInterviewCount(timeFrame);
  return (
    <UISectionCard
      title={'Interview Count'}
      isHoverEffect={false}
      emptyStateMessage={
        !average?.length ? (
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
      action={
        <TimeFrameToggle
          value={timeFrame}
          onValueChange={(value) =>
            value && setTimeFrame(value as 'today' | 'day' | 'week' | 'month')
          }
        />
      }
    >
      <div className='row flex flex-wrap justify-between'>
        {average.map((data, index) => (
          <div key={data.name}>
            <ChartContainer
              config={{}}
              className='mx-auto min-h-[200px] w-[200px]'
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Pie
                  data={[data, { name: 'Remaining', value: 100 - data.value }]}
                  cx='50%'
                  cy='50%'
                  startAngle={90}
                  endAngle={450}
                  innerRadius={70}
                  outerRadius={80}
                  dataKey='value'
                  // fill={`red`}
                >
                  <Cell fill={`hsl(var(--chart-${(index + 1) % 5}))`} />
                  <Cell fill='#f3f4f6' />
                </Pie>
                <text
                  x='50%'
                  y='50%'
                  textAnchor='middle'
                  dominantBaseline='middle'
                  className='text-2xl font-bold'
                >
                  {data.value}
                </text>
                <text
                  x='50%'
                  y='65%'
                  textAnchor='middle'
                  dominantBaseline='middle'
                  className='text-sm'
                >
                  {data.name}
                </text>
              </PieChart>
            </ChartContainer>
            <p className='mt-2 text-center'>{data.name}</p>
            <p className='text-center text-sm text-muted-foreground'>
              {timeFrame === 'today'
                ? 'Today'
                : timeFrame === 'day'
                  ? 'Daily'
                  : timeFrame === 'week'
                    ? 'Weekly'
                    : 'Monthly'}{' '}
              Average
            </p>
          </div>
        ))}
      </div>
    </UISectionCard>
  );
}

interface TimeFrameToggleProps {
  value: 'today' | 'day' | 'week' | 'month';
  // eslint-disable-next-line no-unused-vars
  onValueChange: (value: this['value']) => void;
}

const TimeFrameToggle = ({ value, onValueChange }: TimeFrameToggleProps) => {
  return (
    <div className='flex items-center justify-between gap-3'>
      <h2 className='text-md font-semibold'>Interview Count</h2>
      <Tabs
        value={value}
        onValueChange={(val) => onValueChange(val as typeof value)}
      >
        <TabsList>
          <TabsTrigger value='today'>Today</TabsTrigger>
          <TabsTrigger value='day'>Day</TabsTrigger>
          <TabsTrigger value='week'>Week</TabsTrigger>
          <TabsTrigger value='month'>Month</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
