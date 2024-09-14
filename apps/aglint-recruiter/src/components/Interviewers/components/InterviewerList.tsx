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
  return (
    <TableRow
      onClick={() =>
        window.open(`/user/profile/${interviewer.user_id}`, '_target')
      }
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
        <div className='flex flex-col w-[300px] gap-1'>
          <div className='flex items-center m-0 gap-2'>
            <BookOpen className='h-4 w-4 text-gray-400' />
            <UITypography variant='p' type='small'>
              {interviewer.department?.name || '-'}
            </UITypography>
          </div>
          <div className='flex items-center m-0 gap-2'>
            <MapPin className='h-4 w-4 text-gray-400' />
            <UITypography variant='p' type='small'>
              {location || '-'}
            </UITypography>
          </div>
          <div className='flex items-center m-0 gap-2'>
            <Clock8 className='h-4 w-4 text-gray-400' />
            <UITypography variant='p' type='small'>
              {interviewer.time_zone?.toString() || '-'}
            </UITypography>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className='flex gap-2 flex-wrap'>
          {isQualifed ? (
            <>
              {qualified_first.map((qua) => (
                <Badge
                  key={qua.id}
                  variant='outline'
                  className='bg-indigo-50 text-indigo-800 border-indigo-200'
                >
                  <Layers className='h-3 w-3 mr-1' />
                  {qua.name}
                </Badge>
              ))}
              {qualified_second?.length ? (
                <Badge
                  variant='outline'
                  className='bg-indigo-50 text-indigo-800 border-indigo-200'
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
          <Clock className='h-3 w-3 mr-1' />
          {interviewer.completed_count}
        </Badge>
      </TableCell>
      <TableCell>
        <div className='flex items-center space-x-2'>
          <Badge variant='secondary' className='bg-green-100 text-green-800'>
            <Briefcase className='h-3 w-3 mr-1' />
            {interviewer.completed_count}
          </Badge>
        </div>
      </TableCell>

      <TableCell>
        <div className='flex items-center space-x-2'>
          <Badge variant='secondary' className='bg-purple-100 text-purple-800'>
            <GraduationCap className='h-3 w-3 mr-1' />
            {interviewer.training_types?.length}
          </Badge>
        </div>
      </TableCell>
    </TableRow>
  );
};
