import Typography from '@components/typography';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Badge } from '@components/ui/badge';
import { TableCell, TableRow } from '@components/ui/table';
import { UIBadge } from '@components/ui-badge';
import {
  BookOpen,
  BriefcaseBusiness,
  Clock,
  Clock8,
  GraduationCap,
  Layers,
  MapPin,
} from 'lucide-react';

import { useRouterPro } from '@/hooks/useRouterPro';

import { type useAllInterviewers } from '../../hooks/useAllInterviewers';

export const InterviewerList = ({
  interviewer,
}: {
  interviewer: NonNullable<
    ReturnType<typeof useAllInterviewers>['data']
  >[number];
}) => {
  const location = [
    interviewer.location?.city,
    interviewer.location?.region,
    interviewer.location?.country,
  ]
    .filter((loc) => loc)
    .join(', ');

  const isQualifed = interviewer.qualified_types?.length !== 0;
  const qualified_first = interviewer.qualified_types
    ?.slice(0, 2)
    .filter((qua) => qua !== null);
  const qualified_second = interviewer.qualified_types
    ?.slice(2)
    .filter((qua) => qua !== null);

  const router = useRouterPro();
  return (
    <TableRow
      onClick={() => router.push(`/user/${interviewer.user_id}`)}
      className='cursor-pointer'
    >
      <TableCell>
        <div className='flex items-center space-x-3'>
          <Avatar>
            <AvatarImage
              src={interviewer.avatar ?? ''}
              alt={interviewer.name}
            />
            <AvatarFallback>
              {interviewer.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className='font-medium'>{interviewer.name}</div>
            <div className='text-sm text-muted-foreground'>
              {interviewer.role || '-'}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className='flex w-[300px] flex-col gap-1'>
          <div className='m-0 flex items-center gap-2'>
            <BookOpen className='h-4 w-4 text-gray-400' />
            <Typography variant='p' type='small'>
              {interviewer.department?.name || '-'}
            </Typography>
          </div>
          <div className='m-0 flex items-center gap-2'>
            <MapPin className='h-4 w-4 text-gray-400' />
            <Typography variant='p' type='small'>
              {location || '-'}
            </Typography>
          </div>
          <div className='m-0 flex items-center gap-2'>
            <Clock8 className='h-4 w-4 text-gray-400' />
            <Typography variant='p' type='small'>
              {interviewer.time_zone?.toString() || '-'}
            </Typography>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className='flex flex-wrap gap-2'>
          {isQualifed ? (
            <>
              {qualified_first.map((qua) => (
                <Badge
                  key={qua.id}
                  variant='outline'
                  className='border-indigo-200 bg-indigo-50 text-indigo-800'
                >
                  <Layers className='mr-1 h-3 w-3' />
                  {qua.name}
                </Badge>
              ))}
              {qualified_second?.length ? (
                <Badge
                  variant='outline'
                  className='border-indigo-200 bg-indigo-50 text-indigo-800'
                >
                  +{qualified_second.length}
                </Badge>
              ) : (
                ''
              )}
            </>
          ) : (
            '-'
          )}
        </div>
      </TableCell>
      <TableCell>
        <UIBadge
          variant='info'
          icon={Clock}
          textBadge={interviewer.completed_count}
        />
      </TableCell>
      <TableCell>
        <div className='flex items-center space-x-2'>
          <UIBadge
            variant='success'
            textBadge={interviewer.completed_count}
            icon={BriefcaseBusiness}
          />
        </div>
      </TableCell>

      <TableCell>
        <div className='flex items-center space-x-2'>
          <UIBadge
            variant='purple'
            icon={GraduationCap}
            textBadge={interviewer.training_types?.length}
          />
        </div>
      </TableCell>
    </TableRow>
  );
};
