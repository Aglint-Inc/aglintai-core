'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import React from 'react';
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function RequestTypesDelaysChart() {
  const data = [
    {
      type: 'Scheduling',
      avgTime: 3,
      completionRate: 85,
      color: 'text-blue-500',
    },
    {
      type: 'Rescheduling',
      avgTime: 4.5,
      completionRate: 90,
      color: 'text-green-500',
    },
    {
      type: 'Decline',
      avgTime: 2,
      completionRate: 75,
      color: 'text-red-500',
    },
    {
      type: 'Cancel',
      avgTime: 1.5,
      completionRate: 95,
      color: 'text-yellow-500',
    },
    {
      type: 'Debrief',
      avgTime: 5,
      completionRate: 80,
      color: 'text-purple-500',
    },
  ];

  return (
    <Card className='mx-auto w-full max-w-4xl border border-border'>
      <CardHeader>
        <CardTitle className='text-md text-center font-semibold'>
          Request Types Causing Most Delays: Avg. Time to Completion vs
          Completion Rate
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={400}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              dataKey='type'
              stroke='text-foreground'
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId='left'
              orientation='left'
              stroke='text-foreground'
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{
                value: 'Avg. Time to Completion (Days)',
                angle: -90,
                position: 'insideLeft',
                style: { textAnchor: 'middle' },
              }}
            />
            <YAxis
              yAxisId='right'
              orientation='right'
              stroke='text-foreground'
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{
                value: 'Completion Rate (%)',
                angle: 90,
                position: 'insideRight',
                style: { textAnchor: 'middle' },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'bg-background',
                borderColor: 'border-border',
              }}
              labelStyle={{ color: 'text-foreground' }}
            />
            <Legend />
            <Bar
              yAxisId='left'
              dataKey='avgTime'
              name='Avg. Time to Completion (Days)'
              radius={[4, 4, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
            <Line
              yAxisId='right'
              type='monotone'
              dataKey='completionRate'
              stroke='text-primary'
              name='Completion Rate (%)'
              strokeWidth={2}
              dot={{ fill: 'text-primary', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
