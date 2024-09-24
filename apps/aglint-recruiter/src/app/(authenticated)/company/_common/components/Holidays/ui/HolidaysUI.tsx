import { Skeleton } from '@components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { Plus } from 'lucide-react';

import { UIButton } from '@/components/Common/UIButton';

import { HolidayList } from './HolidayList';

export const HolidaysUI = ({
  handleDeleteDayOff,
  setDaysOffOpen,
  compareDates,
  daysOff,
  isRemoving,
}) => {
  return (
    <div className='mb-8 flex flex-col gap-4'>
      <div className='flex items-start justify-between'>
        <div>
          <h2 className='mb-1 text-xl font-semibold'>Standard Days Off</h2>
          <p className='text-gray-600'>
            List company holidays to exclude them from scheduling.
          </p>
        </div>
        <UIButton
          size='sm'
          leftIcon={<Plus />}
          variant='default'
          onClick={() => setDaysOffOpen(true)}
        >
          Add Day Off
        </UIButton>
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
          <TableBody>
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
                    locations={item?.locations}
                    isRemoving={isRemoving}
                    handleDeleteDayOff={handleDeleteDayOff}
                  />
                ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
