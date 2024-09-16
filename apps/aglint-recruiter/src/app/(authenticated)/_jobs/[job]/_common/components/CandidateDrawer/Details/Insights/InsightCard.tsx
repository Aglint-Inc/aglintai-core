import { Button } from '@components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

import { useApplication } from '@/context/ApplicationContext';
import type { ApplicationDetails } from '@/context/ApplicationContext/type';
import { capitalizeAll } from '@/utils/text/textUtils';

export function InsightCard() {
  const {
    details: { data, status },
  } = useApplication();

  if (
    status === 'pending' ||
    !data?.score_json?.scores ||
    !data?.score_json?.reasoning
  ) {
    return null; // or return a loading state
  }
  const shortcuts = [
    { key: '←/→', description: 'Navigate candidates' },
    { key: 'I', description: 'Move to Interview' },
    { key: 'Q', description: 'Mark as Qualified' },
    { key: 'D', description: 'Mark as Disqualified' },
  ];
  const { scores, reasoning } = data.score_json;
  const candidateData = {
    name: data.name || 'Candidate Name',
    avatar: data.avatar || '/placeholder.svg?height=40&width=40',
    overview: data.overview || 'Candidate overview not available.',
    experience: data.experience || [],
    education: data.education || [],
    skills: data.skills || [],
    scores: {
      experience: Math.round(scores.experience * 100),
      education: Math.round(scores.education * 100),
      skills: Math.round(scores.skills * 100),
    },
  };

  const scoreData = [
    {
      name: 'Experience',
      value: candidateData.scores.experience,
      color: '#F59E0B',
    },
    {
      name: 'Education',
      value: candidateData.scores.education,
      color: '#3B82F6',
    },
    { name: 'Skills', value: candidateData.scores.skills, color: '#10B981' },
  ];

  return (
    <div className='w-full'>
      <Card>
        <CardHeader className='flex flex-row items-center gap-4'>
          <div className='flex flex-col  w-full  gap-2'>
            <div className='flex flex-row w-full justify-between items-center gap-2'>
              <CardTitle className='text-lg'>Aglint AI Score</CardTitle>
              <div className='flex gap-2'>
                <div className='flex space-x-2'>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size='sm' variant='outline'>
                        <ChevronLeft className='h-4 w-4' />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{/* {data.name} (Score: {data.score}) */}</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size='sm' variant='outline'>
                        <ChevronRight className='h-4 w-4' />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{/* {data.name} (Score: {data.score}) */}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='outline' size='sm'>
                      <MoreVertical className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem>Move to Interview</DropdownMenuItem>
                    <DropdownMenuItem>Mark as Qualified</DropdownMenuItem>
                    <DropdownMenuItem>Mark as Disqualified</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <CardDescription className='text-sm'>
              {candidateData.overview}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className='flex justify-between items-center mb-4'>
            <div className='w-1/2'>
              <ResponsiveContainer width='100%' height={100}>
                <PieChart>
                  <Pie
                    data={scoreData}
                    dataKey='value'
                    nameKey='name'
                    cx='50%'
                    cy='50%'
                    outerRadius={40}
                    innerRadius={25}
                    startAngle={90}
                    endAngle={-270}
                  >
                    {scoreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className='w-1/2 text-sm'>
              {scoreData.map((entry, index) => (
                <div key={index} className='flex items-center mb-1'>
                  <div
                    className='w-3 h-3 mr-2'
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span>
                    {entry.name}: {entry.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className='space-y-4 text-sm'>
            <div>
              <h3 className='font-semibold mb-2'>Experience</h3>
              {candidateData.experience.map((exp, index) => (
                <div key={index} className='flex items-center mb-1'>
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    className='w-5 h-5 mr-2'
                  />
                  <span>
                    {exp.role} at {exp.company}, {exp.duration}
                  </span>
                </div>
              ))}
            </div>
            <div>
              <h3 className='font-semibold mb-2'>Education</h3>
              {candidateData.education.map((edu, index) => (
                <div key={index} className='flex items-center mb-1'>
                  <img
                    src={edu.logo}
                    alt={edu.school}
                    className='w-5 h-5 mr-2'
                  />
                  <span>
                    {edu.degree} from {edu.school}, {edu.year}
                  </span>
                </div>
              ))}
            </div>
            <div>
              <h3 className='font-semibold mb-2'>Skills</h3>
              <div className='flex flex-wrap gap-2'>
                {candidateData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className='bg-gray-200 px-2 py-1 rounded-full text-xs'
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <Button className='w-full mt-4' variant='outline'>
            View Full Insights
            <ChevronRight className='ml-2 h-4 w-4' />
          </Button>

          <div className='space-y-4 mt-6'>
            <h3 className='font-semibold text-sm'>Keyboard Shortcuts</h3>
            <div className='grid grid-cols-2 gap-4'>
              {shortcuts.map((shortcut, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>
                    {shortcut.description}
                  </span>
                  <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
