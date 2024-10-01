'use client';
import { useSearchParams } from 'next/navigation';

import CandidateDropoutFunnelReport from './_common/components/CandidateMetrics';
import Checklist from './_common/components/InterviewerChecklist/Checklist';
import InterviewerLeaderboard from './_common/components/InterviewerLeaderboard';
import InterviewCount from './_common/components/InterviewMetrics';
import JobMetrics from './_common/components/jobMetrics';

const Analytics = () => {
  const activeTab = useSearchParams().get('tab');

  return (
    <div className='px-4'>
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
