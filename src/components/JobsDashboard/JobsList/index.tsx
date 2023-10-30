import { Avatar } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import { AtsBadge, JobEmptyState, JobsListingCard } from '@/devlink';
import { JobTypeDashboard } from '@/src/context/JobsContext/types';
import { ScrollList, YTransform } from '@/src/utils/framer-motions/Animation';
import { pageRoutes } from '@/src/utils/pageRouting';

import { POSTED_BY } from '../AddJobWithIntegrations/utils';
import {
  calculateTimeDifference,
  StatusColor
} from '../utils';
import Icon from '../../Common/Icons/Icon';
import { getStatusInfo } from '../../JobApplicationsDashboard/JobStatus';

interface JobsListProps {
  jobs: JobTypeDashboard[];
}

const JobsList: React.FC<JobsListProps> = ({ jobs }) => {
  const router = useRouter();
  if (jobs?.length == 0) {
    return (
      <YTransform uniqueKey={router.query.status}>
        <JobEmptyState
          onClickHere={{
            onClick: () => {
              router.push(`${pageRoutes.CREATEJOB}`, undefined, {
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
                slotAtsBadge={
                  job.posted_by == POSTED_BY.LEVER ? (
                    <AtsBadge
                      slotLogo={
                        <Avatar
                          variant='square'
                          src='/images/ats/lever.png'
                          sx={{ width: '100%', height: '14px' }}
                        />
                      }
                    />
                  ) : (
                    ''
                  )
                }
                key={ind}
                textJobRole={job.job_title}
                textCompanyLocation={`${job.company}, ${job.location}`}
                candidateCount={
                  job.count.new +
                  job.count.interviewing +
                  job.count.qualified +
                  job.count.disqualified
                }
                interviewingCount={job.count.interviewing}
                selectedCount={job.count.qualified}
                rejectedCount={job.count.disqualified}
                slotInterviewIcon={
                  !job.active_status.closed.isActive ? (
                    getStatusInfo(
                      job.active_status.interviewing,
                      'interviewing',
                    ).scheduled ? (
                      <Icon variant='ClockHistory' height='12' width='12' />
                    ) : (
                      <Icon variant='DoubleTick' height='16' width='16' />
                    )
                  ) : (
                    ''
                  )
                }
                slotSourcingIcon={
                  !job.active_status.closed.isActive ? (
                    getStatusInfo(job.active_status.sourcing, 'sourcing')
                      .scheduled ? (
                      <Icon variant='ClockHistory' height='12' width='12' />
                    ) : (
                      <Icon variant='DoubleTick' height='16' width='16' />
                    )
                  ) : (
                    ''
                  )
                }
                textSourcing={
                  !job.active_status.closed.isActive
                    ? getStatusInfo(job.active_status.sourcing, 'sourcing')
                        .scheduled
                      ? getStatusInfo(job.active_status.sourcing, 'sourcing')
                          .primaryStatus
                      : 'Sourcing'
                    : ''
                }
                textInterview={
                  !job.active_status.closed.isActive
                    ? getStatusInfo(
                        job.active_status.interviewing,
                        'interviewing',
                      ).scheduled
                      ? getStatusInfo(
                          job.active_status.interviewing,
                          'interviewing',
                        ).primaryStatus
                      : 'Interviewing'
                    : ''
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
                    color:
                      !job.active_status.closed.isActive &&
                      getStatusInfo(
                        job.active_status.interviewing,
                        'interviewing',
                      ).scheduled
                        ? '#daa520'
                        : getStatusInfo(
                            job.active_status.interviewing,
                            'interviewing',
                          ).active
                        ? '#228F67'
                        : '#C2C8CC',
                  },
                }}
                textColorActivePropsSourcing={{
                  style: {
                    color:
                      !job.active_status.closed.isActive &&
                      getStatusInfo(job.active_status.sourcing, 'sourcing')
                        .scheduled
                        ? '#daa520'
                        : getStatusInfo(job.active_status.sourcing, 'sourcing')
                            .active
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
