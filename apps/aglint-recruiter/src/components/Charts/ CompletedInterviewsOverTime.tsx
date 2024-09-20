'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import React from 'react';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const CompletedInterviewsOverTime = () => {
  // Sample data for Completed Interviews Over Time
  const data = [
    { date: '2024-08-01', interviews: 5 },
    { date: '2024-08-02', interviews: 7 },
    { date: '2024-08-03', interviews: 6 },
    { date: '2024-08-04', interviews: 8 },
    { date: '2024-08-05', interviews: 4 },
    { date: '2024-08-06', interviews: 9 },
    { date: '2024-08-07', interviews: 10 },
    { date: '2024-08-08', interviews: 6 },
    { date: '2024-08-09', interviews: 5 },
    { date: '2024-08-10', interviews: 7 },
  ];

  return (
    <Card className='mx-auto w-full max-w-4xl border border-border'>
      <CardHeader>
        <CardTitle className='text-md text-center font-semibold'>
          Completed Interviews Over Time
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='h-[400px] w-full'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis
                dataKey='date'
                label={{ value: 'Date', position: 'insideBottom', offset: -10 }}
              />
              <YAxis
                label={{
                  value: 'Number of Interviews',
                  angle: -90,
                  position: 'insideLeft',
                }}
              />
              <Tooltip />
              <Line
                type='monotone'
                dataKey='interviews'
                stroke='text-blue-500'
                strokeWidth={2}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompletedInterviewsOverTime;
