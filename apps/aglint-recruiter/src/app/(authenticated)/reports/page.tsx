import { ScrollArea } from '@components/ui/scroll-area';

import CandidateDropoutFunnelReport from './_common/components/CandidateMetrics';
import Checklist from './_common/components/InterviewerChecklist/Checklist';
import InterviewerLeaderboard from './_common/components/InterviewerLeaderboard';
import InterviewCount from './_common/components/InterviewMetrics';
import JobMetrics from './_common/components/jobMetrics';
import SchedulingReports from './_common/components/scheduling';

const Analytics = ({
  searchParams: { tab: activeTab },
}: {
  searchParams: { tab: string };
}) => {
  return (
    <ScrollArea className='h-[calc(100vh-180px)] px-4'>
      {activeTab === 'interviewMetrics' && <InterviewCount />}
      {activeTab === 'interviewerLeaderboard' && <InterviewerLeaderboard />}
      {activeTab === 'candidateMetrics' && <CandidateDropoutFunnelReport />}
      {activeTab === 'jobMetrics' && <JobMetrics />}
      {activeTab === 'requestMetrics' && <Checklist />}
      {activeTab === 'schedulingReports' && <SchedulingReports />}
    </ScrollArea>
  );
};

export default Analytics;
