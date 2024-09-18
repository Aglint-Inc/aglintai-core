import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useCandidateSkills } from '../../hook/job/jobMatrix';

export default function CandidatesBySkillsChart() {
  const { data, view, setView } = useCandidateSkills();

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-md font-semibold'>Candidates By</CardTitle>
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
      </CardHeader>
      <CardContent>
        <div className='h-[400px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
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
              <XAxis type='number' />
              <YAxis dataKey='skill' type='category' width={100} />
              <Tooltip />
              <Bar
                dataKey='frequency'
                fill='text-blue-500'
                label={{
                  value: 'candidates',
                }}
              >
                {data.map((entry, index) => (
                  <Bar
                    key={index}
                    fill={`text-${['blue', 'green', 'red', 'yellow', 'purple', 'pink', 'indigo', 'gray', 'orange', 'teal'][index % 10]}-500`}
                    dataKey={entry.frequency}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
