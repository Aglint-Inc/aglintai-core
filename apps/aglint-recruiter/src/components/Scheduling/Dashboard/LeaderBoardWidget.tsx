import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Skeleton } from '@components/ui/skeleton';
import { LeaderBoard } from '@devlink3/LeaderBoard';
import { LeaderBoardCard } from '@devlink3/LeaderBoardCard';
import { LeaderBoardLoader } from '@devlink3/LeaderBoardLoader';
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
    <LeaderBoard
      slotDropdownButton={<SchedulingDropdown type={type} setType={setType} />}
      slotLeaderboardCard={<LeaderBoardWidgetRows type={type} />}
    />
  );
};

type LeaderBoardWidgetRowsProps = {
  type: Parameters<typeof useInterviewLeaderboard>[0];
};

const LeaderBoardWidgetRows = ({ type }: LeaderBoardWidgetRowsProps) => {
  const { data, status } = useInterviewLeaderboard(type);

  if (status === 'pending')
    return [...new Array(Math.trunc(Math.random() * 9) + 1)].map((_, i) => (
      <LeaderBoardLoader
        key={i}
        slotSkeleton={<Skeleton className='h-full w-full' />}
      />
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
          <Link href={`/user/profile/${item.user_id}`}>
            <LeaderBoardCard
              textCountNo={index + 1}
              textName={
                <Link href={`/user/profile/${item.user_id}`}>
                  {capitalizeAll(getFullName(item.first_name, item.last_name))}
                </Link>
              }
              textRole={item.user_position}
              slotImage={
                <Avatar>
                  <AvatarImage
                    src={item.profile_image}
                    alt={getFullName(item.first_name, item.last_name)}
                  />
                  <AvatarFallback>
                    {(item.first_name?.[0] || '') + (item.last_name?.[0] || '')}
                  </AvatarFallback>
                </Avatar>
              }
              noInterview={item.interviews}
              noHours={(item.duration / 60).toFixed(1)}
            />
          </Link>
        </div>
      ))}
    </>
  );
};
