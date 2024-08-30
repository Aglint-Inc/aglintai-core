'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/shadcn/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@components/shadcn/ui/chart';
import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

const chartData = [
  { date: '2024-04-01', desktop: 222, mobile: 150, tablet: 80 },
  { date: '2024-04-02', desktop: 97, mobile: 180, tablet: 65 },
  { date: '2024-04-03', desktop: 167, mobile: 120, tablet: 55 },
  { date: '2024-04-04', desktop: 242, mobile: 260, tablet: 90 },
  { date: '2024-04-05', desktop: 373, mobile: 290, tablet: 110 },
  { date: '2024-04-06', desktop: 301, mobile: 340, tablet: 95 },
  { date: '2024-04-07', desktop: 245, mobile: 180, tablet: 70 },
  { date: '2024-04-08', desktop: 409, mobile: 320, tablet: 130 },
  { date: '2024-04-09', desktop: 59, mobile: 110, tablet: 40 },
  { date: '2024-04-10', desktop: 261, mobile: 190, tablet: 85 },
  { date: '2024-04-11', desktop: 327, mobile: 350, tablet: 120 },
  { date: '2024-04-12', desktop: 292, mobile: 210, tablet: 75 },
  { date: '2024-04-13', desktop: 342, mobile: 380, tablet: 140 },
  { date: '2024-04-14', desktop: 137, mobile: 220, tablet: 60 },
  { date: '2024-04-15', desktop: 120, mobile: 170, tablet: 50 },
  { date: '2024-04-16', desktop: 138, mobile: 190, tablet: 70 },
  { date: '2024-04-17', desktop: 446, mobile: 360, tablet: 150 },
  { date: '2024-04-18', desktop: 364, mobile: 410, tablet: 130 },
  { date: '2024-04-19', desktop: 243, mobile: 180, tablet: 80 },
  { date: '2024-04-20', desktop: 89, mobile: 150, tablet: 45 },
  { date: '2024-04-21', desktop: 137, mobile: 200, tablet: 65 },
  { date: '2024-04-22', desktop: 224, mobile: 170, tablet: 75 },
  { date: '2024-04-23', desktop: 138, mobile: 230, tablet: 70 },
  { date: '2024-04-24', desktop: 387, mobile: 290, tablet: 110 },
  { date: '2024-04-25', desktop: 215, mobile: 250, tablet: 90 },
  { date: '2024-04-26', desktop: 75, mobile: 130, tablet: 40 },
  { date: '2024-04-27', desktop: 383, mobile: 420, tablet: 160 },
  { date: '2024-04-28', desktop: 122, mobile: 180, tablet: 55 },
  { date: '2024-04-29', desktop: 315, mobile: 240, tablet: 95 },
  { date: '2024-04-30', desktop: 454, mobile: 380, tablet: 140 },
  { date: '2024-05-01', desktop: 165, mobile: 220, tablet: 70 },
  { date: '2024-05-02', desktop: 293, mobile: 310, tablet: 100 },
  { date: '2024-05-03', desktop: 247, mobile: 190, tablet: 80 },
  { date: '2024-05-04', desktop: 385, mobile: 420, tablet: 150 },
  { date: '2024-05-05', desktop: 481, mobile: 390, tablet: 170 },
  { date: '2024-05-06', desktop: 498, mobile: 520, tablet: 200 },
  { date: '2024-05-07', desktop: 388, mobile: 300, tablet: 110 },
  { date: '2024-05-08', desktop: 149, mobile: 210, tablet: 60 },
  { date: '2024-05-09', desktop: 227, mobile: 180, tablet: 75 },
  { date: '2024-05-10', desktop: 293, mobile: 330, tablet: 120 },
  { date: '2024-05-11', desktop: 335, mobile: 270, tablet: 100 },
  { date: '2024-05-12', desktop: 197, mobile: 240, tablet: 85 },
  { date: '2024-05-13', desktop: 197, mobile: 160, tablet: 70 },
  { date: '2024-05-14', desktop: 448, mobile: 490, tablet: 180 },
  { date: '2024-05-15', desktop: 473, mobile: 380, tablet: 160 },
  { date: '2024-05-16', desktop: 338, mobile: 400, tablet: 140 },
  { date: '2024-05-17', desktop: 499, mobile: 420, tablet: 190 },
  { date: '2024-05-18', desktop: 315, mobile: 350, tablet: 130 },
  { date: '2024-05-19', desktop: 235, mobile: 180, tablet: 80 },
  { date: '2024-05-20', desktop: 177, mobile: 230, tablet: 70 },
  { date: '2024-05-21', desktop: 82, mobile: 140, tablet: 45 },
  { date: '2024-05-22', desktop: 81, mobile: 120, tablet: 40 },
  { date: '2024-05-23', desktop: 252, mobile: 290, tablet: 100 },
  { date: '2024-05-24', desktop: 294, mobile: 220, tablet: 90 },
  { date: '2024-05-25', desktop: 201, mobile: 250, tablet: 85 },
  { date: '2024-05-26', desktop: 213, mobile: 170, tablet: 65 },
  { date: '2024-05-27', desktop: 420, mobile: 460, tablet: 170 },
  { date: '2024-05-28', desktop: 233, mobile: 190, tablet: 75 },
  { date: '2024-05-29', desktop: 78, mobile: 130, tablet: 50 },
  { date: '2024-05-30', desktop: 340, mobile: 280, tablet: 110 },
  { date: '2024-05-31', desktop: 178, mobile: 230, tablet: 80 },
  { date: '2024-06-01', desktop: 178, mobile: 200, tablet: 70 },
  { date: '2024-06-02', desktop: 470, mobile: 410, tablet: 160 },
  { date: '2024-06-03', desktop: 103, mobile: 160, tablet: 55 },
  { date: '2024-06-04', desktop: 439, mobile: 380, tablet: 150 },
  { date: '2024-06-05', desktop: 88, mobile: 140, tablet: 45 },
  { date: '2024-06-06', desktop: 294, mobile: 250, tablet: 95 },
  { date: '2024-06-07', desktop: 323, mobile: 370, tablet: 130 },
  { date: '2024-06-08', desktop: 385, mobile: 320, tablet: 120 },
  { date: '2024-06-09', desktop: 438, mobile: 480, tablet: 180 },
  { date: '2024-06-10', desktop: 155, mobile: 200, tablet: 70 },
  { date: '2024-06-11', desktop: 92, mobile: 150, tablet: 50 },
  { date: '2024-06-12', desktop: 492, mobile: 420, tablet: 170 },
  { date: '2024-06-13', desktop: 81, mobile: 130, tablet: 45 },
  { date: '2024-06-14', desktop: 426, mobile: 380, tablet: 140 },
  { date: '2024-06-15', desktop: 307, mobile: 350, tablet: 120 },
  { date: '2024-06-16', desktop: 371, mobile: 310, tablet: 110 },
  { date: '2024-06-17', desktop: 475, mobile: 520, tablet: 190 },
  { date: '2024-06-18', desktop: 107, mobile: 170, tablet: 60 },
  { date: '2024-06-19', desktop: 341, mobile: 290, tablet: 100 },
  { date: '2024-06-20', desktop: 408, mobile: 450, tablet: 160 },
  { date: '2024-06-21', desktop: 169, mobile: 210, tablet: 75 },
  { date: '2024-06-22', desktop: 317, mobile: 270, tablet: 95 },
  { date: '2024-06-23', desktop: 480, mobile: 530, tablet: 200 },
  { date: '2024-06-24', desktop: 132, mobile: 180, tablet: 65 },
  { date: '2024-06-25', desktop: 141, mobile: 190, tablet: 70 },
  { date: '2024-06-26', desktop: 434, mobile: 380, tablet: 140 },
  { date: '2024-06-27', desktop: 448, mobile: 490, tablet: 180 },
  { date: '2024-06-28', desktop: 149, mobile: 200, tablet: 75 },
  { date: '2024-06-29', desktop: 103, mobile: 160, tablet: 55 },
  { date: '2024-06-30', desktop: 446, mobile: 400, tablet: 150 },
  { date: '2024-07-01', desktop: 444, mobile: 300, tablet: 160 },
  { date: '2024-07-02', desktop: 194, mobile: 360, tablet: 130 },
  { date: '2024-07-03', desktop: 334, mobile: 240, tablet: 110 },
  { date: '2024-07-04', desktop: 484, mobile: 520, tablet: 180 },
  { date: '2024-07-05', desktop: 746, mobile: 580, tablet: 220 },
  { date: '2024-07-06', desktop: 602, mobile: 680, tablet: 190 },
  { date: '2024-07-07', desktop: 490, mobile: 360, tablet: 140 },
  { date: '2024-07-08', desktop: 818, mobile: 640, tablet: 260 },
  { date: '2024-07-09', desktop: 118, mobile: 220, tablet: 80 },
  { date: '2024-07-10', desktop: 522, mobile: 380, tablet: 170 },
  { date: '2024-07-11', desktop: 654, mobile: 700, tablet: 240 },
  { date: '2024-07-12', desktop: 584, mobile: 420, tablet: 150 },
  { date: '2024-07-13', desktop: 684, mobile: 760, tablet: 280 },
  { date: '2024-07-14', desktop: 274, mobile: 440, tablet: 120 },
  { date: '2024-07-15', desktop: 240, mobile: 340, tablet: 100 },
  { date: '2024-07-16', desktop: 276, mobile: 380, tablet: 140 },
  { date: '2024-07-17', desktop: 892, mobile: 720, tablet: 300 },
  { date: '2024-07-18', desktop: 728, mobile: 820, tablet: 260 },
  { date: '2024-07-19', desktop: 486, mobile: 360, tablet: 160 },
  { date: '2024-07-20', desktop: 178, mobile: 300, tablet: 90 },
  { date: '2024-07-21', desktop: 274, mobile: 400, tablet: 130 },
  { date: '2024-07-22', desktop: 448, mobile: 340, tablet: 150 },
  { date: '2024-07-23', desktop: 276, mobile: 460, tablet: 140 },
  { date: '2024-07-24', desktop: 774, mobile: 580, tablet: 220 },
  { date: '2024-07-25', desktop: 430, mobile: 500, tablet: 180 },
  { date: '2024-07-26', desktop: 150, mobile: 260, tablet: 80 },
  { date: '2024-07-27', desktop: 766, mobile: 840, tablet: 320 },
  { date: '2024-07-28', desktop: 244, mobile: 360, tablet: 110 },
  { date: '2024-07-29', desktop: 630, mobile: 480, tablet: 190 },
  { date: '2024-07-30', desktop: 908, mobile: 760, tablet: 280 },
  { date: '2024-07-31', desktop: 330, mobile: 440, tablet: 140 },
  { date: '2024-08-01', desktop: 586, mobile: 620, tablet: 200 },
  { date: '2024-08-02', desktop: 494, mobile: 380, tablet: 160 },
  { date: '2024-08-03', desktop: 770, mobile: 840, tablet: 300 },
  { date: '2024-08-04', desktop: 962, mobile: 780, tablet: 340 },
  { date: '2024-08-05', desktop: 996, mobile: 1040, tablet: 400 },
  { date: '2024-08-06', desktop: 776, mobile: 600, tablet: 220 },
  { date: '2024-08-07', desktop: 298, mobile: 420, tablet: 120 },
  { date: '2024-08-08', desktop: 454, mobile: 360, tablet: 150 },
  { date: '2024-08-09', desktop: 586, mobile: 660, tablet: 240 },
  { date: '2024-08-10', desktop: 670, mobile: 540, tablet: 200 },
  { date: '2024-08-11', desktop: 394, mobile: 480, tablet: 170 },
  { date: '2024-08-12', desktop: 394, mobile: 320, tablet: 140 },
  { date: '2024-08-13', desktop: 896, mobile: 980, tablet: 360 },
  { date: '2024-08-14', desktop: 946, mobile: 760, tablet: 320 },
  { date: '2024-08-15', desktop: 676, mobile: 800, tablet: 280 },
  { date: '2024-08-16', desktop: 998, mobile: 840, tablet: 380 },
  { date: '2024-08-17', desktop: 630, mobile: 700, tablet: 260 },
  { date: '2024-08-18', desktop: 470, mobile: 360, tablet: 160 },
];

const chartConfig = {
  views: {
    label: 'Page Views',
  },
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function RequestTrend() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('desktop');

  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    [],
  );

  return (
    <Card>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <div className='flex'>
          {['desktop', 'mobile'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className='relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6'
                onClick={() => setActiveChart(chart)}
              >
                <span className='text-xs text-muted-foreground'>
                  {/*eslint-disable-next-line security/detect-object-injection */}
                  {chartConfig[chart].label}
                </span>
                <span className='text-lg font-bold leading-none sm:text-3xl'>
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className='px-2 sm:p-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className='w-[150px]'
                  nameKey='views'
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
