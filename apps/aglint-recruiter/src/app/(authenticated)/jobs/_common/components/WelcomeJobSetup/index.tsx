'use client';

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

import { useCompanySetup } from '@/authenticated/hooks/useCompanySetup';
import { useRouterPro } from '@/hooks/useRouterPro';

export default function WelcomeJobSetup() {
  const { jobSetupProgress, jobSetupSteps } = useCompanySetup();
  const router = useRouterPro();
  return (
    <Card className='mx-auto mt-[150px] w-full max-w-4xl'>
      <CardHeader>
        <CardTitle className='text-3xl font-bold'>
          Welcome to Aglint AI!
        </CardTitle>
        <CardDescription>
          To get started, please complete the following steps to set up your
          company:
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <Progress value={jobSetupProgress} className='w-full' />
        {jobSetupSteps.map((step) => (
          <div key={step.title} className='flex items-start space-x-2'>
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${step.isCompleted ? 'bg-green-500' : 'bg-gray-200'}`}
            >
              {step.isCompleted ? (
                <Check className='text-white' size={20} />
              ) : (
                <AlertCircle className='text-gray-500' size={20} />
              )}
            </div>
            <div className='flex w-full items-center justify-between'>
              <div>
                <h3 className='text-lg font-semibold'>{step.title}</h3>
                <p className='mb-2 text-sm text-gray-600'>{step.description}</p>
              </div>
              <Button
                variant={step.isCompleted ? 'outline' : 'default'}
                onClick={() => {
                  router.push(step.navLink);
                }}
              >
                {step.isCompleted ? 'Update' : 'Start'}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
