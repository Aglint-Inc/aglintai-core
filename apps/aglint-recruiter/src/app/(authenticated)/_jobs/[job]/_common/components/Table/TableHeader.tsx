import { cn } from '@lib/utils';
import { useSearchParams } from 'next/navigation';

interface TableHeaderProps {
  isAllChecked: boolean;
  onSelectAll: () => void;
  isResumeMatchVisible: boolean;
  isInterviewVisible: boolean;
}

export function TableHeader({
  isResumeMatchVisible,
  isInterviewVisible,
}: TableHeaderProps) {
  const searchParams = useSearchParams();
  const section = searchParams.get('section');

  const interviewColShow =
    section === 'interview' ||
    section === 'qualified' ||
    section === 'disqualified';

  return (
    <div className='flex w-full items-center bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700'>
      <div className='mr-4 w-[70px] flex-shrink-0'></div>
      <div className='mr-4 w-[200px] flex-1'>Candidate</div>
      {isResumeMatchVisible && (
        <div className={cn('mr-4 w-[200px]', !interviewColShow && 'flex-1')}>
          Resume Match
        </div>
      )}
      {isInterviewVisible && (
        <div className='mr-4 w-[250px] flex-1'>Interview</div>
      )}
      <div
        className={cn('mr-4 w-[250px] truncate', !interviewColShow && 'flex-1')}
      >
        Current Job Title
      </div>
      <div
        className={cn('mr-4 w-[150px] truncate', !interviewColShow && 'flex-1')}
      >
        Location
      </div>
      <div className={cn('w-[120px]', !interviewColShow && 'flex-1')}>
        Applied Date
      </div>
    </div>
  );
}
