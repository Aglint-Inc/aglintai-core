import { AtsBadge } from '@devlink/AtsBadge';
import { JobEmptyState } from '@devlink/JobEmptyState';
import { JobsListingCard } from '@devlink/JobsListingCard';
import { Avatar } from '@mui/material';
import { useRouter } from 'next/router';
import { useFeatureFlagEnabled } from 'posthog-js/react';
import React from 'react';

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
  const isAssessmentEnabled = useFeatureFlagEnabled('isNewAssessmentEnabled');
  const isScreeningEnabled = useFeatureFlagEnabled('isPhoneScreeningEnabled');
  const isSchedulingEnabled = useFeatureFlagEnabled('isSchedulingEnabled');
  const { handleJobPin } = useJobs();
  const router = useRouter();
  if (jobs?.length == 0) {
    return <JobEmptyState />;
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
              isAssessmentPillVisible={isAssessmentEnabled && job.assessment}
              isScreeningPillsVisible={
                isScreeningEnabled && job.phone_screen_enabled
              }
              isInterviewPillVisible={isSchedulingEnabled}
              slotAtsBadge={
                job.posted_by === POSTED_BY.LEVER ? (
                  <AtsBadge
                    slotLogo={
                      <Avatar
                        variant='square'
                        src='/images/ats/lever-job-badge.svg'
                        sx={{ width: '100%', height: '20px' }}
                      />
                    }
                  />
                ) : job.posted_by === POSTED_BY.GREENHOUSE ? (
                  <AtsBadge
                    slotLogo={
                      <Avatar
                        variant='square'
                        src='/images/ats/greenhouse-job-badge.svg'
                        sx={{ width: '100%', height: '20px' }}
                      />
                    }
                  />
                ) : job.posted_by === POSTED_BY.ASHBY ? (
                  <AtsBadge
                    slotLogo={
                      <Avatar
                        variant='square'
                        src='/images/ats/ashby-job-badge.svg'
                        sx={{ width: '100%', height: '20px' }}
                      />
                    }
                  />
                ) : (
                  ''
                )
              }
              key={ind}
              textJobRole={capitalizeSentence(job?.job_title ?? '---')}
              textCompanyLocation={formatOfficeLocation(job?.location)}
              newCount={job?.section_count?.new}
              qualifiedCount={job?.section_count?.qualified}
              assessmentCount={job?.section_count?.assessment}
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
                  router.push(ROUTES['/jobs/[id]']({ id: job.id }));
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
