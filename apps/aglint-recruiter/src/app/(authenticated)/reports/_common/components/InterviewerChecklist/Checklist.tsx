'use client';
import { ScrollArea } from '@components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { Check, X } from 'lucide-react';
import { useRequestMetics } from 'src/app/(authenticated)/reports/_common/hook/candidate/use-request_metrics';

import UISectionCard from '@/common/UISectionCard';

const CheckIcon = () => <Check className='h-4 w-4 text-green-500' />;
const XIcon = () => <X className='h-4 w-4 text-destructive' />;

export default function Checklist() {
  const { data, isFetching, isError } = useRequestMetics();
  return (
    <UISectionCard
      title={'Coordinator Checklist'}
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
    >
      <div className='overflow-x-auto'>
        <div className='w-max min-w-full'>
          <Table>
            <ScrollArea className='h-[calc(100vh-17rem)]'>
              <TableHeader className='bg-gray-100'>
                <TableRow>
                  <TableHead className='w-[150px]'>Coordinator</TableHead>
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
                    <TableCell>{item.interviewing_coordinator}</TableCell>
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
      </div>
    </UISectionCard>
  );
}
