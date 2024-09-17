import { Card, CardContent } from '@components/ui/card';
import { Archive, Ban, Calendar, CheckCircle } from 'lucide-react';
import Link from 'next/link';

import UITypography from '@/components/Common/UITypography';

interface InterviewModuleCardProps {
  textModuleName?: React.ReactNode;
  slotMemberPic?: React.ReactNode;
  textUpcomingSchedules?: React.ReactNode;
  textCompletedSchedules?: React.ReactNode;
  onClickCard?: React.HTMLAttributes<HTMLDivElement>;
  isArchivedIconVisible?: boolean;
  textCancelledSchedules?: React.ReactNode;
  textDepartment?: React.ReactNode;
  navLink?: string;
}

export function InterviewModuleCard({
  textModuleName = '',
  slotMemberPic,
  textUpcomingSchedules = '',
  textCompletedSchedules = '',
  navLink = '#',
  isArchivedIconVisible = false,
  textCancelledSchedules = '',
  textDepartment = '',
}: InterviewModuleCardProps) {
  return (
    <Link href={navLink}>
      <Card className='border-b-1 grid cursor-pointer grid-cols-[1fr_15%_25%_20%] items-center rounded-none border-x-0 border-t-0 transition-all duration-200 hover:bg-neutral-100'>
        <CardContent className='flex items-center space-x-2 p-3'>
          <UITypography type='small' variant='p'>
            {textModuleName}
          </UITypography>
          {isArchivedIconVisible && <Archive />}
        </CardContent>
        <CardContent className='flex items-center p-3'>
          <UITypography type='small' variant='p'>
            {textDepartment}
          </UITypography>
        </CardContent>
        <CardContent className='flex items-center space-x-2 p-3'>
          <div className='flex items-center space-x-1'>
            <Calendar size={14} className='text-blue-600' />
            <UITypography type='small' variant='p'>
              {textUpcomingSchedules}
            </UITypography>
          </div>
          <div className='flex items-center space-x-1'>
            <CheckCircle size={14} className='text-green-600' />
            <UITypography type='small' variant='p'>
              {textCompletedSchedules}
            </UITypography>
          </div>
          <div className='flex items-center space-x-1'>
            <Ban size={14} className='text-red-600' />
            <UITypography type='small' variant='p'>
              {textCancelledSchedules}
            </UITypography>
          </div>
        </CardContent>
        <CardContent className='flex items-center p-3'>
          {slotMemberPic}
        </CardContent>
      </Card>
    </Link>
  );
}
