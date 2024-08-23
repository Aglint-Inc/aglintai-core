import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { ButtonOutlined } from '@/devlink/ButtonOutlined';
import { EnableAssessment as EnableAssessmentDev } from '@/devlink/EnableAssessment';
import { Breadcrum } from '@/devlink2/Breadcrum';
import { PageLayout } from '@/devlink2/PageLayout';
import Loader from '@/src/components/Common/Loader';
import AssessmentResetWrapper from '@/src/components/NewAssessment/Common/wrapper/resetWrapper';
import { useJob } from '@/src/context/JobContext';
import { useJobs } from '@/src/context/JobsContext';
import ROUTES from '@/src/utils/routing/routes';
import { capitalize } from '@/src/utils/text/textUtils';

import { Settings } from '../Common/SharedTopNav/actions';
import JobAssessment from './list';

const JobAssessmentDashboard = () => {
  const { initialLoad } = useJobs();
  const { job } = useJob();
  return (
    <Stack height={'100%'} width={'100%'}>
      {!initialLoad ? (
        <Loader />
      ) : (
        <AssessmentResetWrapper>
          <PageLayout
            slotTopbarLeft={<JobAssessmentDashboardBreadCrumbs />}
            slotTopbarRight={<Settings />}
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
  const { job } = useJob();
  return (
    <>
      <Breadcrum
        isLink
        textName={`Jobs`}
        onClickLink={{
          onClick: () => push(ROUTES['/jobs']()),
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
  const { handleJobAsyncUpdate } = useJob();
  const [disable, setDisable] = useState(false);
  const handelEnable = async () => {
    if (!disable) {
      setDisable(true);
      await handleJobAsyncUpdate({ assessment: true });
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
        slotAssessmentButton={
          <ButtonOutlined
            textButton='Enable Assessment'
            size={2}
            onClickButton={{
              onClick: () => handelEnable(),
            }}
          />
        }
      />
    </Stack>
  );
};
