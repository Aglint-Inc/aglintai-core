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
    <Table>
      <TableHeader className='bg-gray-100'>
        <TableRow>
          <TableHead>Day Off</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Locations</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  );
};
