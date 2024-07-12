import { useRouter } from 'next/router';

import { Breadcrum } from '@/devlink2/Breadcrum';
import { PageLayout } from '@/devlink2/PageLayout';
import JobAgent from '@/src/components/Agent/JobAgent';
import Seo from '@/src/components/Common/Seo';
import { JobAssistantProvider } from '@/src/context/JobAssistant';
import { JobProvider, useJob } from '@/src/context/JobContext';
import { capitalizeSentence } from '@/src/utils/text/textUtils';

const JobAgentPage = () => {
  return (
    <>
      <Seo title={`Jobs`} description='AI for People Products' />
      <JobAssistantProvider>
        <AgentPage />
      </JobAssistantProvider>
    </>
  );
};

export default JobAgentPage;

JobAgentPage.privateProvider = function privateProvider(page) {
  return <JobProvider>{page}</JobProvider>;
};

const AgentPage = () => {
  return (
    <PageLayout slotBody={<JobAgent />} slotTopbarLeft={<BreadCrumbs />} />
  );
};

const BreadCrumbs = () => {
  const router = useRouter();
  const { job } = useJob();
  return (
    <>
      <Breadcrum
        isLink
        textName={`${capitalizeSentence(job?.status ?? 'all')} jobs`}
        onClickLink={{
          onClick: () => {
            router.push(`/jobs?status=${job?.status ?? 'all'}`);
          },
          style: { cursor: 'pointer' },
        }}
      />
      <Breadcrum
        isLink
        textName={capitalizeSentence(job?.job_title ?? 'Job')}
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
