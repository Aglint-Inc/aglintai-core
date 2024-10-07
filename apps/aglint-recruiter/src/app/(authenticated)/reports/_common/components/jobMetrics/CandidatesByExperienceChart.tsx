import { EmptyState } from '@components/empty-state';
import {
  Section,
  SectionActions,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import { type ChartConfig, ChartContainer } from '@components/ui/chart';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { UIAlert } from '@components/ui-alert';
import { ChartNoAxesColumn } from 'lucide-react';
import { useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Loader } from '@/common/Loader';

import { useCandidateExp } from '../../hook/job/jobMatrix';

const chartConfig = {
  // desktop: {
  //   label: 'Desktop',
  //   color: '#2563eb',
  // },
} satisfies ChartConfig;

export default function CandidatesByExperienceChart() {
  const [view, setView] = useState<'Experience' | 'Tenure'>('Experience');
  const { data, isFetching, isError } = useCandidateExp();

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
              <TabsTrigger value={'Experience'}>Experience</TabsTrigger>
              <TabsTrigger value={'Tenure'}>Tenure</TabsTrigger>
            </TabsList>
          </Tabs>
        </SectionActions>
      </SectionHeader>
      {isFetching ? (
        <Loader />
      ) : !data?.[view] ? (
        <EmptyState
          icon={ChartNoAxesColumn}
          header='No data available'
          description='No data available for the selected time frame.'
        />
      ) : isError ? (
        <UIAlert type='error'>Error fetching data</UIAlert>
      ) : (
        <ChartContainer
          config={chartConfig}
          className='max-h-[500px] min-h-[300px] w-full'
        >
          <LineChart
            data={data?.[view] || []}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              dataKey={view === 'Experience' ? 'years' : 'months'}
              label={{
                value: view === 'Experience' ? 'Years' : 'Months',
                position: 'insideBottomRight',
                offset: -10,
              }}
            />
            <YAxis
              label={{
                value: 'Candidates',
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <Tooltip />
            <Line
              type='monotone'
              dataKey='candidates'
              stroke='#8884d8'
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ChartContainer>
      )}
    </Section>
  );
}
