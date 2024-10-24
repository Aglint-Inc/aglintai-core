import {
  Section,
  SectionActions,
  SectionDescription,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { CheckCircle2, Circle, CircleCheckBig } from 'lucide-react';
import { useEffect } from 'react';

import { UIBadge } from '@/components/Common/UIBadge';
import { UIButton } from '@/components/Common/UIButton';
import { useRouterPro } from '@/hooks/useRouterPro';

import { useOnboarding } from './context/onboarding';

export function SetupCard() {
  const {
    selectedStep,
    setIsOnboardOpen,
    companySetupSteps,
    setSelectedIndex,
    selectedIndex,
  } = useOnboarding();

  useEffect(() => {
    const firstIncompleteIndex = companySetupSteps.findIndex(
      (step) => !step.isLocalCompleted,
    );
    setSelectedIndex(firstIncompleteIndex);
  }, []);

  const router = useRouterPro();

  if (!(selectedIndex > -1) && !selectedStep)
    return (
      <div className='mt-[20%] flex w-full items-center justify-center'>
        <div className='flex flex-col items-center'>
          <CircleCheckBig size={40} className='mb-5 text-green-500' />
          <p className='text-xl font-bold'>You all set</p>
          <p className='text-md max-w-[70%] text-center text-gray-400'>
            Please click the &apos;Finish&apos; button to complete your
            onboarding process
          </p>
        </div>
      </div>
    );

  const step = selectedStep;
  const {
    title,
    description,
    bulletPoints,
    scoringPoints,
    schedulingPoints,
    isLocalCompleted,
    navLink,
    toolTipText,
    isNavDisable,
  } = step;

  return (
    <Section className='min-h-[420px] rounded-lg border-none bg-muted p-4'>
      <SectionHeader>
        <SectionHeaderText>
          <SectionTitle>{title}</SectionTitle>
          <SectionDescription>{description}</SectionDescription>
        </SectionHeaderText>
        <SectionActions>
          <div className='flex flex-col items-end gap-2'>
            {isLocalCompleted ? (
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
          {isLocalCompleted
            ? 'The step has been completed.'
            : 'Information needed to complete the step.'}
        </h3>
      </div>
      <ul className='space-y-2 text-foreground'>
        {bulletPoints &&
          bulletPoints?.length > 0 &&
          bulletPoints.map((point) => (
            <li key={point} className='flex items-start space-x-2'>
              <Circle className='mt-2 h-2 w-2 flex-shrink-0 text-muted-foreground' />
              <span className='text-sm text-muted-foreground'>{point}</span>
            </li>
          ))}
      </ul>
      {scoringPoints && scoringPoints?.length > 0 && (
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
        {!isLocalCompleted && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <UIButton
                  disabled={isNavDisable}
                  onClick={() => {
                    router.push(navLink);
                    setIsOnboardOpen(false);
                  }}
                >
                  Complete Now
                </UIButton>
              </TooltipTrigger>
              {toolTipText && isNavDisable && (
                <TooltipContent>
                  <p>{toolTipText}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </Section>
  );
}
