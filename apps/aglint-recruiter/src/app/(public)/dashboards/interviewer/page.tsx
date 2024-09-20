'use client';
import { useState } from 'react';

import CandidateMetrics from '@/components/Dashboards/Interview/CandidateMetrics';
import Checklist from '@/components/Dashboards/Interview/Checklist';
import DashboardDataFilter from '@/components/Dashboards/Interview/DashboardDataFilter';
// import InterviewDashboardSideNav from '@/components/Dashboards/Interview/InterviewDashboardSideNav';
import InterviewerLeaderboard from '@/components/Dashboards/Interview/InterviewerLeaderboard';
import InterviewCount from '@/components/Dashboards/Interview/InterviewMetrics';
import JobMetrics from '@/components/Dashboards/Jobs/JobMetrics';
import TrainingDashboard from '@/components/Reports/TrainingDashboard';

export default function InterviewDashboard() {
  const [activeTab, setActiveTab] = useState('default_tab');
  setActiveTab;

  return (
    <div className='flex'>
      <div className='mr-6 w-4/12'>
        {/* <InterviewDashboardSideNav
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            const url = new URL(window.location.href);
            url.searchParams.set('tab', tab);
            window.history.pushState({}, '', url);
          }}
        /> */}
      </div>
      <div className='flex w-8/12 flex-col'>
        <div className='p-6'>
          <DashboardDataFilter />
        </div>
        <div className='flex-grow py-6'>
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
