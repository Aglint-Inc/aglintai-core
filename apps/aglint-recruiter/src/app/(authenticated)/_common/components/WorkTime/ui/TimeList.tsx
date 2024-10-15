import { dayjsLocal } from '@aglint/shared-utils';
import { TableCell, TableRow } from '@components/ui/table';

import { capitalize } from '@/utils/text/textUtils';

interface TimeRange {
  startTime: string;
  endTime: string;
}

export interface WorkingHour {
  day: string;
  isWorkDay: boolean;
  timeRange: TimeRange;
}

export const TimeList = ({ day }: { day: WorkingHour }) => {
  return (
    <TableRow className='hover:bg-transparent'>
      <TableCell className='font-medium'>{capitalize(day.day)}</TableCell>
      <TableCell>
        {dayjsLocal()
          .set('hour', parseInt(day?.timeRange.startTime?.split(':')[0]))
          .set('minute', parseInt(day?.timeRange.startTime?.split(':')[1]))
          .format('hh:mm A')}
        {' - '}
        {dayjsLocal()
          .set('hour', parseInt(day?.timeRange.endTime?.split(':')[0]))
          .set('minute', parseInt(day?.timeRange.endTime?.split(':')[1]))
          .format('hh:mm A')}
      </TableCell>
    </TableRow>
  );
};
