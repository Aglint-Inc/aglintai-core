import { Stack } from '@mui/material';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';

import { Breadcrum, PageLayout } from '@/devlink2';
import { useJobs } from '@/src/context/JobsContext';
import { useCurrentJob } from '@/src/queries/job-assessment/keys';

import JobAssessment from './list';
import Loader from '../Common/Loader';
import AssessmentResetWrapper from '../NewAssessment/Common/wrapper/resetWrapper';

const JobAssessmentDashboard = () => {
  const { initialLoad } = useJobs();
  return (
    <Stack height={'100%'} width={'100%'}>
      {!initialLoad ? (
        <Loader />
      ) : (
        <AssessmentResetWrapper>
          <PageLayout
            slotTopbarLeft={<JobAssessmentDashboardBreadCrumbs />}
            slotTopbarRight={<></>}
            slotBody={<JobAssessment />}
          />
        </AssessmentResetWrapper>
      )}
    </Stack>
  );
};

export default JobAssessmentDashboard;

const JobAssessmentDashboardBreadCrumbs = () => {
  const { push } = useRouter();
  const { job } = useCurrentJob();
  return (
    <>
      <Breadcrum
        isLink
        textName={`${capitalize(job?.status ?? 'all')} jobs`}
        onClickLink={{
          onClick: () => {
            push(`/jobs?status=${job?.status ?? 'all'}`);
          },
          style: { cursor: 'pointer' },
        }}
      />
      <Breadcrum
        isLink
        textName={capitalize(job?.job_title ?? 'Job')}
        onClickLink={{
          onClick: () => {
            push(`/jobs/${job?.id}`);
          },
          style: { cursor: 'pointer' },
        }}
        showArrow
      />
      <Breadcrum textName={`Assessments`} showArrow />
    </>
  );
};
