'use client';
import { useSearchParams } from 'next/navigation';

import Checklist from '@/components/Dashboards/Interview/InterviewerChecklist/Checklist';
import InterviewCount from '@/components/Dashboards/Interview/InterviewMetrics';
import TrainingDashboard from '@/components/Dashboards/InterviewerLeaderboard';

const Analytics = () => {
  const activeTab = useSearchParams().get('tab');

  return (
    <div className='flex-grow p-6'>
      {activeTab === 'interviewMetrics' && <InterviewCount />}
      {activeTab === 'trainingMetrics' && <TrainingDashboard />}
      {/* {activeTab === 'interviewerLeaderboard' && <InterviewerLeaderboard />}
      {activeTab === 'candidateMetrics' && <CandidateMetrics />}
      {activeTab === 'jobMetrics' && <JobMetrics />} */}
      {activeTab === 'requestMetrics' && <Checklist />}
    </div>
  );
};

export default Analytics;
