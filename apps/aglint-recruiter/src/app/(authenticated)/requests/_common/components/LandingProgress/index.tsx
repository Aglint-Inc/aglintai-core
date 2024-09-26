'use client';

import { getFullName } from '@aglint/shared-utils';
import { Button } from '@components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Progress } from '@components/ui/progress';
import { AlertCircle, Check } from 'lucide-react';

import {
  type SetupStepType,
  useCompanySetup,
} from '@/authenticated/hooks/useCompanySetup';
import UITypography from '@/components/Common/UITypography';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRouterPro } from '@/hooks/useRouterPro';

export default function LandingProgress() {
  const { recruiterUser } = useAuthDetails();
  const { isRequestSetupPending, requestSetupProgress, requestSetupSteps } =
    useCompanySetup();

  const name = getFullName(
    recruiterUser?.first_name || '',
    recruiterUser?.last_name || '',
  );
  if (requestSetupSteps?.length > 0 && isRequestSetupPending)
    return (
      <Card className='max-h-fit w-full max-w-4xl'>
        <CardHeader>
          <CardTitle className='text-center text-2xl'>
            <UITypography className='text-2xl font-bold'>
              👋 Hey, {name}!
            </UITypography>
            <UITypography className='mt-2 text-lg font-semibold'>
              Welcome to Your Request Dashboard!
            </UITypography>
          </CardTitle>
          <CardDescription className='text-center'>
            Let&apos;s get you set up to create your first request. Complete
            these steps to unlock the &quot;Create Request&quot; button.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Progress value={requestSetupProgress} className='w-full' />
          {requestSetupSteps
            .sort((a, b) => Number(b?.isCompleted) - Number(a?.isCompleted))
            .map((step) => (
              <List key={step.title} step={step} />
            ))}
        </CardContent>
      </Card>
    );
}

const List = ({ step }: { step: SetupStepType }) => {
  const router = useRouterPro();
  return (
    <div className='flex items-center space-x-4'>
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full ${step.isCompleted ? 'bg-green-500' : 'bg-gray-200'}`}
      >
        {step.isCompleted ? (
          <Check className='text-white' size={20} />
        ) : (
          <AlertCircle className='text-gray-500' size={20} />
        )}
      </div>
      <div className='flex-grow'>
        <h3 className='font-semibold'>{step.title}</h3>
        <p className='text-sm text-gray-600'>{step.description}</p>
      </div>
      <Button
        variant={step.isCompleted ? 'outline' : 'default'}
        size='sm'
        onClick={() => router.push(step.navLink)}
        disabled={step.isCompleted}
      >
        {step.isCompleted ? 'Completed' : 'Complete'}
      </Button>
    </div>
  );
};
