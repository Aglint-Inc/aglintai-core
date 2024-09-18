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
import { useInterviewCount } from 'src/app/(authenticated)/analytics/_common/hook/interview/interview.hook';

import { capitalizeFirstLetter } from '@/utils/text/textUtils';

export default function HistoricInterviews() {
  const [timeFrame, setTimeFrame] = useState<'day' | 'week' | 'month'>('day');
  const data = useInterviewCount(timeFrame);
  return (
    <div>
      <div className='mb-4 flex items-center justify-between'>
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
        {data.groupedData.length ? (
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
                  fill={`text-${['blue', 'green', 'red', 'yellow', 'purple', 'pink', 'indigo', 'gray', 'orange', 'teal'][index % 10]}-500`}
                />
              ) : null,
            )}
          </BarChart>
        ) : (
          <div className='flex h-64 items-center justify-center'>
            empty@ravi
          </div>
        )}
      </ResponsiveContainer>
    </div>
  );
}
