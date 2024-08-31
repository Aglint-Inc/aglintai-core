import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@components/shadcn/ui/card';
import React from 'react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { stage: 'Application Received', candidates: 150 },
  { stage: 'Screening', candidates: 120 },
  { stage: 'Interviewing', candidates: 85 },
  { stage: 'Offer Extended', candidates: 40 },
  { stage: 'Hired', candidates: 25 },
].reverse();

export default function JobDashboardChart() {
  return (
    <Card className='w-full max-w-4xl mx-auto border border-border'>
      <CardHeader>
        <CardTitle className='text-md font-semibold text-center'>
          Job Dashboard - Candidates in Each Stage
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='h-[400px] w-full'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={data}
              layout='vertical'
              margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
            >
              <XAxis type='number' />
              <YAxis dataKey='stage' type='category' width={150} />
              <Tooltip />
              <Bar
                dataKey='candidates'
                fill='hsl(var(--chart-1))'
                label={{ position: 'right' }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
