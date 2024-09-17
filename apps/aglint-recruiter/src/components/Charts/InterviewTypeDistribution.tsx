'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import React from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

export default function InterviewTypeDistribution() {
  const data = [
    { name: 'Technical', value: 40 },
    { name: 'Behavioral', value: 25 },
    { name: 'Panel', value: 20 },
    { name: 'Case Study', value: 10 },
    { name: 'Cultural Fit', value: 5 },
  ];

  // const COLORS = {
  //   Technical: 'hsl(190, 80%, 70%)',
  //   Behavioral: 'hsl(35, 100%, 60%)',
  //   Panel: 'hsl(120, 60%, 40%)',
  //   'Case Study': 'hsl(0, 100%, 50%)',
  //   'Cultural Fit': 'hsl(280, 80%, 50%)'
  // }

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill='white'
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className='mx-auto w-full max-w-3xl border border-border'>
      <CardHeader>
        <CardTitle className='text-md text-center font-semibold'>
          Distribution of Interview Types
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={400}>
          <PieChart>
            <Pie
              data={data}
              cx='50%'
              cy='50%'
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={150}
              fill='text-blue-500'
              dataKey='value'
              innerRadius={90}
            >
              {data.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`text-${['blue', 'green', 'red', 'yellow', 'purple', 'pink', 'indigo', 'gray', 'orange', 'teal'][index % 10]}-500`}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout='vertical' align='right' verticalAlign='middle' />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
