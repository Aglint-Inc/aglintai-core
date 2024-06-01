import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { EnableAssessment as EnableAssessmentDev } from '@/devlink/EnableAssessment';
import { Breadcrum } from '@/devlink2/Breadcrum';
import { PageLayout } from '@/devlink2/PageLayout';
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import { useJobs } from '@/src/context/JobsContext';
import { useCurrentJob } from '@/src/queries/job-assessment/keys';

import Loader from '../Common/Loader';
import { capitalize } from '../JobApplicationsDashboard/utils';
import AssessmentResetWrapper from '../NewAssessment/Common/wrapper/resetWrapper';
import JobAssessment from './list';

const JobAssessmentDashboard = () => {
  const { initialLoad } = useJobs();
  const { job } = useJobApplications();
  return (
    <Stack height={'100%'} width={'100%'}>
      {!initialLoad ? (
        <Loader />
      ) : (
        <AssessmentResetWrapper>
          <PageLayout
            slotTopbarLeft={<JobAssessmentDashboardBreadCrumbs />}
            slotTopbarRight={<></>}
            slotBody={
              job?.assessment ? <JobAssessment /> : <EnableAssessment />
            }
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

const EnableAssessment = () => {
  const { handleJobAsyncUpdate } = useJobs();
  const { job_id } = useCurrentJob();
  const [disable, setDisable] = useState(false);
  const handelEnable = async () => {
    if (!disable) {
      setDisable(true);
      await handleJobAsyncUpdate(job_id, { assessment: true });
      setDisable(false);
    }
  };
  return (
    <Stack
      p={2}
      style={{
        opacity: disable ? 0.4 : 1,
        pointerEvents: disable ? 'none' : 'auto',
        transition: '0.5s',
      }}
    >
      <EnableAssessmentDev
        onClickEnableAssessment={{ onClick: () => handelEnable() }}
      />
    </Stack>
  );
};
