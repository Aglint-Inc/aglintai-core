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

import { useApplication } from '@/context/ApplicationContext';

export const Badges = () => {
  return (
    <div className='flex flex-wrap gap-2'>
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

  if (!data?.badges) return null;

  const badges = getAllBadges(data.badges);

  return badges.length > 0 ? (
    badges.map((badge, index) => (
      <Badge
        key={index}
        variant='secondary'
        className='flex items-center gap-1'
      >
        {badge.icon}
        <span className='text-xs'>{badge.text}</span>
      </Badge>
    ))
  ) : (
    <p className='text-sm text-gray-600'>No badges found</p>
  );
};

// Helper function to get all badges
const getAllBadges = (badgesData) => {
  const BADGE_CONSTANTS = {
    careerGrowth: 5,
    jobStability: 5,
    leadership: 5,
    jobHopping: 5,
    positions: 5,
    schools: 5,
    skills: 5,
  };

  const badgeIcons = {
    careerGrowth: {
      icon: <TrendingUp className='h-4 w-4' />,
      text: 'Ambitious',
    },
    jobStability: { icon: <Anchor className='h-4 w-4' />, text: 'Reliable' },
    leadership: { icon: <Award className='h-4 w-4' />, text: 'Leader' },
    jobHopping: { icon: <Briefcase className='h-4 w-4' />, text: 'Job Hopper' },
    positions: { icon: <Briefcase className='h-4 w-4' />, text: 'Experienced' },
    schools: { icon: <BookOpen className='h-4 w-4' />, text: 'Knowledgeable' },
    skills: { icon: <Zap className='h-4 w-4' />, text: 'Skilled' },
  };

  // Filter and collect all badges
  return Object.entries(badgesData)
    .filter(([key, value]) => value >= BADGE_CONSTANTS[key])
    .map(([key]) => badgeIcons[key]);
};
