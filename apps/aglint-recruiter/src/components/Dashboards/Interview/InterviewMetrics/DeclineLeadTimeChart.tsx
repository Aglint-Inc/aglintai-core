import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { ArrowDownIcon, DownloadIcon } from 'lucide-react';
import React from 'react';
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  // Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useDeclineCount } from 'src/app/(authenticated)/analytics/_common/hook/interview/interview.hook';

export default function DeclineLeadTimeChart() {
  const data = useDeclineCount();
  const averageLeadTime = data.average || 0;
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <div>
          <CardTitle className='text-md font-semibold'>
            Decline lead time
          </CardTitle>
          <p className='text-sm text-muted-foreground'>
            Time between decline received & interview starts
          </p>
        </div>
        <DownloadIcon className='h-5 w-5 text-gray-400' />
      </CardHeader>
      <CardContent>
        <div className='flex items-center space-x-2 mb-4'>
          <div className='bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center'>
            <span className='text-xl font-bold'>{averageLeadTime} days</span>
            <ArrowDownIcon className='h-5 w-5 ml-1' />
          </div>
          <span className='text-muted-foreground'>on average</span>
        </div>
        <div className='h-[300px]'>
          <ResponsiveContainer width='100%' height='100%'>
            {data.scatterData.filter((item) => item.cancelled).length ? (
              <ScatterChart
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' />
                <YAxis
                  type='number'
                  dataKey='cancelled'
                  // domain={[0, 7]}
                  // ticks={[0, 2, 3, 4, 5, 6, 7]}
                />
                {/* <XAxis type='number' dataKey='x' name='stature' unit='cm' />
              <YAxis type='number' dataKey='y' name='weight' unit='kg' /> */}
                <Tooltip />
                <Scatter data={data.scatterData} fill='#22c55e' />
              </ScatterChart>
            ) : (
              <>empty@ravi</>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
