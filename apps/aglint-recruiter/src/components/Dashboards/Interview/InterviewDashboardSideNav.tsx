import {
  Briefcase,
  GraduationCap,
  List,
  PieChart,
  Trophy,
  UserPlus,
} from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

import { cn } from '../../../utils/shadcn';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  activeTab: string;
  setActiveTab: any;
  // setActiveTab: (tab: string) => void;
}

export default function Component({
  className,
  activeTab,
  setActiveTab,
}: SidebarProps) {
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
    {
      title: 'Training Metrics',
      icon: GraduationCap,
      value: 'trainingMetrics',
    },
    {
      title: 'Candidate Metrics',
      icon: UserPlus,
      value: 'candidateMetrics',
    },
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
    <div className={cn('pb-12 w-64', className)}>
      <div className='space-y-4 py-4'>
        <div className='px-3 py-2'>
          <div className='space-y-1'>
            <ScrollArea className='h-[calc(100vh-8rem)] px-2'>
              {navItems.map((item) => (
                <Button
                  key={item.value}
                  variant={activeTab === item.value ? 'secondary' : 'ghost'}
                  size='sm'
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
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
