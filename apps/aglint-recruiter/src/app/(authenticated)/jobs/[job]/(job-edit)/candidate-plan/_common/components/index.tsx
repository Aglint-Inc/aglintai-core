import {
  Page,
  PageDescription,
  PageHeader,
  PageHeaderText,
  PageTitle,
} from '@components/layouts/page-header';

import ReorderableInterviewPlan from '@/authenticated/components/ReorderableInterviewPlan';
import { useCurrentJob } from '@/job/hooks';

export const CandidatePlan = () => {
  const { job_id } = useCurrentJob();
  return (
    <Page>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Candidate Plan</PageTitle>
          <PageDescription>
            Update the candidate plan here. Changes will be saved automatically.
          </PageDescription>
        </PageHeaderText>
      </PageHeader>
      <ReorderableInterviewPlan jobId={job_id} applicationId={null} />
    </Page>
  );
};
