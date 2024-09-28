import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { ClockIcon, DownloadIcon } from 'lucide-react';
import { useMemberList } from 'src/app/_common/hooks/members';

import UISectionCard from '@/components/Common/UISectionCard';

import { useInterviewerDeclines } from '../../hook/interview/interviewerMatrix.hook';

export default function InterviewersDeclineTable() {
  const { data: members } = useMemberList();
  const { data, isFetching, isError } = useInterviewerDeclines();
  return (
    <UISectionCard
      title={'Interviewers'}
      emptyStateMessage={
        !data?.length ? (
          <div className='flex h-[100px] items-center justify-center text-muted-foreground'>
            No data available
          </div>
        ) : isError ? (
          'Error fetching data'
        ) : (
          ''
        )
      }
      isLoading={isFetching}
      isHoverEffect={false}
      action={
        <div className='flex items-center space-x-2'>
          <Tabs defaultValue='declines'>
            <TabsList>
              <TabsTrigger value='interviewing'>Interviewing</TabsTrigger>
              <TabsTrigger value='declines'>Declines</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant='outline'>
            <DownloadIcon className='h-4 w-4' />
          </Button>
        </div>
      }
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[200px]'>Name</TableHead>
            <TableHead>Declines</TableHead>
            <TableHead>Avg lead time</TableHead>
            <TableHead className='w-[300px]'>Reason(s)</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((interviewer) => {
            const tempMem =
              (members || []).find(
                (member) => member.user_id === interviewer.user_id,
              ) || ({} as (typeof members)[number]);
            const mem = {
              ...tempMem,
              name: `${tempMem.first_name || ''} ${tempMem.last_name || ''}`.trim(),
            };
            return (
              <TableRow key={mem.name}>
                <TableCell className='font-medium'>
                  <div className='flex items-center space-x-3'>
                    <Avatar>
                      <AvatarImage src={mem.profile_image} alt={mem.name} />
                      <AvatarFallback>
                        {mem.name.split(' ')[0][0]}
                      </AvatarFallback>
                    </Avatar>
                    <span>{mem.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center'>
                    <ClockIcon className='mr-2 h-4 w-4 text-muted-foreground' />
                    {interviewer.decline}
                  </div>
                </TableCell>
                <TableCell>{interviewer.lead_time}</TableCell>
                <TableCell className='max-w-[300px] truncate'>
                  {interviewer.reason.join(', ')}
                </TableCell>
                <TableCell className='text-right'>
                  <Button variant='link' className='text-blue-500'>
                    View note
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </UISectionCard>
  );
}
