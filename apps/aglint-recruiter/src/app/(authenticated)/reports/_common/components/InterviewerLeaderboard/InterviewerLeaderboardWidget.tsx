import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { Skeleton } from '@components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { BarChart, Clock, ThumbsUp, Users, Zap } from 'lucide-react';
import { useState } from 'react';
import { useMemberList } from 'src/app/_common/hooks/useMemberList';
import { useInterviewerLeaderboard } from 'src/app/(authenticated)/reports/_common/hook/interview/interviewerMatrix.hook';

import UISectionCard from '@/components/Common/UISectionCard';

export default function InterviewerLeaderboardWidget() {
  const { data, isFetching } = useInterviewerLeaderboard();
  const { data: members, isFetching: isFetchingMem } = useMemberList();
  const [sortBy, setSortBy] = useState('rank');
  const sortedData = data.sort((a, b) => {
    if (sortBy === 'rank') return b.rank - b.rank;
    if (sortBy === 'hours') return b.total_hours - a.total_hours;
    if (sortBy === 'interviews') return b.interviews - a.interviews;
    if (sortBy === 'satisfactionRate') return b.accepted - a.accepted;
    if (sortBy === 'declineRate') return b.rejected - a.rejected;
    if (sortBy === 'averageScore') return b.feedback - a.feedback;
    return 0;
  });
  return (
    <>
      <UISectionCard
        title={'Interviewer Leaderboard'}
        emptyStateMessage={
          !sortedData?.length ? (
            <div className='flex h-[100px] items-center justify-center text-muted-foreground'>
              No data available
            </div>
          ) : (
            ''
          )
        }
        isLoading={isFetchingMem || isFetching}
        isHoverEffect={false}
        action={
          <div className='flex items-center space-x-2'>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className='w-[140px]'>
                <SelectValue placeholder='Sort by' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='rank'>Rank</SelectItem>
                <SelectItem value='hours'>Hours</SelectItem>
                <SelectItem value='interviews'>Interviews</SelectItem>
                <SelectItem value='satisfactionRate'>
                  Acceptance Rate
                </SelectItem>
                <SelectItem value='declineRate'>Decline Rate</SelectItem>
                <SelectItem value='averageScore'>Avg. Score</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
      >
        <div className='space-y-6'>
          {sortedData.map((interviewer) => {
            const tempMem =
              (members || []).find(
                (member) => member.user_id === interviewer.user_id,
              ) || ({} as (typeof members)[number]);
            const mem = {
              ...tempMem,
              topSkills: [],
              name: `${tempMem.first_name || ''} ${tempMem.last_name || ''}`.trim(),
            };
            const accept_per =
              (interviewer.accepted / interviewer.interviews) * 100;
            const reject_per =
              (interviewer.rejected / interviewer.interviews) * 100;
            return (
              <InterviewerLeaderboardItem
                key={interviewer.user_id}
                rank={interviewer.rank}
                name={mem.name}
                profileImage={mem.profile_image}
                role={mem.role}
                topSkills={mem.topSkills}
                totalHours={interviewer.total_hours?.toFixed(1)}
                interviews={interviewer.interviews}
                acceptenceRate={accept_per}
                declineRate={reject_per}
                averageScore={interviewer.feedback}
              />
            );
          })}
        </div>
      </UISectionCard>
    </>
  );
}

function InterviewerLeaderboardItem({
  rank,
  name,
  profileImage,
  role,
  topSkills,
  totalHours,
  interviews,
  acceptenceRate,
  declineRate,
  averageScore,
  isLoading = false,
}: {
  rank: number;
  name: string;
  profileImage: string;
  role: string;
  topSkills: string[];
  totalHours: string;
  interviews: number;
  acceptenceRate: number;
  declineRate: number;
  averageScore: number;
  isLoading?: boolean;
}) {
  return (
    <div className='flex flex-col items-start space-y-4 rounded-lg bg-muted p-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0'>
      <div className='flex w-[50%] items-center space-x-4'>
        <div className='relative'>
          {isLoading ? (
            <Skeleton className='h-16 w-16 rounded-full bg-primary/10' />
          ) : (
            <Avatar className='h-16 w-16 border-2 border-primary'>
              <AvatarImage
                src={profileImage}
                alt={name}
                className='rounded-full object-cover'
              />
              <AvatarFallback className='rounded-full'>
                {name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
          )}
          {isLoading ? null : (
            <div className='absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-primary text-xs font-bold text-primary-foreground'>
              {rank}
            </div>
          )}
        </div>
        <div className='min-w-0 flex-1'>
          <p className='text-md truncate font-semibold text-foreground'>
            {isLoading ? <Skeleton className='h-5 w-20 bg-primary/10' /> : name}
          </p>
          <p className='truncate text-xs text-muted-foreground'>
            {isLoading ? (
              <Skeleton className='ml-1 mt-1 h-3 w-14 bg-primary/10' />
            ) : (
              role
            )}
          </p>
          <div className='mt-2 flex flex-wrap gap-1'>
            {isLoading
              ? [...new Array(5)].map((_, i) => (
                  <Skeleton
                    key={i}
                    className='h-4 w-6 rounded-full bg-primary/10 px-2 py-1 text-xs'
                  />
                ))
              : topSkills.map((skill, index) => (
                  <span
                    key={index}
                    className='rounded-full bg-primary/10 px-2 py-1 text-xs text-primary'
                  >
                    {skill}
                  </span>
                ))}
          </div>
        </div>
      </div>
      <div className='grid w-full flex-1 grid-cols-4 gap-4 sm:grid-cols-5'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className='flex flex-col items-center rounded-md bg-background p-2'>
                <Clock className='mb-1 h-5 w-5 text-muted-foreground' />
                {isLoading ? (
                  <Skeleton className='h-5 w-6 bg-primary/10' />
                ) : (
                  <span className='text-lg font-semibold'>{totalHours}</span>
                )}
                <span className='text-xs text-muted-foreground'>Hours</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Total interview hours</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className='flex flex-col items-center rounded-md bg-background p-2'>
                <Users className='mb-1 h-5 w-5 text-muted-foreground' />
                {isLoading ? (
                  <Skeleton className='h-5 w-6 bg-primary/10' />
                ) : (
                  <span className='text-lg font-semibold'>{interviews}</span>
                )}
                <span className='text-xs text-muted-foreground'>
                  Interviews
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Total interviews conducted</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className='flex flex-col items-center rounded-md bg-background p-2'>
                <ThumbsUp className='mb-1 h-5 w-5 text-muted-foreground' />
                {isLoading ? (
                  <Skeleton className='h-5 w-6 bg-primary/10' />
                ) : (
                  <span className='text-lg font-semibold'>
                    {acceptenceRate}%
                  </span>
                )}
                <span className='text-xs text-muted-foreground'>
                  Accepence Rate
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Candidate satisfaction rate</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className='flex flex-col items-center rounded-md bg-background p-2'>
                <Zap className='mb-1 h-5 w-5 text-muted-foreground' />
                {isLoading ? (
                  <Skeleton className='h-5 w-6 bg-primary/10' />
                ) : (
                  <span className='text-lg font-semibold'>{declineRate}%</span>
                )}
                <span className='text-xs text-muted-foreground'>
                  Decline Rate
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Percentage of interviewed candidates hired</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className='flex flex-col items-center rounded-md bg-background p-2'>
                <BarChart className='mb-1 h-5 w-5 text-muted-foreground' />
                {isLoading ? (
                  <Skeleton className='h-5 w-6 bg-primary/10' />
                ) : (
                  <span className='text-lg font-semibold'>{averageScore}</span>
                )}
                <span className='text-xs text-muted-foreground'>
                  Avg. Response
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Average interview score given</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
