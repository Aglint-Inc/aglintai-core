import Layout from 'src/app/(authenticated)/_jobs/[job]/candidate-plan/layout';
import Page from 'src/app/(authenticated)/_jobs/[job]/candidate-plan/page';

const InterviewPlanJobPage = () => {
  return <Page />;
};

InterviewPlanJobPage.privateProvider = (page) => <Layout>{page}</Layout>;

export default InterviewPlanJobPage;
