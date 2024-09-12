import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import React, { useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useCandidateExp } from '../../hook/job/jobMatrix';

export default function CandidatesByExperienceChart() {
  const [view, setView] = useState<'Experience' | 'Tenure'>('Experience');
  const { data } = useCandidateExp();

  return (
    <Card className='w-full max-w-4xl mx-auto'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-md font-semibold'>Candidates By</CardTitle>
        <div className='flex space-x-2'>
          <Button
            variant={view === 'Experience' ? 'default' : 'outline'}
            onClick={() => setView('Experience')}
          >
            Experience
          </Button>
          <Button
            variant={view === 'Tenure' ? 'default' : 'outline'}
            onClick={() => setView('Tenure')}
          >
            Tenure
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className='h-[400px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              data={data?.[view] || []}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis
                dataKey={view === 'Experience' ? 'years' : 'months'}
                label={{
                  value: view === 'Experience' ? 'Years' : 'Months',
                  position: 'insideBottomRight',
                  offset: -10,
                }}
              />
              <YAxis
                label={{
                  value: 'Candidates',
                  angle: -90,
                  position: 'insideLeft',
                }}
              />
              <Tooltip />
              <Line
                type='monotone'
                dataKey='candidates'
                stroke='#8884d8'
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
