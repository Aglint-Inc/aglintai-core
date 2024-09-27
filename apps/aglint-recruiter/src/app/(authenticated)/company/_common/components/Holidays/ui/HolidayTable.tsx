import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import type { PropsWithChildren, ReactNode } from 'react';
type Props = PropsWithChildren<{ actions: ReactNode }>;

export const HolidayTable = (props: Props) => {
  return (
    <div className='mb-8 flex flex-col gap-4'>
      <div className='flex items-start justify-between'>
        <div>
          <h2 className='mb-1 text-xl font-semibold'>Standard Days Off</h2>
          <p className='text-gray-600'>
            List company holidays to exclude them from scheduling.
          </p>
        </div>
        {props.actions}
      </div>
      <div className='overflow-x-auto rounded-lg border bg-white'>
        <Table>
          <TableHeader className='bg-gray-100'>
            <TableRow>
              <TableHead>Day Off</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Locations</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{props.children}</TableBody>
        </Table>
      </div>
    </div>
  );
};

{
  // <>
  //   {' '}
  // </>;
  /* <>
  {daysOff.length === 0 ? (
    <TableRow>
      <TableCell colSpan={4}>
        <Skeleton className='h-6 w-full' />
      </TableCell>
    </TableRow>
  ) : (
    daysOff
      .sort(compareDates)
      .map((item, i) => (
        <HolidayList
          key={i}
          name={item.event_name}
          date={item.date}
          isRemoving={true}
          locations={item?.locations}
          handleDeleteDayOff={handleDeleteDayOff}
        />
      ))
  )}
</>; */
}
