import { Badge } from '@components/ui/badge';
import { TableCell, TableRow } from '@components/ui/table';
import { cn } from '@lib/utils';
import { Trash } from 'lucide-react';

import { UIButton } from '@/common/UIButton';

type Props = {
  name: string;
  date: string;
  locations?: string[];
  onDelete: () => void;
  isLoading: boolean;
};

export const HolidayRow = (props: Props) => {
  return (
    <TableRow
      className={`grid grid-cols-[250px_200px_1fr_100px] ${props.isLoading ? cn('pointer-events-none', 'opacity-50') : ''}`}
    >
      <TableCell>{props.name}</TableCell>
      <TableCell>{props.date}</TableCell>
      <TableCell className='flex flex-row flex-wrap gap-4'>
        {props.locations ? (
          props.locations.length === 0 ? (
            <>---</>
          ) : (
            props.locations.map((location, index) => (
              <Badge key={index} variant='secondary' className='mr-1 text-sm font-normal rounded-sm bg-gray-100'>
                {location}
              </Badge>
            ))
          )
        ) : (
          <p>All locations</p>
        )}
      </TableCell>
      <TableCell>
        <UIButton variant='ghost' size='sm' onClick={props.onDelete} className='p-0 w-6 h-6 text-gray-600 hover:bg-red-500 hover:text-white duration-200'>
         <Trash className='w-3 h-3'/>
        </UIButton>
      </TableCell>
    </TableRow>
  );  
};
