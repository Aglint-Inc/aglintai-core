'use client';

import { Button } from '@components/shadcn/ui/button';
import { Card, CardContent } from '@components/shadcn/ui/card';
import {
  Briefcase,
  CalendarClock,
  FileBarChart,
  FileText,
  LayoutDashboard,
  LucideIcon,
  PlusCircle,
  Users,
} from 'lucide-react';

interface EmptyStateProps {
  module:
    | 'jobs'
    | 'interviewPlan'
    | 'applications'
    | 'candidates'
    | 'interviewReports'
    | 'dashboard';
  title: string;
  description?: string; // Made optional
  actionLabel?: string; // Made optional
  onAction?: () => void; // Made optional
}

const moduleIcons: Record<EmptyStateProps['module'], LucideIcon> = {
  jobs: Briefcase,
  interviewPlan: CalendarClock,
  applications: FileText,
  candidates: Users,
  interviewReports: FileBarChart,
  dashboard: LayoutDashboard,
};

export function EmptyState({
  module,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  // eslint-disable-next-line security/detect-object-injection
  const Icon = moduleIcons[module];

  return (
    <Card className='w-full max-w-md mx-auto border-none shadow-none'>
      <CardContent className='pt-6 px-6 pb-8 flex flex-col items-center text-center'>
        <div className='flex items-center justify-center mb-4'>
          <Icon
            className='w-16 h-16 text-primary'
            strokeWidth={0.5}
            size={48}
          />
        </div>
        <h3 className='text-lg font-semibold mb-2'>{title}</h3>
        {description && (
          <p className='text-muted-foreground mb-6'>{description}</p>
        )}{' '}
        {/* Conditionally render description */}
        {actionLabel && onAction && (
          <Button onClick={onAction}>
            <PlusCircle className='mr-2 h-4 w-4' />
            {actionLabel}
          </Button>
        )}{' '}
        {/* Conditionally render button */}
      </CardContent>
    </Card>
  );
}

// Example usage
export function ExampleUsage() {
  const handleAction = () => {};

  return (
    <div className='space-y-8'>
      <EmptyState
        module='jobs'
        title='No jobs found'
        description='Get started by creating a new job posting.'
        actionLabel='Create Job'
        onAction={handleAction}
      />
      <EmptyState
        module='interviewPlan'
        title='No interview plans'
        description='Start by creating an interview plan for your candidates.'
        actionLabel='Create Plan'
        onAction={handleAction}
      />
      <EmptyState
        module='applications'
        title='No applications yet'
        description='Applications for your job postings will appear here.'
        actionLabel='Post a Job'
        onAction={handleAction}
      />
      <EmptyState
        module='candidates'
        title='No candidates'
        description='Start adding candidates to your pipeline.'
        actionLabel='Add Candidate'
        onAction={handleAction}
      />
      <EmptyState
        module='interviewReports'
        title='No interview reports'
        description='Interview reports will be displayed here once created.'
        actionLabel='Create Report'
        onAction={handleAction}
      />
      <EmptyState
        module='dashboard'
        title='Dashboard is empty'
        description='Add widgets to customize your dashboard view.'
        actionLabel='Add Widget'
        onAction={handleAction}
      />
    </div>
  );
}
