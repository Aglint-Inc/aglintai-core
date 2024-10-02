'use client';

import { Button } from '@components/ui/button';
import { CardTitle } from '@components/ui/card';
import { Dialog, DialogContent } from '@components/ui/dialog';
import { Progress } from '@components/ui/progress';
import { ScrollArea } from '@components/ui/scroll-area';
import { AlertCircle, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

import {
  type SetupStepType,
  useCompanySetup,
} from '@/authenticated/hooks/useCompanySetup';
import {
  setIsOnboardOpen,
  useOnboard,
} from '@/authenticated/store/OnboardStore';
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
    if (isCompanySetupPending) {
      setIsOnboardOpen(true);
    }
  }, [companySetupSteps]);

  if (companySetupSteps?.length && isCompanySetupPending)
    return (
      <div>
        {!isOpen && (
          <Button
            onClick={toggleOpen}
            className='fixed bottom-4 right-4 z-50 rounded-full shadow-lg'
          >
            Open Onboarding
          </Button>
        )}

        <Dialog open={isOpen} onOpenChange={() => toggleOpen()}>
          <DialogContent className='mb-0 min-w-[900px] max-w-[900px]'>
            <MainContent
              companySetupSteps={companySetupSteps}
              selectedStep={selectedStep}
              setSelectedIndex={setSelectedIndex}
              selectedIndex={selectedIndex}
              setSelectedStep={setSelectedStep}
              toggleOpen={toggleOpen}
              companySetupProgress={companySetupProgress}
            />
          </DialogContent>
        </Dialog>
      </div>
    );

  return <></>;
};

const MainContent = ({
  companySetupSteps,
  selectedStep,
  setSelectedIndex,
  selectedIndex,
  setSelectedStep,

  companySetupProgress,
}: {
  companySetupSteps: SetupStepType[];
  selectedStep: SetupStepType;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  selectedIndex: number;
  setSelectedStep: Dispatch<SetStateAction<SetupStepType>>;
  toggleOpen: () => void;
  companySetupProgress: number;
}) => {
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

  const tabs =
    companySetupSteps?.map((step) => ({
      id: step.id,
      name: step.title,

      iconComp: (
        <div
          className={`flex h-4 w-4 items-center justify-center rounded-full ${step.isCompleted ? 'bg-green-500' : 'bg-transparent'}`}
        >
          {step.isCompleted ? (
            <Check className='text-white' size={12} />
          ) : (
            <AlertCircle className='text-muted-foreground' size={15} />
          )}
        </div>
      ),
    })) || [];
  return (
    <>
      <div className='flex items-center justify-between'>
        <CardTitle className='text-xl font-semibold'>
          Onboarding Progress
        </CardTitle>
      </div>
      <Progress value={companySetupProgress} className='h-2' />
      <p className='text-sm text-muted-foreground'>
        {companySetupSteps.filter((step) => step.isCompleted).length} of{' '}
        {companySetupSteps.length} steps completed
      </p>
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
        <div className='space-y-2 md:col-span-8'>
          {selectedStep && (
            <ScrollArea className='h-[500px] w-[100%] rounded-md border bg-gray-50'>
              <Content selectedStep={selectedStep} />
            </ScrollArea>
          )}
        </div>
      </div>
      <Footer
        goToPreviousStep={goToPreviousStep}
        goToNextStep={goToNextStep}
        companySetupSteps={companySetupSteps}
        selectedIndex={selectedIndex}
      />
    </>
  );
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
