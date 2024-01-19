import { Avatar } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import posthog from 'posthog-js';
import React from 'react';

import { AtsBadge, JobEmptyState, JobsListingCard } from '@/devlink';
import { JobTypeDashboard } from '@/src/context/JobsContext/types';
import { ScrollList, YTransform } from '@/src/utils/framer-motions/Animation';
import { pageRoutes } from '@/src/utils/pageRouting';

import { POSTED_BY } from '../AddJobWithIntegrations/utils';
import { calculateTimeDifference, StatusColor } from '../utils';

interface JobsListProps {
  jobs: JobTypeDashboard[];
}

const JobsList: React.FC<JobsListProps> = ({ jobs }) => {
  const router = useRouter();
  if (jobs?.length == 0) {
    return (
      <YTransform uniqueKey={router.query.status}>
        <JobEmptyState />
      </YTransform>
    );
  }
  return (
    <>
      {jobs?.map((job, ind) => {
        let jobDetails;
        if (job.status == 'draft') {
          jobDetails = job.draft;
        } else {
          jobDetails = job;
        }

        return (
          <>
            <ScrollList uniqueKey={job.id}>
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
                  ) : job.posted_by == POSTED_BY.GREENHOUSE ? (
                    <AtsBadge
                      slotLogo={
                        <Avatar
                          variant='square'
                          src='/images/ats/greenhouse.svg'
                          sx={{ width: '100%', height: '16px', pt: '4px' }}
                        />
                      }
                    />
                  ) : job.posted_by == POSTED_BY.ASHBY ? (
                    <AtsBadge
                      slotLogo={
                        <Avatar
                          variant='square'
                          src='/images/ats/ashby.svg'
                          sx={{ width: '100%', height: '14px', p: '2px' }}
                        />
                      }
                    />
                  ) : (
                    ''
                  )
                }
                key={ind}
                textJobRole={jobDetails?.job_title}
                textCompanyLocation={`${jobDetails?.company}, ${jobDetails?.location}`}
                newCount={job?.count?.new}
                qualifiedCount={job?.count?.qualified}
                assessmentCount={job?.count?.assessment}
                bgColorProps={{
                  style: {
                    backgroundColor:
                      job.status == 'draft'
                        ? StatusColor['inactive']
                        : job.status == 'published'
                        ? StatusColor['active']
                        : StatusColor['closed'],
                  },
                }}
                textJobsStatus={job.status}
                slotStatusIcon={
                  <Image
                    src={
                      job.status == 'draft'
                        ? '/images/dashboard/inactive.svg'
                        : job.status == 'published'
                        ? '/images/dashboard/active.svg'
                        : '/images/dashboard/closed.svg'
                    }
                    width={14}
                    height={14}
                    alt=''
                  />
                }
                isJobWarningVisible={
                  job.status == 'published' &&
                  (!job.jd_json || !job.description)
                    ? true
                    : false
                }
                textPostedDate={
                  'Posted ' + calculateTimeDifference(job.created_at)
                }
                onClickCard={{
                  onClick: () => {
                    if (job.status === 'draft') {
                      router.push(`${pageRoutes.EDITJOBS}?job_id=${job.id}`);
                    } else {
                      router.push(`${pageRoutes.JOBS}/${job.id}`);
                    }
                    posthog.capture('Job Card Clicked');
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
