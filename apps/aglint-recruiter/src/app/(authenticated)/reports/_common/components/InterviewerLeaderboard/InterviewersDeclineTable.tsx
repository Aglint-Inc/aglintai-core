import { EmptyState } from '@components/empty-state';
import {
  Section,
  SectionActions,
  SectionDescription,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
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
import { UIAlert } from '@components/ui-alert';
import { ChartNoAxesColumn, ClockIcon, DownloadIcon } from 'lucide-react';
import { useMemberList } from 'src/app/_common/hooks/useMemberList';

import { Loader } from '@/common/Loader';

import { useInterviewerDeclines } from '../../hook/interview/interviewerMatrix.hook';

export default function InterviewersDeclineTable() {
  const { data: members } = useMemberList();
  const { data, isFetching, isError } = useInterviewerDeclines();
  return (
    <Section>
      <SectionHeader>
        <SectionHeaderText>
          <SectionTitle>Interviewers Decline</SectionTitle>
          <SectionDescription></SectionDescription>
        </SectionHeaderText>
        <SectionActions>
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
        </SectionActions>
      </SectionHeader>
      {isFetching ? (
        <Loader />
      ) : !data?.length ? (
        <EmptyState
          icon={ChartNoAxesColumn}
          header='No data available'
          description='No data available for the selected time frame.'
        />
      ) : isError ? (
        <UIAlert type='error' title='Error fetching data'>
          Error fetching data for the selected time frame
        </UIAlert>
      ) : (
        <Table>
          <TableHeader className='bg-muted'>
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
                ) || ({} as NonNullable<typeof members>[number]);
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
      )}
    </Section>
  );
}
