/* eslint-disable security/detect-object-injection */
import { type DatabaseTable } from '@aglint/shared-types';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { BarChart2 } from 'lucide-react';
import React, { useState } from 'react';

import { DoughnutChart } from '@/job/metrics/components/doughnut';
import { getOrderedGraphValues } from '@/job/metrics/utils';
import { useCancelRescheduleReasons } from '@/queries/scheduling-dashboard';

const CancelReasons = () => {
  const [reasonType, setReasonType] =
    useState<DatabaseTable['interview_session_cancel']['type']>('reschedule');
  const { data: cancelReasonsData } = useCancelRescheduleReasons();

  const processedCancelReasonsData = (cancelReasonsData || []).reduce(
    (acc, curr) => {
      acc[curr.type][curr.reason] = (acc[curr.type][curr.reason] || 0) + 1;
      return acc;
    },
    { declined: {}, reschedule: {} } as Record<
      DatabaseTable['interview_session_cancel']['type'],
      Record<string, number>
    >,
  );

  const totalCount = Object.values(
    processedCancelReasonsData[reasonType],
  ).reduce((acc, curr) => acc + curr, 0);

  const chartData = getOrderedGraphValues(
    processedCancelReasonsData[reasonType],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reason</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          value={reasonType}
          onValueChange={(value) =>
            setReasonType(
              value as DatabaseTable['interview_session_cancel']['type'],
            )
          }
        >
          <TabsList>
            <TabsTrigger value='reschedule'>Reschedule</TabsTrigger>
            <TabsTrigger value='declined'>Declined</TabsTrigger>
          </TabsList>
        </Tabs>
        {processedCancelReasonsData[reasonType] &&
        Object.keys(processedCancelReasonsData[reasonType]).length ? (
          <div className='flex flex-col'>
            <div className='flex flex-col items-center justify-around gap-3'>
              <div className='h-56'>
                <DoughnutChart locations={chartData} fixedHeight={true} />
              </div>
              <div className='max-h-12 w-full space-y-1 overflow-scroll'>
                {chartData.map(({ color, count, name }, i) => (
                  <div
                    key={i}
                    className='flex items-center justify-between gap-2'
                  >
                    <div className='flex items-center gap-1'>
                      <div
                        className='aspect-square w-2.5 rounded-full'
                        style={{ backgroundColor: color }}
                      />
                      <p className='whitespace-nowrap text-sm'>{name}</p>
                    </div>
                    <p className='text-sm'>
                      {((count / totalCount) * 100).toFixed(0)}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className='h-[296px]'>
            <div className='flex h-full flex-col items-center justify-center'>
              <BarChart2 className='h-12 w-12 text-gray-400' />
              <p className='mt-2 text-sm text-gray-500'>No data available</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CancelReasons;
