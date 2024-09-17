import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Card } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import { BarChart2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { useInterviewLeaderboard } from '@/queries/scheduling-dashboard';
import { getFullName } from '@/utils/jsonResume';
import { capitalizeAll } from '@/utils/text/textUtils';

import SchedulingDropdown from './SchedulingDropdown';

const LeaderBoardWidget = () => {
  const [type, setType] = useState<LeaderBoardWidgetRowsProps['type']>('month');
  return (
    <div className='rounded-lg bg-white p-4 shadow-md'>
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='text-lg font-semibold'>Leaderboard</h3>
        <SchedulingDropdown type={type} setType={setType} />
      </div>
      <div className='space-y-4'>
        <LeaderBoardWidgetRows type={type} />
      </div>
    </div>
  );
};

type LeaderBoardWidgetRowsProps = {
  type: Parameters<typeof useInterviewLeaderboard>[0];
};

const LeaderBoardWidgetRows = ({ type }: LeaderBoardWidgetRowsProps) => {
  const { data, status } = useInterviewLeaderboard(type);

  if (status === 'pending')
    return [...new Array(Math.trunc(Math.random() * 9) + 1)].map((_, i) => (
      <Skeleton key={i} className='h-full w-full' />
    ));

  if (!(!!data && !!Array.isArray(data) && data.length !== 0))
    return (
      <div className='h-[296px]'>
        <div className='flex h-full flex-col items-center justify-center'>
          <BarChart2 className='h-12 w-12 text-gray-400' />
          <p className='mt-2 text-sm text-gray-500'>No data available</p>
        </div>
      </div>
    );

  return <LeaderBoardWidgetComponent interviewLeaderboard={data} />;
};

export default LeaderBoardWidget;

type InterviewLeaderboardProps = {
  interviewLeaderboard: ReturnType<typeof useInterviewLeaderboard>['data'];
};
const LeaderBoardWidgetComponent = ({
  interviewLeaderboard,
}: InterviewLeaderboardProps) => {
  const router = useRouter();
  return (
    <>
      {interviewLeaderboard.map((item, index) => (
        <div
          key={item.user_id}
          onClick={() => {
            router.push(`scheduling/interviewer/${item.user_id}?tab=overview`);
          }}
          className='cursor-pointer rounded-md'
        >
          <Link href={`/user/${item.user_id}`}>
            <Card className='p-4 transition-colors duration-200 hover:bg-neutral-100'>
              <div className='flex items-center space-x-4'>
                <Avatar>
                  <AvatarImage
                    src={item.profile_image}
                    alt={getFullName(item.first_name, item.last_name)}
                  />
                  <AvatarFallback>
                    {(item.first_name?.[0] || '') + (item.last_name?.[0] || '')}
                  </AvatarFallback>
                </Avatar>
                <div className='flex-grow'>
                  <Link
                    href={`/user/${item.user_id}`}
                    className='text-sm font-medium hover:underline'
                  >
                    {capitalizeAll(
                      getFullName(item.first_name, item.last_name),
                    )}
                  </Link>
                  <p className='text-xs text-gray-500'>{item.user_position}</p>
                </div>
                <div className='text-right'>
                  <p className='text-sm font-medium'>
                    {item.interviews} interviews
                  </p>
                  <p className='text-xs text-gray-500'>
                    {(item.duration / 60).toFixed(1)} hours
                  </p>
                </div>
                <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-200'>
                  <span className='text-sm font-medium'>{index + 1}</span>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      ))}
    </>
  );
};
