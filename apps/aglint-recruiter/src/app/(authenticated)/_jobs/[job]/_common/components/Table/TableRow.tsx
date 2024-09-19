import { Checkbox } from '@components/ui/checkbox';
import { cn } from '@lib/utils';
import { Bookmark, GripVertical, Star } from 'lucide-react';

import StageProgress from '@/components/Scheduling/Common/StageProgress';
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
  isResumeMatchVisible,
  isInterviewVisible,
  checkEnabled,
  status,
}: TableRowProps) {
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
          <div className='truncate text-gray-500'>
            {application.current_job_title || '---'}
          </div>
        </div>
      </div>
      {isResumeMatchVisible && (
        <div className='mr-4 w-[200px]'>
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
        <div className='mr-4 w-[250px]'>
          <StageProgress
            interview_plans={application.interview_plans}
            currentStep={application.interview_plans.length}
          />
        </div>
      )}
      <div className='mr-4 w-[250px] truncate'>
        {application.current_job_title || '---'}
      </div>
      <div className='mr-4 w-[150px] truncate'>
        {application.city && application.country
          ? `${application.city}, ${application.country}`
          : '---'}
      </div>
      <div className='w-[120px]'>
        {application.applied_at
          ? new Date(application.applied_at).toLocaleDateString()
          : '---'}
      </div>
    </div>
  );
}
