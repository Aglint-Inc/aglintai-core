import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@components/shadcn/ui/avatar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@components/shadcn/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/shadcn/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/shadcn/ui/tooltip';
import { BarChart, Clock, ThumbsUp, Trophy, Users, Zap } from 'lucide-react';
import { useState } from 'react';

import InterviewersDeclineTable from './InterviewersDeclineTable';
import InterviewersTable from './InterviewersTable';

const leaderboardData = [
  {
    rank: 1,
    name: 'Raimon Simon',
    role: 'Product Designer',
    hours: 84.0,
    interviews: 168,
    avatar: 'https://i.pravatar.cc/150?img=32',
    satisfactionRate: 98,
    hiringRate: 72,
    averageScore: 4.8,
    topSkills: ['UI/UX', 'Product Strategy', 'User Research'],
  },
  {
    rank: 2,
    name: 'Sarah Connor',
    role: 'Location Admin',
    hours: 84.0,
    interviews: 168,
    avatar: 'https://i.pravatar.cc/150?img=47',
    satisfactionRate: 97,
    hiringRate: 68,
    averageScore: 4.7,
    topSkills: [
      'Facility Management',
      'Team Coordination',
      'Process Optimization',
    ],
  },
  {
    rank: 3,
    name: 'Vivek Singh Mongre',
    role: 'Architect',
    hours: 63.0,
    interviews: 126,
    avatar: 'https://i.pravatar.cc/150?img=68',
    satisfactionRate: 95,
    hiringRate: 70,
    averageScore: 4.6,
    topSkills: ['System Design', 'Cloud Architecture', 'Scalability'],
  },
  {
    rank: 4,
    name: 'Dheeraj Kumar',
    role: 'Technical Manager',
    hours: 63.0,
    interviews: 126,
    avatar: 'https://i.pravatar.cc/150?img=33',
    satisfactionRate: 96,
    hiringRate: 65,
    averageScore: 4.5,
    topSkills: ['Team Leadership', 'Project Management', 'Technical Strategy'],
  },
  {
    rank: 5,
    name: 'Ramya',
    role: 'Sde I',
    hours: 63.0,
    interviews: 126,
    avatar: 'https://i.pravatar.cc/150?img=16',
    satisfactionRate: 94,
    hiringRate: 62,
    averageScore: 4.4,
    topSkills: ['Algorithms', 'Data Structures', 'Problem Solving'],
  },
  {
    rank: 6,
    name: 'Dileep B C',
    role: 'Sde 2',
    hours: 52.5,
    interviews: 105,
    avatar: 'https://i.pravatar.cc/150?img=14',
    satisfactionRate: 93,
    hiringRate: 64,
    averageScore: 4.3,
    topSkills: ['System Design', 'Code Review', 'Mentoring'],
  },
];

// const maxHours = Math.max(...leaderboardData.map(interviewer => interviewer.hours))

export default function ComprehensiveInterviewerLeaderboard() {
  const [sortBy, setSortBy] = useState('rank');

  const sortedData = [...leaderboardData].sort((a, b) => {
    if (sortBy === 'rank') return a.rank - b.rank;
    if (sortBy === 'hours') return b.hours - a.hours;
    if (sortBy === 'interviews') return b.interviews - a.interviews;
    if (sortBy === 'satisfactionRate')
      return b.satisfactionRate - a.satisfactionRate;
    if (sortBy === 'hiringRate') return b.hiringRate - a.hiringRate;
    if (sortBy === 'averageScore') return b.averageScore - a.averageScore;
    return 0;
  });

  return (
    <div className='w-full max-w-6xl mx-auto'>
      <Card className='w-full mx-auto border-none'>
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
                  Acceptence Rate
                </SelectItem>
                <SelectItem value='hiringRate'>Decline Rate</SelectItem>
                <SelectItem value='averageScore'>Avg. Score</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className='space-y-6'>
            {sortedData.map((interviewer) => (
              <div
                key={interviewer.rank}
                className='flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 bg-muted p-4 rounded-lg'
              >
                <div className='flex w-[50%] items-center space-x-4'>
                  {/* <div className="flex-shrink-0 w-10 text-2xl font-bold text-muted-foreground">
                    {interviewer.rank}
                  </div> */}
                  <div className='relative'>
                    <Avatar className='h-16 w-16 border-2 border-primary'>
                      <AvatarImage
                        src={interviewer.avatar}
                        alt={interviewer.name}
                        className='rounded-full object-cove rounded-fullr'
                      />
                      <AvatarFallback className='rounded-full'>
                        {interviewer.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className='absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold overflow-hidden'>
                      {interviewer.rank}
                    </div>
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-md font-semibold text-foreground truncate'>
                      {interviewer.name}
                    </p>
                    <p className='text-xs text-muted-foreground truncate'>
                      {interviewer.role}
                    </p>
                    <div className='mt-2 flex flex-wrap gap-1'>
                      {interviewer.topSkills.map((skill, index) => (
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
                          <span className='text-lg font-semibold'>
                            {interviewer.hours.toFixed(1)}
                          </span>
                          <span className='text-xs text-muted-foreground'>
                            Hours
                          </span>
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
                          <span className='text-lg font-semibold'>
                            {interviewer.interviews}
                          </span>
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
                          <span className='text-lg font-semibold'>
                            {interviewer.satisfactionRate}%
                          </span>
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
                          <span className='text-lg font-semibold'>
                            {interviewer.hiringRate}%
                          </span>
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
                          <span className='text-lg font-semibold'>
                            {interviewer.averageScore}
                          </span>
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
            ))}
          </div>
        </CardContent>
      </Card>
      <InterviewersDeclineTable />
      <InterviewersTable />
    </div>
  );
}
