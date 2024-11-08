import { Badge } from '@components/ui/badge';
import { TableCell, TableRow } from '@components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { UIBadge } from '@components/ui-badge';
import {
  ArrowRight,
  BriefcaseBusiness,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react';

import { useDepartments } from '@/authenticated/hooks/useDepartments';
import type { useAllInterviewModulesType } from '@/authenticated/types';
import { UIButton } from '@/components/Common/UIButton';
import { useRouterPro } from '@/hooks/useRouterPro';

export const InterviewPoolList = ({
  interviewType,
}: {
  interviewType: NonNullable<useAllInterviewModulesType>[number];
}) => {
  const { superPush } = useRouterPro();
  const { data: departments } = useDepartments();

  const department = departments.find(
    (dep) => dep.id === interviewType.department_id,
  )?.name;

  return (
    <TableRow
      key={interviewType.id}
      className='cursor-pointer hover:bg-muted/20'
      onClick={() => {
        superPush('/interview-pool/[pool]', {
          params: {
            pool: interviewType.id as string,
          },
        });
      }}
    >
      <TableCell className='font-medium'>{interviewType.name}</TableCell>
      <TableCell>{department}</TableCell>
      <TableCell>
        <div className='flex space-x-2'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <UIBadge
                  variant='success'
                  className='rounded-full'
                  textBadge={
                    interviewType.this_month_completed_meeting_count || 0
                  }
                  icon={CheckCircle}
                />
              </TooltipTrigger>
              <TooltipContent className='border border-border'>
                <p>Completed Interviews (This Month)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <UIBadge
                  variant='info'
                  className='rounded-full'
                  textBadge={
                    interviewType.this_month_confirmed_meeting_count || 0
                  }
                  icon={Calendar}
                />
              </TooltipTrigger>
              <TooltipContent className='border border-border'>
                <p>Scheduled Interviews (This Month)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <UIBadge
                  variant='destructive'
                  className='rounded-full'
                  icon={XCircle}
                  textBadge={
                    interviewType.this_month_cancelled_meeting_count || 0
                  }
                />
              </TooltipTrigger>
              <TooltipContent className='border border-border'>
                <p>Cancelled Interviews (This Month)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </TableCell>
      <TableCell>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <UIBadge
                variant='purple'
                className='felx min-w-[80px] justify-center rounded-full'
                textBadge={interviewType.avg_meeting_duration + ' min'}
                icon={Clock}
              />
            </TooltipTrigger>
            <TooltipContent className='border border-border'>
              <p>Average Interview Duration</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>

      <TableCell>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {(interviewType?.job_names || [])?.length > 0 ? (
                <Badge
                  variant='outline'
                  className='border-border bg-muted text-muted-foreground'
                >
                  <BriefcaseBusiness className='mr-1 h-3 w-3 text-muted-foreground' />{' '}
                  {` - `}
                  {interviewType.job_names
                    ?.slice(0, 2)
                    .map((job) => job)
                    .join(', ')}
                  {(interviewType?.job_names || [])?.length > 2 ? (
                    <span>{` + ${(interviewType?.job_names || [])?.length - 2}`}</span>
                  ) : null}
                </Badge>
              ) : (
                '--'
              )}
            </TooltipTrigger>
            <TooltipContent className='border border-border'>
              <p>Number of Open Positions</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell>
        <UIButton
          variant='ghost'
          size='sm'
          className='text-gray-600 hover:text-gray-900'
        >
          <ArrowRight className='h-4 w-4' />
        </UIButton>
      </TableCell>
    </TableRow>
  );
};
