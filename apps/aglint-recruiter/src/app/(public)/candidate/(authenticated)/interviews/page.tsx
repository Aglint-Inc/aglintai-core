'use client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@components/shadcn/ui/avatar';
import { Button } from '@components/shadcn/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@components/shadcn/ui/card';
import { FileText, LogIn, ExternalLink } from 'lucide-react';
import { Linkedin } from 'lucide-react';
import Link from 'next/link';

interface Interview {
  date: Date;
  startTime: string;
  endTime: string;
  timeZone: string;
  platform: string;
  participants: {
    name: string;
    role: string;
  }[];
}

const upcomingInterviews: Interview[] = [
  {
    date: new Date(2023, 3, 13),
    startTime: '9:00am',
    endTime: '9:45am',
    timeZone: 'PT',
    platform: 'Zoom call',
    participants: [
      { name: 'Jim Halpert', role: 'Senior infra software engineer' },
    ],
  },
  {
    date: new Date(2023, 3, 13),
    startTime: '9:00am',
    endTime: '9:45am',
    timeZone: 'PT',
    platform: 'Zoom call',
    participants: [
      { name: 'Jim Halpert', role: 'Senior infra software engineer' },
      { name: 'Jane M.', role: '' },
      { name: 'Lydia Han', role: '' },
    ],
  },
  {
    date: new Date(2023, 3, 14),
    startTime: '9:00am',
    endTime: '9:45am',
    timeZone: 'PT',
    platform: 'Zoom call',
    participants: [
      { name: 'Jim Halpert', role: 'Senior infra software engineer' },
      { name: 'Jane M.', role: '' },
      { name: 'Lydia Han', role: '' },
    ],
  },
];

const pastInterviews: Interview[] = [
  {
    date: new Date(2023, 3, 5),
    startTime: '9:00am',
    endTime: '9:45am',
    timeZone: 'PT',
    platform: 'Zoom call',
    participants: [
      { name: 'Jim Halpert', role: 'Senior infra software engineer' },
    ],
  },
];

function InterviewCard({ interview }: { interview: Interview }) {
  return (
    <Card className='mb-4 bg-background/80 backdrop-blur-sm shadow-sm border border-border'>
      <CardContent className='pt-4'>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex items-center'>
            <div className='bg-primary/10 text-primary rounded-md p-2 mr-3 text-center w-16 h-16 flex flex-col justify-center'>
              <span className='text-lg font-semibold'>
                {interview.date.getDate()}
              </span>
              <span className='text-xs'>
                {interview.date.toLocaleString('default', { month: 'short' })}
              </span>
            </div>
            <div>
              <p className='text-sm font-semibold'>
                {interview.startTime} - {interview.endTime} {interview.timeZone}
              </p>
              <p className='text-xs text-gray-500'>{interview.platform}</p>
            </div>
          </div>
        </div>
        {interview.participants.map((participant, index) => (
          <div key={index} className='flex items-center mb-2'>
            <Avatar className='w-8 h-8 mr-3'>
              <AvatarImage
                src={`https://ui-avatars.com/api/?name=${participant.name}`}
              />
              <AvatarFallback>{participant.name[0]}</AvatarFallback>
            </Avatar>
            <div className='flex-grow'>
              <div className='flex items-center'>
                <p className='text-sm font-semibold'>{participant.name}</p>
                <Linkedin className='w-4 h-4 ml-2 text-blue-500 cursor-pointer' />
              </div>
              {participant.role && (
                <p className='text-xs text-gray-500'>{participant.role}</p>
              )}
            </div>
          </div>
        ))}
        <div className='mt-4 flex space-x-2'>
          <Button variant='link' size="sm" className='text-xs p-0'>
            Open coding link
          </Button>
          <Button variant='link' size="sm" className='text-xs p-0'>
            Join meeting
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function InterviewsPage() {
  return (
    <div className='container mx-auto max-w-screen-xl flex flex-col lg:flex-row gap-8 p-6'>
      <main className='lg:w-[70%] space-y-6'>
        <div>
          <h2 className='text-xl font-bold mb-4'>Upcoming interviews</h2>
          {upcomingInterviews.map((interview, index) => (
            <InterviewCard key={index} interview={interview} />
          ))}
        </div>
        <div>
          <h2 className='text-xl font-bold mb-4'>Past interviews</h2>
          {pastInterviews.map((interview, index) => (
            <InterviewCard key={index} interview={interview} />
          ))}
        </div>
      </main>
      <aside className='lg:w-[30%] space-y-6'>
        {/* You can add additional content or widgets here */}
      </aside>
    </div>
  );
}
