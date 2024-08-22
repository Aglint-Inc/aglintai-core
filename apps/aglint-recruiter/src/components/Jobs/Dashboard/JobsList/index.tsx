import { Avatar } from '@mui/material';
import { useRouter } from 'next/router';
import posthog from 'posthog-js';
import { useFeatureFlagEnabled } from 'posthog-js/react';
import React from 'react';

import { AtsBadge } from '@/devlink/AtsBadge';
import { JobEmptyState } from '@/devlink/JobEmptyState';
import { JobsListingCard } from '@/devlink/JobsListingCard';
import { useApplicationsParams } from '@/src/context/ApplicationsContext/hooks';
import { Job } from '@/src/queries/jobs/types';
import { Application } from '@/src/types/applications.types';
import { formatOfficeLocation } from '@/src/utils/formatOfficeLocation';
import { ScrollList, YTransform } from '@/src/utils/framer-motions/Animation';
import ROUTES from '@/src/utils/routing/routes';
import { capitalizeSentence } from '@/src/utils/text/textUtils';

import { POSTED_BY } from '../AddJobWithIntegrations/utils';
import {
  calculateTimeDifference,
  getBgColorJobsList,
  getTextColorJobsList,
} from '../utils';

interface JobsListProps {
  jobs: Job[];
}

const JobsList: React.FC<JobsListProps> = ({ jobs }) => {
  const isAssessmentEnabled = useFeatureFlagEnabled('isNewAssessmentEnabled');
  const isScreeningEnabled = useFeatureFlagEnabled('isPhoneScreeningEnabled');
  const isSchedulingEnabled = useFeatureFlagEnabled('isSchedulingEnabled');

  const { getParams } = useApplicationsParams();
  const router = useRouter();
  const { push } = useRouter();
  if (jobs?.length == 0) {
    return (
      <YTransform uniqueKey={router.query.status}>
        <JobEmptyState />
      </YTransform>
    );
  }

  const handlClick = (id: string, section: Application['status']) => {
    const params = getParams({ section });
    push(`/jobs/${id}/candidate-list${params ? `?${params}` : ''}`);
  };

  return (
    <>
      {jobs?.map((job, ind) => {
        return (
          <>
            <ScrollList key={ind} uniqueKey={job.id}>
              <JobsListingCard
                onClickNew={{ onClick: () => handlClick(job.id, 'new') }}
                onClickAssessment={{
                  onClick: () => handlClick(job.id, 'assessment'),
                }}
                onClickDisqualified={{
                  onClick: () => handlClick(job.id, 'disqualified'),
                }}
                onClickInterview={{
                  onClick: () => handlClick(job.id, 'interview'),
                }}
                onClickQualified={{
                  onClick: () => handlClick(job.id, 'qualified'),
                }}
                onClickScreening={{
                  onClick: () => handlClick(job.id, 'screening'),
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
                  job.status == 'published' &&
                  (!job.jd_json || !job.description)
                    ? true
                    : false
                }
                textPostedDate={getTimestamp(job)}
                onClickCard={{
                  onClick: () => {
                    router.push(ROUTES['/jobs/[id]']({ id: job.id }));
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

const getTimestamp = (job: Job) => {
  if (job.posted_by === 'Greenhouse')
    return `Last synced ${calculateTimeDifference(job?.remote_sync_time ?? job?.created_at ?? '')}`;
  return `Post ${calculateTimeDifference(job?.created_at ?? '')}`;
};
