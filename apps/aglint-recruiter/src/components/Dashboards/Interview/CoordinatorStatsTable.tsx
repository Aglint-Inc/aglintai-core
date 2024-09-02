import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowDownIcon } from 'lucide-react';

const coordinators = [
  {
    name: 'Raj Kaur',
    avatar: '/placeholder.svg?height=40&width=40',
    scheduled: 20,
    cancel: 8,
    decline: 4,
    reschedule: 6,
  },
  {
    name: 'Mia Rodriguez',
    avatar: '/placeholder.svg?height=40&width=40',
    scheduled: 18,
    cancel: 4,
    decline: 2,
    reschedule: 3,
  },
];

export default function CoordinatorStatsTable() {
  return (
    <Card className='w-full max-w-4xl mx-auto'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>
          Coordinator Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[200px]'>Coordinator</TableHead>
              <TableHead className='text-right'>
                Scheduled{' '}
                <ArrowDownIcon className='inline-block h-4 w-4 ml-1' />
              </TableHead>
              <TableHead className='text-right'>Cancel</TableHead>
              <TableHead className='text-right'>Decline</TableHead>
              <TableHead className='text-right'>Reschedule</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coordinators.map((coordinator) => (
              <TableRow key={coordinator.name}>
                <TableCell className='font-medium'>
                  <div className='flex items-center space-x-3'>
                    <Avatar>
                      <AvatarImage
                        src={coordinator.avatar}
                        alt={coordinator.name}
                      />
                      <AvatarFallback>
                        {coordinator.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span>{coordinator.name}</span>
                  </div>
                </TableCell>
                <TableCell className='text-right'>
                  {coordinator.scheduled}
                </TableCell>
                <TableCell className='text-right'>
                  {coordinator.cancel}
                </TableCell>
                <TableCell className='text-right'>
                  {coordinator.decline}
                </TableCell>
                <TableCell className='text-right'>
                  {coordinator.reschedule}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
