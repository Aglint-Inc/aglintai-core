import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import { JobEmptyState, JobsListingCard } from '@/devlink';
import { JobApplcationDB, JobType } from '@/src/types/data.types';
import { YTransform } from '@/src/utils/framer-motions/Animation';
import { pageRoutes } from '@/src/utils/pageRouting';

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
      <YTransform uniqueKey={router.query.status}>
        <JobEmptyState
          onClickHere={{
            onClick: () => {
              router.push(pageRoutes.JOBS + '?flow=create', undefined, {
                shallow: true,
              });
            },
          }}
        />
      </YTransform>
    );
  }
  return (
    <YTransform uniqueKey={router.query.status}>
      {jobs?.map((job, ind) => {
        return (
          <>
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
              rejectedCount={
                filterApplicationsByStatus(job.id, applications, 'rejected')
                  .length
              }
              bgColorProps={{
                style: {
                  backgroundColor:
                    !(
                      job.active_status.interviewing.isActive ||
                      job.active_status.sourcing.isActive
                    ) && !job.active_status.closed.isActive
                      ? StatusColor['inactive']
                      : (job.active_status.interviewing.isActive ||
                          job.active_status.sourcing.isActive) &&
                        !job.active_status.closed.isActive
                      ? StatusColor['active']
                      : StatusColor['closed'],
                },
              }}
              textJobsStatus={
                !(
                  job.active_status.interviewing.isActive ||
                  job.active_status.sourcing.isActive
                ) && !job.active_status.closed.isActive
                  ? 'Inactive'
                  : (job.active_status.interviewing.isActive ||
                      job.active_status.sourcing.isActive) &&
                    !job.active_status.closed.isActive
                  ? 'Active'
                  : 'Closed'
              }
              textColorActiveInterviewingProps={{
                style: {
                  color: job.active_status.interviewing.isActive
                    ? '#228F67'
                    : '#C2C8CC',
                },
              }}
              textColorActivePropsSourcing={{
                style: {
                  color: job.active_status.sourcing.isActive
                    ? '#228F67'
                    : '#C2C8CC',
                },
              }}
              slotStatusIcon={
                <Image
                  src={
                    !(
                      job.active_status.interviewing.isActive ||
                      job.active_status.sourcing.isActive
                    ) && !job.active_status.closed.isActive
                      ? '/images/dashboard/inactive.svg'
                      : (job.active_status.interviewing.isActive ||
                          job.active_status.sourcing.isActive) &&
                        !job.active_status.closed.isActive
                      ? '/images/dashboard/active.svg'
                      : '/images/dashboard/closed.svg'
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

              textPostedDate={
                'Posted ' + calculateTimeDifference(job.created_at)
              }
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
          </>
        );
      })}
    </YTransform>
  );
};

export default JobsList;
