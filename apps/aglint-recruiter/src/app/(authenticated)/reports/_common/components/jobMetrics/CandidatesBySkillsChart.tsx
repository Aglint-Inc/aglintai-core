import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@components/ui/chart';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import UISectionCard from '@/common/UISectionCard';

import { useCandidateSkills } from '../../hook/job/jobMatrix';

export default function CandidatesBySkillsChart() {
  const { data, view, setView, isFetching, isError } = useCandidateSkills();
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
            <TabsTrigger value='Top skills'>Top skills</TabsTrigger>
            <TabsTrigger value='JD Skills'>Skills mentioned in JD</TabsTrigger>
          </TabsList>
        </Tabs>
      }
    >
      <ChartContainer
        config={{}}
        className='max-h-[500px] min-h-[300px] w-full'
      >
        <BarChart
          accessibilityLayer
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
          <XAxis dataKey='frequency' type='number' />
          <YAxis dataKey='skill' type='category' width={100} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar dataKey='frequency' radius={[0, 5, 5, 0]} />
        </BarChart>
      </ChartContainer>
    </UISectionCard>
  );
}
