import ReorderableInterviewPlan from '@components/reorderable-interview-plan';

import { useRouterPro } from '@/hooks/useRouterPro';
import { Resume } from '@/jobs/job/application/components/Resume';
import { Details } from '@/jobs/job/application/components/Scoring';

import InterviewTabContent from './InterviewTab';
import TabsComp, { type TabsType } from './TabPills';

function ApplicationDetailComp() {
  const router = useRouterPro();
  const tab = router.queryParams.tab as TabsType;
  const application_id = router.params.application;

  const renderTabContent = () => {
    switch (tab) {
      case 'interview':
        return <InterviewTabContent />;
      case 'resume':
        return <Resume />;
      case 'scoring':
        return <Details />;
      case 'candidate_stages':
        return (
          <ReorderableInterviewPlan
            applicationId={application_id}
            jobId={null}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className='space-y-4 px-4'>
      <TabsComp />
      {renderTabContent()}
    </div>
  );
}

export default ApplicationDetailComp;
