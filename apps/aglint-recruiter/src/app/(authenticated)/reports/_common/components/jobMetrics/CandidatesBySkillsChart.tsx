import { EmptyState } from '@components/empty-state';
import {
  Section,
  SectionActions,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@components/ui/chart';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { UIAlert } from '@components/ui-alert';
import { ChartNoAxesColumn } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Loader } from '@/common/Loader';

import { useCandidateSkills } from '../../hook/job/jobMatrix';

export default function CandidatesBySkillsChart() {
  const { data, view, setView, isFetching, isError } = useCandidateSkills();
  return (
    <Section>
      <SectionHeader>
        <SectionHeaderText>
          <SectionTitle>Candidates By</SectionTitle>
        </SectionHeaderText>
        <SectionActions>
          <Tabs
            value={view}
            onValueChange={(value) => setView(value as typeof view)}
          >
            <TabsList>
              <TabsTrigger value='Top skills'>Top skills</TabsTrigger>
              <TabsTrigger value='JD Skills'>
                Skills mentioned in JD
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </SectionActions>
      </SectionHeader>

      {isFetching ? (
        <Loader />
      ) : !data?.length ? (
        <EmptyState
          icon={ChartNoAxesColumn}
          header='No data available'
          description='No data available for the selected time frame.'
        />
      ) : isError ? (
        <UIAlert type='error'>Error fetching data</UIAlert>
      ) : (
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
      )}
    </Section>
  );
}
