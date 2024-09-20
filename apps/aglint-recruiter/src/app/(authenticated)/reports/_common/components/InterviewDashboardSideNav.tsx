import { Button } from '@components/ui/button';
import { cn } from '@lib/utils';
import {
  Briefcase,
  // GraduationCap,
  List,
  PieChart,
  Trophy,
  // UserPlus,
} from 'lucide-react';
import React from 'react';

import { useRouterPro } from '@/hooks/useRouterPro';

export default function Component() {
  const { queryParams, setQueryParams } = useRouterPro<{ tab: string }>();
  const navItems = [
    {
      title: 'Interview Metrics',
      icon: PieChart,
      value: 'interviewMetrics',
    },
    {
      title: 'Interviewer Leaderboard',
      icon: Trophy,
      value: 'interviewerLeaderboard',
    },
    // {
    //   title: 'Training Metrics',
    //   icon: GraduationCap,
    //   value: 'trainingMetrics',
    // },
    // {
    //   title: 'Candidate Metrics',
    //   icon: UserPlus,
    //   value: 'candidateMetrics',
    // },
    {
      title: 'Request Metrics',
      icon: List,
      value: 'requestMetrics',
    },
    {
      title: 'Job Metrics',
      icon: Briefcase,
      value: 'jobMetrics',
    },
    // {
    //   title: "Interview Consistency",
    //   icon: ClipboardCheck,
    //   value: "interviewConsistency"
    // },
  ];
  return (
    <div className='space-y-1'>
      {navItems.map((item) => {
        return (
          <Button
            key={item.value}
            variant={queryParams.tab === item.value ? 'secondary' : 'ghost'}
            onClick={() => setQueryParams({ tab: item.value })}
            className={cn(
              'w-full justify-start',
              queryParams.tab === item.value ? 'bg-muted hover:bg-muted' : '',
            )}
          >
            <item.icon className='mr-2 h-4 w-4' />
            {item.title}
          </Button>
        );
      })}
    </div>
  );
}
