/* eslint-disable security/detect-object-injection */
import { Badge } from '@components/ui/badge';
import { Skeleton } from '@components/ui/skeleton';
import {
  Anchor,
  Award,
  BookOpen,
  Briefcase,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { type ReactNode } from 'react';

import { useApplication } from '@/context/ApplicationContext';
import type { ApplicationsParams } from '@/job/hooks/useApplicationParams';
import { BADGE_CONSTANTS } from '@/queries/job-applications';

export const Badges = () => {
  return (
    <div className='flex flex-row gap-2'>
      <Content />
    </div>
  );
};

const Content = () => {
  const {
    meta: { data, status },
  } = useApplication();
  if (status === 'pending')
    return (
      <div className='flex gap-2'>
        {[...Array(10)].map((_, index) => (
          <Skeleton key={index} className='h-5 w-16' />
        ))}
      </div>
    );
  return Object.entries(data?.badges ?? {}).reduce((acc, [key, value]) => {
    if (value > BADGE_CONSTANTS[key]) acc.push(BADGE_ICONS[key]);
    return acc;
  }, [] as ReactNode[]);
};

const BadgeDev = ({ icon, text }: { icon: ReactNode; text: string }) => (
  <Badge variant='secondary' className='flex items-center gap-1'>
    {icon}
    <span className='text-xs'>{text}</span>
  </Badge>
);

const Leader = () => (
  <BadgeDev icon={<Award className='h-4 w-4' />} text='Leader' />
);

const Ambitious = () => (
  <BadgeDev icon={<TrendingUp className='h-4 w-4' />} text='Ambitious' />
);

const Reliable = () => (
  <BadgeDev icon={<Anchor className='h-4 w-4' />} text='Reliable' />
);

const JobHopper = () => (
  <BadgeDev icon={<Briefcase className='h-4 w-4' />} text='Job Hopper' />
);

const Skilled = () => (
  <BadgeDev icon={<Zap className='h-4 w-4' />} text='Skilled' />
);

const Experienced = () => (
  <BadgeDev icon={<Briefcase className='h-4 w-4' />} text='Experienced' />
);

const Knowledgeable = () => (
  <BadgeDev icon={<BookOpen className='h-4 w-4' />} text='Knowledgeable' />
);

export const BADGE_ICONS: {
  // eslint-disable-next-line no-unused-vars
  [_id in ApplicationsParams['filters']['badges'][number]]: ReactNode;
} = {
  careerGrowth: <Ambitious />,
  jobStability: <Reliable />,
  leadership: <Leader />,
  jobHopping: <JobHopper />,
  positions: <Experienced />,
  schools: <Knowledgeable />,
  skills: <Skilled />,
};
