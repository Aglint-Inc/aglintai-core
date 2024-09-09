import Layout from 'src/app/(authenticated)/_jobs/[job]/interview-plan/layout';
import Page from 'src/app/(authenticated)/_jobs/[job]/interview-plan/page';

const InterviewPlanJobPage = () => {
  return <Page />;
};

InterviewPlanJobPage.privateProvider = (page) => <Layout>{page}</Layout>;

export default InterviewPlanJobPage;
