'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function UrgentVsStandard() {
  const data = [
    { type: 'Scheduling', Standard: 70, Urgent: 30 },
    { type: 'Rescheduling', Standard: 50, Urgent: 20 },
    { type: 'Decline', Standard: 35, Urgent: 15 },
    { type: 'Cancel', Standard: 25, Urgent: 10 },
    { type: 'Debrief', Standard: 15, Urgent: 5 },
  ];

  return (
    <Card className='mx-auto w-full max-w-3xl border border-border'>
      <CardHeader>
        <CardTitle className='text-md text-center font-semibold'>
          Request Type Distribution: Standard vs. Urgent
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={400}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='type' stroke='text-foreground' />
            <YAxis
              label={{
                value: 'Number of Requests',
                angle: -90,
                position: 'insideLeft',
                style: { fill: 'text-foreground' },
              }}
              stroke='text-foreground'
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'bg-background',
                borderColor: 'border-border',
              }}
              labelStyle={{ color: 'text-foreground' }}
            />
            <Legend wrapperStyle={{ color: 'text-foreground' }} />
            <Bar dataKey='Standard' stackId='a' fill='text-blue-500' />
            <Bar dataKey='Urgent' stackId='a' fill='text-green-500' />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
