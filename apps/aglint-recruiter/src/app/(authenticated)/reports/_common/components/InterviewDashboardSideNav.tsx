'use client';
import UITabs from '@/components/Common/UITabs';
import { useRouterPro } from '@/hooks/useRouterPro';

export default function Component() {
  const { queryParams, setQueryParams } = useRouterPro<{ tab: string }>();
  const navItems = [
    {
      name: 'Interview Metrics',
      icon: 'ChartPie',
      id: 'interviewMetrics',
    },
    {
      name: 'Interviewer Leaderboard',
      icon: 'Trophy',
      id: 'interviewerLeaderboard',
    },

    {
      name: 'Request Metrics',
      icon: 'List',
      id: 'requestMetrics',
    },
    {
      name: 'Job Metrics',
      icon: 'Briefcase',
      id: 'jobMetrics',
    },
    // {
    //   name: 'Training Metrics',
    //   icon: GraduationCap,
    //   id: 'trainingMetrics',
    // },
    // {
    //   name: 'Candidate Metrics',
    //   icon: UserPlus,
    //   id: 'candidateMetrics',
    // },
    // {
    //   name: "Interview Consistency",
    //   icon: ClipboardCheck,
    //   id: "interviewConsistency"
    // },
  ];
  return (
    <div className='space-y-1'>
      <UITabs
        vertical
        tabs={navItems}
        defaultValue={queryParams.tab || navItems[0].id}
        onClick={(value) => setQueryParams({ tab: value })}
      />
    </div>
  );
}
