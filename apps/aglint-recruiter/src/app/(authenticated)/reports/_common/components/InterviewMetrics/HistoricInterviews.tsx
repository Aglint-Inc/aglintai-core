import { type ChartConfig, ChartContainer } from '@components/ui/chart';
import { ToggleGroup, ToggleGroupItem } from '@components/ui/toggle-group';
import { useState } from 'react';
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { useInterviewCount } from 'src/app/(authenticated)/reports/_common/hook/interview/interview.hook';

import ReportCard from '@/components/Common/ReportBlocks/ReportCard';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

const chartConfig = {
  // desktop: {
  //   label: 'Desktop',
  //   color: '#2563eb',
  // },
} satisfies ChartConfig;

export default function HistoricInterviews() {
  const [timeFrame, setTimeFrame] = useState<'day' | 'week' | 'month'>('day');
  const { groupedData, isFetching } = useInterviewCount(timeFrame);
  return (
    <ReportCard
      title={'Historic'}
      isEmpty={!groupedData?.length}
      isLoading={isFetching}
      headerSlot={
        <ToggleGroup
          type='single'
          value={timeFrame}
          onValueChange={(value: typeof timeFrame) =>
            value && setTimeFrame(value)
          }
        >
          <ToggleGroupItem value='day'>Day</ToggleGroupItem>
          <ToggleGroupItem value='week'>Week</ToggleGroupItem>
          <ToggleGroupItem value='month'>Month</ToggleGroupItem>
        </ToggleGroup>
      }
    >
      <ChartContainer
        config={chartConfig}
        className='max-h-[500px] min-h-[300px] w-full'
      >
        <BarChart data={groupedData}>
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(groupedData[0] || {}).map((name, index) =>
            name != 'date' ? (
              <Bar
                key={index}
                dataKey={name}
                name={capitalizeFirstLetter(name)}
                stackId={'a'}
                fill={`text-${['blue', 'green', 'red', 'yellow', 'purple', 'pink', 'indigo', 'gray', 'orange', 'teal'][index % 10]}-500`}
              />
            ) : null,
          )}
        </BarChart>
      </ChartContainer>
    </ReportCard>
  );
}
