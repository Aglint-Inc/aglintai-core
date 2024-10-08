import { Checkbox } from '@components/ui/checkbox';
import { ScrollArea, ScrollBar } from '@components/ui/scroll-area';
import { cn } from '@lib/utils';
import { Bookmark, GripVertical, Star } from 'lucide-react';

import StageProgress from '@/components/Scheduling/Common/StageProgress';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useApplicationsStore } from '@/job/hooks';
import type { Application } from '@/job/types';

import { ResumeScore } from '../Common/ResumeScoreNew';

interface TableRowProps {
  application: Application;
  isChecked: boolean;
  onCheck: () => void;
  onClickCandidate: () => void;
  isResumeMatchVisible: boolean;
  isInterviewVisible: boolean;
  checkEnabled: boolean;
  status: string;
}

export function TableRow({
  application,
  isChecked,
  onCheck,
  onClickCandidate,
  checkEnabled,
}: TableRowProps) {
  const { isScoringEnabled: isResumeMatchVisible } = useRolesAndPermissions();
  const isInterviewVisible = useApplicationsStore((state) =>
    state.cascadeVisibilites(),
  ).interview;
  const section = useApplicationsStore((state) => state.status);

  const interviewColShow =
    section === 'interview' ||
    section === 'qualified' ||
    section === 'disqualified';

  const currentStage = application.interview_plans
    .sort((a, b) => a.plan_order - b.plan_order)
    .findLastIndex((plan) => plan.status.confirmed > 0);

  return (
    <div
      className={cn(
        'group flex w-full cursor-pointer items-center border-b border-gray-200 px-4 py-3 text-sm hover:bg-gray-50',
        isChecked && 'bg-blue-50',
      )}
      onClick={onClickCandidate}
    >
      <div
        className='mr-2 w-4 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100'
        aria-hidden='true'
      >
        <GripVertical
          className={cn('h-4 w-4 text-gray-400', isChecked && 'opacity-100')}
        />
      </div>
      <div
        className='mr-4 w-10 flex-shrink-0'
        onClick={(e) => {
          e.stopPropagation();
          onCheck();
        }}
      >
        <Checkbox
          checked={isChecked}
          onCheckedChange={onCheck}
          disabled={!checkEnabled}
          className={cn(!checkEnabled && 'opacity-50')}
        />
      </div>
      <div className='mr-4 flex w-[200px] flex-1 items-center overflow-hidden'>
        <div className='mr-2 flex-shrink-0'>
          {application.bookmarked && <Bookmark className='h-4 w-4' />}
          {application.is_new && <Star className='h-4 w-4' />}
        </div>
        <div className='truncate'>
          <div className='truncate font-medium'>{application.name}</div>
          <div className='truncate text-muted-foreground'>
            {application.current_job_title || '---'}
          </div>
        </div>
      </div>

      {isResumeMatchVisible && (
        <div className={cn('mr-4 w-[200px]', !interviewColShow && 'flex-1')}>
          {status === 'draft' ? (
            '---'
          ) : (
            <ResumeScore
              resume_processing_state={application.resume_processing_state}
              resume_score={application.resume_score}
            />
          )}
        </div>
      )}
      {isInterviewVisible && (
        <div className='mr-4 w-[250px] flex-1'>
          <ScrollArea className='w-full'>
            <StageProgress
              interview_plans={application.interview_plans}
              currentStep={currentStage >= 0 ? currentStage : 0}
            />
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </div>
      )}
      <div
        className={cn('mr-4 w-[250px] truncate', !interviewColShow && 'flex-1')}
      >
        {application.current_job_title || '---'}
      </div>
      <div
        className={cn('mr-4 w-[150px] truncate', !interviewColShow && 'flex-1')}
      >
        {application.city && application.country
          ? `${application.city}, ${application.country}`
          : '---'}
      </div>
      <div className={cn('w-[120px]', !interviewColShow && 'flex-1')}>
        {application.applied_at
          ? new Date(application.applied_at).toLocaleDateString()
          : '---'}
      </div>
    </div>
  );
}
