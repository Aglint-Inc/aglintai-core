'use client';
import { useSearchParams } from 'next/navigation';

// import InterviewerLeaderboard from 'src/app/(authenticated)/reports/_common/components/InterviewerLeaderboard';
import CandidateDropoutFunnelReport from '@/components/Dashboards/Interview/CandidateMetrics';
import Checklist from '@/components/Dashboards/Interview/InterviewerChecklist/Checklist';
import InterviewCount from '@/components/Dashboards/Interview/InterviewMetrics';

import InterviewerLeaderboard from './_common/components/InterviewerLeaderboard';
import JobMetrics from './_common/components/jobMetrics';

const Analytics = () => {
  const activeTab = useSearchParams().get('tab');

  return (
    <div className='flex flex-col gap-6'>
      {activeTab === 'interviewMetrics' && <InterviewCount />}
      {activeTab === 'interviewerLeaderboard' && <InterviewerLeaderboard />}
      {/* {activeTab === 'trainingMetrics' && <TrainingDashboard />} */}
      {activeTab === 'candidateMetrics' && <CandidateDropoutFunnelReport />}
      {activeTab === 'jobMetrics' && <JobMetrics />}
      {activeTab === 'requestMetrics' && <Checklist />}
    </div>
  );
};

export default Analytics;
