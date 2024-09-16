import { Checkbox } from '@components/ui/checkbox';
import { cn } from '@lib/utils';
import { Bookmark, Star } from 'lucide-react';

import StageProgress from '@/components/Scheduling/Common/StageProgress';
import { type Application } from '@/types/applications.types';

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
        'flex items-center px-4 py-3 text-sm border-b border-gray-200 hover:bg-gray-50 cursor-pointer w-full',
        isChecked && 'bg-blue-50',
      )}
      onClick={onClickCandidate}
    >
      <div
        className='w-10 flex-shrink-0 mr-4'
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
      <div className='flex-1 w-[200px] flex items-center overflow-hidden mr-4'>
        <div className='mr-2 flex-shrink-0'>
          {application.bookmarked && <Bookmark className='w-4 h-4' />}
          {application.is_new && <Star className='w-4 h-4' />}
        </div>
        <div className='truncate'>
          <div className='font-medium truncate'>{application.name}</div>
          <div className='text-gray-500 truncate'>
            {application.current_job_title || '---'}
          </div>
        </div>
      </div>
      {isResumeMatchVisible && (
        <div className='w-[200px] mr-4'>
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
        <div className='w-[250px] mr-4'>
          <StageProgress interview_plans={application.interview_plans} />
        </div>
      )}
      <div className='w-[250px] truncate mr-4'>
        {application.current_job_title || '---'}
      </div>
      <div className='w-[150px] truncate mr-4'>
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
