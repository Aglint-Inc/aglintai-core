import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
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
import { BarChart, Clock, ThumbsUp, Trophy, Users, Zap } from 'lucide-react';
import { useState } from 'react';
import { useMemberList } from 'src/app/_common/hooks/members';
import { useInterviewerLeaderboard } from 'src/app/(authenticated)/analytics/_common/hook/interview/interviewerMatrix.hook';

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
      <Card className='w-full mx-auto'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-md font-semibold flex items-center text-primary'>
            <Trophy className='mr-2 h-4 w-4' />
            Interviewer Leaderboard
          </CardTitle>
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
        </CardHeader>
        <CardContent>
          <div className='space-y-6'>
            {!(isFetching && isFetchingMem) ? (
              sortedData.length ? (
                sortedData.map((interviewer) => {
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
                })
              ) : (
                <>Empty @Ravi</>
              )
            ) : (
              [...new Array(3)].map((_, i) => (
                <InterviewerLeaderboardItem
                  key={i}
                  isLoading
                  rank={0}
                  name={''}
                  profileImage={''}
                  // eslint-disable-next-line jsx-a11y/aria-role
                  role={''}
                  topSkills={[]}
                  totalHours={''}
                  interviews={0}
                  acceptenceRate={0}
                  declineRate={0}
                  averageScore={0}
                />
              ))
            )}
          </div>
        </CardContent>
      </Card>
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
    <div className='flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 bg-muted p-4 rounded-lg'>
      <div className='flex w-[50%] items-center space-x-4'>
        <div className='relative'>
          {isLoading ? (
            <Skeleton className='h-16 w-16  bg-primary/10 rounded-full' />
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
            <div className='absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold overflow-hidden'>
              {rank}
            </div>
          )}
        </div>
        <div className='flex-1 min-w-0'>
          <p className='text-md font-semibold text-foreground truncate'>
            {isLoading ? (
              <Skeleton className='h-5 w-20  bg-primary/10' />
            ) : (
              name
            )}
          </p>
          <p className='text-xs text-muted-foreground truncate'>
            {isLoading ? (
              <Skeleton className='h-3 w-14 ml-1 mt-1 bg-primary/10' />
            ) : (
              role
            )}
          </p>
          <div className='mt-2 flex flex-wrap gap-1'>
            {isLoading
              ? [...new Array(5)].map((_, i) => (
                  <Skeleton
                    key={i}
                    className='text-xs bg-primary/10 px-2 py-1 h-4 w-6 rounded-full'
                  />
                ))
              : topSkills.map((skill, index) => (
                  <span
                    key={index}
                    className='text-xs bg-primary/10 text-primary px-2 py-1 rounded-full'
                  >
                    {skill}
                  </span>
                ))}
          </div>
        </div>
      </div>
      <div className='flex-1 grid grid-cols-4 sm:grid-cols-5 gap-4 w-full'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className='flex flex-col items-center p-2 bg-background rounded-md'>
                <Clock className='h-5 w-5 text-muted-foreground mb-1' />
                {isLoading ? (
                  <Skeleton className='h-5 w-6  bg-primary/10' />
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
              <div className='flex flex-col items-center p-2 bg-background rounded-md'>
                <Users className='h-5 w-5 text-muted-foreground mb-1' />
                {isLoading ? (
                  <Skeleton className='h-5 w-6  bg-primary/10' />
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
              <div className='flex flex-col items-center p-2 bg-background rounded-md'>
                <ThumbsUp className='h-5 w-5 text-muted-foreground mb-1' />
                {isLoading ? (
                  <Skeleton className='h-5 w-6  bg-primary/10' />
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
              <div className='flex flex-col items-center p-2 bg-background rounded-md'>
                <Zap className='h-5 w-5 text-muted-foreground mb-1' />
                {isLoading ? (
                  <Skeleton className='h-5 w-6  bg-primary/10' />
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
              <div className='flex flex-col items-center p-2 bg-background rounded-md'>
                <BarChart className='h-5 w-5 text-muted-foreground mb-1' />
                {isLoading ? (
                  <Skeleton className='h-5 w-6  bg-primary/10' />
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
