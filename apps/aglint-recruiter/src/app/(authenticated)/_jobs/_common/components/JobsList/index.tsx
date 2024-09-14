import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';
import {
  AlertCircle,
  Pin,
  MapPin,
  Briefcase,
  Clock,
  Building2,
} from 'lucide-react';

import EmptyState from '@/components/Common/EmptyStates/EmptyStates';
import { useJobs } from '@/jobs/hooks';
import { calculateTimeDifference } from '@/jobs/utils/calculateTimeDifference';
import { type Job } from '@/queries/jobs/types';
import { formatOfficeLocation } from '@/utils/formatOfficeLocation';
import ROUTES from '@/utils/routing/routes';
import { capitalizeSentence } from '@/utils/text/textUtils';

import { POSTED_BY } from '../AddJobWithIntegrations/utils';

interface JobsListProps {
  jobs: Job[];
}

const JobsList: React.FC<JobsListProps> = ({ jobs }) => {
  const { handleJobPin } = useJobs();
  const router = useRouter();

  if (jobs?.length === 0) {
    return <EmptyState type={'job-jobList'} />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className='bg-gray-50 border-b border-gray-200'>
          <TableHead className='font-semibold text-gray-600 py-3'>
            Job Title
          </TableHead>
          <TableHead className='font-semibold text-gray-600 py-3'>
            Location
          </TableHead>
          <TableHead className='font-semibold text-gray-600 py-3'>
            Candidates
          </TableHead>
          <TableHead className='font-semibold text-gray-600 py-3'>
            Posted
          </TableHead>
          <TableHead className='font-semibold text-gray-600 py-3'>
            Status
          </TableHead>
          <TableHead className='w-[80px] text-right'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs?.map((job) => (
          <TableRow
            key={job.id}
            className='cursor-pointer hover:bg-gray-50'
            onClick={() => router.push(ROUTES['/jobs/[job]']({ job: job.id }))}
          >
            <TableCell className='font-medium'>
              <div className='flex flex-col'>
                <div className='flex items-center space-x-2'>
                  <Briefcase className='h-4 w-4 text-gray-400' />
                  <span>{capitalizeSentence(job?.job_title ?? '---')}</span>
                  {getAtsBadge(job.posted_by)}
                </div>
                {/* <div className='flex items-center space-x-2 mt-1'>
                  <Building2 className='h-4 w-4 text-gray-400' />
                  <span className='text-sm text-gray-600'>
                    {job?.department ?? '---'}
                  </span>
                </div> */}
              </div>
            </TableCell>
            <TableCell>
              <div className='flex items-center space-x-2'>
                <MapPin className='h-4 w-4 text-gray-400' />
                <span>{formatOfficeLocation(job?.location)}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className='flex flex-wrap gap-1'>
                <Badge variant='outline' className='text-xs'>
                  New: {job?.section_count?.new ?? 0}
                </Badge>
                <Badge variant='outline' className='text-xs'>
                  Interview: {job?.section_count?.interview ?? 0}
                </Badge>
                <Badge variant='outline' className='text-xs'>
                  Qualified: {job?.section_count?.qualified ?? 0}
                </Badge>
                <Badge variant='outline' className='text-xs'>
                  Disqualified: {job?.section_count?.disqualified ?? 0}
                </Badge>
              </div>
            </TableCell>
            <TableCell>
              <div className='flex items-center space-x-2'>
                <Clock className='h-4 w-4 text-gray-400' />
                <span className='text-sm text-gray-500'>
                  {getTimestamp(job)}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className='flex items-center space-x-2'>
                <Badge
                  variant={job.status === 'published' ? 'default' : 'outline'}
                  className={`${
                    job.status === 'published'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </Badge>
                {job.status === 'published' &&
                  (!job.jd_json || !job.description) && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <AlertCircle className='h-4 w-4 text-red-500' />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Missing Job Description</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
              </div>
            </TableCell>
            <TableCell className='text-right'>
              <Button
                variant='ghost'
                size='sm'
                onClick={(e) => {
                  e.stopPropagation();
                  handleJobPin({ id: job.id, is_pinned: !job.is_pinned });
                }}
              >
                <Pin
                  className={`h-4 w-4 ${job.is_pinned ? 'text-yellow-400 fill-current' : ''}`}
                />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default JobsList;

const getAtsBadge = (postedBy: string) => {
  const badgeMap = {
    [POSTED_BY.LEVER]: '/images/ats/lever-job-badge.svg',
    [POSTED_BY.GREENHOUSE]: '/images/ats/greenhouse-job-badge.svg',
    [POSTED_BY.ASHBY]: '/images/ats/ashby-job-badge.svg',
  };

  const src = badgeMap[postedBy];
  return src ? (
    <Image
      src={src}
      alt={`${postedBy} ATS`}
      width={20}
      height={20}
      className='w-5 h-5 object-contain ml-2'
    />
  ) : null;
};

const getTimestamp = (job: Job) => {
  if (job.posted_by === 'Greenhouse')
    return `Last synced ${calculateTimeDifference(job?.remote_sync_time ?? job?.created_at ?? '')}`;
  return `Posted ${calculateTimeDifference(job?.created_at ?? '')}`;
};
