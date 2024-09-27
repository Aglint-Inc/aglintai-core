'use client';

import { Button } from '@components/ui/button';
import { Card, CardContent } from '@components/ui/card';
import {
  Briefcase,
  Calendar,
  CalendarClock,
  FileBarChart,
  FileText,
  LayoutDashboard,
  type LucideIcon,
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
    | 'dashboard'
    | 'interviews';

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
  interviews: Calendar,
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
    <Card className='mx-auto w-full max-w-md border-none shadow-none'>
      <CardContent className='flex flex-col items-center px-6 pb-8 pt-6 text-center'>
        <div className='mb-4 flex items-center justify-center'>
          <Icon
            className='h-16 w-16 text-primary'
            strokeWidth={0.5}
            size={48}
          />
        </div>
        <h3 className='mb-2 text-lg font-semibold'>{title}</h3>
        {description && (
          <p className='mb-6 text-muted-foreground'>{description}</p>
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
