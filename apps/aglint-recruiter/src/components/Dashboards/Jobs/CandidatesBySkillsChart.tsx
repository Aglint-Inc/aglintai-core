import { Button } from '@components/shadcn/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@components/shadcn/ui/card';
import React, { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { skill: 'Python', candidates: 21 },
  { skill: 'Java', candidates: 16 },
  { skill: 'Machine lear.', candidates: 16 },
  { skill: 'Tensorflow', candidates: 15 },
  { skill: 'C++', candidates: 13 },
  { skill: 'Pytorch', candidates: 13 },
  { skill: 'Javascript', candidates: 12 },
  { skill: 'Aws', candidates: 10 },
  { skill: 'Git', candidates: 10 },
  { skill: 'C', candidates: 7 },
];

const COLORS = [
  '#AED8E6',
  '#B0E0E6',
  '#ADD8E6',
  '#A9A9A9',
  '#90EE90',
  '#D8BFD8',
  '#DDA0DD',
  '#E6E6FA',
  '#F0E68C',
  '#FAFAD2',
];

export default function CandidatesBySkillsChart() {
  const [view, setView] = useState('Top skills');

  return (
    <Card className='w-full max-w-4xl mx-auto'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-2xl font-bold'>Candidates By</CardTitle>
        <div className='flex space-x-2'>
          <Button
            variant={view === 'Top skills' ? 'default' : 'outline'}
            onClick={() => setView('Top skills')}
          >
            Top skills
          </Button>
          <Button
            variant={view === 'Skills mentioned in JD' ? 'default' : 'outline'}
            onClick={() => setView('Skills mentioned in JD')}
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
              <Bar dataKey='candidates' fill='#8884d8'>
                {data.map((entry, index) => (
                  <Bar
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
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
