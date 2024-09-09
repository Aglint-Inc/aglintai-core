import Layout from 'src/app/(authenticated)/_jobs/[job]/interview-plan/layout';

import Page from '@/components/Jobs/Job/Interview-Plan';

const InterviewPlanJobPage = () => {
  return <Page />;
};

InterviewPlanJobPage.privateProvider = (page) => <Layout>{page}</Layout>;

export default InterviewPlanJobPage;
