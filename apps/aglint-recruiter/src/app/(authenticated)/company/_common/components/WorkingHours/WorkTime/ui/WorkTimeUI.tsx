import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';

import { TimeList } from './TimeList';

export const WorkTimeUI = ({ workingHours }) => {
  return (
    <div className='group relative rounded-lg py-4'>
      <div className='rounded-lg border border-border'>
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
