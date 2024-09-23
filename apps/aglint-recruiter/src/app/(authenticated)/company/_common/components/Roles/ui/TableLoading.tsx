import { Skeleton } from '@components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';

export const TableLoading = () => {
  return (
    <Table>
      <TableHeader className='bg-gray-100'>
        <TableRow>
          <TableHead>
            <Skeleton className='h-6 w-24' />
          </TableHead>
          <TableHead>
            <Skeleton className='h-6 w-32' />
          </TableHead>
          <TableHead>
            <Skeleton className='h-6 w-16' />
          </TableHead>
          <TableHead>
            <Skeleton className='h-6 w-20' />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3].map((ske) => (
          <TableRow key={ske}>
            <TableCell colSpan={4}>
              <Skeleton className='h-12 w-full' />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
