import { type ChartConfig, ChartContainer } from '@components/ui/chart';
import { ToggleGroup, ToggleGroupItem } from '@components/ui/toggle-group';
import { useState } from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import { useInterviewCount } from 'src/app/(authenticated)/reports/_common/hook/interview/interview.hook';

import ReportCard from '@/components/Common/ReportBlocks/ReportCard';

const chartConfig = {
  // desktop: {
  //   label: 'Desktop',
  //   color: '#2563eb',
  // },
} satisfies ChartConfig;

export default function InterviewCountByTimeFrame() {
  const [timeFrame, setTimeFrame] = useState<
    'today' | 'day' | 'week' | 'month'
  >('day');
  const { average, isFetching } = useInterviewCount(timeFrame);
  return (
    <ReportCard
      title={'Interview Count'}
      isEmpty={!average?.length}
      isLoading={isFetching}
      headerSlot={
        <TimeFrameToggle
          value={timeFrame}
          onValueChange={(value) =>
            value && setTimeFrame(value as 'today' | 'day' | 'week' | 'month')
          }
        />
      }
    >
      <div className='row flex flex-wrap'>
        {average.map((data, index) => (
          <div key={data.name}>
            <ChartContainer
              config={chartConfig}
              className='mx-auto min-h-[200px] w-[200px]'
            >
              <PieChart>
                <Pie
                  data={[data, { name: 'Remaining', value: 100 - data.value }]}
                  cx='50%'
                  cy='50%'
                  startAngle={90}
                  endAngle={450}
                  innerRadius={70}
                  outerRadius={80}
                  dataKey='value'
                >
                  <Cell
                    fill={`text-${['blue', 'green', 'red', 'yellow', 'purple', 'pink', 'indigo', 'gray', 'orange', 'teal'][index % 10]}-500`}
                  />
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
    </ReportCard>
  );
}

interface TimeFrameToggleProps {
  value: 'today' | 'day' | 'week' | 'month';
  // eslint-disable-next-line no-unused-vars
  onValueChange: (value: this['value']) => void;
}

const TimeFrameToggle = ({ value, onValueChange }: TimeFrameToggleProps) => {
  return (
    <div className='mb-4 flex items-center justify-between'>
      <h2 className='text-md font-semibold'>Interview Count</h2>
      <ToggleGroup type='single' value={value} onValueChange={onValueChange}>
        <ToggleGroupItem value='today'>Today</ToggleGroupItem>
        <ToggleGroupItem value='day'>Day</ToggleGroupItem>
        <ToggleGroupItem value='week'>Week</ToggleGroupItem>
        <ToggleGroupItem value='month'>Month</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
