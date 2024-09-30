import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { CheckCircle2, Circle } from 'lucide-react';

import { UIBadge } from '@/components/Common/UIBadge';
import { UIButton } from '@/components/Common/UIButton';
import { useRouterPro } from '@/hooks/useRouterPro';

interface SetupCardProps {
  title: string;
  description: string;
  bulletPoints: string[];
  scoringPoints?: string[];
  schedulingPoints?: string[];
  isCompleted: boolean;
  navLink: string;
}

export function SetupCard({
  title,
  description,
  bulletPoints,
  scoringPoints,
  schedulingPoints,
  isCompleted,
  navLink,
}: SetupCardProps) {
  const router = useRouterPro();

  return (
    <Card className='h-full w-full border-none bg-gray-50 shadow-none'>
      <CardHeader className=''>
        <div className='flex items-start justify-between'>
          <div className='flex flex-col'>
            <CardTitle className='flex items-center justify-between text-lg text-foreground'>
              <span>{title}</span>
            </CardTitle>
            <CardDescription className='text-muted-foreground'>
              {description}
            </CardDescription>
          </div>
          <div className='flex flex-col items-end gap-2'>
            {isCompleted ? (
              <>
                <UIBadge
                  color='success'
                  textBadge='Completed'
                  icon={<CheckCircle2 className='h-4 w-4' />}
                />
              </>
            ) : (
              <>
                <UIBadge
                  color='error'
                  textBadge='Pending'
                  icon={<Circle className='h-3 w-3' />}
                />
              </>
            )}
            {!isCompleted && (
              <UIButton
                size='sm'
                variant='outline'
                className='w-full'
                onClick={() => {
                  router.push(navLink);
                }}
              >
                Complete
              </UIButton>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className='pt-4'>
        <div className='flex items-center justify-between'>
          <h3 className='mb-2 font-semibold text-foreground'>
            {isCompleted
              ? 'The step has been completed.'
              : 'Information you need to complete the step.'}
          </h3>
        </div>
        <ul className='space-y-2 text-foreground'>
          {bulletPoints.map((point) => (
            <li key={point} className='flex items-start space-x-2'>
              <Circle className='mt-2 h-2 w-2 flex-shrink-0 text-muted-foreground' />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        {scoringPoints && scoringPoints.length > 0 && (
          <div className='mt-8'>
            <h4 className='mb-2 font-semibold text-foreground'>Scoring:</h4>
            <ul className='space-y-2 text-foreground'>
              {scoringPoints.map((point) => (
                <li key={point} className='flex items-start space-x-2'>
                  <Circle className='mt-2 h-2 w-2 flex-shrink-0 text-muted-foreground' />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {schedulingPoints && schedulingPoints.length > 0 && (
          <div className='mt-8'>
            <h4 className='mb-2 font-semibold text-foreground'>Scheduling:</h4>
            <ul className='space-y-2 text-foreground'>
              {schedulingPoints.map((point) => (
                <li key={point} className='flex items-start space-x-2'>
                  <Circle className='mt-2 h-2 w-2 flex-shrink-0 text-muted-foreground' />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
