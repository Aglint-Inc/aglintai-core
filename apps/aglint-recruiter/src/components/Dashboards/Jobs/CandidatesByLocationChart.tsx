import React, { useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { name: 'Mountain View', value: 12 },
  { name: 'San Francisco', value: 12 },
  { name: 'San Jose', value: 9 },
  { name: 'Redwood City', value: 6 },
  { name: 'Indianapolis', value: 3 },
  { name: 'Others', value: 59 },
];

export default function CandidatesByLocationChart() {
  const [view, setView] = useState('City');

  return (
    <Card className='w-full max-w-3xl mx-auto'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-md font-semibold'>Candidates By</CardTitle>
        <div className='flex space-x-2'>
          <Button
            variant={view === 'City' ? 'default' : 'outline'}
            onClick={() => setView('City')}
          >
            City
          </Button>
          <Button
            variant={view === 'State' ? 'default' : 'outline'}
            onClick={() => setView('State')}
          >
            State
          </Button>
          <Button
            variant={view === 'Country' ? 'default' : 'outline'}
            onClick={() => setView('Country')}
          >
            Country
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className='h-[300px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={data}
                cx='50%'
                cy='50%'
                innerRadius={60}
                outerRadius={80}
                fill='hsl(var(--chart-1))'
                paddingAngle={5}
                dataKey='value'
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`hsl(var(--chart-${(index % 10) + 1}))`}
                  />
                ))}
              </Pie>
              <Legend
                layout='vertical'
                align='right'
                verticalAlign='middle'
                formatter={(value, entry, index) => (
                  <span className='text-sm font-medium'>
                    {/*eslint-disable-next-line security/detect-object-injection*/}
                    {value} - {data[index].value}%
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
