import { JobsListingCard } from '@devlink/JobsListingCard';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import EmptyState from '@/components/Common/EmptyStates/EmptyStates';
import { useJobs } from '@/jobs/hooks';
import { calculateTimeDifference } from '@/jobs/utils/calculateTimeDifference';
import { getBgColorJobsList } from '@/jobs/utils/getBgColorJobsList';
import { getTextColorJobsList } from '@/jobs/utils/getTextColorJobsList';
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
  if (jobs?.length == 0) {
    return <EmptyState type={'job-jobList'} />;
  }

  return (
    <>
      {jobs?.map((job, ind) => {
        return (
          <>
            <JobsListingCard
              isPinned={job.is_pinned}
              onClickPin={{
                onClick: () =>
                  handleJobPin({ id: job.id, is_pinned: !job.is_pinned }),
              }}
              isAssessmentPillVisible={false}
              isScreeningPillsVisible={false}
              isInterviewPillVisible={true}
              slotAtsBadge={
                job.posted_by === POSTED_BY.LEVER ? (
                  <Image
                    src='/images/ats/lever-job-badge.svg'
                    alt='Lever ATS'
                    width={20}
                    height={20}
                    className='w-full h-5 object-contain'
                  />
                ) : job.posted_by === POSTED_BY.GREENHOUSE ? (
                  <Image
                    src='/images/ats/greenhouse-job-badge.svg'
                    alt='Greenhouse ATS'
                    width={20}
                    height={20}
                    className='w-full h-5 object-contain'
                  />
                ) : job.posted_by === POSTED_BY.ASHBY ? (
                  <Image
                    src='/images/ats/ashby-job-badge.svg'
                    alt='Ashby ATS'
                    width={20}
                    height={20}
                    className='w-full h-5 object-contain'
                  />
                ) : null
              }
              key={ind}
              textJobRole={capitalizeSentence(job?.job_title ?? '---')}
              textCompanyLocation={formatOfficeLocation(job?.location)}
              newCount={job?.section_count?.new}
              qualifiedCount={job?.section_count?.qualified}
              assessmentCount={'---'}
              disqualifiedCount={job?.section_count?.disqualified}
              bgColorProps={{
                style: {
                  display: job?.posted_by === 'Greenhouse' ? 'none' : 'flex',
                  backgroundColor: getBgColorJobsList(job.status),
                  color: getTextColorJobsList(job.status),
                },
              }}
              interviewCount={job?.section_count?.interview}
              textJobsStatus={job.status}
              isJobWarningVisible={
                job.status == 'published' && (!job.jd_json || !job.description)
                  ? true
                  : false
              }
              textPostedDate={getTimestamp(job)}
              onClickCard={{
                onClick: () => {
                  router.push(ROUTES['/jobs/[job]']({ job: job.id }));
                },
              }}
            />
          </>
        );
      })}
    </>
  );
};

export default JobsList;

const getTimestamp = (job: Job) => {
  if (job.posted_by === 'Greenhouse')
    return `Last synced ${calculateTimeDifference(job?.remote_sync_time ?? job?.created_at ?? '')}`;
  return `Post ${calculateTimeDifference(job?.created_at ?? '')}`;
};
