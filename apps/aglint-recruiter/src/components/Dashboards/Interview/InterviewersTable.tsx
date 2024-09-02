import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@components/shadcn/ui/avatar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@components/shadcn/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/shadcn/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@components/shadcn/ui/tabs';
import { ArrowDownIcon } from 'lucide-react';

const interviewers = [
  {
    name: 'Zach Buechler',
    email: 'zach@modernloop.xyz',
    avatar: '/placeholder.svg?height=40&width=40',
    upcoming: 0,
    completed: 5,
    hoursCompleted: '2hrs 35mins',
    declines: 0,
    avgWeeklyInterviews: 1,
    avgWeeklyHours: '31mins',
    modulesTrained: 4,
    modulesInTraining: 4,
  },
  {
    name: 'Vivek Kothari',
    email: 'vivek@modernloop.xyz',
    avatar: '/placeholder.svg?height=40&width=40&text=V',
    upcoming: 0,
    completed: 6,
    hoursCompleted: '2hrs 35mins',
    declines: 0,
    avgWeeklyInterviews: 1.2,
    avgWeeklyHours: '31mins',
    modulesTrained: 9,
    modulesInTraining: 5,
  },
  {
    name: 'Stephen (TEST) Laredo',
    email: 'stephen@modernloop.xyz',
    avatar: '/placeholder.svg?height=40&width=40&text=S',
    upcoming: 0,
    completed: 10,
    hoursCompleted: '9hrs 10mins',
    declines: 0,
    avgWeeklyInterviews: 2,
    avgWeeklyHours: '1hr 50mins',
    modulesTrained: 2,
    modulesInTraining: 3,
  },
  {
    name: 'Shannon Limary',
    email: 'shannon@modernloop.xyz',
    avatar: '/placeholder.svg?height=40&width=40&text=S',
    upcoming: 0,
    completed: 1,
    hoursCompleted: '20mins',
    declines: 0,
    avgWeeklyInterviews: 0.2,
    avgWeeklyHours: '4mins',
    modulesTrained: 2,
    modulesInTraining: 6,
  },
];

export default function InterviewersTable() {
  return (
    <Card className='w-full max-w-6xl mx-auto'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-2xl font-bold'>Interviewers</CardTitle>
        <Tabs defaultValue='interviewing'>
          <TabsList>
            <TabsTrigger value='interviewing'>Interviewing</TabsTrigger>
            <TabsTrigger value='declines'>Declines</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[250px]'>
                Interviewer Name{' '}
                <ArrowDownIcon className='inline-block h-4 w-4 ml-1' />
              </TableHead>
              <TableHead className='text-right'>Upcoming</TableHead>
              <TableHead className='text-right'>Completed</TableHead>
              <TableHead className='text-right'>
                Hours of interviews completed
              </TableHead>
              <TableHead className='text-right'>Declines</TableHead>
              <TableHead className='text-right'>
                Avg Weekly Interviews
              </TableHead>
              <TableHead className='text-right'>Avg Weekly Hours</TableHead>
              <TableHead className='text-right'>Modules Trained</TableHead>
              <TableHead className='text-right'>Modules in training</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {interviewers.map((interviewer) => (
              <TableRow key={interviewer.email}>
                <TableCell className='font-medium'>
                  <div className='flex items-center space-x-3'>
                    <Avatar>
                      <AvatarImage
                        src={interviewer.avatar}
                        alt={interviewer.name}
                      />
                      <AvatarFallback>
                        {interviewer.name.split(' ')[0][0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div>{interviewer.name}</div>
                      <div className='text-sm text-muted-foreground'>
                        {interviewer.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className='text-right'>
                  {interviewer.upcoming}
                </TableCell>
                <TableCell className='text-right'>
                  {interviewer.completed}
                </TableCell>
                <TableCell className='text-right'>
                  {interviewer.hoursCompleted}
                </TableCell>
                <TableCell className='text-right'>
                  {interviewer.declines}
                </TableCell>
                <TableCell className='text-right'>
                  {interviewer.avgWeeklyInterviews}
                </TableCell>
                <TableCell className='text-right'>
                  {interviewer.avgWeeklyHours}
                </TableCell>
                <TableCell className='text-right'>
                  {interviewer.modulesTrained}
                </TableCell>
                <TableCell className='text-right'>
                  {interviewer.modulesInTraining}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
