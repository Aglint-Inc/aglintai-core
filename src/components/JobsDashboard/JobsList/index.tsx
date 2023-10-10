import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import { JobEmptyState, JobsListingCard } from '@/devlink';
import { JobApplicationSections } from '@/src/context/JobApplicationsContext/types';
import { JobApplcationDB, JobType } from '@/src/types/data.types';
import { ScrollList, YTransform } from '@/src/utils/framer-motions/Animation';
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
    <>
      {jobs?.map((job, ind) => {
        return (
          <>
            <ScrollList uniqueKey={ind}>
              <JobsListingCard
                key={ind}
                textJobRole={job.job_title}
                textCompanyLocation={`${job.company}, ${job.location}`}
                candidateCount={
                  filterApplicationsByStatus(job.id, applications).length
                }
                interviewingCount={
                  filterApplicationsByStatus(
                    job.id,
                    applications,
                    JobApplicationSections.INTERVIEWING,
                  ).length
                }
                selectedCount={
                  filterApplicationsByStatus(
                    job.id,
                    applications,
                    JobApplicationSections.QUALIFIED,
                  ).length
                }
                rejectedCount={
                  filterApplicationsByStatus(
                    job.id,
                    applications,
                    JobApplicationSections.DISQUALIFIED,
                  ).length
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
                textPostedDate={
                  'Posted ' + calculateTimeDifference(job.created_at)
                }
                onClickCard={{
                  onClick: () => {
                    router.push(`${pageRoutes.JOBS}/${job.id}`);
                  },
                }}
              />
            </ScrollList>
          </>
        );
      })}
    </>
  );
};

export default JobsList;
