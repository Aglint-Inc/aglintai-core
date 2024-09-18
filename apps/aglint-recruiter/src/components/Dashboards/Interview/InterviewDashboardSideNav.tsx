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

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  activeTab: string;
  setActiveTab: any;
  // setActiveTab: (tab: string) => void;
}

export default function Component({ activeTab, setActiveTab }: SidebarProps) {
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
      {navItems.map((item) => (
        <Button
          key={item.value}
          variant={activeTab === item.value ? 'secondary' : 'ghost'}
          onClick={() => setActiveTab(item.value)}
          className={cn(
            'w-full justify-start',
            activeTab === item.value ? 'bg-muted hover:bg-muted' : '',
          )}
        >
          <item.icon className='mr-2 h-4 w-4' />
          {item.title}
        </Button>
      ))}
    </div>
  );
}
