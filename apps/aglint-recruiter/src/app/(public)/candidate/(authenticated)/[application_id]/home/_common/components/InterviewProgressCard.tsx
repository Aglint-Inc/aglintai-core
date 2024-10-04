import { dayjsLocal } from '@aglint/shared-utils';
import { Badge } from '@components/ui/badge';
import { Card, CardContent } from '@components/ui/card';
import React from 'react';

import type { apiHomepageResponse } from '@/api/candidate_portal/home_page/route';

interface InterviewProgressCardProps {
  interview: apiHomepageResponse['interviewPlan'][number];
  isLast: boolean;
}

const InterviewProgressCard: React.FC<InterviewProgressCardProps> = ({
  interview,
  isLast,
}) => {
  const { description, name, is_completed, update_at } = interview;

  const isActive =
    status === 'Scheduled' || status === 'Completed' || status === 'Upcoming';
  const cardClasses = `w-full mb-3 ${isActive ? '' : 'cursor-not-allowed'}`;

  return (
    <div className='flex flex-row gap-2'>
      <div
        className='grid gap-2'
        style={{ gridTemplateRows: 'max-content 1fr' }}
      >
        <div
          className='mt-2 block overflow-hidden'
          style={{
            backgroundColor: isActive ? 'bg-blue-500' : 'bg-blue-500',
            borderRadius: '100px',
            height: '10px',
            width: '10px',
          }}
        ></div>
        {!isLast && (
          <div
            style={{
              backgroundColor: 'bg-blue-500',
              height: '100%',
              width: '1px',
            }}
            className='mx-auto'
          ></div>
        )}
      </div>
      <Card className={cardClasses}>
        <CardContent className='p-4'>
          <div className='space-y-2'>
            <h2 className='text-sm font-semibold text-primary'>{name}</h2>
            <p className='text-sm'>{description}</p>
            <div className='flex items-center space-x-2'>
              <Badge variant='outline' className='rounded-sm'>
                {is_completed ? 'Completed' : 'Not Scheduled'}
              </Badge>
              <span className='text-sm text-muted-foreground'>
                {dayjsLocal(update_at).format('MMM DD	YYYY hh:mm A ')}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewProgressCard;