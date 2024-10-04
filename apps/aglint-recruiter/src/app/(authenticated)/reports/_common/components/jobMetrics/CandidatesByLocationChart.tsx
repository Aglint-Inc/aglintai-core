import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@components/ui/chart';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { Cell, Legend, Pie, PieChart } from 'recharts';

import UISectionCard from '@/common/UISectionCard';

import { useJobLocations } from '../../hook/job/jobMatrix';

export default function CandidatesByLocationChart() {
  const { data, view, setView, isFetching, isError } = useJobLocations();

  return (
    <UISectionCard
      title={'Candidates By'}
      isLoading={isFetching}
      emptyStateMessage={
        !data?.length ? (
          <div className='flex h-[100px] items-center justify-center text-muted-foreground'>
            No data available
          </div>
        ) : isError ? (
          'Error fetching data'
        ) : (
          ''
        )
      }
      isHoverEffect={false}
      action={
        <Tabs
          value={view}
          onValueChange={(value) => setView(value as typeof view)}
        >
          <TabsList>
            <TabsTrigger value={'city'}>City</TabsTrigger>
            <TabsTrigger value={'state'}>State</TabsTrigger>
            <TabsTrigger value={'country'}>Country</TabsTrigger>
          </TabsList>
        </Tabs>
      }
    >
      <div className='flex justify-center'>
        <ChartContainer config={{}} className='max-h-[350px] min-h-[300px]'>
          <PieChart>
            <Pie
              data={data}
              cx='50%'
              cy='50%'
              innerRadius={80}
              outerRadius={100}
              fill='text-blue-500'
              paddingAngle={5}
              dataKey='value'
            >
              {data?.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`hsl(var(--chart-${(index % 5) + 1}))`}
                />
              ))}
            </Pie>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
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
        </ChartContainer>
      </div>
    </UISectionCard>
  );
}
