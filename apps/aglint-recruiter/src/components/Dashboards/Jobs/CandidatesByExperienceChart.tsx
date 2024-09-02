import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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

const data = [
  { years: 3, candidates: 2 },
  { years: 4, candidates: 4 },
  { years: 5, candidates: 3 },
  { years: 6, candidates: 2 },
  { years: 7, candidates: 2 },
  { years: 8, candidates: 0 },
  { years: 9, candidates: 2 },
  { years: 10, candidates: 3 },
  { years: 11, candidates: 0 },
  { years: 12, candidates: 0 },
  { years: 13, candidates: 3 },
  { years: 14, candidates: 3 },
  { years: 15, candidates: 4 },
  { years: 16, candidates: 0 },
  { years: 17, candidates: 1 },
  { years: 18, candidates: 0 },
  { years: 19, candidates: 0 },
  { years: 20, candidates: 0 },
  { years: 21, candidates: 0 },
  { years: 22, candidates: 0 },
  { years: 23, candidates: 2 },
  { years: 24, candidates: 0 },
  { years: 25, candidates: 0 },
  { years: 26, candidates: 0 },
  { years: 27, candidates: 0 },
  { years: 28, candidates: 0 },
  { years: 29, candidates: 0 },
  { years: 30, candidates: 1 },
];

export default function CandidatesByExperienceChart() {
  const [view, setView] = useState('Experience');

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
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis
                dataKey='years'
                label={{
                  value: 'Years',
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
