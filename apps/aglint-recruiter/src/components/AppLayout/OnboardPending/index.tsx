import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Progress } from '@components/ui/progress';
import { AlertCircle, ArrowLeft, ArrowRight, Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import {
  type SetupStepType,
  useCompanySetup,
} from '@/authenticated/hooks/useCompanySetup';
import {
  setIsOnboardOpen,
  useOnboard,
} from '@/authenticated/store/OnboardStore';
import { UIButton } from '@/components/Common/UIButton';
import UITabs from '@/components/Common/UITabs';

import { SetupCard } from './SetupCard';

export const OnboardPending = () => {
  const { isCompanySetupPending, companySetupProgress, companySetupSteps } =
    useCompanySetup();

  const [selectedStep, setSelectedStep] = useState<SetupStepType>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(null);

  const { isOpen } = useOnboard();
  const toggleOpen = () => {
    setIsOnboardOpen(!isOpen);
  };

  useEffect(() => {
    const firstIncompleteStep = companySetupSteps.find(
      (step) => !step.isCompleted,
    );
    const firstIncompleteStepIndex = companySetupSteps.findIndex(
      (step) => !step.isCompleted,
    );
    if (firstIncompleteStep) {
      setSelectedStep(firstIncompleteStep);
    }
    if (firstIncompleteStepIndex) {
      setSelectedIndex(firstIncompleteStepIndex);
    }
  }, [companySetupSteps]);

  const goToNextStep = () => {
    const currentIndex = companySetupSteps.findIndex(
      (step) => step.id === selectedStep?.id,
    );
    setSelectedIndex(currentIndex);
    if (currentIndex < companySetupSteps.length - 1) {
      setSelectedStep(companySetupSteps[currentIndex + 1]);
      setSelectedIndex(currentIndex + 1);
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = companySetupSteps.findIndex(
      (step) => step.id === selectedStep?.id,
    );
    if (currentIndex > 0) {
      setSelectedIndex(currentIndex - 1);
      setSelectedStep(companySetupSteps[currentIndex - 1]);
    }
  };

  const tabs = companySetupSteps.map((step) => ({
    id: step.id,
    name: step.title,

    iconComp: (
      <div
        className={`flex h-4 w-4 items-center justify-center rounded-full ${step.isCompleted ? 'bg-green-500' : 'bg-transparent'}`}
      >
        {step.isCompleted ? (
          <Check className='text-white' size={12} />
        ) : (
          <AlertCircle className='text-gray-500' size={15} />
        )}
      </div>
    ),
  }));

  if (companySetupSteps?.length && isCompanySetupPending)
    return (
      <div className='fixed bottom-4 right-4 z-50'>
        {!isOpen && (
          <Button onClick={toggleOpen} className='rounded-full shadow-lg'>
            Open Onboarding
          </Button>
        )}
        {isOpen && (
          <Card className='w-[900px] shadow-lg'>
            <CardHeader className='flex flex-col space-y-1.5 pb-4'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-xl font-semibold'>
                  Onboarding Progress
                </CardTitle>
                <UIButton
                  variant='ghost'
                  icon={<X className='h-4 w-4' />}
                  size='sm'
                  onClick={toggleOpen}
                />
              </div>
              <Progress value={companySetupProgress} className='h-2' />
              <p className='text-sm text-muted-foreground'>
                {companySetupSteps.filter((step) => step.isCompleted).length} of{' '}
                {companySetupSteps.length} steps completed
              </p>
            </CardHeader>
            <CardContent className='p-4'>
              <div className='grid gap-6 md:grid-cols-12'>
                <div className='space-y-2 md:col-span-4'>
                  <UITabs
                    tabs={tabs}
                    defaultValue={selectedStep?.id}
                    vertical
                    onClick={(value) => {
                      const step = companySetupSteps.find(
                        (compStep) => compStep.id === value,
                      );
                      const stepIndex = companySetupSteps.findIndex(
                        (compStep) => compStep.id === value,
                      );
                      setSelectedIndex(stepIndex);
                      setSelectedStep(step);
                    }}
                  />
                </div>
                <div className='h-full md:col-span-8'>
                  {selectedStep && <Content selectedStep={selectedStep} />}
                </div>
              </div>
            </CardContent>
            <Footer
              goToPreviousStep={goToPreviousStep}
              goToNextStep={goToNextStep}
              companySetupSteps={companySetupSteps}
              selectedIndex={selectedIndex}
            />
          </Card>
        )}
      </div>
    );

  return <></>;
};

const Footer = ({
  goToPreviousStep,
  goToNextStep,
  companySetupSteps,
  selectedIndex,
}) => {
  return (
    <div className='flex justify-between border-t p-4'>
      <Button
        variant='outline'
        size='sm'
        onClick={goToPreviousStep}
        disabled={selectedIndex === 0}
      >
        <ArrowLeft className='mr-2 h-4 w-4' /> Previous
      </Button>
      <Button
        size='sm'
        onClick={goToNextStep}
        disabled={selectedIndex === companySetupSteps.length - 1}
      >
        Next <ArrowRight className='ml-2 h-4 w-4' />
      </Button>
    </div>
  );
};
const Content = ({ selectedStep }) => {
  return (
    <>
      <SetupCard
        isCompleted={selectedStep.isCompleted || ''}
        title={selectedStep.title || ''}
        description={selectedStep.description || ''}
        bulletPoints={selectedStep.bulletPoints || []}
        scoringPoints={selectedStep.scoringPoints || []}
        schedulingPoints={selectedStep.schedulingPoints || []}
        navLink={selectedStep.navLink || ''}
      />
    </>
  );
};
