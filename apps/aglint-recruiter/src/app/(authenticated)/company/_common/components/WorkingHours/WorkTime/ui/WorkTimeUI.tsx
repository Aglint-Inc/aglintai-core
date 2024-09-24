import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { Calendar } from 'lucide-react';

import { TimeList } from './TimeList';

export const WorkTimeUI = ({ workingHours }) => {
  return (
    <div className='group relative rounded-lg py-4'>
      <div className='mb-4 flex items-center space-x-2'>
        <Calendar className='h-4 w-4 text-muted-foreground' />
        <p className='text-sm font-medium'>Weekly Schedule</p>
      </div>
      <div className=''>
        <Table>
          <TableHeader className='bg-gray-100'>
            <TableRow>
              <TableHead>Day</TableHead>
              <TableHead>Hours</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workingHours
              .filter((day) => day.isWorkDay)
              .map((day, i) => (
                <TimeList key={i} day={day} />
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
