import { Button } from '@components/ui/button';
import { type ChartConfig, ChartContainer } from '@components/ui/chart';
import React from 'react';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

import ReportCard from '@/components/Common/ReportBlocks/ReportCard';

import { useCandidateSkills } from '../../hook/job/jobMatrix';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

export default function CandidatesBySkillsChart() {
  const { data, view, setView, isFetching } = useCandidateSkills();

  return (
    <ReportCard
      title={'Candidates By'}
      isEmpty={!data?.length}
      isLoading={isFetching}
      headerSlot={
        <div className='flex space-x-2'>
          <Button
            variant={view === 'Top skills' ? 'default' : 'outline'}
            onClick={() => setView('Top skills')}
          >
            Top skills
          </Button>
          <Button
            variant={view === 'JD Skills' ? 'default' : 'outline'}
            onClick={() => setView('JD Skills')}
          >
            Skills mentioned in JD
          </Button>
        </div>
      }
    >
      <ChartContainer
        config={chartConfig}
        className='max-h-[500px] min-h-[300px] w-full'
      >
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
          <Bar
            dataKey='frequency'
            fill='text-blue-500'
            label={{
              value: 'candidates',
            }}
          >
            {data.map((entry, index) => (
              <Bar
                key={index}
                fill={`text-${['blue', 'green', 'red', 'yellow', 'purple', 'pink', 'indigo', 'gray', 'orange', 'teal'][index % 10]}-500`}
                dataKey={entry.frequency}
              />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </ReportCard>
    // <Card>
    //   <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
    //     <CardTitle className='text-md font-semibold'>Candidates By</CardTitle>
    // <div className='flex space-x-2'>
    //   <Button
    //     variant={view === 'Top skills' ? 'default' : 'outline'}
    //     onClick={() => setView('Top skills')}
    //   >
    //     Top skills
    //   </Button>
    //   <Button
    //     variant={view === 'JD Skills' ? 'default' : 'outline'}
    //     onClick={() => setView('JD Skills')}
    //   >
    //     Skills mentioned in JD
    //   </Button>
    // </div>
    //   </CardHeader>
    //   <CardContent>
    //     <div className='h-[400px]'>
    //       <ResponsiveContainer width='100%' height='100%'>
    //         <BarChart
    //           data={data}
    //           layout='vertical'
    //           margin={{
    //             top: 5,
    //             right: 30,
    //             left: 20,
    //             bottom: 5,
    //           }}
    //         >
    //           <CartesianGrid strokeDasharray='3 3' horizontal={false} />
    //           <XAxis type='number' />
    //           <YAxis dataKey='skill' type='category' width={100} />
    //           <Tooltip />
    //           <Bar
    //             dataKey='frequency'
    //             fill='text-blue-500'
    //             label={{
    //               value: 'candidates',
    //             }}
    //           >
    //             {data.map((entry, index) => (
    //               <Bar
    //                 key={index}
    //                 fill={`text-${['blue', 'green', 'red', 'yellow', 'purple', 'pink', 'indigo', 'gray', 'orange', 'teal'][index % 10]}-500`}
    //                 dataKey={entry.frequency}
    //               />
    //             ))}
    //           </Bar>
    //         </BarChart>
    //       </ResponsiveContainer>
    //     </div>
    //   </CardContent>
    // </Card>
  );
}
