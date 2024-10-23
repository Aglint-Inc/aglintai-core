'use client';
import { ScrollArea } from '@components/ui/scroll-area';
import { useSearchParams } from 'next/navigation';

import CandidateDropoutFunnelReport from './_common/components/CandidateMetrics';
import Checklist from './_common/components/InterviewerChecklist/Checklist';
import InterviewerLeaderboard from './_common/components/InterviewerLeaderboard';
import InterviewCount from './_common/components/InterviewMetrics';
import JobMetrics from './_common/components/jobMetrics';
import SchedulingReports from './_common/components/scheduling';

const Analytics = () => {
  const searchParams = useSearchParams();
  const activeTab = searchParams
    ? searchParams.get('tab') || 'interviewMetrics'
    : 'interviewMetrics';

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
