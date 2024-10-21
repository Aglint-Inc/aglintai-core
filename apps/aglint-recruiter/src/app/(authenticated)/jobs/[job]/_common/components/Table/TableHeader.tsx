import { cn } from '@lib/utils';

import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useApplicationsStore } from '@/job/hooks';

export function TableHeader() {
  const { isScoringEnabled: isResumeMatchVisible } = useRolesAndPermissions();
  const isInterviewVisible = useApplicationsStore((state) =>
    state.cascadeVisibilites(),
  ).interview;
  const section = useApplicationsStore((state) => state.status);

  const interviewColShow =
    section === 'interview' ||
    section === 'qualified' ||
    section === 'disqualified';

  return (
    <div className='flex w-full items-center bg-muted px-4 py-3 text-sm font-medium text-muted-foreground'>
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
