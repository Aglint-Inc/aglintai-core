import { EmptyState } from '@components/empty-state';
import {
  Section,
  SectionActions,
  SectionDescription,
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
import { useState } from 'react';
import { Bar, BarChart, Legend, XAxis, YAxis } from 'recharts';
import { useInterviewCount } from 'src/app/(authenticated)/reports/_common/hook/interview/interview.hook';

import { Loader } from '@/common/Loader';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';
export default function HistoricInterviews() {
  const [timeFrame, setTimeFrame] = useState<'day' | 'week' | 'month'>('day');
  const { groupedData, isFetching, isError } = useInterviewCount(timeFrame);
  return (
    <Section>
      <SectionHeader>
        <SectionHeaderText>
          <SectionTitle>Historic Interviews</SectionTitle>
          <SectionDescription>
            This chart shows the number of interviews conducted by time frame.
          </SectionDescription>
        </SectionHeaderText>
        <SectionActions>
          <Tabs
            value={timeFrame}
            onValueChange={(value) =>
              value && setTimeFrame(value as typeof timeFrame)
            }
          >
            <TabsList>
              <TabsTrigger value='day'>Day</TabsTrigger>
              <TabsTrigger value='week'>Week</TabsTrigger>
              <TabsTrigger value='month'>Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </SectionActions>
      </SectionHeader>
      {isFetching ? (
        <div className='flex h-[100px] items-center justify-center text-muted-foreground'>
          <Loader />
        </div>
      ) : !groupedData?.length ? (
        <EmptyState
          icon={ChartNoAxesColumn}
          header='No data available'
          description='No data available for the selected time frame.'
        />
      ) : isError ? (
        <UIAlert type='error' title='Error fetching data'>
          Error fetching data for the selected time frame.
        </UIAlert>
      ) : (
        <ChartContainer
          config={{}}
          className='max-h-[500px] min-h-[300px] w-full'
        >
          <BarChart data={groupedData}>
            <XAxis dataKey='date' />
            <YAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Legend />
            {Object.keys(groupedData[0] || {}).map((name, index) =>
              name != 'date' ? (
                <Bar
                  key={index}
                  dataKey={name}
                  name={capitalizeFirstLetter(name)}
                  stackId={'a'}
                  fill={`hsl(var(--chart-${(index % 5) + 1}))`}
                />
              ) : null,
            )}
          </BarChart>
        </ChartContainer>
      )}
    </Section>
  );
}
