import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';

import { TimeList, type WorkingHour } from './TimeList';

export const WorkTimeUI = ({
  workingHours,
}: {
  workingHours: WorkingHour[];
}) => {
  return (
    <div className='group relative rounded-lg'>
      <div className='overflow-hidden rounded-lg border border-border'>
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
