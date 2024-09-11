import { ToggleGroup, ToggleGroupItem } from '@components/ui/toggle-group';
import { useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

import { useInterviewCount } from '@/hooks/analytics/interview/interview.hook';

export default function InterviewCountByTimeFrame() {
  const [timeFrame, setTimeFrame] = useState<
    'today' | 'day' | 'week' | 'month'
  >('day');
  const data = useInterviewCount(timeFrame);
  return (
    <div>
      <TimeFrameToggle
        value={timeFrame}
        onValueChange={(value) =>
          value && setTimeFrame(value as 'today' | 'day' | 'week' | 'month')
        }
      />
      <div className='flex justify-between'>
        {data.average.length ? (
          data.average.map((data, index) => (
            <div key={data.name} className='w-1/4'>
              <ResponsiveContainer width='100%' height={200}>
                <PieChart>
                  <Pie
                    data={[
                      data,
                      { name: 'Remaining', value: 100 - data.value },
                    ]}
                    cx='50%'
                    cy='50%'
                    startAngle={90}
                    endAngle={450}
                    innerRadius={70}
                    outerRadius={80}
                    dataKey='value'
                  >
                    <Cell fill={`hsl(var(--chart-${(index % 10) + 1}))`} />
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
              </ResponsiveContainer>
              <p className='text-center mt-2'>{data.name}</p>
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
          ))
        ) : (
          <>empty@ravi</>
        )}
      </div>
    </div>
  );
}

interface TimeFrameToggleProps {
  value: 'today' | 'day' | 'week' | 'month';
  // eslint-disable-next-line no-unused-vars
  onValueChange: (value: this['value']) => void;
}

const TimeFrameToggle = ({ value, onValueChange }: TimeFrameToggleProps) => {
  return (
    <div className='flex justify-between items-center mb-4'>
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
