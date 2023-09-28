import { Stack } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import { JobEmptyState, JobsListingCard } from '@/devlink';
import { JobApplcationDB } from '@/src/types/data.types';
import { pageRoutes } from '@/src/utils/pageRouting';

import { JobType } from '../types';
import {
  calculateTimeDifference,
  filterApplicationsByStatus,
  StatusColor,
} from '../utils';

interface JobsListProps {
  jobs: JobType[];
  applications: JobApplcationDB[];
}

const JobsList: React.FC<JobsListProps> = ({ jobs, applications }) => {
  const router = useRouter();
  if (jobs?.length == 0) {
    return (
      <JobEmptyState
        onClickHere={{
          onClick: () => {
            router.push(pageRoutes.JOBS + '?flow=create', undefined, {
              shallow: true,
            });
          },
        }}
      />
    );
  }
  return (
    <Stack>
      {jobs?.map((job, ind) => {
        return (
          <JobsListingCard
            key={ind}
            textJobRole={job.job_title}
            textCompanyLocation={`${job.company}, ${job.location}`}
            candidateCount={
              filterApplicationsByStatus(job.id, applications).length
            }
            interviewingCount={
              filterApplicationsByStatus(job.id, applications, 'interviewing')
                .length
            }
            selectedCount={
              filterApplicationsByStatus(job.id, applications, 'shortlisted')
                .length
            }
            bgColorProps={{
              style: { backgroundColor: StatusColor[job.status] },
            }}
            textJobsStatus={job.status}
            textColorActiveInterviewingProps={{
              style: {
                color:
                  job.status == 'interviewing' || job.status == 'sourcing'
                    ? StatusColor[job.status]
                    : '#C2C8CC',
              },
            }}
            textColorActivePropsSourcing={{
              style: {
                color:
                  job.status == 'interviewing' || job.status == 'sourcing'
                    ? StatusColor[job.status]
                    : '#C2C8CC',
              },
            }}
            rejectedCount={0}
            slotStatusIcon={
              <Image
                src={
                  job.status == 'closed'
                    ? '/images/dashboard/closed.svg'
                    : job.status == 'inactive'
                    ? '/images/dashboard/inactive.svg'
                    : '/images/dashboard/active.svg'
                }
                width={10}
                height={10}
                alt=''
              />
            }
            // slotCompanyLogo={
            //   <Avatar
            //     variant='rounded'
            //     sx={{
            //       zIndex: 0,
            //       color: 'common.black',
            //       '& .MuiAvatar-img ': {
            //         objectFit: 'contain',
            //       },
            //       height: '54px',
            //       width: '54px',
            //       textTransform: 'capitalize',
            //       background: palette.grey[100],
            //     }}
            //     src={job.logo}
            //     alt={job.job_title}
            //   >
            //     <Stack
            //       sx={{
            //         width: '100%',
            //         height: '100%',
            //         textAlign: 'center',
            //         background: palette.grey[200],
            //         justifyContent: 'center',
            //         alignItems: 'center',
            //       }}
            //     >
            //       <Icon variant='CompanyOutlined' />
            //     </Stack>
            //   </Avatar>
            // }

            textPostedDate={'Posted ' + calculateTimeDifference(job.created_at)}
            // slotPostedCompany={
            //   <Avatar
            //     variant='rounded'
            //     sx={{
            //       zIndex: 0,
            //       color: 'common.black',
            //       '& .MuiAvatar-img ': {
            //         objectFit: 'contain',
            //       },
            //       height: '32px',
            //       width: '32px',
            //       textTransform: 'capitalize',
            //       background: palette.grey[100],
            //     }}
            //     src={'/images/favicon.ico'}
            //     alt={job.job_title}
            //   >
            //     <Stack
            //       direction={'row'}
            //       sx={{
            //         width: '100%',
            //         height: '100%',
            //         textAlign: 'center',
            //         background: palette.grey[200],
            //         justifyContent: 'center',
            //         alignItems: 'center',
            //       }}
            //     >
            //       <Icon variant='CompanyOutlined' />
            //     </Stack>
            //   </Avatar>
            // }
            onClickCard={{
              onClick: () => {
                router.push(`${pageRoutes.JOBS}/${job.id}`);
              },
            }}
          />
        );
      })}
    </Stack>
  );
};

export default JobsList;
