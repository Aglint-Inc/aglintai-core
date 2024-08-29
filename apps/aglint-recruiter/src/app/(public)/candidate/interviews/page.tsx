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

import { Footer } from '@/src/components/CandiatePortal/Layout/Footer';
import Navbar from '@/src/components/CandiatePortal/Layout/Navbar';
import { PageHeader } from '@/src/components/CandiatePortal/Layout/PageHeader';

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
    <Card className='mb-4'>
      <CardContent className='pt-4'>
        <div className='flex justify-between items-center mb-2'>
          <div className='flex items-center'>
            <div className='bg-gray-200 rounded-md p-2 mr-3'>
              <span className='text-xs font-semibold'>
                {interview.date.getDate()}
              </span>
              <span className='text-xs block'>
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
            <Avatar className='w-6 h-6 mr-2'>
              <AvatarImage
                src={`https://ui-avatars.com/api/?name=${participant.name}`}
              />
              <AvatarFallback>{participant.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className='text-sm font-semibold'>{participant.name}</p>
              {participant.role && (
                <p className='text-xs text-gray-500'>{participant.role}</p>
              )}
            </div>
          </div>
        ))}
        <div className='mt-4'>
          <Button variant='outline' className='mr-2 text-xs'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='mr-1'
            >
              <path d='M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z' />
              <polyline points='14 2 14 8 20 8' />
              <line x1='16' y1='13' x2='8' y2='13' />
              <line x1='16' y1='17' x2='8' y2='17' />
              <line x1='10' y1='9' x2='8' y2='9' />
            </svg>
            Open coding link
          </Button>
          <Button variant='outline' className='text-xs'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='mr-1'
            >
              <path d='M15 10l5 5-5 5' />
              <path d='M4 4v7a4 4 0 0 0 4 4h12' />
            </svg>
            Join meeting
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function InterviewsPage() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <PageHeader />
      <div className='container mx-auto max-w-screen-xl flex flex-col lg:flex-row gap-8 p-6'>
        <main className='lg:w-[70%] space-y-6'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-2xl font-bold'>
                Upcoming interviews
              </CardTitle>
              <Button variant='outline'>Make changes</Button>
            </CardHeader>
            <CardContent>
              {upcomingInterviews.map((interview, index) => (
                <InterviewCard key={index} interview={interview} />
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className='text-2xl font-bold'>
                Past interviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              {pastInterviews.map((interview, index) => (
                <InterviewCard key={index} interview={interview} />
              ))}
            </CardContent>
          </Card>
        </main>
        <aside className='lg:w-[30%] space-y-6'>
          {/* You can add additional content or widgets here */}
        </aside>
      </div>
      <Footer />
    </div>
  );
}
