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
        let jobDetails;
        if (job.status == 'draft') {
          jobDetails = job.draft;
        } else {
          jobDetails = job;
        }

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
                  job.posted_by == POSTED_BY.LEVER ? (
                    <AtsBadge
                      slotLogo={
                        <Avatar
                          variant='square'
                          src='/images/ats/lever-job-badge.png'
                          sx={{ width: '100%', height: '20px' }}
                        />
                      }
                    />
                  ) : job.posted_by == POSTED_BY.GREENHOUSE ? (
                    <AtsBadge
                      slotLogo={
                        <Avatar
                          variant='square'
                          src='/images/ats/greenhouse-job-badge.svg'
                          sx={{ width: '100%', height: '20px' }}
                        />
                      }
                    />
                  ) : job.posted_by == POSTED_BY.ASHBY ? (
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
                textJobRole={capitalizeSentence(jobDetails?.job_title ?? '---')}
                textCompanyLocation={`${jobDetails?.location}`}
                newCount={job?.section_count?.new}
                qualifiedCount={job?.section_count?.qualified}
                assessmentCount={job?.section_count?.assessment}
                disqualifiedCount={job?.section_count?.disqualified}
                bgColorProps={{
                  style: {
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
                textPostedDate={
                  'Posted ' + calculateTimeDifference(job.created_at)
                }
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
