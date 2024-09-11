import { Card, CardContent } from '@components/ui/card';
import { Archive, Ban, Calendar, CheckCircle } from 'lucide-react';
import Link from 'next/link';

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
      <Card className='grid grid-cols-[1fr_15%_25%_20%] items-center cursor-pointer hover:bg-neutral-100 transition-all duration-200 rounded-none border-x-0 border-b-1 border-t-0'>
        <CardContent className='flex items-center p-3 space-x-2 '>
          <span>{textModuleName}</span>
          {isArchivedIconVisible && <Archive />}
        </CardContent>
        <CardContent className='flex items-center p-3'>
          <span>{textDepartment}</span>
        </CardContent>
        <CardContent className='flex items-center p-3 space-x-2'>
          <div className='flex items-center space-x-1'>
            <Calendar size={14} className='text-blue-600' />
            <span>{textUpcomingSchedules}</span>
          </div>
          <div className='flex items-center space-x-1'>
            <CheckCircle size={14} className='text-green-600' />
            <span>{textCompletedSchedules}</span>
          </div>
          <div className='flex items-center space-x-1'>
            <Ban size={14} className='text-red-600' />
            <span>{textCancelledSchedules}</span>
          </div>
        </CardContent>
        <CardContent className='flex items-center p-3'>
          {slotMemberPic}
        </CardContent>
      </Card>
    </Link>
  );
}
