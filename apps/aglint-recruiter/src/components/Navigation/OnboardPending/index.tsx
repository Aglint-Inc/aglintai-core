'use client';

import {
  Section,
  SectionActions,
  SectionDescription,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import { Button } from '@components/ui/button';
import { Dialog, DialogContent } from '@components/ui/dialog';
import { Progress } from '@components/ui/progress';
import { ScrollArea } from '@components/ui/scroll-area';
import { AlertCircle, ArrowLeft, ArrowRight, Check } from 'lucide-react';

import {
  setIsOnboardOpen,
  useOnboard,
} from '@/authenticated/store/OnboardStore';
import { UIBadge } from '@/components/Common/UIBadge';
import { UIButton } from '@/components/Common/UIButton';
import UITabs from '@/components/Common/UITabs';

import { useOnboarding } from './context/onboarding';
import { SetupCard } from './SetupCard';

export const OnboardPending = () => {
  const {
    isCompanySetupLocalPending,
    companySetupSteps,
    isOnboardCompleteRemote,
  } = useOnboarding();

  const { isOpen } = useOnboard();

  const toggleOpen = () => {
    setIsOnboardOpen(!isOpen);
  };

  const pendingStepsCount = companySetupSteps.filter(
    (step) => !step.isLocalCompleted,
  ).length;

  return (
    <>
      {isOnboardCompleteRemote ? (
        <> </>
      ) : (
        <>
          {!!companySetupSteps?.length &&
            isCompanySetupLocalPending &&
            !isOpen && (
              <UIButton
                className='fixed bottom-8 left-20 z-50 rounded-full shadow-lg'
                onClick={toggleOpen}
              >
                Onboarding
                <UIBadge
                  color='warning'
                  textBadge={pendingStepsCount + ' Steps Pending'}
                  className='-mr-2 ml-2 inline-flex rounded-full'
                />
              </UIButton>
            )}
        </>
      )}
      <Dialog open={isOpen} onOpenChange={() => toggleOpen()}>
        <DialogContent className='mb-0 min-w-[900px] max-w-[900px] p-0'>
          <MainContent />
        </DialogContent>
      </Dialog>
    </>
  );
};

const MainContent = () => {
  const {
    companySetupSteps,
    companySetupProgress,
    setSelectedIndex,
    selectedStep,
    setSelectedStep,
  } = useOnboarding();

  const tabs =
    companySetupSteps?.map((step) => ({
      id: step.id,
      name: step.title,

      iconComp: (
        <div
          className={`flex h-4 w-4 items-center justify-center rounded-full ${step.isLocalCompleted ? 'bg-green-500' : 'bg-transparent'}`}
        >
          {step.isLocalCompleted ? (
            <Check className='text-white' size={12} />
          ) : (
            <AlertCircle className='text-muted-foreground' size={15} />
          )}
        </div>
      ),
    })) || [];
  return (
    <Section>
      <SectionHeader className='p-4 pb-0'>
        <SectionHeaderText>
          <SectionTitle>Onboarding Progress</SectionTitle>
          <SectionDescription>
            Complete the steps to setup your company.
          </SectionDescription>
        </SectionHeaderText>
        <SectionActions className='mr-8 flex w-[300px] flex-row items-end'>
          <div className='flex flex-1 flex-col space-y-2'>
            <div className='text-sm text-muted-foreground'>
              {companySetupSteps.filter((step) => step.isLocalCompleted).length}{' '}
              of {companySetupSteps.length} steps completed
            </div>
            <Progress value={companySetupProgress} className='h-2' />
          </div>
        </SectionActions>
      </SectionHeader>
      <div className='grid gap-6 p-4 md:grid-cols-12'>
        <div className='space-y-2 md:col-span-4'>
          <UITabs
            tabs={tabs}
            defaultValue={selectedStep?.id ?? ''}
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
            <ScrollArea className='min-h-[420px] w-[100%]'>
              <SetupCard />
            </ScrollArea>
          )}
        </div>
      </div>
      <Footer />
    </Section>
  );
};

const Footer = () => {
  const {
    currentStepMarkAsComplete,
    finishHandler,
    isCompanySetupLocalPending,
    selectedStep,
    selectedIndex,
    companySetupSteps,
    setSelectedIndex,
    setSelectedStep,
    isPending,
  } = useOnboarding();

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

  return (
    <div className='flex justify-between rounded-b-md border-t bg-muted p-4'>
      <Button
        variant='outline'
        size='sm'
        onClick={goToPreviousStep}
        disabled={selectedIndex === 0}
      >
        <ArrowLeft className='mr-2 h-4 w-4' /> Previous
      </Button>
      <div className='flex flex-row gap-2'>
        {!selectedStep?.isCompleted && isCompanySetupLocalPending && (
          <UIButton
            size='sm'
            variant='outline'
            onClick={() => {
              if (selectedStep?.id) currentStepMarkAsComplete(selectedStep.id);
            }}
            isLoading={isPending}
          >
            Mark complete
          </UIButton>
        )}
        {!isCompanySetupLocalPending && (
          <UIButton size='sm' isLoading={isPending} onClick={finishHandler}>
            Finish
          </UIButton>
        )}
        {isCompanySetupLocalPending && (
          <UIButton
            size='sm'
            variant='outline'
            onClick={goToNextStep}
            disabled={selectedIndex === companySetupSteps.length - 1}
          >
            Next <ArrowRight className='ml-2 h-4 w-4' />
          </UIButton>
        )}
      </div>
    </div>
  );
};
