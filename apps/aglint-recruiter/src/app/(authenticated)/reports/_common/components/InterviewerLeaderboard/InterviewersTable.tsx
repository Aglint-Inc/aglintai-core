import { EmptyState } from '@components/empty-state';
import {
  Section,
  SectionDescription,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { ArrowDownIcon, ChartNoAxesColumn } from 'lucide-react';
import { useMemberList } from 'src/app/_common/hooks/useMemberList';
import { useInterviewer_upcoming } from 'src/app/(authenticated)/reports/_common/hook/interview/interviewerMatrix.hook';

import { Loader } from '@/common/Loader';

export default function InterviewersTable() {
  const { data, isFetching } = useInterviewer_upcoming();
  return (
    <Section>
      <SectionHeader>
        <SectionHeaderText>
          <SectionTitle>Interviewers</SectionTitle>
          <SectionDescription></SectionDescription>
        </SectionHeaderText>
        {/* <SectionActions>
          <div className='flex items-center space-x-2'>
            <Tabs defaultValue='declines'>
              <TabsList>
                <TabsTrigger value='interviewing'>Interviewing</TabsTrigger>
                <TabsTrigger value='declines'>Declines</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </SectionActions> */}
      </SectionHeader>
      {isFetching ? (
        <Loader />
      ) : !data?.length ? (
        <EmptyState
          icon={ChartNoAxesColumn}
          header='No data available'
          description='No data available for the selected time frame.'
        />
      ) : (
        <Table>
          <TableHeader className='bg-muted'>
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
              <TableHead className='text-right'>Modules in training</TableHead>
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
      )}
    </Section>
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
    ({} as NonNullable<typeof members>[number]);

  const name = `${tempMem.first_name || ''} ${tempMem.last_name || ''}`.trim();
  const average_weekly_duration = interviewer.average_weekly_duration
    ? Math.round(interviewer.average_weekly_duration / 60)
    : 0;
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
      <TableCell className='text-right'>{average_weekly_duration}</TableCell>
      <TableCell className='text-right'>{interviewer.qualified}</TableCell>
      <TableCell className='text-right'>{interviewer.training}</TableCell>
    </TableRow>
  );
}
