import { dayjsLocal } from '@aglint/shared-utils';
import { ChartNoAxesColumn } from 'lucide-react';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import UISectionCard from '@/components/Common/UISectionCard';

import { useInterviewer } from '../../hooks/useInterviewer';

export const KeyMatrics = () => {
  const { data } = useInterviewer();

  const {
    meeting_count: { completed_hour, completed, cancelled },
  } = data;

  const completedHour = dayjsLocal
    .duration(+completed_hour, 'minutes')
    .asHours();

  const isEmpty = completedHour == 0 && completed == 0 && cancelled == 0;

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
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
            <Card color='green' title='Interview Hours' value={completedHour} />
            <Card
              color='green'
              title='Interviews Completed'
              value={completed}
            />
            <Card color='red' title='Declines' value={cancelled} />
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
    <div className='text-center'>
      <p className={`text-xl font-bold text-${color}-600`}>{value}</p>
      <div className='text-sm text-muted-foreground'>{title}</div>
    </div>
  );
};
