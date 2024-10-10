'use client';
import React from 'react';

import { useReasons } from '../../hook/scheduling';
import { DatabaseEnums } from '@aglint/shared-types';
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
import { Cell, Legend, Pie, PieChart } from 'recharts';

import { Loader } from '@/common/Loader';

import { useJobLocations } from '../../hook/job/jobMatrix';

function Reasons() {
  const type: DatabaseEnums['cancel_type'] = 'candidate_request_reschedule';
  const { data, isPending, view, isError, setView } = useReasons(type);
  console.log({ data, isPending });
  return (
    <Section className='rounded-md border'>
      <SectionHeader className='m-2'>
        <SectionHeaderText>
          <SectionTitle>Reasons</SectionTitle>
        </SectionHeaderText>
        <SectionActions>
          <Tabs
            value={view}
            onValueChange={(value) => setView(value as typeof view)}
          >
            <TabsList>
              <TabsTrigger value={'candidate_request_reschedule'}>
                Reschedule
              </TabsTrigger>
              <TabsTrigger value={'candidate_request_decline'}>
                Declined
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </SectionActions>
      </SectionHeader>
      {isPending ? (
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
      )}
    </Section>
  );
}

export default Reasons;
