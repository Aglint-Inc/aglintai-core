/* eslint-disable security/detect-object-injection */
import { type DatabaseTable } from '@aglint/shared-types';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { BarChart2 } from 'lucide-react';
import React, { useState } from 'react';

import { getOrderedGraphValues } from '@/job/metrics/utils';
import { useCancelRescheduleReasons } from '@/queries/scheduling-dashboard';

import { DoughnutChart } from '../../../app/(authenticated)/_jobs/[job]/metrics/_common/components/doughnut';

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
              <div className='w-full max-h-12 overflow-scroll space-y-1'>
                {chartData.map(({ color, count, name }, i) => (
                  <div
                    key={i}
                    className='flex justify-between items-center gap-2'
                  >
                    <div className='flex items-center gap-1'>
                      <div
                        className='w-2.5 aspect-square rounded-full'
                        style={{ backgroundColor: color }}
                      />
                      <p className='text-sm whitespace-nowrap'>{name}</p>
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
            <div className='flex flex-col items-center justify-center h-full'>
              <BarChart2 className='w-12 h-12 text-gray-400' />
              <p className='mt-2 text-sm text-gray-500'>No data available</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CancelReasons;
