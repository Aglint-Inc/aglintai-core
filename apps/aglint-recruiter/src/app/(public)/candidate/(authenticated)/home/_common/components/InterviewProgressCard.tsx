import { dayjsLocal } from '@aglint/shared-utils';
import { Badge } from '@components/ui/badge';
import { Card, CardContent } from '@components/ui/card';
import React from 'react';

import { type getHomePage } from '@/routers/candidatePortal/get_home_page';

interface InterviewProgressCardProps {
  interview: getHomePage['output']['interviewPlan'][number];
  isLast: boolean;
}

const InterviewProgressCard: React.FC<InterviewProgressCardProps> = ({
  interview,
  isLast,
}) => {
  const { description, name, is_completed, update_at } = interview;

  const cardClasses = `w-full mb-3 ${is_completed ? '' : 'cursor-not-allowed'}`;

  return (
    <div className='flex flex-row gap-2'>
      <div
        className='grid gap-2'
        style={{ gridTemplateRows: 'max-content 1fr' }}
      >
        <div
          className='block overflow-hidden'
          style={{
            backgroundColor: is_completed ? 'green' : 'gray',
            borderRadius: '100px',
            height: '10px',
            width: '10px',
          }}
        ></div>
        {!isLast && (
          <div
            style={{
              backgroundColor: is_completed ? '#a7baa2' : 'lightgray',
              height: '95%',
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
