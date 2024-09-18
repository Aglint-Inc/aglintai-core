import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import React from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';

import { useJobLocations } from '../../hook/job/jobMatrix';

export default function CandidatesByLocationChart() {
  const { data, view, setView } = useJobLocations();

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-md font-semibold'>Candidates By</CardTitle>
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
      </CardHeader>
      <CardContent>
        <div className='h-[300px]'>
          {data.length ? (
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
          ) : (
            <>empty@ravi</>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
