import {
  Section,
  SectionActions,
  SectionDescription,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import { CheckCircle2, Circle } from 'lucide-react';

import { setIsOnboardOpen } from '@/authenticated/store/OnboardStore';
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
    <Section className='min-h-[500px] rounded-lg border-none bg-muted p-4'>
      <SectionHeader>
        <SectionHeaderText>
          <SectionTitle>{title}</SectionTitle>
          <SectionDescription>{description}</SectionDescription>
        </SectionHeaderText>
        <SectionActions>
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
          </div>
        </SectionActions>
      </SectionHeader>
      <div className='flex items-center justify-between pt-4'>
        <h3 className='mb-2 font-semibold text-foreground'>
          {isCompleted
            ? 'The step has been completed.'
            : 'Information needed to complete the step.'}
        </h3>
      </div>
      <ul className='space-y-2 text-foreground'>
        {bulletPoints.map((point) => (
          <li key={point} className='flex items-start space-x-2'>
            <Circle className='mt-2 h-2 w-2 flex-shrink-0 text-muted-foreground' />
            <span className='text-sm text-muted-foreground'>{point}</span>
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
                <span className='text-sm text-muted-foreground'>{point}</span>
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
                <span className='text-sm text-muted-foreground'>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className='absolute bottom-4 right-4 flex justify-end'>
        {!isCompleted && (
          <UIButton
            onClick={() => {
              router.push(navLink);
              setIsOnboardOpen(false);
            }}
          >
            Complete Now
          </UIButton>
        )}
      </div>
    </Section>
  );
}
