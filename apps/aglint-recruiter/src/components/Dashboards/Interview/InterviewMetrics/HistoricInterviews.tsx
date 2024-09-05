import { ToggleGroup, ToggleGroupItem } from '@components/ui/toggle-group';
import { useState } from 'react';
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useInterviewCount } from '@/hooks/analytics/interview/interview.hook';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

export default function HistoricInterviews() {
  const [timeFrame, setTimeFrame] = useState<'day' | 'week' | 'month'>('day');
  const data = useInterviewCount(timeFrame);
  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-md font-semibold'>Historic</h2>
        <div className='mb-4'>
          <ToggleGroup
            type='single'
            value={timeFrame}
            onValueChange={(value: typeof timeFrame) =>
              value && setTimeFrame(value)
            }
          >
            <ToggleGroupItem value='day'>Day</ToggleGroupItem>
            <ToggleGroupItem value='week'>Week</ToggleGroupItem>
            <ToggleGroupItem value='month'>Month</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data.groupedData}>
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(data.groupedData[0] || {}).map((name, index) =>
            name != 'date' ? (
              <Bar
                key={index}
                dataKey={name}
                name={capitalizeFirstLetter(name)}
                stackId={'a'}
                fill={`hsl(var(--chart-${index + 1}))`}
              />
            ) : null,
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
