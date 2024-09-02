'use client';
import { useState } from 'react';

import CandidateMetrics from '@/src/components/Dashboards/Interview/CandidateMetrics';
import Checklist from '@/src/components/Dashboards/Interview/Checklist';
import DashboardDataFilter from '@/src/components/Dashboards/Interview/DashboardDataFilter';
import InterviewCount from '@/src/components/Dashboards/Interview/InterviewCount';
import InterviewDashboardSideNav from '@/src/components/Dashboards/Interview/InterviewDashboardSideNav';
import InterviewerLeaderboard from '@/src/components/Dashboards/Interview/InterviewerLeaderboard';
import JobMetrics from '@/src/components/Dashboards/Jobs/JobMetrics';
import TrainingDashboard from '@/src/components/Reports/TrainingDashboard';

export default function InterviewDashboard() {
  const [activeTab, setActiveTab] = useState('default_tab');

  return (
    <div className='flex'>
      <InterviewDashboardSideNav
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          const url = new URL(window.location.href);
          url.searchParams.set('tab', tab);
          window.history.pushState({}, '', url);
        }}
      />
      <div className='flex-grow flex flex-col'>
        <div className='p-6'>
          <DashboardDataFilter />
        </div>
        <div className='flex-grow p-6'>
          {activeTab === 'interviewMetrics' && <InterviewCount />}
          {activeTab === 'interviewerLeaderboard' && <InterviewerLeaderboard />}
          {activeTab === 'trainingMetrics' && <TrainingDashboard />}
          {activeTab === 'candidateMetrics' && <CandidateMetrics />}
          {activeTab === 'requestMetrics' && <Checklist />}
          {activeTab === 'jobMetrics' && <JobMetrics />}
        </div>
      </div>
    </div>
  );
}
