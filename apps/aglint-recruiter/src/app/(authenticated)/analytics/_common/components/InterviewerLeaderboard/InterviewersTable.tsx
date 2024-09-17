import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { ArrowDownIcon } from 'lucide-react';
import { useMemberList } from 'src/app/_common/hooks/members';
import { useInterviewer_upcoming } from 'src/app/(authenticated)/analytics/_common/hook/interview/interviewerMatrix.hook';

export default function InterviewersTable() {
  const { data } = useInterviewer_upcoming();
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-md font-semibold'>Interviewers</CardTitle>
        <Tabs defaultValue='interviewing'>
          <TabsList>
            <TabsTrigger value='interviewing'>Interviewing</TabsTrigger>
            <TabsTrigger value='declines'>Declines</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        {data.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[250px]'>
                  Interviewer Name{' '}
                  <ArrowDownIcon className='ml-1 inline-block h-4 w-4' />
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
                <TableHead className='text-right'>
                  Modules in training
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((interviewer) => {
                return (
                  <InterviewersRow
                    key={interviewer.user_id}
                    interviewer={interviewer}
                  />
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <>Empty @Ravi</>
        )}
      </CardContent>
    </Card>
  );
}

interface Interviewer {
  rank: number;
  user_id?: string;
  feedback?: number;
  accepted?: number;
  interviews?: number;
  total_hours?: number;
  rejected?: number;
  training?: number;
  qualified?: number;
  upcoming?: number;
  average_weekly_count?: number;
  average_weekly_duration?: number;
}

interface InterviewersTableProps {
  interviewer: Interviewer;
}

function InterviewersRow({ interviewer }: InterviewersTableProps) {
  const { data: members } = useMemberList();
  const tempMem =
    (members || []).find((member) => member.user_id === interviewer.user_id) ||
    ({} as (typeof members)[number]);
  const name = `${tempMem.first_name || ''} ${tempMem.last_name || ''}`.trim();
  return (
    <TableRow key={tempMem.email}>
      <TableCell className='font-medium'>
        <div className='flex items-center space-x-3'>
          <Avatar>
            <AvatarImage src={tempMem.profile_image} alt={name} />
            <AvatarFallback>{(name || '')[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div>{name}</div>
            <div className='text-sm text-muted-foreground'>{tempMem.email}</div>
          </div>
        </div>
      </TableCell>
      <TableCell className='text-right'>{interviewer.upcoming}</TableCell>
      <TableCell className='text-right'>{interviewer.accepted}</TableCell>
      <TableCell className='text-right'>{interviewer.total_hours}</TableCell>
      <TableCell className='text-right'>{interviewer.rejected}</TableCell>
      <TableCell className='text-right'>
        {interviewer.average_weekly_count}
      </TableCell>
      <TableCell className='text-right'>
        {interviewer.average_weekly_duration}
      </TableCell>
      <TableCell className='text-right'>{interviewer.qualified}</TableCell>
      <TableCell className='text-right'>{interviewer.training}</TableCell>
    </TableRow>
  );
}
