import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import type { PropsWithChildren, ReactNode } from 'react';

export const HolidayTable = (
  props: PropsWithChildren<{ children?: ReactNode }>,
) => {
  const { children } = props;
  return (
    <div className='rounded-lg border overflow-hidden mt-2'>
      <Table className='flex flex-col'>
        <TableHeader className='bg-gray-100 w-full '>
          <TableRow className='grid grid-cols-[250px_200px_1fr_100px] items-center'>
            <TableHead className='h-8 flex items-center'>Day Off</TableHead>
            <TableHead className='h-8 flex items-center'>Date</TableHead>
            <TableHead className='h-8 flex items-center'>Locations</TableHead>
            <TableHead className='h-8 flex items-center'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{children}</TableBody>
      </Table>
    </div>
  );
};
