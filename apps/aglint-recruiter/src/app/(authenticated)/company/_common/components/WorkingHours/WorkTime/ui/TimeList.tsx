import { TableCell, TableRow } from '@components/ui/table';

import dayjs from '@/utils/dayjs';
import { capitalize } from '@/utils/text/textUtils';

export const TimeList = ({ day }) => {
  return (
    <TableRow className='hover:bg-transparent'>
      <TableCell className='font-medium'>{capitalize(day.day)}</TableCell>
      <TableCell>
        {dayjs()
          .set('hour', parseInt(day?.timeRange.startTime?.split(':')[0]))
          .set('minute', parseInt(day?.timeRange.startTime?.split(':')[1]))
          .format('hh:mm A')}
        {' - '}
        {dayjs()
          .set('hour', parseInt(day?.timeRange.endTime?.split(':')[0]))
          .set('minute', parseInt(day?.timeRange.endTime?.split(':')[1]))
          .format('hh:mm A')}
      </TableCell>
    </TableRow>
  );
};
