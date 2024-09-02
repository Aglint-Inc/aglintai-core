import { Card, CardContent } from '@/components/ui/card';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui/toggle-group';
import React, { useState } from 'react';
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import DeclineLeadTimeChart from './DeclineLeadTimeChart';
// Mock data - replace with actual data fetching logic
const currentData = [
  { name: 'Completed', value: 30 },
  { name: 'Confirmed', value: 20 },
  { name: 'Waiting', value: 15 },
  { name: 'Cancelled', value: 5 },
];

const getQuarter = (date: string): number => {
  const month = parseInt(date.split('-')[1]);
  return Math.ceil(month / 3);
};

const generateRandomData = () => {
  const startDate = new Date('2024-05-01');
  const endDate = new Date('2024-08-30');
  const data = [];

  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    const date = d.toISOString().split('T')[0];
    data.push({
      date,
      quarter: getQuarter(date),
      Completed: Math.floor(Math.random() * 40) + 20,
      Confirmed: Math.floor(Math.random() * 30) + 15,
      Waiting: Math.floor(Math.random() * 20) + 10,
    });
  }

  return data;
};

const historicData = generateRandomData();

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(var(--chart-6))',
  'hsl(var(--chart-7))',
  'hsl(var(--chart-8))',
];

const InterviewCount: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<
    'today' | 'day' | 'week' | 'month'
  >('day');

  return (
    <>
      <div className='flex flex-col space-y-6'>
        <Card className='w-full  shadow-none'>
          <CardContent>
            <div className='space-y-8'>
              <div>
                <div className='flex justify-between items-center mb-4'>
                  <h2 className='text-md font-semibold'>Interview Count</h2>
                  <ToggleGroup
                    type='single'
                    value={timeFrame}
                    onValueChange={(value) =>
                      value &&
                      setTimeFrame(value as 'today' | 'day' | 'week' | 'month')
                    }
                  >
                    <ToggleGroupItem value='today'>Today</ToggleGroupItem>
                    <ToggleGroupItem value='day'>Day</ToggleGroupItem>
                    <ToggleGroupItem value='week'>Week</ToggleGroupItem>
                    <ToggleGroupItem value='month'>Month</ToggleGroupItem>
                  </ToggleGroup>
                </div>
                <div className='flex justify-between'>
                  {currentData.map((data, index) => (
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
                            {timeFrame === 'today'
                              ? data.value
                              : timeFrame === 'day'
                                ? Math.round(data.value * 1.5)
                                : timeFrame === 'week'
                                  ? Math.round(data.value * 7)
                                  : Math.round(data.value * 30)}
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
                  ))}
                </div>
              </div>

              <div>
                <div className='flex justify-between items-center mb-4'>
                  <h2 className='text-md font-semibold'>Historic</h2>
                  <div className='mb-4'>
                    <ToggleGroup
                      type='single'
                      value={timeFrame}
                      onValueChange={(value) =>
                        value &&
                        setTimeFrame(
                          value as 'today' | 'day' | 'week' | 'month',
                        )
                      }
                    >
                      <ToggleGroupItem value='day'>Day</ToggleGroupItem>
                      <ToggleGroupItem value='week'>Week</ToggleGroupItem>
                      <ToggleGroupItem value='month'>Month</ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </div>
                <ResponsiveContainer width='100%' height={300}>
                  <BarChart data={historicData}>
                    <XAxis dataKey='date' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey='Completed' stackId='a' fill='hsl(var(--chart-1))' />
                    <Bar dataKey='Confirmed' stackId='a' fill='hsl(var(--chart-2))' />
                    <Bar dataKey='Waiting' stackId='a' fill='hsl(var(--chart-3))' />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <DeclineLeadTimeChart />
    </>
  );
};

export default InterviewCount;
