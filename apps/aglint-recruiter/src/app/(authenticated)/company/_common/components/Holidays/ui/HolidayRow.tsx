import { Badge } from '@components/ui/badge';
import { TableCell, TableRow } from '@components/ui/table';
import { cn } from '@lib/utils';

import { UIButton } from '@/components/Common/UIButton';

type Props = {
  name: string;
  date: string;
  locations: string[];
  onDelete: () => void;
  isLoading: boolean;
};

export const HolidayRow = (props: Props) => {
  return (
    <TableRow
      className={props.isLoading && cn('pointer-events-none', 'opacity-50')}
    >
      <TableCell>{props.name}</TableCell>
      <TableCell>{props.date}</TableCell>
      <TableCell>
        {props.locations ? (
          props.locations.length === 0 ? (
            <>---</>
          ) : (
            props.locations.map((location, index) => (
              <Badge key={index} variant='secondary' className='mr-1'>
                {location}
              </Badge>
            ))
          )
        ) : (
          <p>All locations</p>
        )}
      </TableCell>
      <TableCell>
        <UIButton variant='ghost' size='sm' onClick={props.onDelete}>
          Delete
        </UIButton>
      </TableCell>
    </TableRow>
  );
};
