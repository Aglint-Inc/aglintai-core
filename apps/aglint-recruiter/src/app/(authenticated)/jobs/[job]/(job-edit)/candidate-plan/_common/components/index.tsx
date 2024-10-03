import {
  Page,
  PageDescription,
  PageHeader,
  PageHeaderText,
  PageTitle,
} from '@components/layouts/page-header';
import { useParams } from 'next/navigation';

import ReorderableInterviewPlan from './ReorderableInterviewPlan';
export const CandidatePlan = () => {
  const { job } = useParams();
  const job_id = job as string;
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
      <div>
        <ReorderableInterviewPlan jobId={job_id} applicationId={null} />
      </div>
    </Page>
  );
};
