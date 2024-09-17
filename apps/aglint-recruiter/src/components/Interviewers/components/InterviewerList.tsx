import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Badge } from '@components/ui/badge';
import { TableCell, TableRow } from '@components/ui/table';
import {
  BookOpen,
  Briefcase,
  Clock,
  Clock8,
  GraduationCap,
  Layers,
  MapPin,
} from 'lucide-react';
import { useRouter } from 'next/router';

import UITypography from '@/components/Common/UITypography';

import { type useAllInterviewers } from '../_hook';

export const InterviewerList = ({
  interviewer,
}: {
  interviewer: ReturnType<typeof useAllInterviewers>['data'][number];
}) => {
  const location = [
    interviewer.location?.city,
    interviewer.location?.region,
    interviewer.location?.country,
  ]
    .filter((loc) => loc)
    .join(', ');

  const isQualifed = interviewer.qualified_types?.length !== 0;
  const qualified_first = interviewer.qualified_types?.slice(0, 2);
  const qualified_second = interviewer.qualified_types?.slice(2);

  const router = useRouter();
  return (
    <TableRow
      onClick={() => router.push(`/user/${interviewer.user_id}`)}
      className='cursor-pointer'
    >
      <TableCell>
        <div className='flex items-center space-x-3'>
          <Avatar>
            <AvatarImage src={interviewer.avatar} alt={interviewer.name} />
            <AvatarFallback>
              {interviewer.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className='font-medium'>{interviewer.name}</div>
            <div className='text-sm text-gray-500'>
              {interviewer.role || '-'}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className='flex w-[300px] flex-col gap-1'>
          <div className='m-0 flex items-center gap-2'>
            <BookOpen className='h-4 w-4 text-gray-400' />
            <UITypography variant='p' type='small'>
              {interviewer.department?.name || '-'}
            </UITypography>
          </div>
          <div className='m-0 flex items-center gap-2'>
            <MapPin className='h-4 w-4 text-gray-400' />
            <UITypography variant='p' type='small'>
              {location || '-'}
            </UITypography>
          </div>
          <div className='m-0 flex items-center gap-2'>
            <Clock8 className='h-4 w-4 text-gray-400' />
            <UITypography variant='p' type='small'>
              {interviewer.time_zone?.toString() || '-'}
            </UITypography>
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
        <Badge variant='secondary' className='bg-blue-100 text-blue-800'>
          <Clock className='mr-1 h-3 w-3' />
          {interviewer.completed_count}
        </Badge>
      </TableCell>
      <TableCell>
        <div className='flex items-center space-x-2'>
          <Badge variant='secondary' className='bg-green-100 text-green-800'>
            <Briefcase className='mr-1 h-3 w-3' />
            {interviewer.completed_count}
          </Badge>
        </div>
      </TableCell>

      <TableCell>
        <div className='flex items-center space-x-2'>
          <Badge variant='secondary' className='bg-purple-100 text-purple-800'>
            <GraduationCap className='mr-1 h-3 w-3' />
            {interviewer.training_types?.length}
          </Badge>
        </div>
      </TableCell>
    </TableRow>
  );
};
