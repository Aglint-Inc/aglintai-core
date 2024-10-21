import { EmptyState } from '@components/empty-state';
import { Button } from '@components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { UIBadge } from '@components/ui-badge';
import {
  AlertCircle,
  BriefcaseBusiness,
  Clock,
  MapPin,
  Pin,
  Search,
} from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { useRouterPro } from '@/hooks/useRouterPro';
import { useJobsContext } from '@/jobs/hooks';
import type { Job } from '@/jobs/types';
import { calculateTimeDifference } from '@/jobs/utils/calculateTimeDifference';
import { formatOfficeLocation } from '@/utils/formatOfficeLocation';
import ROUTES from '@/utils/routing/routes';
import { capitalizeSentence } from '@/utils/text/textUtils';

import { POSTED_BY } from '../AddJobWithIntegrations/utils';
import { Banners } from '../Banners';
interface JobsListProps {
  jobs: Job[];
}

const JobsList: React.FC<JobsListProps> = ({ jobs }) => {
  const { handleJobPin } = useJobsContext();
  const router = useRouterPro();
  const stages = [
    {
      name: 'New',
      color: 'bg-blue-300/20 dark:bg-blue-500/20',
      borderColor: 'border-blue-300',
      arrowColor: 'text-blue-100',
      textColor: 'text-blue-800 dark:text-blue-400/80',
    },
    {
      name: 'Interview',
      color: 'bg-purple-300/20 dark:bg-purple-500/20',
      borderColor: 'border-purple-300',
      arrowColor: 'text-purple-100',
      textColor: 'text-purple-800 dark:text-purple-400/80',
    },
    {
      name: 'Qualified',
      color: 'bg-green-300/20 dark:bg-green-500/20',
      borderColor: 'border-green-300',
      arrowColor: 'text-green-100',
      textColor: 'text-green-800 dark:text-green-400/70',
    },
    {
      name: 'Disqualified',
      color: 'bg-red-200/20 dark:bg-red-500/20',
      arrowColor: 'text-red-100',
      textColor: 'text-red-800 dark:text-red-300/80',
    },
  ];
  if (jobs?.length === 0) {
    return (
      <EmptyState
        icon={Search}
        description='No matching jobs found for this search query.'
      />
    );
  }

  return (
    <Table>
      <TableHeader className='bg-muted'>
        <TableHead className='py-3 font-semibold'>Job Title</TableHead>
        <TableHead className='py-3 font-semibold'>Location</TableHead>
        <TableHead className='py-3 font-semibold'>Candidates</TableHead>
        <TableHead className='py-3 font-semibold'>Posted</TableHead>
        <TableHead className='py-3 font-semibold'>Status</TableHead>
        <TableHead className='w-[80px] text-right'>Actions</TableHead>
      </TableHeader>
      <TableBody>
        {jobs?.map((job) => (
          <TableRow
            key={job.id}
            className='cursor-pointer hover:bg-muted/50'
            onClick={() =>
              router.push(ROUTES['/jobs/[job]']({ job: job?.id ?? null! }))
            }
          >
            <TableCell className='font-medium'>
              <div className='flex flex-col'>
                <div className='flex items-center space-x-2'>
                  {getAtsBadge(job.posted_by) || (
                    <BriefcaseBusiness className='h-5 w-5 px-1 text-gray-400' />
                  )}
                  <span>{capitalizeSentence(job?.job_title ?? '---')}</span>
                  <Banners job={job} />
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className='flex items-center space-x-2'>
                <MapPin className='h-4 w-4 text-gray-400' />
                <span>{formatOfficeLocation(job?.location)}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className='flex flex-row'>
                {stages.map((stage, index) => (
                  <div
                    key={stage.name}
                    className={`${stage.color} relative cursor-pointer px-4 py-1 ${
                      index === stages.length - 1
                        ? 'rounded-r-md'
                        : 'border-r-0'
                    } ${index === 0 ? 'rounded-l-md' : ''}`}
                  >
                    <div
                      className={`flex items-center space-x-1 ${index < stages.length - 2 ? 'pr-4' : ''}`}
                    >
                      <div
                        className={`text-sm font-semibold ${stage.textColor}`}
                      >
                        {stage.name === 'New'
                          ? (job?.section_count?.new ?? 0)
                          : stage.name === 'Interview'
                            ? (job?.section_count?.interview ?? 0)
                            : stage.name === 'Qualified'
                              ? (job?.section_count?.qualified ?? 0)
                              : (job?.section_count?.disqualified ?? 0)}
                      </div>
                      <div className={`text-sm ${stage.textColor}`}>
                        {stage.name}
                      </div>
                    </div>
                    {/* {index < stages.length - 2 && (
                      <div className='absolute right-0 top-0 h-full w-4 overflow-hidden'>
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${stages[index + 1].color}`}
                        ></div>
                        <svg
                          className={`absolute inset-0 ${stage.arrowColor}`}
                          width='16'
                          height='100%'
                          viewBox='0 0 16 100'
                          preserveAspectRatio='none'
                        >
                          <path d='M0 0L16 50L0 100Z' fill='currentColor' />
                        </svg>
                      </div>
                    )} */}
                  </div>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div className='flex items-center space-x-2'>
                <Clock className='h-4 w-4 text-gray-400' />
                <span className='text-sm text-muted-foreground'>
                  {getTimestamp(job)}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className='flex items-center space-x-2'>
                <UIBadge
                  variant={job.status === 'published' ? 'success' : 'neutral'}
                  textBadge={
                    job.status!.charAt(0).toUpperCase() + job.status!.slice(1)
                  }
                />
                {job.status === 'published' &&
                  (!job.jd_json || !job.description) && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <AlertCircle className='h-4 w-4 text-destructive' />
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
                  className={`h-4 w-4 ${job.is_pinned ? 'fill-current text-yellow-400' : ''}`}
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

  const src = badgeMap[postedBy as keyof typeof badgeMap];
  return src ? (
    <Image
      src={src}
      alt={`${postedBy} ATS`}
      width={20}
      height={20}
      className='h-5 w-5 object-contain'
    />
  ) : null;
};

const getTimestamp = (job: Job) => {
  if (job.posted_by === 'Greenhouse')
    return `Last synced ${calculateTimeDifference(job?.remote_sync_time ?? job?.created_at ?? '')}`;
  return `Posted ${calculateTimeDifference(job?.created_at ?? '')}`;
};
