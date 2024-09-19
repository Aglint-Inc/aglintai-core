import { Button } from '@components/ui/button';
import React from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';

import ReportCard from '@/components/Common/ReportBlocks/ReportCard';

import { useJobLocations } from '../../hook/job/jobMatrix';

export default function CandidatesByLocationChart() {
  const { data, view, setView, isFetching } = useJobLocations();

  return (
    <ReportCard
      title={'Candidates By'}
      isEmpty={!data?.length}
      isLoading={isFetching}
      headerSlot={
        <div className='flex items-center space-x-2'>
          <div className='flex space-x-2'>
            <Button
              variant={view === 'city' ? 'default' : 'outline'}
              onClick={() => setView('city')}
            >
              City
            </Button>
            <Button
              variant={view === 'state' ? 'default' : 'outline'}
              onClick={() => setView('state')}
            >
              State
            </Button>
            <Button
              variant={view === 'country' ? 'default' : 'outline'}
              onClick={() => setView('country')}
            >
              Country
            </Button>
          </div>
        </div>
      }
    >
      <div className='h-[300px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={data}
              cx='50%'
              cy='50%'
              innerRadius={60}
              outerRadius={80}
              fill='text-blue-500'
              paddingAngle={5}
              dataKey='value'
            >
              {data?.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`text-${['blue', 'green', 'red', 'yellow', 'purple', 'pink', 'indigo', 'gray', 'orange', 'teal'][index % 10]}-500`}
                />
              ))}
            </Pie>
            <Legend
              layout='vertical'
              align='right'
              verticalAlign='middle'
              formatter={(value, _entry, index) => (
                <span className='text-sm font-medium'>
                  {/*eslint-disable-next-line security/detect-object-injection*/}
                  {value} - {data[index].value}%
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ReportCard>
  );
}
