import { capitalize } from 'lodash';
import { useRouter } from 'next/router';

import { Breadcrum, PageLayout } from '@/devlink2';
import JobAgent from '@/src/components/Agent/JobAgent';
import Seo from '@/src/components/Common/Seo';
import JobPostFormProvider from '@/src/components/JobsDashboard/JobPostCreateUpdate/JobPostFormProvider';
import JobApplicationProvider from '@/src/context/JobApplicationsContext';
import { JobAssistantProvider } from '@/src/context/JobAssistant';
import JobDashboardProvider, {
  useJobDetails,
} from '@/src/context/JobDashboard';

const JobAgentPage = () => {
  return (
    <>
      <Seo title={`Jobs`} description='AI for People Products' />
      <JobPostFormProvider>
        <JobAssistantProvider>
          <AgentPage />
        </JobAssistantProvider>
      </JobPostFormProvider>
    </>
  );
};

export default JobAgentPage;

JobAgentPage.privateProvider = function privateProvider(page) {
  return (
    <JobDashboardProvider>
      <JobApplicationProvider>{page}</JobApplicationProvider>
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
  const { job } = useJobDetails();
  return (
    <>
      <Breadcrum
        isLink
        textName={`${capitalize(job?.status ?? 'all')} jobs`}
        onClickLink={{
          onClick: () => {
            router.push(`/jobs?status=${job?.status ?? 'all'}`);
          },
          style: { cursor: 'pointer' },
        }}
      />
      <Breadcrum
        isLink
        textName={capitalize(job?.job_title ?? 'Job')}
        onClickLink={{
          onClick: () => {
            router.push(`/jobs/${job?.id}`);
          },
          style: { cursor: 'pointer' },
        }}
        showArrow
      />
      <Breadcrum
        textName={'Agent'}
        onClickLink={{
          onClick: () => {
            router.push(`/jobs/${job?.id}`);
          },
          style: { cursor: 'pointer' },
        }}
        showArrow
      />
    </>
  );
};
