'use client';
import { useState } from 'react';

import CandidateMetrics from '@/components/Dashboards/Interview/CandidateMetrics';
import Checklist from '@/components/Dashboards/Interview/Checklist';
import DashboardDataFilter from '@/components/Dashboards/Interview/DashboardDataFilter';
import InterviewCount from '@/components/Dashboards/Interview/InterviewCount';
import InterviewDashboardSideNav from '@/components/Dashboards/Interview/InterviewDashboardSideNav';
import InterviewerLeaderboard from '@/components/Dashboards/Interview/InterviewerLeaderboard';
import JobMetrics from '@/components/Dashboards/Jobs/JobMetrics';
import TrainingDashboard from '@/components/Reports/TrainingDashboard';

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
