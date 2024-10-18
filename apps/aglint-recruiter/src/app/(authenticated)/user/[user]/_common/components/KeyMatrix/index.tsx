import { dayjsLocal } from '@aglint/shared-utils';

import { useInterviewer } from '../../hooks/useInterviewer';

export const KeyMatrics = () => {
  const { data } = useInterviewer();

  const {
    meeting_count: { completed_hour, completed, cancelled },
  } = data;

  const completedHour = dayjsLocal
    .duration(+completed_hour, 'minutes')
    .asHours();

  return (
    <>
      <div className='mt-3 grid max-w-[500px] grid-cols-3 gap-2'>
        <Card color='green' title='Interview Hours' value={completedHour} />
        <Card color='green' title='Interviews Completed' value={completed} />
        <Card color='red' title='Declines' value={cancelled} />
      </div>
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
    <div className='rounded-md border border-dotted border-border bg-background px-2 py-1 text-left'>
      <p className={`text-2xl font-medium text-${color}-600`}>{value}</p>
      <div className='text-sm text-muted-foreground'>{title}</div>
    </div>
  );
};
