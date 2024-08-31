'use client';
import { useState } from 'react';
import TrainingDashboard from '@/src/components/Reports/TrainingDashboard';
import InterviewDashboardSideNav from '@/src/components/Dashboards/Interview/InterviewDashboardSideNav';
import DashboardDataFilter from '@/src/components/Dashboards/Interview/DashboardDataFilter';
import InterviewerLeaderboard from '@/src/components/Dashboards/Interview/InterviewerLeaderboard';
import InterviewCount from '@/src/components/Dashboards/Interview/InterviewCount';
import Checklist from '@/src/components/Dashboards/Interview/Checklist';
import CandidateMetrics from '@/src/components/Dashboards/Interview/CandidateMetrics';

export default function InterviewDashboard() {
  const [activeTab, setActiveTab] = useState('default_tab');

  return (
    <div className="flex">
      <InterviewDashboardSideNav activeTab={activeTab} setActiveTab={(tab) => {
        setActiveTab(tab);
        const url = new URL(window.location.href);
        url.searchParams.set('tab', tab);
        window.history.pushState({}, '', url);
      }} />
      <div className="flex-grow flex flex-col">
        <div className="p-6">
          <DashboardDataFilter />
        </div>
        <div className="flex-grow p-6">
          {activeTab === 'interviewMetrics' && <InterviewCount />}
          {activeTab === 'interviewerLeaderboard' && <InterviewerLeaderboard />}
          {activeTab === 'trainingMetrics' && <TrainingDashboard />}
          {activeTab === 'candidateMetrics' && <CandidateMetrics />}
          {activeTab === 'requestMetrics' && <Checklist />}
          {activeTab === 'jobMetrics' && <Checklist />}
        </div>
      </div>
    </div>
  );
}
