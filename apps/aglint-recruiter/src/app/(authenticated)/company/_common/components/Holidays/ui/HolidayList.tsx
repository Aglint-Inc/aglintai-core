import { Badge } from '@components/ui/badge';
import { TableCell, TableRow } from '@components/ui/table';

import { UIButton } from '@/components/Common/UIButton';

export const HolidayList = ({
  name,
  date,
  locations,
  handleDeleteDayOff,
  isRemoving,
}) => {
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>
        {locations ? (
          locations.map((location, index) => (
            <Badge key={index} variant='secondary' className='mr-1'>
              {location}
            </Badge>
          ))
        ) : (
          <p>All locations</p>
        )}
      </TableCell>
      <TableCell>
        <UIButton
          variant='ghost'
          size='sm'
          style={{ minWidth: '100px' }}
          onClick={() => handleDeleteDayOff(date)}
        >
          {isRemoving === date ? 'Deleting...' : 'Delete'}
        </UIButton>
      </TableCell>
    </TableRow>
  );
};
