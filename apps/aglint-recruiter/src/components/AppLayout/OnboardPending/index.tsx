import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Progress } from '@components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle, Circle, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useCompanySetup } from '@/authenticated/hooks/useCompanySetup';
import { UIButton } from '@/components/Common/UIButton';

export const OnboardPending = () => {
  const { isCompanySetupPending, companySetupProgress, companySetupSteps } =
    useCompanySetup();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState(null);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const firstIncompleteStep = companySetupSteps.find(
      (step) => !step.isCompleted,
    );
    if (firstIncompleteStep) {
      setSelectedStep(firstIncompleteStep);
    }
  }, [companySetupSteps]);

  const goToNextStep = () => {
    const currentIndex = companySetupSteps.findIndex(
      (step) => step.id === selectedStep?.id,
    );
    if (currentIndex < companySetupSteps.length - 1) {
      setSelectedStep(companySetupSteps[currentIndex + 1]);
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = companySetupSteps.findIndex(
      (step) => step.id === selectedStep?.id,
    );
    if (currentIndex > 0) {
      setSelectedStep(companySetupSteps[currentIndex - 1]);
    }
  };
  if (companySetupSteps?.length && isCompanySetupPending)
    return (
      <div className='fixed bottom-4 right-4 z-50'>
        {!isOpen && (
          <Button onClick={toggleOpen} className='rounded-full shadow-lg'>
            Open Onboarding
          </Button>
        )}
        {isOpen && (
          <Card className='w-[800px] shadow-lg'>
            <CardHeader className='flex flex-col space-y-1.5 pb-4'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-xl font-semibold'>
                  Aglint AI Onboarding
                </CardTitle>
                <UIButton
                  variant='ghost'
                  icon={<X className='h-4 w-4' />}
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
              <div className='grid gap-6 md:grid-cols-3'>
                <div className='space-y-2 md:col-span-1'>
                  {companySetupSteps.map((step) => (
                    <div
                      key={step.id}
                      className={`flex cursor-pointer items-center rounded-lg p-2 transition-all ${
                        selectedStep?.id === step.id
                          ? 'bg-primary/10'
                          : 'hover:bg-secondary'
                      }`}
                      onClick={() => setSelectedStep(step)}
                    >
                      {step.isCompleted ? (
                        <CheckCircle className='mr-2 h-4 w-4 flex-shrink-0 text-primary' />
                      ) : (
                        <Circle className='mr-2 h-4 w-4 flex-shrink-0' />
                      )}
                      <div>
                        <h3
                          className={`text-sm font-medium ${step.isCompleted ? 'text-muted-foreground' : ''}`}
                        >
                          {step.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
                {selectedStep && (
                  <div className='rounded-lg bg-secondary p-4 md:col-span-2'>
                    <h2 className='mb-2 text-lg font-semibold'>
                      {selectedStep.title}
                    </h2>
                    <p className='mb-4 text-muted-foreground'>
                      {selectedStep.description}
                    </p>
                    <div className='space-y-4'>
                      <p className='text-sm'>
                        Complete this step to progress in your onboarding
                        process.
                      </p>
                      <Link
                        href={selectedStep.navLink}
                        className='inline-block'
                      >
                        <Button variant='secondary'>
                          Go to {selectedStep.title}
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <div className='flex justify-between border-t p-4'>
              <Button
                variant='outline'
                size='sm'
                onClick={goToPreviousStep}
                disabled={selectedStep?.id === 1}
              >
                <ArrowLeft className='mr-2 h-4 w-4' /> Previous
              </Button>
              <Button
                size='sm'
                onClick={goToNextStep}
                disabled={selectedStep?.id === companySetupSteps.length}
              >
                Next <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </div>
          </Card>
        )}
      </div>
    );

  return <></>;
};
