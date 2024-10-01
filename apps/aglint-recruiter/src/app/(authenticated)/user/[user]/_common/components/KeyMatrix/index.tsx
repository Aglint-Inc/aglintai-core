import { dayjsLocal } from '@aglint/shared-utils';
import { ChartNoAxesColumn } from 'lucide-react';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import UISectionCard from '@/components/Common/UISectionCard';

export const KeyMatrics = ({
  totalHour,
  completedCount,
  declineCount,
}: {
  totalHour: number;
  completedCount: number;
  declineCount: number;
}) => {
  const completedHour = dayjsLocal.duration(+totalHour, 'minutes').asHours();
  const isEmpty =
    completedHour == 0 && completedCount == 0 && declineCount == 0;
  return (
    <>
      <UISectionCard title='Key Metrics' type='compact'>
        {isEmpty ? (
          <GlobalEmpty
            icon={
              <ChartNoAxesColumn
                strokeWidth={2}
                className='h-6 w-6 text-muted-foreground'
              />
            }
            header='No Metrics'
          />
        ) : (
          <div className='flex flex-row gap-3'>
            <Card color='green' title='Interview Hours' value={completedHour} />
            <Card
              color='green'
              title='Interviews Completed'
              value={completedCount}
            />
            <Card color='red' title='Declines' value={declineCount} />
          </div>
        )}
      </UISectionCard>
    </>
  );
};

const Card = ({
  title,
  value,
  color,
}: {
  title: string;
  value: string | number;
  color: 'green' | 'red' | 'blue';
}) => {
  return (
    <div className='text-left flex flex-col gap-1 p-4 bg-gray-50 rounded-md'>
      <p className={`text-2xl font-medium text-${color}-600`}>{value}</p>
      <div className='text-sm text-muted-foreground'>{title}</div>
    </div>
  );
};
