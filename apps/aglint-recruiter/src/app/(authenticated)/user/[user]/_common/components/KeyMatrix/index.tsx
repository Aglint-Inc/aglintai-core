import { dayjsLocal } from '@aglint/shared-utils';

import UISectionCard from '@/components/Common/UISectionCard';

export const KeyMatrics = ({
  totalHour,
  completedCount,
  declineCount,
}: {
  totalHour: string | number;
  completedCount: string | number;
  declineCount: string | number;
}) => {
  const completedHour = dayjsLocal.duration(+totalHour, 'minutes').asHours();
  return (
    <>
      <UISectionCard title='Key Metrics'>
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
          <Card color='green' title='Interview Hours' value={completedHour} />
          <Card
            color='green'
            title='Interviews Completed'
            value={completedCount}
          />
          <Card color='red' title='Declines' value={declineCount} />
        </div>
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
    <div className='text-center'>
      <p className={`text-xl font-bold text-${color}-600`}>{value}</p>
      <div className='text-sm text-gray-500'>{title}</div>
    </div>
  );
};
