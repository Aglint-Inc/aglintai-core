'use client';
import { EmptyState } from '@components/empty-state';
import {
  Section,
  SectionActions,
  SectionDescription,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import { ScrollArea } from '@components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { ChartNoAxesColumn, Check, X } from 'lucide-react';
import { useRequestMetics } from 'src/app/(authenticated)/reports/_common/hook/candidate/use-request_metrics';

const CheckIcon = () => <Check className='h-4 w-4 text-green-500' />;
const XIcon = () => <X className='h-4 w-4 text-destructive' />;

import { UIAlert } from '@components/ui-alert';

import { Loader } from '@/common/Loader';
export default function Checklist() {
  const { data, isFetching, isError } = useRequestMetics();
  return (
    <Section>
      <SectionHeader>
        <SectionHeaderText>
          <SectionTitle>Coordinator Checklist</SectionTitle>
          <SectionDescription></SectionDescription>
        </SectionHeaderText>
        <SectionActions></SectionActions>
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
        <UIAlert type='error'>Error fetching data</UIAlert>
      ) : (
        <div className='w-max min-w-full'>
          <Table>
            <ScrollArea className='h-[calc(100vh-17rem)]'>
              <TableHeader className='bg-gray-100'>
                <TableRow>
                  {/* <TableHead className='w-[150px]'>Coordinator</TableHead> */}
                  <TableHead className='w-[150px]'>Candidate Name</TableHead>
                  <TableHead className='w-[150px]'>Recruiter</TableHead>
                  <TableHead className='w-[150px]'>Interview Type</TableHead>
                  <TableHead className='w-[100px]'>
                    Scheduling Request
                  </TableHead>
                  <TableHead className='w-[100px]'>Avail Request</TableHead>
                  <TableHead className='w-[100px]'>Avail Received</TableHead>
                  <TableHead className='w-[100px]'>Confirmation</TableHead>
                  <TableHead className='w-[150px]'>Candidate Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    {/* <TableCell>{item.interviewing_coordinator}</TableCell> */}
                    <TableCell>{item.candidate_name}</TableCell>
                    <TableCell>{item.recruiting_coord}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>
                      {item.self_scheduling_req ? <CheckIcon /> : <XIcon />}
                    </TableCell>
                    <TableCell>
                      {item.availability_req ? <CheckIcon /> : <XIcon />}
                    </TableCell>
                    <TableCell>
                      {item.availability_received ? <CheckIcon /> : <XIcon />}
                    </TableCell>

                    <TableCell>
                      {item.confirmation ? <CheckIcon /> : <XIcon />}
                    </TableCell>

                    <TableCell>{item.candidate_status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </ScrollArea>
          </Table>
        </div>
      )}
    </Section>
  );
}
