'use client';

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

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RequestTypesDelaysChart() {
  const data = [
    {
      type: 'Scheduling',
      avgTime: 3,
      completionRate: 85,
      color: 'hsl(var(--chart-1))',
    },
    {
      type: 'Rescheduling',
      avgTime: 4.5,
      completionRate: 90,
      color: 'hsl(var(--chart-2))',
    },
    {
      type: 'Decline',
      avgTime: 2,
      completionRate: 75,
      color: 'hsl(var(--chart-3))',
    },
    {
      type: 'Cancel',
      avgTime: 1.5,
      completionRate: 95,
      color: 'hsl(var(--chart-4))',
    },
    {
      type: 'Debrief',
      avgTime: 5,
      completionRate: 80,
      color: 'hsl(var(--chart-5))',
    },
  ];

  return (
    <Card className='w-full max-w-4xl mx-auto border border-border'>
      <CardHeader>
        <CardTitle className='text-md font-semibold text-center'>
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
              stroke='hsl(var(--foreground))'
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId='left'
              orientation='left'
              stroke='hsl(var(--foreground))'
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
              stroke='hsl(var(--foreground))'
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
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
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
              stroke='hsl(var(--primary))'
              name='Completion Rate (%)'
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
