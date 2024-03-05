import { capitalize } from 'lodash';
import { useRouter } from 'next/router';

import { Breadcrum, PageLayout } from '@/devlink2';
import JobAgent from '@/src/components/Agent/JobAgent';
import { JobAssessmentContextProvider } from '@/src/components/JobAssessment/context';
import JobPostFormProvider from '@/src/components/JobsDashboard/JobPostCreateUpdate/JobPostFormProvider';
import JobApplicationProvider from '@/src/context/JobApplicationsContext';
import { JobAssistantProvider } from '@/src/context/JobAssistant';
import JobDashboardProvider, {
  useJobDashboard
} from '@/src/context/JobDashboard';

const JobAgentPage = () => {
  return (
    <JobPostFormProvider>
      <JobAssistantProvider>
        <AgentPage />
      </JobAssistantProvider>
    </JobPostFormProvider>
  );
};

export default JobAgentPage;

JobAgentPage.getProvider = function getProvider(page) {
  return (
    <JobDashboardProvider>
      <JobApplicationProvider>
        <JobAssessmentContextProvider>{page}</JobAssessmentContextProvider>
      </JobApplicationProvider>
    </JobDashboardProvider>
  );
};

const AgentPage = () => {
  return (
    <PageLayout slotBody={<JobAgent />} slotTopbarLeft={<BreadCrumbs />} />
  );
};

const BreadCrumbs = () => {
  const router = useRouter();
  const { job } = useJobDashboard();
  return (
    <>
      <Breadcrum
        isLink
        textName={`${capitalize(job?.status ?? 'all')} jobs`}
        onClickLink={{
          onClick: () => {
            router.push(`/jobs?status=${job?.status ?? 'all'}`);
          },
          style: { cursor: 'pointer' }
        }}
      />
      <Breadcrum
        isLink
        textName={capitalize(job?.job_title ?? 'Job')}
        onClickLink={{
          onClick: () => {
            router.push(`/jobs/${job?.id}`);
          },
          style: { cursor: 'pointer' }
        }}
        showArrow
      />
      <Breadcrum
        textName={'Agent'}
        onClickLink={{
          onClick: () => {
            router.push(`/jobs/${job?.id}`);
          },
          style: { cursor: 'pointer' }
        }}
        showArrow
      />
    </>
  );
};
